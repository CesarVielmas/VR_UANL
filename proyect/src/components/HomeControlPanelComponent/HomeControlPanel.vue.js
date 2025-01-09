import ControlPanel from "../ControlPanelComponent/ControlPanel.vue";
import LoaderControlPanel from "../LoaderControlPanelComponent/LoaderControlPanel.vue";

export default {
  name: 'HomeControlPanel',
  components: {
    LoaderControlPanel,
    ControlPanel
  },
  props: ['facultyAbbreviation'],
  data() {
    return {
        loadData:false,
    };
  },
  created() {
   
  },
  methods: {
    completeData(){
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
