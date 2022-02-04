import Vue from 'vue'
import Vuex from 'vuex'
import videos from './modules/videos'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    videos: videos,
    user: user
  }
})
