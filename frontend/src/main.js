// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VueVideoPlayer from 'vue-video-player'
import { mapActions } from 'vuex'
import 'buefy/dist/buefy.css'
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueVideoPlayer)

/* eslint-disable no-new */

Vue.filter('asReadable', function (value) {
  if (!value) return ''
  let originalValue = value
  value = value.toString()
  value = value.replace('.mp4', '')
  value = value.replace('.mkv', '')
  value = value.replace(/^[0-9]+/g, '')
  value = value.replace('-', ' ')
  value = value.replace('_', ' ')
  value = value.charAt(0).toUpperCase() + value.slice(1)
  if (value.trim() === '') {
    return originalValue
  }
  return value
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods: {
    ...mapActions('user', ['initializeUserStore'])
  },
  created () {
    this.initializeUserStore()
  }
})
