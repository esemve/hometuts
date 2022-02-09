<template>
    <div>
        <div v-show="!isVideoPlay" class="login columns is-centered mt-2">
            <nav class="panel column is-two-fifths-desktop is-four-fifths-mobile ml-auto mr-auto">
                <p class="panel-heading mb-2">
                    Videos in {{ currentTag }} / {{ currentTutorial }}
                </p>

                <div  v-for="(block, blockname) in videos" :key="blockname">
                <h4 class="title is-4 mb-0" v-show="blockname !== '/default/'">{{ blockname }}</h4>

                <ul class="mb-5">
                    <li v-for="item in block" :key="item">
                        <div class="buttons">
                            <b-button type="is-primary" class="mb-3 mt-3 is-light" expanded
                            @click="startVideo(currentTag, currentTutorial, blockname, item)">{{ item }}</b-button>
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
            <h4 id="videoTitle" class="title is-4 mb-0 pb-0">{{ currentVideo }}</h4>
            <a id="videoCloseButton" class="button is-dark" @click="closeVideo()">
                Close
            </a>
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
      currentTime: 0,
      currentVideo: null
    }
  },
  methods: {
    ...mapMutations('videos', ['setCurrentTag', 'setCurrentTutorial', 'setIsVideoPlay']),
    ...mapActions('videos', ['loadVideosFromApi']),
    startVideo (tag, tutorial, block, video) {
      let url = `http://localhost:3000/videostream?dl&tag=${tag}&tutorial=${tutorial}&video=${video}`
      if (block !== '/default/') {
        url = `${url}&group=${block}`
      }
      this.playerOptions.sources = [{
        type: 'video/mp4',
        src: url
      }]
      this.currentVideo = video
      this.setIsVideoPlay(true)
    },
    closeVideo () {
      this.setIsVideoPlay(false)
    }
  },
  mounted () {
    this.setCurrentTag(this.$route.params.tag)
    this.setCurrentTutorial(this.$route.params.tutorial)
    this.loadVideosFromApi()
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
</style>
