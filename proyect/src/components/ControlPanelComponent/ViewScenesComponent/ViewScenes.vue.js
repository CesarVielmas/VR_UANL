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
          newNameScene:'',
          stateChangeIcons:{ editScene: 0, editNameScene:0, voidScene:0, deleteScene:0, stateScene:0}
      };
    },
    created() {
        console.log(this.universitySelected.listEscenes);
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
        this.enterToAddSceneBool = true;
      },
      enterToEditScene(){
        console.log("Entro para editar la escena")
      },
      enterEditNameScene(){
        console.log("Entro para editar el nombre de la escena")
      },
      enterToVoidScene(){
        console.log("Entro para vaciar la escena")
      },
      enterToDeleteScene(){
        console.log("Entro para eliminar la escena")
      },
      enterToStateScene(){
        console.log("Entro para el estado")
        
      },
      enterToSceneToEdit(){
        console.log("Aqui hara le procedimiento para editar la escena dentro:"+this.newNameScene);
        this.enterToAddSceneBool = false;
      },
      cancelToAddScene(){
        this.enterToAddSceneBool = false;
      },
      onEsceneLoaded(index){
        console.log("Universidad cargada: "+index)
      }
    },
    mounted() {
      const vueComponent = this;
      if (vueComponent) {
        if(!components['mouse-interaction']){
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
              let stateObjectsRay = { plane: false, planeHover:false,object: false, planeNew:false, editScene:false, editNameScene:false,voidScene:false,deleteScene:false,stateScene:false};
          
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
                  vueComponent.enterToEditScene();
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
                      if(stateObjectsRay.editScene){
                        vueComponent.stateChangeIcons.editScene = 0;
                        stateObjectsRay.editScene = false;
                      }
                      if(stateObjectsRay.editNameScene){
                        vueComponent.stateChangeIcons.editNameScene = 0;
                        stateObjectsRay.editNameScene = false;
                      }
                      if(stateObjectsRay.voidScene){
                        vueComponent.stateChangeIcons.voidScene = 0;
                        stateObjectsRay.voidScene = false;
                      }
                      if(stateObjectsRay.deleteScene){
                        vueComponent.stateChangeIcons.deleteScene = 0;
                        stateObjectsRay.deleteScene = false;
                      }
                      if(stateObjectsRay.stateScene){
                        vueComponent.stateChangeIcons.stateScene = 0;
                        stateObjectsRay.stateScene = false;
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
                        if(stateObjectsRay.editScene){
                          vueComponent.stateChangeIcons.editScene = 0;
                          stateObjectsRay.editScene = false;
                        }
                        if(stateObjectsRay.editNameScene){
                          vueComponent.stateChangeIcons.editNameScene = 0;
                          stateObjectsRay.editNameScene = false;
                        }
                        if(stateObjectsRay.voidScene){
                          vueComponent.stateChangeIcons.voidScene = 0;
                          stateObjectsRay.voidScene = false;
                        }
                        if(stateObjectsRay.deleteScene){
                          vueComponent.stateChangeIcons.deleteScene = 0;
                          stateObjectsRay.deleteScene = false;
                        }
                        if(stateObjectsRay.stateScene){
                          vueComponent.stateChangeIcons.stateScene = 0;
                          stateObjectsRay.stateScene = false;
                        }
                      }
                    }
                    else if (
                    intersection.object.el &&
                    intersection.object.el.classList.contains('clickable') &&
                    intersection.object.el.id.includes("editScene")
                    ){
                        if(!stateObjectsRay.editScene){
                          vueComponent.stateChangeIcons.editScene = intersection.object.el.id.split("-")[1];
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
                      if(!stateObjectsRay.editNameScene){
                          vueComponent.stateChangeIcons.editNameScene = intersection.object.el.id.split("-")[1];
                          document.body.style.cursor = "pointer";
                          stateObjectsRay.object = false;
                          stateObjectsRay.planeHover = false;
                          stateObjectsRay.planeNew = false;
                          stateObjectsRay.editScene = true;
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
                        vueComponent.stateChangeIcons.voidScene = intersection.object.el.id.split("-")[1];
                        document.body.style.cursor = "pointer";
                        stateObjectsRay.object = false;
                        stateObjectsRay.planeHover = false;
                        stateObjectsRay.planeNew = false;
                        stateObjectsRay.editScene = true;
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
                          vueComponent.stateChangeIcons.deleteScene = intersection.object.el.id.split("-")[1];
                          document.body.style.cursor = "pointer";
                          stateObjectsRay.object = false;
                          stateObjectsRay.planeHover = false;
                          stateObjectsRay.planeNew = false;
                          stateObjectsRay.editScene = true;
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
                        vueComponent.stateChangeIcons.stateScene = intersection.object.el.id.split("-")[1];
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
        }
      }
    },
    watch: {
  
    },
    computed: {
      
    },
  };
  