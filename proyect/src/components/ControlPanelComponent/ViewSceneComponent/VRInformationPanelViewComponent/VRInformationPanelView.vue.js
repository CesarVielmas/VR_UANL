import { THREE } from "aframe";

export default {
  name: 'VRInformationPanelView',
  props:{
    id:{
      type:Number,
      required:true
    },
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
    methodClickPropertys:{
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
        required:false
    },
    imageOptional:{
        type:String,
        required:false
    },
    elementSend:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
        isPanelOpen:false,
        scaleEntityPanelOpen:'',
        panelPosition: "0 0 0", 
        panelRotation: "0 0 0" ,
        lastClickTime: 0,
        lastTouchTime: 0,
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
    loadModelButtonInformation() {
      const refPrefix = this.isPanelOpen ? 'PanelOpen' : 'PanelClose';
      const dynamicRef = `${refPrefix}-${this.id}`;
      const modelRef = this.$refs[dynamicRef];
      if (modelRef) {
          const model = modelRef.getObject3D('mesh');
          if (model) {
              const targetColor = this.isPanelOpen ? this.typeColorOpen : this.typeColorClose;
              
              model.traverse((node) => {
                  if (node.isMesh) {
                      node.material.color.set(targetColor);
                      node.material.needsUpdate = true;
                  }
              });
          }
      }
    },
    onHandlerClick(){
        const now = Date.now();
        if (now - this.lastClickTime < 300) {
            this.openPanel();
            this.lastClickTime = 0;
        } else {
            this.methodClickPropertys(this.elementSend,false);
            this.lastClickTime = now;
        }
    },
    openPanel() {
        if(this.imageOptional && this.textInformation) {
          const dynamicRef = `PanelClose-${this.id}`;
          const panelCloseRef = this.$refs[dynamicRef];
          
          if (panelCloseRef) {
              const panelCloseEntity = panelCloseRef.object3D;
              const worldPosition = new THREE.Vector3();
              const worldQuaternion = new THREE.Quaternion();
              
              panelCloseEntity.getWorldPosition(worldPosition);
              panelCloseEntity.getWorldQuaternion(worldQuaternion);
              
              this.panelPosition = `${worldPosition.x} ${worldPosition.y} ${worldPosition.z}`;
              
              const euler = new THREE.Euler().setFromQuaternion(worldQuaternion);
              if(this.rotation.split(" ")[1] === "-180")
                this.panelRotation = 
                  `${THREE.MathUtils.radToDeg(euler.x)} 
                   ${THREE.MathUtils.radToDeg(euler.y)-10} 
                   ${THREE.MathUtils.radToDeg(euler.z)-2}`;
              else
                this.panelRotation = 
                    `${THREE.MathUtils.radToDeg(euler.x)} 
                    ${THREE.MathUtils.radToDeg(euler.y)} 
                    ${THREE.MathUtils.radToDeg(euler.z)}`;
              
              this.isPanelOpen = true;
          }
        }
    },
    closePanel(){
        this.isPanelOpen = false
    },
    toggleBlink(shouldBlink) {
      this.$nextTick(() => {
          const refPrefix = this.isPanelOpen ? 'PanelOpen' : 'PanelClose';
          const dynamicRef = `${refPrefix}-${this.id}`;
          const modelRef = this.$refs[dynamicRef];
          
          if (modelRef) {
              const model = modelRef.getObject3D('mesh');
              if (model) {
                  model.traverse(node => {
                      if (node.isMesh && node.material) {
                          // Alternar opacidad en lugar de establecerla estáticamente
                          node.material.opacity = shouldBlink ? 
                              (node.material.opacity === 1 ? 0 : 1) : 1; // <--- ¡Cambio clave!
                          
                          node.material.transparent = true;
                          node.material.needsUpdate = true;
                          
                          // Debug
                          
                      }
                  });
              }
          }
      });
    },
    
  },
  watch:{
    isPanelOpen() {
      this.$nextTick(() => {
          this.loadModelButtonInformation();
          this.toggleBlink(this.$parent.blinkInterval !== null);
          console.log(this.panelPosition);
      });
    },
    scale(){
        let arrayScale = []
        this.scale.split(" ").map(Number).forEach((value) => {
            arrayScale.push((value * 0.07).toString())
        });
        this.scaleEntityPanelOpen = arrayScale.join(" ");
    }
  }
};
