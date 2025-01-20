import UniversityCard from '../UniversityComponent/UniversityCard.vue';
import axios from 'axios';

export default {
  name: 'HomeLogin',
  components: {
    UniversityCard
  },
  data() {
    return {
        textValidUser:"Validando Usuario",
        textErrorUser:"Usuario Invalido",
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
        textNext:"",
        adminLevel:0,
        pageCardsActual:[],
        arrayExampleCards:[],
        addNewNameFaculty: '',
        addNewNameCompleteFaculty: '',
        addNewLogoFaculty: [],
        addNewImageFaculty: [],
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
        this.componentCreated = true
        this.deviceType = this.detectDevice()
        console.log(this.deviceType)
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        if(token != null && userId != null){
          axios.get(`http://localhost:5028/api/AuthUser/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
              if(response.data.listUniversitys == null || response.data.listUniversitys.length === 0){
                throw new Error("El usuario no tiene universidades asignadas dentro");
              }
              this.statusSesion = 4;
              if(response.data.listUniversitys.length === 1){
                this.getDominantColor(response.data.listUniversitys[0].logoFaculty);
                setTimeout(()=>{
                    this.addNewLogoFaculty = [response.data.listUniversitys[0].logoFaculty, "image/" + response.data.listUniversitys[0].logoFaculty.split('.').pop()];
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
                            this.$store.commit('setAllUniversitysUser',response.data.listUniversitys);
                            this.$router.push({
                              name: 'HomeControlPanel',
                              params: { facultyAbbreviation: response.data.listUniversitys[0].nameFaculty },
                            }); 
                          },2000)
                        },4000)
                      },2000)
                    },3000)
                },1000)
              }
              else{
                setTimeout(()=>{
                  this.arrayExampleCards = response.data.listUniversitys;
                  this.pageCardsActual = response.data.listUniversitys.slice(0, 6);
                  if(this.pageCardsActual > 6)
                    this.textNext = "Siguiente";
                  else
                    this.textNext = "";
                },1000)
              }
          })
          .catch(error => {
            console.log(error);
            setTimeout(()=>{
              localStorage.setItem('token',null);
              localStorage.setItem('userId',null);
            },2000)
          });
        }
        else{
          setTimeout(()=>{
            localStorage.setItem('token',null);
            localStorage.setItem('userId',null);
            this.componentCreated = true
            this.deviceType = this.detectDevice()
            console.log(this.deviceType)
          },2000)
        }
  },
  methods: {
    onClickCheckSesion(){
        this.checkSesion = true;
        axios.post('http://localhost:5028/api/AuthUser/VerifyUser',{userName:this.userName,userPassword:this.userPassword})
        .then(response => {
          this.textValidUser = "Cargando Informacion";
          this.statusSesion = 1;
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.id);
          axios.get(`http://localhost:5028/api/AuthUser/${response.data.id}`, {
            headers: {
              'Authorization': `Bearer ${response.data.token}`
            }
          })
          .then(response => {
              if(response.data.listUniversitys == null || response.data.listUniversitys.length === 0){
                this.textErrorUser = "El usuario no tiene permisos";
                throw new Error("El usuario no tiene universidades asignadas dentro");
              }
              this.statusSesion = 2;
              this.checkSesion = false;
              this.adminLevel = response.data.userLevel;
              if(response.data.listUniversitys.length === 1){
                this.getDominantColor(response.data.listUniversitys[0].logoFaculty);
                setTimeout(()=>{
                    this.statusSesion = 4;
                    this.addNewLogoFaculty = [response.data.listUniversitys[0].logoFaculty, "image/" + response.data.listUniversitys[0].logoFaculty.split('.').pop()];
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
                            this.$store.commit('setAllUniversitysUser',response.data.listUniversitys);
                            this.$router.push({
                              name: 'HomeControlPanel',
                              params: { facultyAbbreviation: response.data.listUniversitys[0].nameFaculty },
                            }); 
                          },2000)
                        },4000)
                      },2000)
                    },3000)
                },1000)
              }
              else{
                setTimeout(()=>{
                  this.statusSesion = 4;
                  this.arrayExampleCards = response.data.listUniversitys;
                  this.pageCardsActual = response.data.listUniversitys.slice(0, 6);
                  if(this.pageCardsActual > 6)
                    this.textNext = "Siguiente";
                  else
                    this.textNext = "";
                },1000)
              }
          })
          .catch(error => {
            console.log(error);
            this.statusSesion = 3
            setTimeout(()=>{
              this.checkSesion = false;
              this.statusSesion = 0;
            },5000)
          });
  
        })
        .catch(error => {
          console.log(error)
            if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            if (errors.userName && errors.userPassword) {
              this.textErrorUser = "Usuario y Contraseña Invalidos";
            } else if (errors.userName) {
              this.textErrorUser = "Usuario Invalido";
            } else if (errors.userPassword) {
              this.textErrorUser = "Contraseña Invalida";
            } else {
              this.textErrorUser = "Credenciales Invalidas";
            }
            } else {
            this.textErrorUser = "Error en la autenticación";
            }
          this.statusSesion = 3
          setTimeout(()=>{
              this.checkSesion = false;
              this.statusSesion = 0;
          },5000)
        });
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
            if(this.textBack === "Regresar"){
              this.statusSesion = -1;
              this.adminLevel = 0;
              localStorage.setItem('token',null);
              localStorage.setItem('userId',null);
            }
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
        this.addNewLogoFaculty = [university.logoFaculty, "image/" + university.logoFaculty.split('.').pop()];
        this.editNowScene = 1;
        setTimeout(()=>{
          this.editNowScene = 2;
          setTimeout(()=>{
            this.editNowScene = 3;
            setTimeout(()=>{
              this.editNowScene = 4;
              setTimeout(()=>{
                this.editNowScene = 5;
                this.$store.commit('setAllUniversitysUser',this.arrayExampleCards);
                this.$router.push({
                  name: 'HomeControlPanel',
                  params: { facultyAbbreviation: university.nameFaculty },
                }); 
              },2000)
            },4000)
          },2000)
        },3000)
    },
    onClickDeleteVR({timerWait,toneBackground,university}){
      axios.delete(`http://localhost:5028/api/University/${university.idUniversity}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        axios.delete(`http://localhost:5299/api/Images/delete/${university.nameFaculty}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(()=>{
          console.log(timerWait)
          console.log(toneBackground)
          console.log(response)
          const indexPageCards = this.pageCardsActual.findIndex(pageUniversity => pageUniversity.idUniversity === university.idUniversity);
          if (indexPageCards !== -1) {
            this.pageCardsActual.splice(indexPageCards, 1);
          }
          const indexArrayExampleCards = this.arrayExampleCards.findIndex(exampleUniversity => exampleUniversity.idUniversity === university.idUniversity);
          if (indexArrayExampleCards !== -1) {
            this.arrayExampleCards.splice(indexArrayExampleCards, 1);
          }
        })
        .catch((error)=>{
          console.log(error)
        });
      })
      .catch(error => {
        console.log(error);
      })
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
          this.addNewNameFaculty = element.nameFaculty
          this.addNewNameCompleteFaculty = element.nameCompleteFaculty
          const toBase64 = url => fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            }));
          toBase64(element.logoFaculty).then(base64 => {
            this.addNewLogoFaculty = [base64, "image/" + element.logoFaculty.split('.').pop()];
          });

          toBase64(element.imageFaculty).then(base64 => {
            this.addNewImageFaculty = [base64, "image/" + element.imageFaculty.split('.').pop()];
          });
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
    base64ToBlob(base64, mimeType) {
      const byteCharacters = atob(base64.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType });
    },
    handleFileUploadFaculty(event){
        const file = event.target.files[0];
        if (file) {
          if (file.type.startsWith("image/")) {
            this.imageFacultyError = false;
            const reader = new FileReader();
            reader.onload = (e) => {
              this.addNewImageFaculty = [e.target.result,file.type];
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
              this.addNewLogoFaculty = [e.target.result,file.type];
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
        if(!this.editNewVR){
          const formImages = new FormData();
        formImages.append('files', this.base64ToBlob(this.addNewLogoFaculty[0],this.addNewLogoFaculty[1]),'LogoFaculty.png');
        formImages.append('files', this.base64ToBlob(this.addNewImageFaculty[0],this.addNewImageFaculty[1]),'ImageFaculty.jpg');

        axios.post(`http://localhost:5299/api/Images/upload/${this.addNewNameFaculty}`, formImages, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(responsePaths => {
          axios.post('http://localhost:5028/api/University',{NameFaculty:this.addNewNameFaculty,NameCompleteFaculty:this.addNewNameCompleteFaculty,LogoFaculty:responsePaths.data.paths[0],ImageFaculty:responsePaths.data.paths[1]},{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
          })
          .then(responseUniversity => {
            axios.put(`http://localhost:5028/api/AuthUser/AddUniversitys/${localStorage.getItem('userId')}?namesUniversitys=${this.addNewNameFaculty}`,{},{
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            })
            .then(responseUser => {
              console.log(responseUser)
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
                      const universityOnAdd = {
                        idUniversity: responseUniversity.data.id,
                        nameFaculty: this.addNewNameFaculty,
                        nameCompleteFaculty: this.addNewNameCompleteFaculty,
                        logoFaculty: responsePaths.data.paths[0],
                        imageFaculty: responsePaths.data.paths[1],
                        listEscenes: [] 
                      };
                      this.arrayExampleCards.push(universityOnAdd);
                      this.$store.commit('setAllUniversitysUser',this.arrayExampleCards);
                      this.$router.push({
                        name: 'HomeControlPanel',
                        params: { facultyAbbreviation: this.addNewNameFaculty },
                      }); 
                    },2000)
                  },4000)
                },2000)
              },3000)
            })
            .catch(error => {
              console.log(error);
              if(this.addNewNameFaculty === '')
                this.nameFacultyError = true;
              if(this.addNewNameCompleteFaculty === '')
                this.nameCompleteFacultyError = true;
              if(this.addNewLogoFaculty === '')
                this.logoFacultyError = true;
              if(this.addNewImageFaculty === '')
                this.imageFacultyError = true;
              return;
            });
          })
          .catch(error => {
            console.log(error);
            if(this.addNewNameFaculty === '')
              this.nameFacultyError = true;
            if(this.addNewNameCompleteFaculty === '')
              this.nameCompleteFacultyError = true;
            if(this.addNewLogoFaculty === '')
              this.logoFacultyError = true;
            if(this.addNewImageFaculty === '')
              this.imageFacultyError = true;
            return;
          });
        })
        .catch(error => {
          console.log(error);
          if(this.addNewNameFaculty === '')
            this.nameFacultyError = true;
          if(this.addNewNameCompleteFaculty === '')
            this.nameCompleteFacultyError = true;
          if(this.addNewLogoFaculty === '')
            this.logoFacultyError = true;
          if(this.addNewImageFaculty === '')
            this.imageFacultyError = true;
          return;
        });
        } 
        else if(this.editNewVR){
          if(this.addNewNameFaculty != this.elementEdit.NameFaculty ||  this.addNewNameCompleteFaculty != this.elementEdit.NameCompleteFaculty || this.addNewLogoFaculty != this.elementEdit.LogoFaculty || this.addNewImageFaculty != this.elementEdit.ImageFaculty){
            //Agregar Edicion Del Elemento
            const formImages = new FormData();
            console.log(this.addNewLogoFaculty)
            console.log(this.addNewImageFaculty)
            formImages.append('files', this.base64ToBlob(this.addNewLogoFaculty[0],this.addNewLogoFaculty[1]),'LogoFaculty.png');
            formImages.append('files', this.base64ToBlob(this.addNewImageFaculty[0],this.addNewImageFaculty[1]),'ImageFaculty.jpg');
            axios.post(`http://localhost:5299/api/Images/upload/${this.addNewNameFaculty}`, formImages, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
              }
            })
        .then(response => {
          axios.put(`http://localhost:5028/api/University/${this.elementEdit.idUniversity}`,{IdUniversity:this.elementEdit.idUniversity,NameFaculty:this.addNewNameFaculty,NameCompleteFaculty:this.addNewNameCompleteFaculty,LogoFaculty:response.data.paths[0],ImageFaculty:response.data.paths[1]},{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
          })
          .then(response => {
            const indexPageCards = this.pageCardsActual.findIndex(university => university.idUniversity === response.data.university.idUniversity);
            if (indexPageCards !== -1) {
              response.data.university.logoFaculty += `?t=${new Date().getTime()}`;
              response.data.university.imageFaculty += `?t=${new Date().getTime()}`;
              this.pageCardsActual.splice(indexPageCards, 1, response.data.university);
            }

            const indexArrayExampleCards = this.arrayExampleCards.findIndex(university => university.idUniversity === response.data.university.idUniversity);
            if (indexArrayExampleCards !== -1) {
              response.data.university.logoFaculty += `?t=${new Date().getTime()}`;
              response.data.university.imageFaculty += `?t=${new Date().getTime()}`;
              this.arrayExampleCards.splice(indexArrayExampleCards, 1, response.data.university);
            }
            this.editNewVR = false;
          })
          .catch(error => {
            console.log(error);
            if(this.addNewNameFaculty === '')
              this.nameFacultyError = true;
            if(this.addNewNameCompleteFaculty === '')
              this.nameCompleteFacultyError = true;
            if(this.addNewLogoFaculty === '')
              this.logoFacultyError = true;
            if(this.addNewImageFaculty === '')
              this.imageFacultyError = true;
            return;
          });
        })
        .catch(error => {
          console.log(error);
          if(this.addNewNameFaculty === '')
            this.nameFacultyError = true;
          if(this.addNewNameCompleteFaculty === '')
            this.nameCompleteFacultyError = true;
          if(this.addNewLogoFaculty === '')
            this.logoFacultyError = true;
          if(this.addNewImageFaculty === '')
            this.imageFacultyError = true;
          return;
        });
            
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
    getDominantColor(imageSend = null) {
        if(imageSend == null){
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
      else if(imageSend != null){
          const image = new Image(); 
          image.crossOrigin = 'Anonymous';
          image.src = imageSend,
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
