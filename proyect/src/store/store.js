import { createStore } from 'vuex';

const store = createStore({
  // Estado global
  state() {
    return {
      // Aquí puedes agregar cualquier dato que quieras almacenar globalmente
      allDataScenes:[],
      universitySelect:{},
      allUniversitysUser:[]
    };
  },
  
  // Mutaciones: Son las únicas que pueden modificar el estado directamente
  mutations: {
    setAllDataScenes(state,dataScenes){
        state.allDataScenes = dataScenes;
    },
    setUniversitySelect(state,university){
      state.universitySelect = university;
    },
    setAllUniversitysUser(state,dataUniversitys){
      state.allUniversitysUser = dataUniversitys;
    }
  },
  
  // Acciones: Son funciones que pueden realizar operaciones asíncronas y luego llamar a las mutaciones
  actions: {
    updateAllDataScenes({ commit }, dataScenes){
        commit('setAllDataScenes',dataScenes)
    },
    updateUniversitySelect({ commit }, university){
      commit('setUniversitySelect',university)
    },
    updateAllUniversitysUser({commit},dataUniversitys){
      commit('setAllUniversitysUser',dataUniversitys)
    }
  },
  
  // Getters: Son funciones que permiten acceder al estado de forma computada
  getters: {
    allDataScenes(state){
        return state.allDataScenes;
    },
    universitySelect(state){
      return state.universitySelect;
    },
    allUniversitysUser(state){
      return state.allUniversitysUser;
    }
  },
});

export default store;
