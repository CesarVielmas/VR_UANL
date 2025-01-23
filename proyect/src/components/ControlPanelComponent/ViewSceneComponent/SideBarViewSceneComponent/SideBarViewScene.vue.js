export default {
    name: 'SideBarViewScene',
    components: {
       
    },
    props:{ 
        background: {
            type: String, 
            required: true 
        },
        cancelPropertysButton:{
            type:Function,
            required:true
        },
        savePropertysButton:{
            type:Function,
            required:true
        },
        buttonOnEditRed:{
            type:Object,
            required:true
        },
        buttonOnEditInf:{
            type:Object,
            required:true
        }
    },
    data() {
      return {
          isOnHidden:false,
          isButtonRed:false,
          copyOfButton:{}

      };
    },
    created() {
        if(Object.keys(this.buttonOnEditRed).length === 0 && Object.keys(this.buttonOnEditInf).length !== 0){
            this.isButtonRed = false;
            this.copyOfButton = this.buttonOnEditInf;
        }
        else if(Object.keys(this.buttonOnEditRed).length !== 0 && Object.keys(this.buttonOnEditInf).length === 0){
            this.isButtonRed = true;
            this.copyOfButton = this.buttonOnEditRed;
        }
    },
    methods: {
        onSaveButton(){
            this.isOnHidden = true;
            setTimeout(()=>{
                this.savePropertysButton();
            },500);
        },
        onCancelButton(){
            this.isOnHidden = true;
            setTimeout(()=>{    
                this.cancelPropertysButton(this.copyOfButton,this.isButtonRed);
            },500);
        },
        updateButtonValue(property, event) {
            if (this.isButtonRed) {
              this.buttonOnEditRed[property] = parseFloat(event.target.value);
            } else {
              this.buttonOnEditInf[property] = parseFloat(event.target.value);
            }
        }
    },
    mounted() {
        
    },
    watch: {
  
    },
    computed: {
      
    },
  };