<template>
    <div>
        <div v-show="!isVideoPlay" class="login columns is-centered mt-2">
            <nav class="panel column is-two-fifths-desktop is-four-fifths-mobile ml-auto mr-auto">
                <p class="panel-heading mb-2">
                    <a @click="$router.push({ name: 'tags' })">Home</a> /
                    <a @click="$router.push({ name: 'tutorials', tag: currentTag })">{{ currentTag | asReadable }}</a> /
                    {{ currentTutorial | asReadable }}
                </p>

                <div  v-for="(block, blockname) in videos" :key="blockname">
                <h4 class="title is-4 mb-0" v-show="blockname !== '/default/'">{{ blockname | asReadable }}</h4>

                <ul class="mb-5">
                    <li v-for="item in block" :key="item">
                        <div class="buttons">
                            <b-button type="is-primary" class="mb-3 mt-3 is-light" expanded
                            @click="startVideo(currentTag, currentTutorial, blockname, item)">{{ item | asReadable }}</b-button>
                        </div>
                    </li>
                </ul>

                </div>
            </nav>

        </div>
        <div v-if="isVideoPlay">
            <video-player  class="vjs-custom-skin"
                           ref="videoPlayer"
                           :options="playerOptions"
                           :playsinline="true">
            </video-player>

            <div id="bottomNav">
            <h4 id="videoTitle" class="title is-4 mb-0 pb-0">
                ({{ currentIndex + 1 }} / {{ videosFlatList.length }})
                {{ currentVideo | asReadable }}
            </h4>

                <button id="previousVideoButton" class="button is-dark" :disabled="previousVideo === null" @click="startVideo(currentTag, currentTutorial, previousVideo.block, previousVideo.video)">
                    &lt;
                </button>

                <button id="nextVideoButton" class="button is-dark" :disabled="nextVideo === null" @click="startVideo(currentTag, currentTutorial, nextVideo.block, nextVideo.video)">
                    &gt;
                </button>

                <button id="videoCloseButton" class="button is-dark" @click="closeVideo()">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  name: 'Videos',
  components: {
    videoPlayer
  },
  computed: {
    ...mapState('videos', ['videos', 'currentTag', 'currentTutorial', 'isVideoPlay'])
  },
  // https://github.surmon.me/vue-video-player/
  data () {
    return {
      // videojs options
      playerOptions: {
        fluid: true,
        autoplay: true,
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: []
      },
      currentVideo: null,
      currentIndex: 0,
      previousVideo: null,
      nextVideo: null,
      videosFlatList: []
    }
  },
  methods: {
    ...mapMutations('videos', ['setCurrentTag', 'setCurrentTutorial', 'setIsVideoPlay']),
    ...mapActions('videos', ['loadVideosFromApi']),
    startVideo (tag, tutorial, block, video) {
      let url = `${process.env.VUE_APP_BACKEND_SCHEME}://${process.env.VUE_APP_BACKEND_HOST}:${process.env.VUE_APP_BACKEND_PORT}/videostream?dl&tag=${tag}&tutorial=${tutorial}&video=${video}`
      if (block !== '/default/') {
        url = `${url}&group=${block}`
      }
      this.playerOptions.sources = [{
        type: 'video/mp4',
        src: url
      }]
      this.currentVideo = video
      this.currentIndex = this.videosFlatList.indexOf(`${block}#${video}`)
      this.setIsVideoPlay(true)

      this.setPreviousVideo()
      this.setNextVideo()
    },
    setPreviousVideo () {
      if (this.currentIndex <= 0) {
        this.previousVideo = null
      } else {
        const previousVideoPathParts = this.videosFlatList[this.currentIndex - 1].split('#')
        this.previousVideo = {
          block: previousVideoPathParts[0],
          video: previousVideoPathParts[1]
        }
      }
    },
    setNextVideo () {
      if (this.currentIndex >= this.videosFlatList.length - 1) {
        this.nextVideo = null
      } else {
        const nextVideoPathParts = this.videosFlatList[this.currentIndex + 1].split('#')
        this.nextVideo = {
          block: nextVideoPathParts[0],
          video: nextVideoPathParts[1]
        }
      }
    },
    closeVideo () {
      this.setIsVideoPlay(false)
    }
  },
  mounted () {
    this.setCurrentTag(this.$route.params.tag)
    this.setCurrentTutorial(this.$route.params.tutorial)
    this.loadVideosFromApi()
  },
  watch: {
    videos (newValue) {
      for (const [key, value] of Object.entries(newValue)) {
        for (const file of value) {
          this.videosFlatList.push(`${key}#${file}`)
        }
      }
    }
  }
}
</script>

<style>
    .video-js.vjs-fluid,
    .video-js.vjs-16-9,
    .video-js.vjs-4-3,
    video.video-js,
    video.vjs-tech {
        max-height: calc(100vh - 64px);
        position: relative !important;
        width: 100%;
        height: auto !important;
        max-width: 100% !important;
        padding-top: 0 !important;
        line-height: 0;
    }

    /* Fix the control bar due to us resetting the line-height on the video-js */
    .vjs-control-bar {
        line-height: 1;
    }
    #videoCloseButton {
        position: absolute;
        right: 20px;
        bottom: 10px;
    }
    #videoTitle {
        position: absolute;
        left: 20px;
        bottom: 18px;
        color: #777;
    }
    #bottomNav {
        width:100%;
        height:64px;
        bottom:0;
        background-color: #000;
    }
    #previousVideoButton {
        position: absolute;
        right: 150px;
        bottom: 10px;
    }
    #nextVideoButton {
        position: absolute;
        right: 100px;
        bottom: 10px;
    }
</style>
