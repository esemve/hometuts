import HttpService from '../../services/HttpService'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    invalidLoginAttempt: false,
    token: localStorage.getItem('jwt')
  },
  mutations: {
    setToken (state, value) {
      state.token = value
    },
    setInvalidLoginAttempt (state, value) {
      state.invalidLoginAttempt = value
    }
  },
  getters: {
    getToken: state => state.token,
    isLoggedIn: state => state.token !== null
  },
  actions: {
    initializeUserStore ({commit}) {
    },
    async login ({ commit }, data) {
      await HttpService(null, false).post('login', {
        username: data.username,
        password: data.password
      }).then((response) => {
        let token = response.data.token
        commit('setInvalidLoginAttempt', false)
        commit('setToken', token)
        localStorage.setItem('jwt', token)
        router.push({name: 'tuts'})
      }).catch((response) => {
        commit('setInvalidLoginAttempt', true)
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('jwt')
      commit('setToken', null)
      router.push({name: 'login'})
    }
  }
}
