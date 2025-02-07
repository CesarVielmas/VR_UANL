import HeaderViewScenes from "./HeaderViewScenesComponent/HeaderViewScenes.vue";
import { registerComponent,components } from "aframe";
import { THREE } from "aframe";
import axios from "axios";
import FooterViewScenes from "./FooterViewScenesComponent/FooterViewScenes.vue";

export default {
    name: 'ViewScenes',
    components: {
      HeaderViewScenes,
      FooterViewScenes
    },
    props:{ 
        colorBackground: {
            type: String, 
            required: true 
        },
        device:{
            type:String,
            required: true
        },
        universitySelected:{
          type:Object,
          required:true
        },
        universityCopy:{
          type:Object,
          required:true
        },
        onChangeEditVR:{
          type:Function,
          required:true
        },
        isUnique: {
          type: Boolean, 
          required: true 
        },
    },
    data() {
      return {
          enterToAddSceneBool:false,
          isOnButtonRed:0,
          deleteVoidScene:false,
          updateInformation:false,
          exitPanelControl:false,
          exitPanelControlState:0,
          updateInformationState:0,
          stateVoidDelete:0,
          isVoidDelete:0,
          isEditNameScene:0,
          newNameScene:'',
          stateChangeIcons:{ editScene: 0, editNameScene:0, voidScene:0, deleteScene:0, stateScene:0,addInButtonRed:0, changeScene:0},
          positionsScenes:[],
          scenesKey:0,
          onChangeScene:false,
          changeSceneState:0,
          firstScene:{},
          secondScene:{}
      };
    },
    created() {
        console.log(this.universitySelected);
        this.onEsceneLoaded(this.universitySelected);
    },
    beforeDestroy() {
      this.cleanUpEntity();
    },
    methods: { 
      async onSaveChanges(){
        this.updateInformation = true;
        this.updateInformationState = 0;
        const updatedUniversity = JSON.parse(JSON.stringify(this.universitySelected));
        updatedUniversity.listEscenes.forEach(escene => {
          // Versión mejorada
          escene.namePositionScene = escene.namePositionScene.replace(/ /g, "_") 
          + (!escene.namePositionScene.includes(`_${updatedUniversity.nameFaculty}`) 
              ? `_${updatedUniversity.nameFaculty}` 
              : "");
          escene.listButtonRed.forEach(button => {
            if (button.pageToSender) {
              button.targetEsceneId = button.pageToSender.idEscene || 0;  
              delete button.pageToSender;  
            }
          });
        });
        console.log(updatedUniversity);
        axios.put(`https://backend-production-1da7.up.railway.app/api/University/Escenes/${updatedUniversity.idUniversity}`,updatedUniversity,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response)=>{
          console.log(response);
          this.updateInformationState = 1;
          setTimeout(()=>{
            this.updateInformation = false;
          },1000)
        })
        .catch((error)=>{
          console.log(error)
          this.updateInformationState = 2;
          setTimeout(()=>{
            this.updateInformation = false;
          },1000)
        })
      },
      returnToSelectUniversity(){
        this.exitPanelControl = true;
        if(JSON.stringify(this.universityCopy) !== JSON.stringify(this.universitySelected)){
            this.exitPanelControlState = 1;
        }
      },  
      async onExitSelectUniversity(stateSave){
        if(stateSave !== 0){
          await this.onSaveChanges();
          setTimeout(()=>{
            this.exitPanelControl = false;
            if(!this.isUnique){
              window.location.href = this.$router.resolve({ name: 'HomeLogin' }).href;
            }
            else{
              localStorage.clear();
              window.location.href = this.$router.resolve({ name: 'HomeLogin' }).href;
            }
          },1500)
        }
        else{
          this.exitPanelControl = false;
          if(!this.isUnique){
            window.location.href = this.$router.resolve({ name: 'HomeLogin' }).href;
          }
          else{
            localStorage.clear();
            window.location.href = this.$router.resolve({ name: 'HomeLogin' }).href;
          }
        }
      },
      deleteAllScenes(){
        this.universitySelected.listEscenes = [];
        this.positionsScenes = [];
        delete components['mouse-interaction'];
        this.$nextTick(() => {
          this.$emit('update:universitySelected', this.universitySelected);
          this.deleteVoidScene = false;
        });
      },
      onPreviewVR(){
        window.open(`http://192.168.1.8:8080/VR-${this.universitySelected.nameFaculty}`, '_blank');
      },
      onChangeScenes(){
        this.onChangeScene = !this.onChangeScene;
        if(!this.onChangeScene){
          this.changeSceneState = 0;
          this.firstScene = {};
          this.secondScene = {};
        }
      },
      onChangeFirstScene(){
       this.firstScene = this.universitySelected.listEscenes.find(e=>e.idEscene === this.stateChangeIcons.changeScene);
       this.changeSceneState = 1;
      },
      onChangeSecondScene(){
        this.secondScene = this.universitySelected.listEscenes.find(e=>e.idEscene === this.stateChangeIcons.changeScene);
        if(this.secondScene.idEscene != this.firstScene.idEscene){
          const firstSceneIndex = this.universitySelected.listEscenes.findIndex(
            (e) => e.idEscene === this.firstScene.idEscene
          );
          const secondSceneIndex = this.universitySelected.listEscenes.findIndex(
            (e) => e.idEscene === this.secondScene.idEscene
          );
          if (firstSceneIndex > -1 && secondSceneIndex > -1) {
            const tempName = this.universitySelected.listEscenes[firstSceneIndex].nameScene;
            const tempImage = this.universitySelected.listEscenes[firstSceneIndex].imageScene;
            const tempListButtonInfo = this.universitySelected.listEscenes[firstSceneIndex].listButtonInfo;

            this.universitySelected.listEscenes[firstSceneIndex].nameScene =
              this.universitySelected.listEscenes[secondSceneIndex].nameScene;
            this.universitySelected.listEscenes[firstSceneIndex].imageScene =
              this.universitySelected.listEscenes[secondSceneIndex].imageScene;
            this.universitySelected.listEscenes[firstSceneIndex].listButtonInfo =
              this.universitySelected.listEscenes[secondSceneIndex].listButtonInfo;

            this.universitySelected.listEscenes[secondSceneIndex].nameScene = tempName;
            this.universitySelected.listEscenes[secondSceneIndex].imageScene = tempImage;
            this.universitySelected.listEscenes[secondSceneIndex].listButtonInfo = tempListButtonInfo;
          }
          this.changeSceneState = 0;
          this.scenesKey += 1;
          this.firstScene = {};
          this.secondScene = {};
          this.onChangeScene = false;
        }
      },
      incrementCameraY(){
        let cameraView = document.querySelector('#camera');
        let positionCamera = cameraView.getAttribute('position');
        if (positionCamera.y + 1.0 < 29.2) positionCamera.y += 1;
        cameraView.setAttribute('position',positionCamera);
      },
      decrementCameraY(){
        let cameraView = document.querySelector('#camera');
        let positionCamera = cameraView.getAttribute('position');
        if (positionCamera.y - 1.0 > 1.2) positionCamera.y -= 1;
        cameraView.setAttribute('position',positionCamera);
      },
      incrementCameraZ(){
        let cameraView = document.querySelector('#camera');
        let positionCamera = cameraView.getAttribute('position');
        positionCamera.x += .5;
        cameraView.setAttribute('position',positionCamera);
      },
      decrementCameraZ(){
        let cameraView = document.querySelector('#camera');
        let positionCamera = cameraView.getAttribute('position');
        positionCamera.x -= .5;
        cameraView.setAttribute('position',positionCamera);
      },
      resetCamera(){
        let cameraView = document.querySelector('#camera');
        let positionCamera = cameraView.getAttribute('position');
        console.log(positionCamera);
        positionCamera.x = 0;
        positionCamera.y = 1.6;
        positionCamera.z = 0;
        cameraView.setAttribute('position',positionCamera);
      },
      decrementCameraYMax(){
        let cameraView = document.querySelector('#camera');
        let positionCamera = cameraView.getAttribute('position');
        positionCamera.y = 1.2;
        cameraView.setAttribute('position',positionCamera);
      },
      incrementCameraYMax(){
        let cameraView = document.querySelector('#camera');
        let positionCamera = cameraView.getAttribute('position');
        positionCamera.y = 29.2;
        cameraView.setAttribute('position',positionCamera);
      },
      enterToAddScene(){
        if(this.stateChangeIcons.addInButtonRed != 0){
          this.isEditNameScene = 0;
          this.enterToAddSceneBool = true;
          this.isOnButtonRed = this.stateChangeIcons.addInButtonRed;
          
        }
        else{
          this.isEditNameScene = 0;
          this.enterToAddSceneBool = true;
          this.isOnButtonRed = 0;
        }
      },
      editNameSceneChange(){
        if(this.isEditNameScene != 0){
            let esceneToEdit = this.universitySelected.listEscenes.find(escene => escene.idEscene === this.isEditNameScene);
            if (this.newNameScene !== "" && this.newNameScene !== esceneToEdit.nameScene && this.newNameScene.length < 28) {
              esceneToEdit.nameScene = this.newNameScene;
              this.$emit('update:universitySelected', this.universitySelected);
              this.enterToAddSceneBool = false;
            }
        }
      },
      enterToEditScene(sceneToEdit){
        let zoomInElement = document.querySelector(`#object-scene-${sceneToEdit.idEscene}`);
        if (zoomInElement) {
          let objectPosition = zoomInElement.getAttribute('position');
          let targetPosition = {
            x: objectPosition.x,
            y: 1.1,
            z: objectPosition.z, 
          };
          let camera = document.querySelector('#camera');
          if (camera) {
            camera.setAttribute('animation', {
              property: 'position',
              to: `${targetPosition.x} ${targetPosition.y} ${targetPosition.z}`,
              dur: 1000,
              easing: 'easeInOutQuad',
            });
            setTimeout(()=>{
              delete components['mouse-interaction'];
              this.onChangeEditVR({scene:sceneToEdit,positions:this.positionsScenes});
            },1000)
          } 
          else {
            console.error('No se encontró la cámara con el ID #camera');
          }
        } 
        else {
          console.error('No se encontró el objeto con el ID especificado');
        }
      },
      enterEditNameScene(){
        this.isEditNameScene = this.stateChangeIcons.editNameScene;
        this.enterToAddSceneBool = true;
      },
      enterToVoidScene(){
        this.deleteVoidScene = true;
        this.stateVoidDelete = 0;
        this.isVoidDelete = this.stateChangeIcons.voidScene;
      },
      enterToDeleteScene(){
        this.deleteVoidScene = true;
        this.stateVoidDelete = 1;
        this.isVoidDelete = this.stateChangeIcons.deleteScene;
      },  
      enterToStateScene(){
        console.log("Entro para el estado")
        
      },
      enterToDeleteCompleteScene(){
        if(this.isVoidDelete != 0){
            let esceneToDelete = this.universitySelected.listEscenes.find(escene => escene.idEscene === this.isVoidDelete);
            if(this.universitySelected.listEscenes.length === 1){
              delete components['mouse-interaction'];
            }
            if (esceneToDelete) {
              const index = this.universitySelected.listEscenes.indexOf(esceneToDelete);
              if (index > -1) {
                this.universitySelected.listEscenes.splice(index, 1);
                this.universitySelected.listEscenes.forEach(escene => {
                  escene.listButtonRed = escene.listButtonRed.filter(buttonRed => {
                    if (buttonRed.pageToSender && buttonRed.pageToSender.idEscene === this.isVoidDelete) {
                      return false; 
                    }
                    return true; 
                  });
                });
                this.$nextTick(() => {
                  this.$emit('update:universitySelected', this.universitySelected);
                  this.positionsScenes = this.positionsScenes.filter(scene => scene.idEscene !== this.isVoidDelete);
                  this.deleteVoidScene = false;
                });
              }
            }
        }
      },
      enterToVoidCompleteScene(){
        if(this.isVoidDelete != 0){
          let esceneToVoid = this.universitySelected.listEscenes.find(escene => escene.idEscene === this.isVoidDelete);
          esceneToVoid.imageScene = "";
          esceneToVoid.listButtonInfo = [];
          esceneToVoid.nameScene = "";
          this.$emit('update:universitySelected', this.universitySelected);
          this.deleteVoidScene = false;
        }
      },
      enterToSceneToEdit(){
        if (this.isOnButtonRed != 0) {
          // Generar un nuevo ID para la escena
          const lastId = this.universitySelected.listEscenes.length > 0 
          ? Math.max(...this.universitySelected.listEscenes.map(scene => scene.idEscene)) 
          : 0;

          const newScene = {
          idEscene: lastId + 1,
          nameScene: this.newNameScene,
          imageScene: "",
          listButtonInfo: [],
          listButtonRed: [],
          namePositionScene: this.newNameScene.toLowerCase().replace(" ","_")
          };
          this.universitySelected.listEscenes.push(newScene);
          this.universitySelected.listEscenes.forEach(scene => {
          scene.listButtonRed = scene.listButtonRed.map(button => {
              if (button.idButtonRedirect === this.isOnButtonRed) {
                  return { 
                      ...button, 
                      pageToSender: newScene 
                  };
              }
              return button;
          });
          });
          this.enterToAddSceneBool = false;
          this.isOnButtonRed = 0;
          this.scenesKey += 1;
          this.onEsceneLoaded(this.universitySelected);
        } 
        else {
          const newScene = {
            idEscene: 1,
            nameScene: this.newNameScene,
            imageScene: "",
            listButtonInfo: [],
            listButtonRed: [],
            namePositionScene: this.newNameScene.toLowerCase().replace(" ","_")
          };
          this.universitySelected.listEscenes.push(newScene);
          this.enterToAddSceneBool = false;
          setTimeout(()=>{
            delete components['mouse-interaction'];
            this.enterToEditScene(newScene);
          },500)
        }
      },
      cancelToAddScene(){
        this.enterToAddSceneBool = false;
      },
      onEsceneLoaded(university) {
        const positionsScenes = [];
      
        // Función auxiliar para calcular nuevas posiciones basadas en la orientación
        const calculatePosition = (basePosition, horientationButton) => {
          const newPosition = { ...basePosition }; // Copiar la posición base
      
          switch (horientationButton) {
            case "Left":
              newPosition.x -= 0.75;
              break;
            case "Right":
              newPosition.x += 0.75;
              break;
            case "Center":
              newPosition.z -= 0.5;
              break;
            case "Behind":
              newPosition.z += 0.5;
              break;
            default:
              break; // Sin cambio si no hay orientación válida
          }
      
          return newPosition;
        };
      
        // Recorrer las escenas y calcular posiciones
        university.listEscenes.forEach(scene => {
          // Verificar si ya existe la posición de esta escena
          let scenePosition = positionsScenes.find(pos => pos.idScene === scene.idEscene);
      
          if (!scenePosition) {
            // Si no existe, agregar la posición inicial
            scenePosition = { idScene: scene.idEscene, position: { x: 0, y: 0, z: 0 } };
            positionsScenes.push(scenePosition);
          }
      
          // Procesar botones de redirección para calcular nuevas posiciones
          scene.listButtonRed.forEach(buttonRed => {
            const pageToSender = buttonRed.pageToSender;
      
            if (pageToSender && pageToSender.idEscene) {
              const targetSceneId = pageToSender.idEscene;
      
              // Buscar si la escena de destino ya tiene una posición
              let targetScenePosition = positionsScenes.find(pos => pos.idScene === targetSceneId);
      
              if (!targetScenePosition) {
                // Si no tiene posición, calcular una nueva basada en la orientación
                const newPosition = calculatePosition(scenePosition.position, buttonRed.horientationButton);
      
                // Agregar la posición de la escena de destino
                targetScenePosition = { idScene: targetSceneId, position: newPosition };
                positionsScenes.push(targetScenePosition);
              }
            }
          });
        });
      
        // Actualizar el array global de posiciones
        this.positionsScenes = positionsScenes;
      },
      getScenePosition(idScene) {
        const found = this.positionsScenes.find(scene => scene.idScene === idScene);
        return found ? found.position : '0 0 0';
      },
      registerComponentMouseInteraction(vueComponent){
        registerComponent('mouse-interaction',{
          init: function () {
            const sceneEl = this.el.sceneEl;
            const raycaster = new THREE.Raycaster();
            raycaster.far = 1000;
            const mouse = new THREE.Vector2();
            let cameraView = document.querySelector('#camera');
            let valueXInit = 0;
            let valueYInit = 0;
            let positionCamera = { x: 0, y: 0, z: 0 };
            let onMoveCamera = false;
            let stateObjectsRay = { plane: false, planeHover:false,object: false, planeNew:false, editScene:false,editSceneImage:false, editNameScene:false,editNameSceneImage:false,voidScene:false,voidSceneImage:false,deleteScene:false,deleteSceneImage:false,stateScene:false,addInButtonRed:false};
            const handleMouseUpBackground = () => {
              document.body.style.cursor = 'grab';
              onMoveCamera = false;
            };
            const handleWheel = (event) =>{
                if (!onMoveCamera) {
                  cameraView = document.querySelector('#camera');
                  positionCamera = cameraView.getAttribute('position');
                  if (event.deltaY > 0) {
                    if (positionCamera.y < 29.2) positionCamera.y += 0.1;
                  } else if (event.deltaY < 0) {
                    if (positionCamera.y > 1.2) positionCamera.y -= 0.1;
                  }
                  cameraView.setAttribute('position', positionCamera);
                }
            };
            const handleMouseMove = (event) =>{
              mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
              mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
              const camera = sceneEl.camera;
              raycaster.setFromCamera(mouse, camera);
        
              const intersects = raycaster.intersectObjects(sceneEl.object3D.children, true);
        
              intersects.forEach((intersection, index) => {
                if (index === 0) {
                  if (
                    intersection.object.el &&
                    intersection.object.el.classList.contains('clickable') &&
                    intersection.object.el.id === "plane"
                  ) {
                    if (!stateObjectsRay.plane) {
                      
                      intersection.object.el.addEventListener('mousedown', handleMouseDownBackground);
                      intersection.object.el.addEventListener('mouseup', handleMouseUpBackground);
                    }
                    if (document.body.style.cursor !== 'grab' && document.body.style.cursor !== 'grabbing') {
                      document.body.style.cursor = 'grab';
                    }
                    if (onMoveCamera) {
                      const deltaX = (mouse.x - valueXInit) / 2;
                      const deltaY = (mouse.y - valueYInit) / 2;
                      positionCamera.x -= deltaX;
                      positionCamera.z -= deltaY;
                      valueXInit = mouse.x;
                      valueYInit = mouse.y;
                      cameraView.setAttribute('position', positionCamera);
                    }
                    stateObjectsRay.plane = true;
                    stateObjectsRay.object = false;
                    stateObjectsRay.planeHover = true;
                    if(stateObjectsRay.planeNew){
                      let planeChangeColor = document.querySelector('#planeNew');
                      planeChangeColor.setAttribute('color',"#4dd51e")
                      stateObjectsRay.planeNew = false;
                    }
                    if(stateObjectsRay.editScene && vueComponent.stateChangeIcons.editScene !== 0){
                      const imageToEdit = document.querySelector(`#editScene-${vueComponent.stateChangeIcons.editScene}`);
                      imageToEdit.setAttribute('src',require('@/assets/icon_edit_scene.png')); 
                      vueComponent.stateChangeIcons.editScene = 0;
                      stateObjectsRay.editScene = false;
                    }
                    if(stateObjectsRay.editNameScene && vueComponent.stateChangeIcons.editNameScene !== 0){
                      const imageToEdit = document.querySelector(`#editNameScene-${vueComponent.stateChangeIcons.editNameScene}`);
                      imageToEdit.setAttribute('src',require('@/assets/icon_edit_name_scene.png'));
                      vueComponent.stateChangeIcons.editNameScene = 0;
                      stateObjectsRay.editNameScene = false;
                    }
                    if(stateObjectsRay.voidScene && vueComponent.stateChangeIcons.voidScene !== 0){
                      const imageToEdit = document.querySelector(`#voidScene-${vueComponent.stateChangeIcons.voidScene}`);
                      imageToEdit.setAttribute('src',require('@/assets/icon_void_scene.png'));
                      vueComponent.stateChangeIcons.voidScene = 0;
                      stateObjectsRay.voidScene = false;
                    }
                    if(stateObjectsRay.deleteScene && vueComponent.stateChangeIcons.deleteScene !== 0){
                      const imageToEdit = document.querySelector(`#deleteScene-${vueComponent.stateChangeIcons.deleteScene}`);
                      imageToEdit.setAttribute('src',require('@/assets/icon_delete_scene.png'));
                      vueComponent.stateChangeIcons.deleteScene = 0;
                      stateObjectsRay.deleteScene = false;
                    }
                    if(stateObjectsRay.stateScene && vueComponent.stateChangeIcons.stateScene !== 0){
                      vueComponent.stateChangeIcons.stateScene = 0;
                      stateObjectsRay.stateScene = false;
                    }
                    if(vueComponent.stateChangeIcons.addInButtonRed !== 0 && stateObjectsRay.addInButtonRed){
                      vueComponent.stateChangeIcons.addInButtonRed = 0;
                      stateObjectsRay.addInButtonRed = false;
                    }
                    } 
                    else if (
                    intersection.object.el &&
                    intersection.object.el.classList.contains('hover') &&
                    intersection.object.el.id.includes("object")
                    ) {
                    if (!stateObjectsRay.object) {
                      if(vueComponent.onChangeScene){
                        document.body.style.cursor = "pointer";      
                        vueComponent.stateChangeIcons.changeScene = parseInt(intersection.object.el.id.split("-")[1],10);
                      }
                      else{
                        document.body.style.cursor = "default";
                        vueComponent.stateChangeIcons.changeScene = 0;
                      }
                      stateObjectsRay.object = true;
                      stateObjectsRay.planeNew = false;
                      stateObjectsRay.planeHover = false;
                      onMoveCamera = false;
                      if(stateObjectsRay.editScene && vueComponent.stateChangeIcons.editScene !== 0){
                        const imageToEdit = document.querySelector(`#editScene-${vueComponent.stateChangeIcons.editScene}`);
                        imageToEdit.setAttribute('src',require('@/assets/icon_edit_scene.png')); 
                        vueComponent.stateChangeIcons.editScene = 0;
                        stateObjectsRay.editScene = false;
                      }
                      if(stateObjectsRay.editNameScene && vueComponent.stateChangeIcons.editNameScene !== 0){
                        const imageToEdit = document.querySelector(`#editNameScene-${vueComponent.stateChangeIcons.editNameScene}`);
                        imageToEdit.setAttribute('src',require('@/assets/icon_edit_name_scene.png'));
                        vueComponent.stateChangeIcons.editNameScene = 0;
                        stateObjectsRay.editNameScene = false;
                      }
                      if(stateObjectsRay.voidScene && vueComponent.stateChangeIcons.voidScene !== 0){
                        const imageToEdit = document.querySelector(`#voidScene-${vueComponent.stateChangeIcons.voidScene}`);
                        imageToEdit.setAttribute('src',require('@/assets/icon_void_scene.png'));
                        vueComponent.stateChangeIcons.voidScene = 0;
                        stateObjectsRay.voidScene = false;
                      }
                      if(stateObjectsRay.deleteScene && vueComponent.stateChangeIcons.deleteScene !== 0){
                        const imageToEdit = document.querySelector(`#deleteScene-${vueComponent.stateChangeIcons.deleteScene}`);
                        imageToEdit.setAttribute('src',require('@/assets/icon_delete_scene.png'));
                        vueComponent.stateChangeIcons.deleteScene = 0;
                        stateObjectsRay.deleteScene = false;
                      }
                      if(stateObjectsRay.stateScene && vueComponent.stateChangeIcons.stateScene !== 0){
                        vueComponent.stateChangeIcons.stateScene = 0;
                        stateObjectsRay.stateScene = false;
                      }
                      if(vueComponent.stateChangeIcons.addInButtonRed !== 0 && stateObjectsRay.addInButtonRed){
                        vueComponent.stateChangeIcons.addInButtonRed = 0;
                        stateObjectsRay.addInButtonRed = false;
                      }
                    }
                  }
                  else if (
                  intersection.object.el &&
                  intersection.object.el.classList.contains('clickable') &&
                  intersection.object.el.id.includes("editScene")
                  ){
                      if(!stateObjectsRay.editScene){
                        const imageToEdit = document.querySelectorAll(`[id^=${intersection.object.el.id.split("-")[0]}]`);
                        stateObjectsRay.editSceneImage = true;
                        imageToEdit.forEach(item => {  
                          if(!stateObjectsRay.editSceneImage){
                            const parentElement = item.closest('a-image');
                            if (parentElement) {
                              parentElement.removeAttribute('src');
                              console.log("SRC eliminado del a-image");
                              parentElement.setAttribute('src', '');
                              setTimeout(()=>{
                                if (item.id === intersection.object.el.id) {
                                  parentElement.setAttribute('src', require('@/assets/icon_edit_scene_hover.png'));
                                } else {
                                  parentElement.setAttribute('src', require('@/assets/icon_edit_scene.png'));
                                }
                              },1)
                            } else {
                              console.log("No se encontró el elemento a-image.");
                            }
                            stateObjectsRay.editSceneImage = true;
                          }
                          else{
                            if (item.id === intersection.object.el.id) {
                              item.setAttribute('src', require('@/assets/icon_edit_scene_hover.png'));
                            } else {
                              item.setAttribute('src', require('@/assets/icon_edit_scene.png'));
                            }
                          }
                        });
                        vueComponent.stateChangeIcons.editScene = parseInt(intersection.object.el.id.split("-")[1], 10);
                        document.body.style.cursor = "pointer";
                        stateObjectsRay.object = false;
                        stateObjectsRay.planeHover = false;
                        stateObjectsRay.planeNew = false;
                        stateObjectsRay.editScene = true;
                        stateObjectsRay.editNameScene = false;
                        stateObjectsRay.voidScene = false;
                        stateObjectsRay.deleteScene = false;
                        stateObjectsRay.stateScene = false;
                      }
                  }
                  else if (
                  intersection.object.el &&
                  intersection.object.el.classList.contains('clickable') &&
                  intersection.object.el.id.includes("editNameScene")
                  ){
                    if(!stateObjectsRay.editNameScene ){
                      const imageToEdit = document.querySelectorAll(`[id^=${intersection.object.el.id.split("-")[0]}]`);
                      stateObjectsRay.editNameSceneImage = true;
                      imageToEdit.forEach(item => {  
                        if(!stateObjectsRay.editNameSceneImage){
                          const parentElement = item.closest('a-image');
                          if (parentElement) {
                            parentElement.removeAttribute('src');
                            console.log("SRC eliminado del a-image");
                            parentElement.setAttribute('src', '');
                            setTimeout(()=>{
                              if (item.id === intersection.object.el.id) {
                                parentElement.setAttribute('src', require('@/assets/icon_edit_name_scene_hover.png'));
                              } else {
                                parentElement.setAttribute('src', require('@/assets/icon_edit_name_scene.png'));
                              }
                            },1)
                          } else {
                            console.log("No se encontró el elemento a-image.");
                          }
                          stateObjectsRay.editNameSceneImage = true;
                        }
                        else{
                          if(item.id === intersection.object.el.id){
                            item.setAttribute('src',require('@/assets/icon_edit_name_scene_hover.png'))
                          }
                          else{
                            item.setAttribute('src',require('@/assets/icon_edit_name_scene.png'))
                          }
                        }
                        });
                        vueComponent.stateChangeIcons.editNameScene = parseInt(intersection.object.el.id.split("-")[1],10);
                        document.body.style.cursor = "pointer";
                        stateObjectsRay.object = false;
                        stateObjectsRay.planeHover = false;
                        stateObjectsRay.planeNew = false;
                        stateObjectsRay.editScene = false;
                        stateObjectsRay.editNameScene = true;
                        stateObjectsRay.voidScene = false;
                        stateObjectsRay.deleteScene = false;
                        stateObjectsRay.stateScene = false;
                    }
                  }
                  else if (
                  intersection.object.el &&
                  intersection.object.el.classList.contains('clickable') &&
                  intersection.object.el.id.includes("voidScene")
                  ){
                    if(!stateObjectsRay.voidScene){
                      const imageToEdit = document.querySelectorAll(`[id^=${intersection.object.el.id.split("-")[0]}]`);
                      stateObjectsRay.voidSceneImage = true;
                      imageToEdit.forEach(item => {  
                        if(!stateObjectsRay.voidSceneImage){
                          const parentElement = item.closest('a-image');
                          if (parentElement) {
                            parentElement.removeAttribute('src');
                            console.log("SRC eliminado del a-image");
                            parentElement.setAttribute('src', '');
                            setTimeout(()=>{
                              if (item.id === intersection.object.el.id) {
                                parentElement.setAttribute('src', require('@/assets/icon_void_scene_hover.png'));
                              } else {
                                parentElement.setAttribute('src', require('@/assets/icon_void_scene.png'));
                              }
                            },1)
                          } else {
                            console.log("No se encontró el elemento a-image.");
                          }
                          stateObjectsRay.voidSceneImage = true;
                        }
                        else{
                          if(item.id === intersection.object.el.id){
                            item.setAttribute('src',require('@/assets/icon_void_scene_hover.png'));
                          }
                          else{
                            item.setAttribute('src',require('@/assets/icon_void_scene.png'));
                          }
                        }
                        });
                      vueComponent.stateChangeIcons.voidScene = parseInt(intersection.object.el.id.split("-")[1],10);
                      document.body.style.cursor = "pointer";
                      stateObjectsRay.object = false;
                      stateObjectsRay.planeHover = false;
                      stateObjectsRay.planeNew = false;
                      stateObjectsRay.editScene = false;
                      stateObjectsRay.editNameScene = false;
                      stateObjectsRay.voidScene = true;
                      stateObjectsRay.deleteScene = false;
                      stateObjectsRay.stateScene = false;
                    }
                  }
                  else if (
                  intersection.object.el &&
                  intersection.object.el.classList.contains('clickable') &&
                  intersection.object.el.id.includes("deleteScene")
                  ){
                      if(!stateObjectsRay.deleteScene){
                        const imageToEdit = document.querySelectorAll(`[id^=${intersection.object.el.id.split("-")[0]}]`);
                        stateObjectsRay.deleteSceneImage = true;
                        imageToEdit.forEach(item => {  
                          if(!stateObjectsRay.deleteSceneImage){
                            const parentElement = item.closest('a-image');
                            if (parentElement) {
                              parentElement.removeAttribute('src');
                              console.log("SRC eliminado del a-image");
                              parentElement.setAttribute('src', '');
                              setTimeout(()=>{
                                if (item.id === intersection.object.el.id) {
                                  parentElement.setAttribute('src', require('@/assets/icon_delete_scene_hover.png'));
                                } else {
                                  parentElement.setAttribute('src', require('@/assets/icon_delete_scene.png'));
                                }
                              },1)
                            } else {
                              console.log("No se encontró el elemento a-image.");
                            }
                            stateObjectsRay.deleteSceneImage = true;
                          }
                          else{
                            if(item.id === intersection.object.el.id){
                              item.setAttribute('src',require('@/assets/icon_delete_scene_hover.png'));
                            }
                            else{
                              item.setAttribute('src',require('@/assets/icon_delete_scene.png'));
                            }
                          }
                          });
                        vueComponent.stateChangeIcons.deleteScene = parseInt(intersection.object.el.id.split("-")[1],10);
                        document.body.style.cursor = "pointer";
                        stateObjectsRay.object = false;
                        stateObjectsRay.planeHover = false;
                        stateObjectsRay.planeNew = false;
                        stateObjectsRay.editScene = false;
                        stateObjectsRay.editNameScene = false;
                        stateObjectsRay.voidScene = false;
                        stateObjectsRay.deleteScene = true;
                        stateObjectsRay.stateScene = false;
                      }
                  }
                  else if (
                  intersection.object.el &&
                  intersection.object.el.classList.contains('clickable') &&
                  intersection.object.el.id.includes("stateScene")
                  ){
                    if(!stateObjectsRay.stateScene){
                      vueComponent.stateChangeIcons.stateScene = parseInt(intersection.object.el.id.split("-")[1],10);
                      document.body.style.cursor = "pointer";
                      stateObjectsRay.object = false;
                      stateObjectsRay.planeHover = false;
                      stateObjectsRay.planeNew = false;
                      stateObjectsRay.editScene = true;
                      stateObjectsRay.editNameScene = false;
                      stateObjectsRay.voidScene = false;
                      stateObjectsRay.deleteScene = false;
                      stateObjectsRay.stateScene = true;
                    }
                  }
                  else if(
                    intersection.object.el &&
                    intersection.object.el.classList.contains('clickable') &&
                    intersection.object.el.id.includes("addInButtonRed-")
                  ){
                    if(!stateObjectsRay.addInButtonRed){
                      vueComponent.stateChangeIcons.addInButtonRed = parseInt(intersection.object.el.id.split("-")[1],10);
                      document.body.style.cursor = "pointer";
                      stateObjectsRay.object = false;
                      stateObjectsRay.planeNew = false;
                      stateObjectsRay.planeHover = false;
                      stateObjectsRay.addInButtonRed = true;
                    }
                  }
                  else if(
                    intersection.object.el &&
                    intersection.object.el.classList.contains('clickable') &&
                    intersection.object.el.id === "planeNew"){
                      if(!stateObjectsRay.planeNew){
                        document.body.style.cursor = "pointer";
                        let planeChangeColor = document.querySelector('#planeNew');
                        planeChangeColor.setAttribute('color',"#328216")
                        stateObjectsRay.planeNew = true;
                        stateObjectsRay.planeHover = false;
                        onMoveCamera = false;
                      }
                    }
                }
              });
            };
            const handleMouseDownBackground = () => {
              if(stateObjectsRay.planeHover){
                document.body.style.cursor = 'grabbing';
                cameraView = document.querySelector('#camera');
                positionCamera = cameraView.getAttribute('position');
                valueXInit = mouse.x;
                valueYInit = mouse.y;
                onMoveCamera = true;
              }
              else if (stateObjectsRay.planeNew && !stateObjectsRay.planeHover) {
                window.removeEventListener('mousedown', handleMouseDownBackground);
                window.removeEventListener('mouseup', handleMouseUpBackground);
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('mousemove', handleMouseMove);
                delete components['mouse-interaction'];
                document.body.style.cursor = 'default';
                vueComponent.enterToAddScene();
              }
              else if (vueComponent.stateChangeIcons.editScene != 0 && !stateObjectsRay.planeHover){
                const esceneToEdit = vueComponent.universitySelected.listEscenes.find(escene => escene.idEscene === vueComponent.stateChangeIcons.editScene);
                window.removeEventListener('mousedown', handleMouseDownBackground);
                window.removeEventListener('mouseup', handleMouseUpBackground);
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('mousemove', handleMouseMove);
                delete components['mouse-interaction'];
                document.body.style.cursor = 'default';
                vueComponent.enterToEditScene(esceneToEdit);
              }
              else if (vueComponent.stateChangeIcons.editNameScene != 0 && !stateObjectsRay.planeHover){
                
                vueComponent.enterEditNameScene();
              }
              else if (vueComponent.stateChangeIcons.voidScene != 0 && !stateObjectsRay.planeHover){
                vueComponent.enterToVoidScene();
              }
              else if (vueComponent.stateChangeIcons.deleteScene != 0 && !stateObjectsRay.planeHover){
                vueComponent.enterToDeleteScene();
              }
              else if (vueComponent.stateChangeIcons.stateScene != 0 && !stateObjectsRay.planeHover){
                vueComponent.enterToStateScene();
              }
              else if( vueComponent.stateChangeIcons.addInButtonRed != 0){
                vueComponent.enterToAddScene();
                onMoveCamera = false;
              }
              else if(vueComponent.onChangeScene && vueComponent.changeSceneState === 0 && vueComponent.stateChangeIcons.changeScene != 0){
                vueComponent.onChangeFirstScene();
              }
              else if(vueComponent.onChangeScene && vueComponent.changeSceneState === 1 && vueComponent.stateChangeIcons.changeScene != 0){
                vueComponent.onChangeSecondScene();
              }
            
            };
            window.addEventListener('wheel', handleWheel);
        
            window.addEventListener('mousemove',handleMouseMove);
          }
        });
      },
      cleanUpEntity() {
        const entityRefs = Object.keys(this.$refs).filter(ref => ref.startsWith('entityRef-'));
        entityRefs.forEach(ref => {
          const entity = this.$refs[ref];
          if (!entity || !entity.object3D) return;
    
          entity.object3D.traverse((child) => {
            if (child.isMesh) {
              // Limpieza de materiales
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach((mat) => this.disposeMaterial(mat));
                } else {
                  this.disposeMaterial(child.material);
                }
              }
    
              // Limpieza de geometrías
              if (child.geometry) {
                this.disposeGeometry(child.geometry);
              }
            }
          });
    
          // Eliminar la entidad del DOM
          if (entity.parentNode) {
            entity.parentNode.removeChild(entity);
            console.log(`Entidad con ref: ${ref} eliminada correctamente`);
          }
        });
      },
    
      disposeMaterial(material) {
        if (!material) return;
        if (material.map && material.map.dispose) {
          material.map.dispose();
          console.log('Textura eliminada');
        }
        if (material.dispose) {
          material.dispose();
          console.log('Material eliminado');
        }
      },
    
      disposeGeometry(geometry) {
        if (geometry && geometry.dispose) {
          geometry.dispose();
          console.log('Geometría eliminada');
        }
      }
      
    },
    mounted() {
      const vueComponent = this;
      if (vueComponent) {
        if(!components['mouse-interaction']){
          try {
            this.$nextTick(() => {
              this.registerComponentMouseInteraction(vueComponent);
            });
          } catch (error) {
            console.log(error);
          }
          
        }
      }
    },
    watch: {
      universitySelected(){
        
      }
    },
    computed: {
      filteredButtons() {
        return (scene) => scene.listButtonRed;
      }
    },
  };
  