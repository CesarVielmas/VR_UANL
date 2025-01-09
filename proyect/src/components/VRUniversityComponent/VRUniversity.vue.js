
import { registerShader } from 'aframe';
import LoadingApart from '../LoadingApartComponent/LoadingApart.vue';
import VRInformationPanel from '../VRInformationPanelComponent/VRInformationPanel.vue';
registerShader('pixelate', {
  schema: {
    src: {type: 'map', is: 'uniform'},
    pixelSize: {type: 'int', is: 'uniform', default: 8}
  },
  vertexShader: `
    varying vec2 vUV;
    void main() {
      vUV = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform sampler2D src;
    uniform int pixelSize;
    varying vec2 vUV;
    void main() {
      vec2 uv = vUV;
      float dx = float(pixelSize) * (1.0 / 1024.0);
      float dy = float(pixelSize) * (1.0 / 1024.0);
      vec2 coord = vec2(dx * floor(uv.x / dx), dy * floor(uv.y / dy));
      gl_FragColor = texture2D(src, coord);
    }
  `
});
export default {
  name: 'VRUniversity',
  components: {
    LoadingApart,
    VRInformationPanel
  },
  props: ['facultyAbbreviation'],
  data() {
    return {
      allDataScenes:[],
      allScenes:[],
      actualScene:{},
      deviceType:"",
      dominantColor:"",
      imageLoader:"",
      backgroundColorLoader:"rgb(24, 24, 145)",
      completeInformation:false,
      completeInformationLoading:false,
      opacityLoading:false,
      changeSceneBool:false,
      changeEnd:false,

    };
  },
  async created() {
    this.allDataScenes = this.$store.state.allDataScenes;
    this.deviceType = await this.detectDevice()
    console.log(this.deviceType)
    if(this.allDataScenes.length === 0){
      this.initializeDataEscene();
    }
    else{
      if(Object.keys(this.actualScene).length === 0 ){
        let logoFaculty = this.allDataScenes[0].find(university => university.NameFaculty === this.facultyAbbreviation).LogoFaculty
        this.getDominantColor(logoFaculty);
        const scenes = this.allDataScenes[1].filter(scene => scene.NamePositionScene.startsWith(`VR_${this.facultyAbbreviation}`)); 
        this.allScenes = scenes.map(scene => {
        const updatedRedirectButtons = scene.ListButtonsRedirect.map(id => 
            this.allDataScenes[2].find(button => button.Id === id)
        );
        const updatedInformationButtons = scene.ListButtonsInformation.map(id => 
          this.allDataScenes[3].find(button => button.Id === id)
        );
        return {
            ...scene,
            ListButtonsRedirect: updatedRedirectButtons,
            ListButtonsInformation: updatedInformationButtons
        };
        });
      
        this.actualScene = this.allScenes.filter(scene=> scene.NamePositionScene == `VR_${this.facultyAbbreviation}_1`)[0];
      }
    }
  },
  methods: {
    getDominantColor(imageLogo) {
      const image = new Image(); 
      image.src = imageLogo;
      image.onload = () => {
        this.extractColor(image);
      };

      image.onerror = (error) => {
        console.error('Error al cargar la imagen', error);
      };
    },
    extractColor(image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const pixels = imageData.data;
      let colorCounts = {};
    
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3]; 
        if (a === 0) continue;
        const hex = this.rgbToHex(r, g, b);
        if (hex !== '#ffffff') {
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }
      }
      let dominantColor = '';
      let maxCount = 0;
      for (const [color, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count;
          dominantColor = color;
        }
      }
    
      if (dominantColor === '') {
        this.dominantColor = null;  
      } else {
        this.dominantColor = dominantColor;  
      }
    },
    rgbToHex(r, g, b) {
      // Convertimos los valores RGB a hexadecimal
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    },
    hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    },
    getTone(hexColor,saturation,luminisation) {
      let { r, g, b } = this.hexToRgb(hexColor);
      let { h, s, l } = this.rgbToHsl(r,g,b);
      s = saturation/100;
      l = luminisation/100;
      let objColorsNew = this.hslToRgb(h,s,l);
      return this.rgbToHex(Math.round(objColorsNew.r), Math.round(objColorsNew.g), Math.round(objColorsNew.b));
    },
    rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
    
      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
    
      if (max === min) {
        h = s = 0; // Sin saturación si todos los colores son iguales
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
    
      return { h: h * 360, s, l };
    },
    hslToRgb(h, s, l) {
      let r, g, b;
      h /= 360; // Convertimos h de grados a 0-1
    
      s = Math.max(0, Math.min(1, s));
      l = Math.max(0, Math.min(1, l));
    
      if (s === 0) {
        r = g = b = l; // Gris
      } else {
        let temp2 = l < 0.5 ? l * (1 + s) : (l + s) - (l * s);
        let temp1 = 2 * l - temp2;
        r = this.hueToRgb(temp1, temp2, h + 1 / 3);
        g = this.hueToRgb(temp1, temp2, h);
        b = this.hueToRgb(temp1, temp2, h - 1 / 3);
      }
    
      return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    },
    hueToRgb(temp1, temp2, h) {
      if (h < 0) h += 1;
      if (h > 1) h -= 1;
    
      if (h < 1 / 6) return temp1 + (temp2 - temp1) * 6 * h;
      if (h < 1 / 2) return temp2;
      if (h < 2 / 3) return temp1 + (temp2 - temp1) * (2 / 3 - h) * 6;
    
      return temp1;
    },
    initializeDataEscene() {
      setTimeout(()=>{
        const dataUniversitys = [ {
          Id:0,
          NameFaculty: "FIME",
          NameCompleteFaculty: "Facultad de Ingeniería Mecánica y Eléctrica",
          LogoFaculty: require('@/assets/example_university_card_image.png'),
          ImageFaculty: require('@/assets/example_university_card.jpg'),
        },
        {
          Id:1,
          NameFaculty: "FCFM",
          NameCompleteFaculty: "Facultad de Ciencias Físico Matemáticas",
          LogoFaculty: require('@/assets/example_university_card_image_2.png'),
          ImageFaculty: require('@/assets/example_university_card_2.jpg'),
        },
        {
          Id:2,
          NameFaculty: "FACDYC",
          NameCompleteFaculty: "Facultad de Derecho y Criminología",
          LogoFaculty: require('@/assets/example_university_card_image_3.png'),
          ImageFaculty: require('@/assets/example_university_card_3.jpg'),
        },
        {
          Id:3,
          NameFaculty: "FACPYA",
          NameCompleteFaculty: "Facultad de Contaduría Pública y Administración",
          LogoFaculty: require('@/assets/example_university_card_image_4.png'),
          ImageFaculty: require('@/assets/example_university_card_4.jpg'),
        },
        {
          Id:4,
          NameFaculty: "FARQ",
          NameCompleteFaculty: "Facultad de Arquitectura",
          LogoFaculty: require('@/assets/example_university_card_image_5.png'),
          ImageFaculty: require('@/assets/example_university_card_5.jpg'),
        },
        {
          Id:5,
          NameFaculty: "FIC",
          NameCompleteFaculty: "Facultad de Ingeniería Civil",
          LogoFaculty: require('@/assets/example_university_card_image_6.png'),
          ImageFaculty: require('@/assets/example_university_card_6.jpg'),
        },
        {
          Id:6,
          NameFaculty: "FOD",
          NameCompleteFaculty: "Facultad de Odontología",
          LogoFaculty: require('@/assets/example_university_card_image_7.png'),
          ImageFaculty: require('@/assets/example_university_card_7.jpg'),
        },
        {
          Id:7,
          NameFaculty: "FAPSI",
          NameCompleteFaculty: "Facultad de Psicología",
          LogoFaculty: require('@/assets/example_university_card_image_8.png'),
          ImageFaculty: require('@/assets/example_university_card_8.jpg'),
        },
        {
          Id:8,
          NameFaculty: "FCPyRI",
          NameCompleteFaculty: "Facultad de Ciencias Políticas y Relaciones Internacionales",
          LogoFaculty: require('@/assets/example_university_card_image_9.png'),
          ImageFaculty: require('@/assets/example_university_card_9.jpg'),
        },
        {
          Id:9,
          NameFaculty: "FACSA",
          NameCompleteFaculty: "Facultad de Ciencias de la Salud",
          LogoFaculty: require('@/assets/example_university_card_image_10.png'),
          ImageFaculty: require('@/assets/example_university_card_10.jpg'),
        }]
        const dataScenes = [{
            Id:0,
            NamePositionScene:"VR_FIME_1",
            NameScene:"Pasillo Principal",
            ImageScene:require('@/assets/example_hallway.jpg'),
            ListButtonsRedirect:[0,1,2],
            ListButtonsInformation:[0,1,2]
        },{
            Id:1,
            NamePositionScene:"VR_FIME_2",
            NameScene:"Oficina",
            ImageScene:require('@/assets/example_office.jpg'),
            ListButtonsRedirect:[3,4,5],
            ListButtonsInformation:[3,4,5]
        }]
        //scale="largo , alto , ancho" 
        //position="tomar automaticamente dependiendo de donde lo quiera" 
        //rotation="rotacion hacia un lado,rotacion hacia los lados,rotacion hacia las puntas"
        const dataButtonsRedirect = [{
          Id: 0,
          ButtonLarge: 0.430,
          ButtonHigh: 0.480,
          ButtonWidth: 0.340,
          PositionX: -2.880,
          PositionY: 0.820,
          PositionZ: -1.170,
          RotationSideY: 0,
          RotationSideX: 190,
          RotationSideZ: 0,
          HorientationButton:"Left",
          PageToSender:"VR_FIME_2"
        },
        {
          Id: 1,
          ButtonLarge: 0.620,
          ButtonHigh: 0.600,
          ButtonWidth: 0.340,
          PositionX: 4,
          PositionY: 1.340,
          PositionZ: 0.800,
          RotationSideY: 0,
          RotationSideX: 0,
          RotationSideZ: 5,
          HorientationButton:"Right",
          PageToSender:"VR_FIME_2"
        },
        {
          Id: 2,
          ButtonLarge: 0.360,
          ButtonHigh: 0.340,
          ButtonWidth: 0.2,
          PositionX: -0.010,
          PositionY: 0.940,
          PositionZ: 3,
          RotationSideY: 0,
          RotationSideX: -90.000,
          RotationSideZ: 5,
          HorientationButton:"Behind",
          PageToSender:"VR_FIME_2"
        },
        {
          Id: 3,
          ButtonLarge: 0.3,
          ButtonHigh: 0.2,
          ButtonWidth: 0.3,
          PositionX: 0.5,
          PositionY: 1.0,
          PositionZ: -2.0,
          RotationSideY: -15,
          RotationSideX: 95,
          RotationSideZ: 20,
          HorientationButton:"Behind",
          PageToSender:"VR_FIME_1"
        },
        {
          Id: 4,
          ButtonLarge: 0.25,
          ButtonHigh: 0.18,
          ButtonWidth: 0.22,
          PositionX: -0.5,
          PositionY: 1.4,
          PositionZ: -1.0,
          RotationSideY: 45,
          RotationSideX: 70,
          RotationSideZ: 0,
          HorientationButton:"Left",
          PageToSender:"VR_FIME_1"
        },
        {
          Id: 5,
          ButtonLarge: 0.5,
          ButtonHigh: 0.3,
          ButtonWidth: 0.4,
          PositionX: 0,
          PositionY: 1.5,
          PositionZ: -2.5,
          RotationSideY: 0,
          RotationSideX: 90,
          RotationSideZ: 45,
          HorientationButton:"Right",
          PageToSender:"NONE"
        },]
        const dataButtonsInformation = [
          {
            Id: 0,
            ButtonLarge: 0.1,
            ButtonHigh: 0.1,
            ButtonWidth: 0.1,
            PositionX: 0,
            PositionY: 1.5,
            PositionZ: -1.7,
            RotationSideY: 0,
            RotationSideX: -90,
            RotationSideZ: 0,
            OptionalImage: require('@/assets/example_university_card.jpg'),
            TextInformation: "Este es un texto de información para el botón de información 1."
          },
          {
            Id: 1,
            ButtonLarge: 0.1,
            ButtonHigh: 0.1,
            ButtonWidth: 0.1,
            PositionX: 1.8,
            PositionY: 1.5,
            PositionZ: 1,
            RotationSideY: 90,
            RotationSideX: 0,
            RotationSideZ: 0,
            OptionalImage: require('@/assets/example_university_card_2.jpg'),
            TextInformation: "Este es un texto de información para el botón de información 2."
          },
          {
            Id: 2,
            ButtonLarge: 0.1,
            ButtonHigh: 0.1,
            ButtonWidth: 0.1,
            PositionX: 2,
            PositionY: 2,
            PositionZ: 2,
            RotationSideY: 0,
            RotationSideX: -90,
            RotationSideZ: 0,
            OptionalImage: require('@/assets/example_university_card_3.jpg'),
            TextInformation: "Este es un texto de información para el botón de información 3."
          },
          {
            Id: 3,
            ButtonLarge: 0.3,
            ButtonHigh: 0.2,
            ButtonWidth: 0.2,
            PositionX: 0.5,
            PositionY: 1.4,
            PositionZ: -1.6,
            RotationSideY: 30,
            RotationSideX: 90,
            RotationSideZ: 0,
            OptionalImage: require('@/assets/example_university_card_4.jpg'),
            TextInformation: "Este es un texto de información para el botón de información 4."
          },
          {
            Id: 4,
            ButtonLarge: 0.35,
            ButtonHigh: 0.25,
            ButtonWidth: 0.25,
            PositionX: -0.5,
            PositionY: 1.5,
            PositionZ: -1.4,
            RotationSideY: -30,
            RotationSideX: 90,
            RotationSideZ: 0,
            OptionalImage: require('@/assets/example_university_card_5.jpg'),
            TextInformation: "Este es un texto de información para el botón de información 5."
          },
          {
            Id: 5,
            ButtonLarge: 0.35,
            ButtonHigh: 0.25,
            ButtonWidth: 0.25,
            PositionX: 0.5,
            PositionY: 1.6,
            PositionZ: -1.7,
            RotationSideY: 45,
            RotationSideX: 90,
            RotationSideZ: 0,
            OptionalImage: require('@/assets/example_university_card_6.jpg'),
            TextInformation: "Este es un texto de información para el botón de información 6."
          }
        ];        
        this.$store.commit('setAllDataScenes', [dataUniversitys,dataScenes,dataButtonsRedirect,dataButtonsInformation]);
        this.completeInformationLoading = true
        setTimeout(() => {
          let university = this.$store.state.allDataScenes[0].find(university => university.NameFaculty === this.facultyAbbreviation);
          if (!university || !university.LogoFaculty) {
              this.$router.push({
              name: 'NotFound',
              params: { itemFound: 'VR' },
            });
          } 
          else {
            this.imageLoader = university.LogoFaculty
            this.getDominantColor(university.LogoFaculty);
            setTimeout(() => {
              this.opacityLoading = true
              setTimeout(() => {
                this.changeEnd = true
                setTimeout(() => {
                  this.allDataScenes = this.$store.state.allDataScenes;
                  const scenes = this.allDataScenes[1].filter(scene => scene.NamePositionScene.startsWith(`VR_${this.facultyAbbreviation}`)); 
                  this.allScenes = scenes.map(scene => {
                      const updatedRedirectButtons = scene.ListButtonsRedirect.map(id => 
                        this.allDataScenes[2].find(button => button.Id === id)
                      );
                      const updatedInformationButtons = scene.ListButtonsInformation.map(id => 
                        this.allDataScenes[3].find(button => button.Id === id)
                      );
                      return {
                        ...scene,
                        ListButtonsRedirect: updatedRedirectButtons,
                        ListButtonsInformation: updatedInformationButtons
                      };
                  });
                  this.actualScene = this.allScenes.filter(scene=> scene.NamePositionScene == `VR_${this.facultyAbbreviation}_1`)[0];
                }, 1500);
              }, 2000);
            }, 3000);
          }
        }, 1000);
      },3000)
    },
    loadingReady(){
      this.completeInformation = true
    },
    loadModelsButtonsRedirect(index) {
      if(index === this.actualScene.ListButtonsRedirect.length-1){
        Object.keys(this.$refs).forEach(refKey => {
          if (refKey.startsWith('arrowModel-')) {
            const modelRef = this.$refs[refKey][0];
            const model = modelRef.getObject3D('mesh');
            if (model) {
              model.traverse((node) => {
                if (node.isMesh) {
                  node.material.color.set(this.backgroundColorLoader);
                }
              });
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
    changeScene(buttonRedirect) {
      this.counterEnterAnimation += 1
      let newScene = this.allScenes.find(scene => scene.NamePositionScene === buttonRedirect.PageToSender) || {};
      if (Object.keys(newScene).length > 0) {
        let mainCamera = document.getElementById('mainCamera');
        const skyElement = document.getElementById('skyElement');
        
        if (mainCamera && skyElement) {
          mainCamera.removeAttribute('animation__zoom'); 
          mainCamera.removeAttribute('animation');
          mainCamera.setAttribute(
            'animation__zoom',
            `property: position; to: ${buttonRedirect.PositionX} ${buttonRedirect.PositionY + 0.2} ${buttonRedirect.PositionZ}; dur: 1500; easing: easeInOutQuad; startEvents: zoomIn`
          );
          mainCamera.emit('zoomIn');
          skyElement.setAttribute('material', `shader: pixelate; src: ${skyElement.getAttribute('src')}`);
          skyElement.emit('pixelate');
          setTimeout(() => {
            this.changeSceneBool = true;
            
            setTimeout(() => {
              this.actualScene = newScene;
              this.changeSceneBool = false;
    
              setTimeout(() => {
                // Configura la rotación de la cámara
                let rotation;
                switch (buttonRedirect.HorientationButton) {
                  case 'Left':
                    rotation = '0 90 0';
                    break;
                  case 'Right':
                    rotation = '0 -90 0';
                    break;
                  case 'Behind':
                    rotation = '0 -180 0';
                    break;
                  case 'Center':
                  default:
                    rotation = '0 0 0';
                    break;
                }

                const cameraRig = document.getElementById('cameraRig');
                console.log(cameraRig.getAttribute('position'))
                if (cameraRig) {
                  cameraRig.setAttribute('rotation', rotation);
                }
              }, 10);
            }, 10);
          }, 1600);
        } else {
          console.error('Main camera or sky element not found');
        }
      } else {
        console.log("Escena no encontrada");
      }
    },
    changeInformation(buttonInformation){
      console.log(buttonInformation)
    },
    async detectDevice() {
      const userAgent = navigator.userAgent;
    
      if (/mobile/i.test(userAgent)) {
        return 'Mobile';
      } else if (/tablet/i.test(userAgent)) {
        return 'Tablet';
      }
    
      if (navigator.xr) {
        const isSupported = await navigator.xr.isSessionSupported('immersive-vr');
        return isSupported ? 'VR' : 'Desktop';
      }
    
      return 'Desktop';
    }    
  },
  mounted() {
    
  },
  watch: {
    dominantColor(){
      this.backgroundColorLoader = this.getTone(this.dominantColor,85,60);
    },
    actualScene(){
     
    }
  },
  computed: {
    
  },
};
