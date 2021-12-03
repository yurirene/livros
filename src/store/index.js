import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
  },
  state: {
    api: 'http://api-livros.yuri/api/',
  },
  getters: {
    getApi: state => {
        return state.api;
    },
  }
});
