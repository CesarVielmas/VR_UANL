import HeaderViewScenes from "./HeaderViewScenesComponent/HeaderViewScenes.vue";
import { registerComponent,components } from "aframe";
import { THREE } from "aframe";
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
        }
    },
    data() {
      return {
          enterToAddSceneBool:false,
          isOnButtonRed:0,
          deleteVoidScene:false,
          stateVoidDelete:0,
          isVoidDelete:0,
          isEditNameScene:0,
          newNameScene:'',
          stateChangeIcons:{ editScene: 0, editNameScene:0, voidScene:0, deleteScene:0, stateScene:0,addInButtonRed:0},
          positionsScenes:{ idScene:0, position:"0 0 0" },

      };
    },
    created() {
        console.log(this.universitySelected.listEscenes);
    },
    beforeDestroy() {
      this.cleanUpEntity();
    },
    methods: {
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
          console.log("Entro para anadir una escena dentro de un button redirect")
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
        console.log(zoomInElement.getAttribute('position'));
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
                  escene.listButtonRed.forEach(buttonRed => {
                    if (buttonRed.pageToSender && buttonRed.pageToSender.idEscene === this.isVoidDelete) {
                      buttonRed.pageToSender = {};
                    }
                  });
                });
                this.$nextTick(() => {
                  this.$emit('update:universitySelected', this.universitySelected);
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
          const lastId = this.universitySelected.listEscenes.length > 0 ? Math.max(...this.universitySelected.listEscenes.map(scene => scene.idEscene)) : 0;
          const newScene = {
            idEscene: lastId + 1,
            nameScene: this.newNameScene,
            imageScene: "",
            listButtonInfo: [],
            listButtonRed: []
          };
          this.universitySelected.listEscenes.push(newScene);
          let buttonRed = this.universitySelected.listEscenes
            .flatMap(scene => scene.listButtonRed)
            .find(button => button.idButtonRedirect === this.isOnButtonRed);
          if (buttonRed) {
            buttonRed.pageToSender = newScene;
          }
          this.$emit('update:universitySelected', this.universitySelected);
          this.enterToAddSceneBool = false;
        } 
        else {
          const newScene = {
            idEscene: 1,
            nameScene: this.newNameScene,
            imageScene: "",
            listButtonInfo: [],
            listButtonRed: []
          };
          this.universitySelected.listEscenes.push(newScene);
          this.enterToAddSceneBool = false;
          setTimeout(()=>{
            this.enterToEditScene(newScene);
          },500)
        }
      },
      cancelToAddScene(){
        this.enterToAddSceneBool = false;
      },
      onEsceneLoaded(escene){
        if(escene.listButtonRed.length != 0){
          escene.listButtonRed.forEach(buttonRed => {
              if(buttonRed.pageToSender && Object.keys(buttonRed.pageToSender).length > 0) {
                const esceneId = document.querySelector(`#object-scene-${escene.idEscene}`);
                const positions = esceneId.getAttribute("position");
                let positionNew = { ...positions }; 
                switch (buttonRed.horientationButton) {
                  case "Left":
                  positionNew.x -= 0.75;
                  break;
                  case "Right":
                  positionNew.x += 0.75;
                  break;
                  case "Center":
                  positionNew.z -= 0.75;
                  break;
                  case "Behind":
                  positionNew.z += 0.75;
                  break;
                }
                this.positionsScenes = {
                  idScene: buttonRed.pageToSender.idEscene,
                  position: positionNew
                };
              } 
          });
        }
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
                vueComponent.enterToAddScene();
              }
              else if (vueComponent.stateChangeIcons.editScene != 0 && !stateObjectsRay.planeHover){
                const esceneToEdit = vueComponent.universitySelected.listEscenes.find(escene => escene.idEscene === vueComponent.stateChangeIcons.editScene);
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
            };
        
            const handleMouseUpBackground = () => {
              document.body.style.cursor = 'grab';
              onMoveCamera = false;
            };
        
            window.addEventListener('wheel', (event) => {
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
            });
        
            window.addEventListener('mousemove', (event) => {
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
                      document.body.style.cursor = "default";
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
            });
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
      
    },
  };
  