import ControlPanel from "../ControlPanelComponent/ControlPanel.vue";
import LoaderControlPanel from "../LoaderControlPanelComponent/LoaderControlPanel.vue";
export default {
  name: 'HomeControlPanel',
  components: {
    LoaderControlPanel,
    ControlPanel
  },
  props:{
    facultyAbbreviation: {
        type: String, 
        required: true 
    }
  },
  data() {
    return {
        loadData:false,
        isUniqueUniversity:false,
        universityPanel:[],
        universitySelected:{}
    };
  },
  created() {
    this.universityPanel = this.$store.state.allUniversitysUser;
    let idUser = localStorage.getItem("userId") || null;
    let token = localStorage.getItem("token") || null;
    if(idUser != null && token != null){
      if(this.universityPanel.length != 0){
        if(this.universityPanel.length >= 1){
          const university = this.universityPanel.find(university => university.nameFaculty === this.facultyAbbreviation);
          if (university) {
            this.universitySelected = university;
            this.loadData = true;
            this.isUniqueUniversity = this.universityPanel.length === 1?true:false;
          } 
          else {
            this.$router.push({
              name: 'NotFound',
              params: { itemFound: 'VR Panel De Control' },
            });  
          }
        }
      }
    }
    else{
      this.$router.push({
        name: 'HomeLogin'
      });
    }
  },
  methods: {
    completeData({listUniversitys,universitySelect}){
      if(listUniversitys.length === 1){
        this.isUniqueUniversity = true;
        this.universitySelected = universitySelect;
      }
      else{
        this.isUniqueUniversity = false;
        this.universitySelected = universitySelect;
      }
      this.loadData = true;
    }
  },
  mounted() {
    
  },
  watch: {

  },
  computed: {
    
  },
};
