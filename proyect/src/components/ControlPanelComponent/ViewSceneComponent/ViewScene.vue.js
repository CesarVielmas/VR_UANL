import FooterViewScene from "./FooterViewSceneComponent/FooterViewScene.vue";
import SideBarViewScene from "./SideBarViewSceneComponent/SideBarViewScene.vue";
import VRInformationPanelView from "./VRInformationPanelViewComponent/VRInformationPanelView.vue";
import axios from "axios";
export default {
    name: 'ViewScene',
    components: {
        VRInformationPanelView,
        SideBarViewScene,
        FooterViewScene
    },
    props:{ 
        scene:{
            type:Object,
            required:true
        },
        colorBackground: {
            type: String, 
            required: true 
        },
        device:{
            type:String,
            required: true
        },
        facultyName:{
            type:String,
            required:true
        }
    },
    data() {
      return {
          isEditingButton:true
      };
    },
    created() {
        console.log(this.scene);
    },
    methods: {
        onChangeImageScene(){
            this.$refs.sceneAddImage.click();
        },
        base64ToBlob(base64, mimeType) {
            const byteCharacters = atob(base64.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: mimeType });
        },
        handleFileUploadScene(event){
            const file = event.target.files[0];
            if (file) {
              if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const formImage = new FormData();
                    formImage.append('file', this.base64ToBlob(e.target.result,file.type),`${this.scene.nameScene.toLowerCase().replace(/\s+/g, "_")}.${file.type.split("/")[1]}`);
                    axios.post(`http://localhost:5299/api/Images/upload/Escene/${this.facultyName}`, formImage, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                    }).
                    then((response)=>{
                        this.scene.imageScene = response.data.path;
                    }).
                    catch((error)=>{
                        console.log(error);
                    });
                };
                reader.readAsDataURL(file);
              } 
          } 
        },
    },
    mounted() {
        
    },
    watch: {
  
    },
    computed: {
      
    },
  };