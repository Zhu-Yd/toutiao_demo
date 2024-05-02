import Vue from 'vue'
import Vuex from 'vuex'
import { getItems, setItems } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItems(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItems(TOKEN_KEY, data)
    }
  },
  actions: {},
  modules: {}
})
