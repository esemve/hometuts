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
    loadTagsFromApi ({ commit }) {
      HttpService().get('tags').then((response) => {
        commit('setTags', response.data.tags)
      })
    }
  }
}
