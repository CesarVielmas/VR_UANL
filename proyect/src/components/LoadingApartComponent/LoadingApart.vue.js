export default {
    data() {
      return {
       loadingInformation:false
      };
    },
    props: {
        completeInformation: {
          type: Boolean, 
          required: true 
        },
        completeInformationFunction:{
            type: Function,
            required:true
        }
    },
    watch: {
        completeInformation() {
          this.loadingInformation = true
          setTimeout(()=>{
            this.completeInformationFunction()
          },1000)
        }
    },
  };