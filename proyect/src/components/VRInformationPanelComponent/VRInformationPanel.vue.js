import { THREE } from "aframe";

export default {
  name: 'VRInformationPanel',
  props:{
    scale: {
        type: String, 
        required: true 
    },
    position:{
        type:String,
        required:true
    },
    rotation:{
        type:String,
        required:true
    },
    methodClick:{
        type:Function,
        required:true
    },
    typeColorOpen:{
        type:String,
        required:true
    },
    typeColorClose:{
        type:String,
        required:true
    },
    textInformation:{
        type:String,
        required:true
    },
    imageOptional:{
        type:String,
        required:false
    }
  },
  data() {
    return {
        isPanelOpen:false,
        scaleEntityPanelOpen:'',
        panelPosition: "0 0 0", 
        panelRotation: "0 0 0" 
      };
  },
  created(){
    let arrayScale = []
    this.scale.split(" ").map(Number).forEach((value) => {
        arrayScale.push((value * 0.07).toString())
    });
    this.scaleEntityPanelOpen = arrayScale.join(" ")
    console.log(this.scaleEntityPanelOpen);
  },
  methods:{
    loadModelButtonInformation(){
        if (this.isPanelOpen) {
            const modelRef = this.$refs.PanelOpen;
            if (modelRef) {
              const model = modelRef.getObject3D('mesh');
              if (model) {
                model.traverse((node) => {
                  if (node.isMesh) {
                    // Cambiar el color del modelo
                    node.material.color.set(this.typeColorClose);
                  }
                });
              }
            }
        } else {
            const modelRef = this.$refs.PanelClose;
            if (modelRef) {
              const model = modelRef.getObject3D('mesh');
              if (model) {
                model.traverse((node) => {
                  if (node.isMesh) {
                    // Cambiar el color del modelo
                    node.material.color.set(this.typeColorOpen);
                  }
                });
              }
            }
        }
    },
    openPanel() {
      if(this.imageOptional != null && this.imageOptional != '' && this.textInformation != null && this.textInformation != ''){
        const panelCloseEntity = this.$refs.PanelClose?.object3D;
        if (panelCloseEntity) {
          const worldPosition = new THREE.Vector3();
          const worldQuaternion = new THREE.Quaternion();
          panelCloseEntity.getWorldPosition(worldPosition);
          panelCloseEntity.getWorldQuaternion(worldQuaternion);
          this.panelPosition = `${worldPosition.x} ${worldPosition.y} ${worldPosition.z}`;
          const euler = new THREE.Euler().setFromQuaternion(worldQuaternion);
          this.panelRotation = `${THREE.MathUtils.radToDeg(euler.x)} ${THREE.MathUtils.radToDeg(euler.y)} ${THREE.MathUtils.radToDeg(euler.z)}`;
        } else {
          console.error('No se pudo abrir el panel: entidad o cámara no encontrada.');
        }
        this.isPanelOpen = true;
      }
    },
    closePanel(){
        this.isPanelOpen = false
    }
  }
};
