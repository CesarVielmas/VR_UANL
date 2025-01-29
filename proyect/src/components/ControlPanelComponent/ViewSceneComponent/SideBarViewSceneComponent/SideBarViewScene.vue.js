import axios from "axios";

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
        },
        listEscenes:{
            type:Array,
            required:true
        },
        scene:{
            type:Object,
            required:true
        },
        base64ToBlob:{
            type:Function,
            required:true
        },
        facultyName:{
            type:String,
            required:true
        },
        scenesPositions:{
            type:Array,
            required:true
        }
    },
    data() {
      return {
          isOnHidden:false,
          isButtonRed:false,
          copyOfButton:{},
          scenesToRedirect:[]

      };
    },
    created() {
        if (Object.keys(this.buttonOnEditRed).length === 0 && Object.keys(this.buttonOnEditInf).length !== 0) {
            this.isButtonRed = false;
            this.copyOfButton = { ...this.buttonOnEditInf };
        } 
        else if (Object.keys(this.buttonOnEditRed).length !== 0 && Object.keys(this.buttonOnEditInf).length === 0) {
            this.isButtonRed = true;
            this.copyOfButton = { ...this.buttonOnEditRed };
            this.fillScenesToRedirect(this.scene.idEscene,this.buttonOnEditRed);
        }
    },
    methods: {
        onSaveButton(){
            this.isOnHidden = true;
            console.log(this.scenesToRedirect);
            if(this.scenesToRedirect.length !== 0 && this.isButtonRed){
                this.scenesToRedirect[0].escene.listButtonRed = [];
                this.scenesToRedirect[0].escene.listButtonInfo = [];
                this.buttonOnEditRed.pageToSender = this.scenesToRedirect[0].escene;
            }
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
                if(this.buttonOnEditRed.positionX >= 2.500 && this.buttonOnEditRed.positionZ >= -6.5 && this.buttonOnEditRed.positionZ <= 6.5){
                    this.buttonOnEditRed.rotationSideX = -180;
                    this.buttonOnEditRed.horientationButton = "Behind";
                    this.fillScenesToRedirect(this.scene.idEscene,this.buttonOnEditRed);
                }
                else if(this.buttonOnEditRed.positionX <= -2.500 && this.buttonOnEditRed.positionZ >= -6.5 && this.buttonOnEditRed.positionZ <= 6.5){
                    this.buttonOnEditRed.rotationSideX = 0;
                    this.buttonOnEditRed.horientationButton = "Center";
                    this.fillScenesToRedirect(this.scene.idEscene,this.buttonOnEditRed);
                }
                else if(this.buttonOnEditRed.positionZ >= 6.501 || this.buttonOnEditRed.positionZ <= -6.501){
                    if(this.buttonOnEditRed.positionZ >= 6.501){
                        this.buttonOnEditRed.rotationSideX = 90;
                        this.buttonOnEditRed.horientationButton = "Right";
                        this.fillScenesToRedirect(this.scene.idEscene,this.buttonOnEditRed);
                    }
                    else{
                        this.buttonOnEditRed.rotationSideX = -90;
                        this.buttonOnEditRed.horientationButton = "Left";
                        this.fillScenesToRedirect(this.scene.idEscene,this.buttonOnEditRed);
                    }
                }
                this.buttonOnEditRed[property] = parseFloat(event.target.value);
            } else {
                if(this.buttonOnEditInf.positionX >= 2.500 && this.buttonOnEditInf.positionZ >= -6.5 && this.buttonOnEditInf.positionZ <= 6.5){
                    this.buttonOnEditInf.rotationSideX = -180;
                }
                else if(this.buttonOnEditInf.positionX <= -2.500 && this.buttonOnEditInf.positionZ >= -6.5 && this.buttonOnEditInf.positionZ <= 6.5){
                    this.buttonOnEditInf.rotationSideX = 0;
                }
                else if(this.buttonOnEditInf.positionZ >= 6.501 || this.buttonOnEditInf.positionZ <= -6.501){
                    if(this.buttonOnEditInf.positionZ >= 6.501){
                        this.buttonOnEditInf.rotationSideX = 90;
                    }
                    else{
                        this.buttonOnEditInf.rotationSideX = -90;
                    }
                }
                if(property === "textInformation")
                    this.buttonOnEditInf[property] = event.target.value;
                else
                    this.buttonOnEditInf[property] = parseFloat(event.target.value);
            }
        },
        updateButtonRedirect(newRedirect){
            this.buttonOnEditRed.pageToSender = newRedirect;
        },
        onChangeImageButtonInf(){
            this.$refs.buttonInfAddImage.click();
        },
        handleFileUploadButtonInf(event){
            const file = event.target.files[0];
            if (file) {
              if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const formImage = new FormData();
                    formImage.append('file', this.base64ToBlob(e.target.result,file.type),`${this.scene.nameScene.toLowerCase()+" button information "+this.buttonOnEditInf.idButtonInformation}.${file.type.split("/")[1]}`);
                    axios.post(`http://localhost:5299/api/Images/upload/buttonInformation/${this.facultyName}`, formImage, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                    }).
                    then((response)=>{
                        this.buttonOnEditInf.optionalImage = response.data.path;
                       
                    }).
                    catch((error)=>{
                        console.log(error);
                    });
                };
                reader.readAsDataURL(file);
              } 
          }
        },
        calculateTargetPosition(currentPosition, horientationButton) {
            const targetPosition = { ...currentPosition };
        
            switch (horientationButton) {
              case "Left":
                targetPosition.x -= 0.75;
                break;
              case "Right":
                targetPosition.x += 0.75;
                break;
              case "Center":
                targetPosition.z -= 0.5;
                break;
              case "Behind":
                targetPosition.z += 0.5;
                break;
              default:
                break; 
            }
        
            return targetPosition;
        },
        
        findSceneByPosition(positions, targetPosition) {
            return positions.find(
              (scene) =>
                scene.position.x === targetPosition.x &&
                scene.position.y === targetPosition.y &&
                scene.position.z === targetPosition.z
            );
        },
        fillScenesToRedirect(currentSceneId, buttonOnEditRed) {
            const currentScene = this.scenesPositions.find(
              (s) => s.idScene === currentSceneId
            );
            if (!currentScene) return;
            const targetPosition = this.calculateTargetPosition(
              currentScene.position,
              buttonOnEditRed.horientationButton
            );
            const targetScene = this.findSceneByPosition(this.scenesPositions, targetPosition);
            if (targetScene) {
                this.scenesToRedirect = this.listEscenes
                .filter((scene) => scene.idEscene === targetScene.idScene) 
                .map((scene) => {
                  const modifiedScene = {
                    ...scene,
                    listButtonRed: [],
                    listButtonInfo: [],
                  };
        
                  return {
                    id: scene.idEscene,
                    src: scene.imageScene,
                    name: scene.nameScene,
                    escene: modifiedScene,
                  };
                });
            } else {
              this.scenesToRedirect = [];
            }
        },
    },
    mounted() {
        
    },
    watch: {
  
    },
    computed: {
      
    },
  };