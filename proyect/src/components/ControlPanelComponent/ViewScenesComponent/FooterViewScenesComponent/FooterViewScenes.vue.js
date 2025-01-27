export default {
    name: 'FooterViewScenes',
    components: {
  
    },
    props:{ 
        colorBackground:{
            type:String,
            required:true
        },
        functionMaxRestSee:{
            type:Function,
            required:true
        },
        functionMaxPlusSee:{
            type:Function,
            required:true
        },
        functionDeleteAllScenes:{
            type:Function,
            required:true
        },
        functionOnChangeScenes:{
            type:Function,
            required:true
        },
        functionOnPreview:{
            type:Function,
            required:true
        }
    },
    data() {
      return {
          onOpenOptions:false,
          onOpenDeleteAll:false
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