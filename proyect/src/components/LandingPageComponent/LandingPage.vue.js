import { setTimeout } from "core-js";
import UniversityCard from "../UniversityComponent/UniversityCard.vue";
import VRUniversity from "../VRUniversityComponent/VRUniversity.vue";

export default {
    components: {
      UniversityCard,
      VRUniversity
    },
    data() {
      return {
       componentCreated:false,
       toSelectUniversity:false,
       cardsApper:true,
       isLastElement:false,
       enterAnimationVRStart:false,
       enterAnimationVRStartOut:false,
       enterVRComponent:false,
       cardsApperAnimation:false,
       startVR:[false,0,''],
       topButtonsAlign:0,
       clickContinue:0,
       deviceType: "",
       pageCardsActual:[],
       textBack:"Regresar",
       textNext:"Siguiente",
       arrayExampleCards:[]
      };
    },
    created(){
        this.arrayExampleCards = this.$store.state.allDataScenes
        if(this.arrayExampleCards.length < 6){
          this.textNext = "";
        }
        setTimeout(()=>{
            this.componentCreated = true
        },2000)  
        this.deviceType = this.detectDevice()
        this.pageCardsActual = this.arrayExampleCards.slice(0, 6);
    },
    methods: {
      onClickContinue(){
        this.clickContinue = 2
        setTimeout(()=>{
          this.toSelectUniversity = true
        },1000)
      },
      detectDevice() {
      const userAgent = navigator.userAgent;
        if (/mobile/i.test(userAgent)) {
          return 'Mobile';
        } else if (/tablet/i.test(userAgent)) {
          return 'Tablet';
        } else {
          return 'Desktop';
        }
      },
      onButtonNext(){
        this.topButtonsAlign = -1;
        this.cardsApperAnimation = true
        setTimeout(() => {
          this.cardsApper = false;
        }, 1000);
        if(this.pageCardsActual[this.pageCardsActual.length-1] != this.arrayExampleCards[this.arrayExampleCards.length-1]){
          if(this.pageCardsActual[0] == this.arrayExampleCards[0]){
            this.textBack = "Regresar";
            this.textNext = "Siguiente";
            this.isLastElement = false;
          }
          if(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[this.pageCardsActual.length-1]) + 7 <= this.arrayExampleCards.length){
            this.pageCardsActual = this.arrayExampleCards.slice(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[this.pageCardsActual.length-1]) + 1,this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[this.pageCardsActual.length-1])+7);
            this.isLastElement = false;
            this.textBack = "Anterior";
          }
          else{
            setTimeout(() => {
              this.pageCardsActual = this.arrayExampleCards.slice(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[this.pageCardsActual.length-1]) + 1);
              this.isLastElement = true;
            }, 1000);
            this.textNext = "";
          }
          
        }
      },
      onButtonBack(){
        if(this.textBack == "Regresar"){
          this.toSelectUniversity = false;
          this.clickContinue = 3;
          return;
        }
        setTimeout(() => {
          this.isLastElement = false;
        }, 1000);
        this.cardsApperAnimation = true
        if(this.pageCardsActual[0] != this.arrayExampleCards[0]){
          setTimeout(() => {
            this.cardsApper = false;
          }, 1000);
          this.topButtonsAlign = -1;
          if(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[0]) -6 >= 0){
            this.pageCardsActual = this.arrayExampleCards.slice(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[0]) - 6,this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[0]));
            if(this.pageCardsActual[0] != this.arrayExampleCards[0]){
              this.textBack = "Anterior";
              this.textNext = "Siguiente"
            }
            else{
              this.textNext = "Siguiente";
              this.textBack = "Regresar"
            }
            
          }
          else{
            setTimeout(() => {
              this.cardsApper = true;
              this.cardsApperAnimation = false;
            }, 1000);
            this.pageCardsActual = this.arrayExampleCards.slice(0,6);
            this.textNext = "Siguiente";
            this.textBack = "Regresar"
          }
          
        }
        else{
          this.cardsApper = true;
          this.cardsApperAnimation = false;
          this.textNext = "Siguiente";
          this.textBack = "Regresar";
        }
      },
      positionAsign({element}){
        try {
          const rect = element.getBoundingClientRect();
          const scrollTop = document.querySelector('.selectDiv').scrollTop;
          this.topButtonsAlign = rect.top + scrollTop + 380;
        }catch (error) { console.log("Other Time") }
      },
      onClickStartVR({timerWait,toneBackground,university}){
        setTimeout(() => {
          // console.log(toneBackground,timerWait)
          this.startVR = [true,timerWait,toneBackground,university.logoFaculty]
          setTimeout(() => {
            this.enterAnimationVRStart = true
            setTimeout(() => {
              this.enterAnimationVRStartOut = true
              setTimeout(() => {
                this.enterVRComponent = true
                this.$store.commit('setUniversitySelect',university);
                this.changeRoute(university.nameFaculty)
              }, 2000);
            }, 5000);
          }, 3500);
        }, 3000);
      },
      changeRoute(facultySelect) {
        this.$router.push({
          name: 'VREscene',
          params: { facultyAbbreviation: facultySelect },
        });
      }
    },
    watch:{
      pageCardsActual(){
        setTimeout(() => {
          this.cardsApper = true;
          this.cardsApperAnimation = false;
        }, 1000);
      }
    }
  };