import Vue from 'vue'
import Vuex from 'vuex'
import videos from './modules/videos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    videos
  },
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
