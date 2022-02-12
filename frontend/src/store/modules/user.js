import HttpService from '../../services/HttpService'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    invalidLoginAttempt: false,
    token: localStorage.getItem('jwt'),
    isAdmin: (localStorage.getItem('isAdmin') === 'true')
  },
  mutations: {
    setToken (state, value) {
      state.token = value
    },
    setInvalidLoginAttempt (state, value) {
      state.invalidLoginAttempt = value
    },
    setIsAdmin (state, value) {
      state.isAdmin = value
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
        let isAdmin = response.data.isAdmin
        console.log(isAdmin)
        commit('setInvalidLoginAttempt', false)
        commit('setToken', token)
        commit('setIsAdmin', isAdmin)
        localStorage.setItem('jwt', token)
        localStorage.setItem('isAdmin', isAdmin)
        router.push({name: 'tags'})
      }).catch(() => {
        commit('setInvalidLoginAttempt', true)
      })
    },
    updateToken ({ commit }, data) {
      commit('setToken', data)
      localStorage.setItem('jwt', data)
    },
    logout ({ commit }) {
      localStorage.removeItem('jwt')
      localStorage.removeItem('isAdmin')
      commit('setToken', null)
      commit('isAdmin', false)
      router.push({name: 'login'})
    }
  }
}
