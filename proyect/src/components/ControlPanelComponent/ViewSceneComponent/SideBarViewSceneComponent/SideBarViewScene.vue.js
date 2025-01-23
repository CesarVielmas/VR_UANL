export default {
    name: 'SideBarViewScene',
    components: {
       
    },
    props:{ 
        background: {
            type: String, 
            required: true 
        }
    },
    data() {
      return {
          isOnHidden:false
      };
    },
    created() {
       
    },
    methods: {
        onSaveButton(){
            this.isOnHidden = true;
            setTimeout(()=>{

            },500);
        },
        onCancelButton(){
            this.isOnHidden = true;
            setTimeout(()=>{    

            },500);
        }
    },
    mounted() {
        
    },
    watch: {
  
    },
    computed: {
      
    },
  };