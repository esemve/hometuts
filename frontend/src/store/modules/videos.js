import HttpService from '../../services/HttpService'

export default {
  namespaced: true,
  state: {
    tags: [],
    tutorials: [],
    currentTag: null
  },
  mutations: {
    setTags (state, value) {
      state.tags = value
    },
    setTutorials (state, value) {
      state.tutorials = value
    },
    setCurrentTag (state, value) {
      state.currentTag = value
    }
  },
  actions: {
    loadTagsFromApi ({ commit }) {
      HttpService().get('tags').then((response) => {
        commit('setTags', response.data.tags)
      })
    },
    loadTutorialsFromApi ({ commit, state }) {
      commit('setTutorials', [])
      HttpService().get('tags/' + state.currentTag).then((response) => {
        commit('setTutorials', response.data.tutorials)
      })
    }
  }
}
