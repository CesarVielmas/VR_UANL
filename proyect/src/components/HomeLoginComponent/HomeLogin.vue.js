import UniversityCard from '../UniversityComponent/UniversityCard.vue';

export default {
  name: 'HomeLogin',
  components: {
    UniversityCard
  },
  data() {
    return {
        componentCreated:false,
        checkSesion:false,
        cardsApper:true,
        isLastElement:false,
        cardsApperAnimation:false,
        addNewVR:false,
        editNewVR:false,
        elementEdit:{},
        statusSesion:0,
        userName:"",
        userPassword:"",
        deviceType:'',
        textBack:"Regresar",
        topButtonsAlign:0,
        textNext:"Siguiente",
        adminLevel:0,
        pageCardsActual:[],
        arrayExampleCards:[],
        addNewNameFaculty: '',
        addNewNameCompleteFaculty: '',
        addNewLogoFaculty: '',
        addNewImageFaculty: '',
        nameFacultyError:false,
        nameCompleteFacultyError:false,
        logoFacultyError:false,
        imageFacultyError:false,
        editNowScene:0,
        dominantColorNewVR:'',
        backgroundNewVR:''
        
    };
  },
  created() {
    setTimeout(()=>{
        this.componentCreated = true
        this.deviceType = this.detectDevice()
        console.log(this.deviceType)
    },2000)
  },
  methods: {
    onClickCheckSesion(){
        this.checkSesion = true;
        setTimeout(()=>{
            if(this.userName === "CesarVielmas" && this.userPassword === "12345678"){
                this.statusSesion = 1;
                setTimeout(()=>{
                    this.checkSesion = false;
                    this.adminLevel = 1;
                    if(this.adminLevel === 2){
                        setTimeout(()=>{
                            this.statusSesion = 3;
                            this.arrayExampleCards =[ {
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
                            this.pageCardsActual = this.arrayExampleCards.slice(0, 6);
                        },1000)
                    }
                    else{
                        this.getDominantColor();
                        setTimeout(()=>{
                            this.statusSesion = 3;
                            this.addNewLogoFaculty = require('@/assets/example_university_card_image.png');
                            this.backgroundNewVR = this.getTone(this.dominantColorNewVR,85,60)
                            this.editNowScene = 1;
                            setTimeout(()=>{
                              this.editNowScene = 2;
                              setTimeout(()=>{
                                this.editNowScene = 3;
                                setTimeout(()=>{
                                  this.editNowScene = 4;
                                  setTimeout(()=>{
                                    this.editNowScene = 5;
                                  },2000)
                                },4000)
                              },2000)
                            },3000)
                        },1000)
                    }
                },5000)
            }
            else{
                this.statusSesion = 2
                setTimeout(()=>{
                    this.checkSesion = false;
                    this.statusSesion = 0;
                },5000)
            }
        },5000)
    },
    detectDevice() {
        const userAgent = navigator.userAgent;
          if (/mobile/i.test(userAgent)) {
            return 'Mobile';
          } else if (/tablet/i.test(userAgent)) {
            return 'Tablet';
          } else {
            return 'Desktop';
          }
    },
    onButtonNext(){
            this.topButtonsAlign = -1;
            this.cardsApperAnimation = true
            setTimeout(() => {
              this.cardsApper = false;
            }, 1000);
            if(this.pageCardsActual[this.pageCardsActual.length-1] != this.arrayExampleCards[this.arrayExampleCards.length-1]){
              if(this.pageCardsActual[0] == this.arrayExampleCards[0]){
                this.textBack = "Regresar";
                this.textNext = "Siguiente";
                this.isLastElement = false;
              }
              if(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[this.pageCardsActual.length-1]) + 7 <= this.arrayExampleCards.length){
                this.pageCardsActual = this.arrayExampleCards.slice(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[this.pageCardsActual.length-1]) + 1,this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[this.pageCardsActual.length-1])+7);
                this.isLastElement = false;
                this.textBack = "Anterior";
              }
              else{
                setTimeout(() => {
                  this.pageCardsActual = this.arrayExampleCards.slice(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[this.pageCardsActual.length-1]) + 1);
                  this.isLastElement = true;
                }, 1000);
                this.textNext = "";
              }
              
            }
    },
    onButtonBack(){
            setTimeout(() => {
              this.isLastElement = false;
            }, 1000);
            this.cardsApperAnimation = true
            if(this.pageCardsActual[0] != this.arrayExampleCards[0]){
              setTimeout(() => {
                this.cardsApper = false;
              }, 1000);
              this.topButtonsAlign = -1;
              if(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[0]) -6 >= 0){
                this.pageCardsActual = this.arrayExampleCards.slice(this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[0]) - 6,this.arrayExampleCards.findIndex(item => item === this.pageCardsActual[0]));
                if(this.pageCardsActual[0] != this.arrayExampleCards[0]){
                  this.textBack = "Anterior";
                  this.textNext = "Siguiente"
                }
                else{
                  this.textNext = "Siguiente";
                  this.textBack = "Regresar"
                }
                
              }
              else{
                setTimeout(() => {
                  this.cardsApper = true;
                  this.cardsApperAnimation = false;
                }, 1000);
                this.pageCardsActual = this.arrayExampleCards.slice(0,6);
                this.textNext = "Siguiente";
                this.textBack = "Regresar"
              }
              
            }
            else{
              this.cardsApper = true;
              this.cardsApperAnimation = false;
              this.textNext = "Siguiente";
              this.textBack = "Regresar";
            }
    },
    positionAsign({element}){
        try {
          const rect = element.getBoundingClientRect();
          const scrollTop = document.querySelector('.principalCards').scrollTop;
          this.topButtonsAlign = rect.top + scrollTop + 390;
        }catch (error) { console.log("Other Time:"+error) }
    },
    onClickEditVR({timerWait,toneBackground,university}){
        console.log(timerWait)
        this.backgroundNewVR = toneBackground
        this.addNewLogoFaculty = university.LogoFaculty
        this.editNowScene = 1;
        setTimeout(()=>{
          this.editNowScene = 2;
          setTimeout(()=>{
            this.editNowScene = 3;
            setTimeout(()=>{
              this.editNowScene = 4;
              setTimeout(()=>{
                this.editNowScene = 5;
              },2000)
            },4000)
          },2000)
        },3000)
    },
    onClickDeleteVR({timerWait,toneBackground,university}){
        console.log(timerWait)
        console.log(toneBackground)
        console.log(university)
    },
    onAddNewVR(element = null){
        this.addNewNameFaculty = ''
        this.addNewNameCompleteFaculty = ''
        this.addNewLogoFaculty = ''
        this.addNewImageFaculty = ''
        this.nameFacultyError = false
        this.nameCompleteFacultyError = false
        this.logoFacultyError = false
        this.imageFacultyError = false
        if(element === null){
          this.addNewVR = true;
        }
        else if(element != null){
          this.addNewNameFaculty = element.NameFaculty
          this.addNewNameCompleteFaculty = element.NameCompleteFaculty
          this.addNewLogoFaculty = element.LogoFaculty
          this.addNewImageFaculty = element.ImageFaculty
          this.elementEdit = element;
          this.editNewVR = true;
        }
    },
    onClickImageFaculty(){
        this.$refs.fileFaculty.click();
    },
    onClickImageLogo(){
        this.$refs.fileLogo.click();
    },
    handleFileUploadFaculty(event){
        const file = event.target.files[0];
        if (file) {
          if (file.type.startsWith("image/")) {
            this.imageFacultyError = false;
            const reader = new FileReader();
            reader.onload = (e) => {
              this.addNewImageFaculty = e.target.result; // Guardar para previsualización
            };
            reader.readAsDataURL(file);
          } else {
            this.imageFacultyError = true;
          }
        }
    },
    handleFileUploadLogo(event){
        const file = event.target.files[0];
        if (file) {
          if (file.type === "image/png") {
            this.logoFacultyError = false;
            const reader = new FileReader();
            reader.onload = (e) => {
              this.addNewLogoFaculty = e.target.result; // Guardar para previsualización
            };
            reader.readAsDataURL(file);
          } else {
            this.logoFacultyError = true;
          }
        }
    },
    onValidateText(){
      this.nameFacultyError = false;
      this.nameCompleteFacultyError = false;
      if(this.addNewNameFaculty === ''){
        this.nameFacultyError = true;
      }
      if(this.addNewNameCompleteFaculty === ''){
        this.nameCompleteFacultyError = true;
      }
    },
    onSaveNewVRComplete(){
      if(!this.imageFacultyError && !this.logoFacultyError && !this.nameCompleteFacultyError && !this.nameFacultyError && this.addNewNameFaculty != '' && this.addNewNameCompleteFaculty != '' && this.addNewLogoFaculty != '' && this.addNewImageFaculty != ''){
        //Agregacion al sistema
        if(this.addNewVR){
          this.addNewVR = false;
          this.getDominantColor();
          this.backgroundNewVR = this.getTone(this.dominantColorNewVR,85,60)
          this.editNowScene = 1;
          setTimeout(()=>{
            this.editNowScene = 2;
            setTimeout(()=>{
              this.editNowScene = 3;
              setTimeout(()=>{
                this.editNowScene = 4;
                setTimeout(()=>{
                  this.editNowScene = 5;
                },2000)
              },4000)
            },2000)
          },3000)
        }
        else if(this.editNewVR){
          if(this.addNewNameFaculty != this.elementEdit.NameFaculty ||  this.addNewNameCompleteFaculty != this.elementEdit.NameCompleteFaculty || this.addNewLogoFaculty != this.elementEdit.LogoFaculty || this.addNewImageFaculty != this.elementEdit.ImageFaculty){
            //Agregar Edicion Del Elemento
            console.log("Edicion del elemento")
            this.editNewVR = false;
          }
        }
      }
      else{
        if(this.addNewNameFaculty === '')
          this.nameFacultyError = true;
        if(this.addNewNameCompleteFaculty === '')
          this.nameCompleteFacultyError = true;
        if(this.addNewLogoFaculty === '')
          this.logoFacultyError = true;
        if(this.addNewImageFaculty === '')
          this.imageFacultyError = true;
      }
    },
    onCancelNewVRComplete(){
      this.addNewVR = false;
      this.editNewVR = false;
    },
    getDominantColor() {
        if(this.adminLevel === 2){
          const image = this.$refs.iconLogoPng; 
          if (image.complete) {
            this.extractColor(image);
          } else {
            image.onload = () => {
              this.extractColor(image); 
            };
            image.onerror = (error) => {
              console.error('Error al cargar la imagen', error); 
            };
          }
        }
      else if(this.adminLevel === 1){
          const image = new Image(); 
          image.src = require('@/assets/example_university_card_image.png');
          image.onload = () => {
            this.extractColor(image);
          };

          image.onerror = (error) => {
            console.error('Error al cargar la imagen', error);
          };
      }
        
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
        this.dominantColorNewVR = null;  
      } else {
        this.dominantColorNewVR = dominantColor;  
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
    pageCardsActual(){
            setTimeout(() => {
              this.cardsApper = true;
              this.cardsApperAnimation = false;
            }, 1000);
    }
  },
  computed: {
    
  },
};
