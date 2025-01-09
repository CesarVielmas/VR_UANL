import LandingPage from "../LandingPageComponent/LandingPage.vue";
import LoadingApart from "../LoadingApartComponent/LoadingApart.vue";
import SceneView from "../SceneComponent/SceneView.vue";


export default {
  name: 'HomePage',
  components: {
    SceneView,
    LandingPage,
    LoadingApart
  },
  data() {
    return {
      completeInformation:false,
      completeInformationLoading:false
    };
  },
  created() {
    this.initializeDataEscene();
  },
  methods: {
    initializeDataEscene() {
      setInterval(()=>{
        this.completeInformationLoading = true
      },(Math.floor(Math.random() * (30 - 10 + 1)) + 10)*1000)
    },
    loadingReady(){
      this.completeInformation = true
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
    }
  }
};
