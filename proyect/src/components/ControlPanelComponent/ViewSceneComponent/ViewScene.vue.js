import FooterViewScene from "./FooterViewSceneComponent/FooterViewScene.vue";
import SideBarViewScene from "./SideBarViewSceneComponent/SideBarViewScene.vue";
import VRInformationPanelView from "./VRInformationPanelViewComponent/VRInformationPanelView.vue";
import axios from "axios";
export default {
    name: 'ViewScene',
    components: {
        VRInformationPanelView,
        SideBarViewScene,
        FooterViewScene
    },
    props:{ 
        scene:{
            type:Object,
            required:true
        },
        colorBackground: {
            type: String, 
            required: true 
        },
        device:{
            type:String,
            required: true
        },
        facultyName:{
            type:String,
            required:true
        },
        lastIdButtonRed:{
            type:Number,
            required:true
        },
        changeLastIdRed:{
            type:Function,
            required:true
        },
        lastIdButtonInf:{
            type:Number,
            required:true
        },
        changeLastIdInfo:{
            type:Function,
            required:true
        },
        changeToControlPanel:{
            type:Function,
            required:true
        }
    },
    data() {
      return {
          isEditingButton:false,
          isDeleteButton:false,
          onDeleteButtonBool:false,
          onTypeButtonDelete:"",
          idButtonToDelete:0,
          blinkInterval: null,
          buttonRedirectEdit:{},
          buttonInformationEdit:{}
      };
    },
    created() {
        
    },
    methods: {
        onChangeImageScene(){
            this.$refs.sceneAddImage.click();
        },
        onChangePropertysButton(buttonRedProperty,isButtonRed){
            if(!this.isDeleteButton){
                if(isButtonRed){
                    this.isEditingButton = true;
                    this.buttonRedirectEdit = buttonRedProperty;
                    this.buttonInformationEdit = {};
                }
                else{
                    this.isEditingButton = true;
                    this.buttonInformationEdit = buttonRedProperty;
                    this.buttonRedirectEdit = {};
                }
            }
            else{
                this.stopBlinkingEntitys();
                this.onDeleteButtonBool = true;
                if(isButtonRed){
                    this.idButtonToDelete = buttonRedProperty.idButtonRedirect;
                    this.onTypeButtonDelete = "Redirect";
                }
                else{
                    this.idButtonToDelete = buttonRedProperty.idButtonInformation; 
                    this.onTypeButtonDelete = "Information";
                }
            }
           
        },
        base64ToBlob(base64, mimeType) {
            const byteCharacters = atob(base64.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: mimeType });
        },
        convertImageToBase64(url) {
            const imageUrl = url;
          
            if (!imageUrl) {
              console.error('URL no encontrada');
              return "";
            }
            fetch(imageUrl)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Error al obtener la imagen');
                }
                return response.blob();
              })
              .then(blob => {
                const reader = new FileReader();
          
                reader.onloadend = () => {
                  console.log(reader.result);
                  return reader.result;
                };
          
                reader.onerror = (error) => {
                  console.error('Error al convertir el blob a base64', error);
                  return "";
                };
          
                reader.readAsDataURL(blob);
              })
              .catch(error => {
                console.error('Error al obtener la imagen desde la url:', error);
                return "";
              });
        },
        handleFileUploadScene(event){
            const file = event.target.files[0];
            if (file) {
              if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const formImage = new FormData();
                    formImage.append('file', this.base64ToBlob(e.target.result,file.type),`${this.scene.nameScene.toLowerCase().replace(/\s+/g, "_")}.${file.type.split("/")[1]}`);
                    axios.post(`http://localhost:5299/api/Images/upload/Escene/${this.facultyName}`, formImage, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                    }).
                    then((response)=>{
                        this.scene.imageScene = response.data.path;
                        const sky = document.querySelector("#skyElement");
                        const parent = sky.parentNode;
                        parent.removeChild(sky);
                        const newSky = document.createElement("a-sky");
                        newSky.setAttribute("id", "skyElement");
                        newSky.setAttribute("src", `${this.scene.imageScene}?_=${new Date().getTime()}`);
                        newSky.setAttribute("rotation", "0 0 0");
                        parent.appendChild(newSky);
                    }).
                    catch((error)=>{
                        console.log(error);
                    });
                };
                reader.readAsDataURL(file);
              } 
          } 
        },
        loadModelsButtonsRedirect(index) {
            if (index === this.scene.listButtonRed.length - 1) {
                Object.keys(this.$refs).forEach(refKey => {
                    if (refKey.startsWith('arrowModel-')) {
                        const modelRefs = this.$refs[refKey];
                        if (modelRefs && modelRefs[0]) { 
                            const modelRef = modelRefs[0];
                            const model = modelRef.getObject3D('mesh');
                            if (model) {
                                model.traverse((node) => {
                                    if (node.isMesh) {
                                        node.material.color.set(this.colorBackground);
                                    }
                                });
                            }
                        }
                    }
                });
            }
        },
        onMouseEnterButtonRedirect(index) {
            const tooltip = document.getElementById(`tooltip-${index}`);
            const tooltipText = document.getElementById(`tooltip-text-${index}`);
          
            if (tooltip && tooltipText) {
              // Añadir animación de fadeIn dinámicamente
              tooltip.setAttribute(
                'animation__fadeIn',
                'property: opacity; from: 0; to: 1; dur: 1000; startEvents: fadeIn'
              );
              tooltipText.setAttribute(
                'animation__fadeIn',
                'property: opacity; from: 0; to: 1; dur: 1000; startEvents: fadeIn'
              );
          
              tooltip.setAttribute('visible', true);
              tooltipText.setAttribute('visible', true);
          
              tooltip.emit('fadeIn');
              tooltipText.emit('fadeIn');
            }
        },
        onMouseLeaveButtonRedirect(index) {
            const tooltip = document.getElementById(`tooltip-${index}`);
            const tooltipText = document.getElementById(`tooltip-text-${index}`);
          
            if (tooltip && tooltipText) {
              // Añadir animación de fadeOut dinámicamente
              tooltip.setAttribute(
                'animation__fadeOut',
                'property: opacity; from: 1; to: 0; dur: 1000; startEvents: fadeOut'
              );
              tooltipText.setAttribute(
                'animation__fadeOut',
                'property: opacity; from: 1; to: 0; dur: 1000; startEvents: fadeOut'
              );
          
              tooltip.emit('fadeOut');
              tooltipText.emit('fadeOut');
          
              setTimeout(() => {
                tooltip.setAttribute('visible', false);
                tooltipText.setAttribute('visible', false);
              }, 1000);
            }
        },
        onCreateButtonRedirect(){
            this.isEditingButton = true;
            this.buttonRedirectEdit = {
                idButtonRedirect: this.lastIdButtonRed + 1,
                buttonLarge: 1.500,
                buttonHigh: 1.200,
                buttonWidth: 1.000,
                positionX: -5.560,
                positionY: -1.560,
                positionZ: 0.760,
                rotationSideX: 10.000,
                rotationSideY: 0.000,
                rotationSideZ: 180.000,
                horientationButton: "Left",
                esceneId: this.scene.idEscene,
                pageToSender: {},
                targetEsceneId: 0,
            }
            this.buttonInformationEdit = {};
            this.scene.listButtonRed.push(this.buttonRedirectEdit);
            this.changeLastIdRed();
            this.stopBlinkingEntitys();
            this.isDeleteButton = false;
            this.onDeleteButtonBool = false;
            this.idButtonToDelete = 0;
        },
        onCreateButtonInformation(){

        },
        onCancelEditPropertysButton(copyOfButton,isButtonRed){
            if(isButtonRed){
                const buttonToUpdateIndex = this.scene.listButtonRed.findIndex(
                    red => red.idButtonRedirect === copyOfButton.idButtonRedirect
                );
                if (buttonToUpdateIndex !== -1) {
                    this.scene.listButtonRed[buttonToUpdateIndex] = {
                        ...this.scene.listButtonRed[buttonToUpdateIndex],
                        ...copyOfButton
                    };
                }                
            }
            else{
                console.log("Para el boton de informacion cancelarlo")
            }
            this.isEditingButton = false;
        },
        onSaveEditPropertysButton(){
            this.isEditingButton = false;
        },
        onDeleteButton(){
            this.isDeleteButton = true;
            this.startBlinkingEntitys();
        },
        onDeleteButtonAcept(){
            if(this.onTypeButtonDelete === "Redirect"){
                const buttonToDeleteIndex = this.scene.listButtonRed.findIndex(
                    red => red.idButtonRedirect === this.idButtonToDelete
                );
                if (buttonToDeleteIndex !== -1) {
                    this.scene.listButtonRed.splice(buttonToDeleteIndex, 1);
                }
            }
            else if(this.onTypeButtonDelete === "Information"){
                const buttonToDeleteIndex = this.scene.listButtonInf.findIndex(
                    red => red.idButtonInformation === this.idButtonToDelete
                );
                if (buttonToDeleteIndex !== -1) {
                    this.scene.listButtonInf.splice(buttonToDeleteIndex, 1);
                }
            }
            this.isDeleteButton = false;
            this.onDeleteButtonBool = false;
            this.idButtonToDelete = 0;
        },
        onDeleteButtonCancel(){
            this.isDeleteButton = false;
            this.onDeleteButtonBool = false;
            this.idButtonToDelete = 0;
        },
        startBlinkingEntitys(){
            if (this.blinkInterval === null) {
                this.blinkInterval = setInterval(() => {
                    Object.keys(this.$refs).forEach(refKey => {
                        if (refKey.startsWith('arrowModel-')) {
                            const modelRefs = this.$refs[refKey];
                            if (modelRefs && modelRefs[0]) { // Verificar que la referencia exista
                                const modelRef = modelRefs[0];
                                const model = modelRef.getObject3D('mesh');
                                if (model) {
                                    model.traverse((node) => {
                                        if (node.isMesh && node.material) {
                                            node.material.transparent = true;
                                            node.material.opacity = node.material.opacity === 1 ? 0 : 1;
                                        }
                                    });
                                }
                            }
                        }
                    });
                }, 250);
            }
        },
        stopBlinkingEntitys() {
            if (this.blinkInterval) {
                    clearInterval(this.blinkInterval);
                    this.blinkInterval = null;
                    Object.keys(this.$refs).forEach(refKey => {
                        if (refKey.startsWith('arrowModel-')) {
                            const modelRef = this.$refs[refKey][0];
                            if (modelRef) { // Verificar que modelRef esté definido
                                const model = modelRef.getObject3D('mesh');
                                if (model) {
                                    model.traverse((node) => {
                                        if (node.isMesh && node.material) {
                                            node.material.opacity = 1;
                                        }
                                    });
                                }
                            }
                        }
                    });
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