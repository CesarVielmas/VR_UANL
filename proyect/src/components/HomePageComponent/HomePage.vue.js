import LandingPage from "../LandingPageComponent/LandingPage.vue";
import LoadingApart from "../LoadingApartComponent/LoadingApart.vue";
import SceneView from "../SceneComponent/SceneView.vue";
import axios from "axios";

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
      completeInformationLoading:false,
      data: [],	
    };
  },
  created() {
    this.initializeDataEscene();
  },
  methods: {
    initializeDataEscene() {
      axios.get('http://localhost:5028/api/University')
      .then(response => {
        this.data = response.data;
        this.completeInformationLoading = true
      })
      .catch(error => {
        console.error('Error en obtener los datos', error);
      });
    },
    loadingReady(){
      this.completeInformation = true     
      this.$store.commit('setAllDataScenes', this.data);
    }
  }
};
