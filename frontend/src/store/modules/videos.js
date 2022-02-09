import HttpService from '../../services/HttpService'

export default {
  namespaced: true,
  state: {
    tags: [],
    tutorials: [],
    videos: [],
    currentTag: null,
    currentTutorial: null,
    isVideoPlay: false
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
    },
    setCurrentTutorial (state, value) {
      state.currentTutorial = value
    },
    setVideos (state, value) {
      state.videos = value
    },
    setIsVideoPlay (state, value) {
      state.isVideoPlay = value
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
    },
    loadVideosFromApi ({ commit, state }) {
      commit('setVideos', [])
      HttpService().get('videos/' + state.currentTag + '/' + state.currentTutorial).then((response) => {
        commit('setVideos', response.data.videos)
      })
    }
  }
}
