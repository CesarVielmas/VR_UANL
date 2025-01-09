import LoadingApart from "../LoadingApartComponent/LoadingApart.vue";

export default {
    name: 'LoaderControlPanel',
    components: {
        LoadingApart
    },
    props: {
        methodExitOn: {
          type: Function, 
          required: true
        }
      },
    data() {
      return {
        completeInformation:false,
        completeInformationLoading:false,
        onOpacityAll:false,
        backgroundColor:'',
        dominantColor:''
      };
    },
    created() {
     setTimeout(()=>{
        this.completeInformationLoading = true
     },(Math.floor(Math.random() * (30 - 10 + 1)) + 10)*1000)
    },
    methods: {
        loadingReady(){
            this.completeInformation = true;
            this.getDominantColor(); 
            setTimeout(()=>{
                this.onOpacityAll = true;
                setTimeout(()=>{
                    this.methodExitOn();
                },2000)
            },5000)
        },
        getDominantColor() {
            const image = new Image(); 
            image.src = require('@/assets/example_university_card_image.png'); 
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
          }
    },
    mounted() {
      
    },
    watch: {
        completeInformation(){

        },
        dominantColor(){
            this.backgroundColor = this.getTone(this.dominantColor,85,60);
        }
    },
    computed: {
      
    },
  };
  