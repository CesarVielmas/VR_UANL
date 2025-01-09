import { createStore } from 'vuex';

const store = createStore({
  // Estado global
  state() {
    return {
      // Aquí puedes agregar cualquier dato que quieras almacenar globalmente
      allDataScenes:[]
    };
  },
  
  // Mutaciones: Son las únicas que pueden modificar el estado directamente
  mutations: {
    setAllDataScenes(state,dataScenes){
        state.allDataScenes = dataScenes;
    }
  },
  
  // Acciones: Son funciones que pueden realizar operaciones asíncronas y luego llamar a las mutaciones
  actions: {
    updateAllDataScenes({ commit }, dataScenes){
        commit('setAllDataScenes',dataScenes)
    }
  },
  
  // Getters: Son funciones que permiten acceder al estado de forma computada
  getters: {
    allDataScenes(state){
        return state.allDataScenes;
    }
  },
});

export default store;
