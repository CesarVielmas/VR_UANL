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
      axios.get('https://backend-production-1da7.up.railway.app/api/University')
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
