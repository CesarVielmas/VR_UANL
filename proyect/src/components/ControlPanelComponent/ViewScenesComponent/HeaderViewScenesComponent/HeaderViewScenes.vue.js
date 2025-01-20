export default {
    name: 'HeaderViewScenes',
    components: {
  
    },
    props:{ 
      logoUrl:{
        type:String,
        required:true
      },
      nameFaculty:{
        type:String,
        required:true
      },
      aumentVist:{
        type:Function,
        required:true
      },
      dismissVist:{
        type:Function,
        required:true
      },
      aumentDesp:{
        type:Function,
        required:true
      },
      dismissDesp:{
        type:Function,
        required:true
      },
      resetCamera:{
        type:Function,
        required:true
      }
    },
    data() {
      return {
          
      };
    },
    created() {
        
    },
    methods: {

    },
    mounted() {
        
    },
    watch: {
  
    },
    computed: {
      
    },
  };