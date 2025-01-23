export default {
    name: 'FooterViewScene',
    components: {
       
    },
    props:{ 
        background:{
          type:Function,
          required:true
        },
        createButtonRedirect:{
          type:Function,
          required:true
        },
        createButtonInformation:{
          type:Function,
          required:true
        },
        deleteButton:{
          type:Function,
          required:true
        },
        changeBackgroundImage:{
          type:Function,
          required:true
        },
        changeToPanelControl:{
          type:Function,
          required:true
        }
    },
    data() {
      return {
        onOpenOptions:false
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