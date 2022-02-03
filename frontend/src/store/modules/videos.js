import HttpService from '../../services/HttpService'

export default {
  namespaced: true,
  state: {
    kecske: 'sajt',
    serviceStatus: 'OFF'
  },
  mutations: {
    setServiceStatus (state, value) {
      state.serviceStatus = value
    }
  },
  actions: {
    async checkHealth ({ commit }) {
      await HttpService('http://localhost:3000/healthcheck', {
        method: 'GET'
      }).then((response) => {
        commit('setServiceStatus', response.data.message)
      })
    }
  }
}
