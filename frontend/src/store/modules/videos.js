import HttpService from '../../services/HttpService'

export default {
  namespaced: true,
  state: {
    tags: []
  },
  mutations: {
    setTags (state, value) {
      state.tags = value
    }
  },
  actions: {
    async loadTagsFromApi ({ commit, rootState }) {
      await HttpService('http://localhost:3000/tags', {
        method: 'GET',
        headers: {
          'x-access-token': rootState.user.token,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        commit('setTags', response.data.tags)
      })
    }
  }
}
