import HomeControlPanel from "@/components/HomeControlPanelComponent/HomeControlPanel.vue";
import HomeLogin from "@/components/HomeLoginComponent/HomeLogin.vue";
import HomePage from "@/components/HomePageComponent/HomePage.vue";
import NotFound from "@/components/NotFoundComponent/NotFound.vue";
import VRUniversity from "@/components/VRUniversityComponent/VRUniversity.vue";
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/VR-:facultyAbbreviation",
    name: "VREscene",
    component: VRUniversity,
    props: true
  },
  {
    path: "/Not-Found-:itemFound",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/Log-UANL",
    name: "HomeLogin",
    component: HomeLogin,
  },
  {
    path: "/PANEL-VR-:facultyAbbreviation",
    name: "HomeControlPanel",
    component:HomeControlPanel,
    props: true 
    
  },
  // {
  //   path: "*", // Cualquier ruta no definida
  //   redirect: "/not-found",
  // },
];
const router = new createRouter({
  history: createWebHistory(), // Configura el historial correctamente
  routes,
});

export default router;
