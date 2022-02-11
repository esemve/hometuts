<template>
    <div class="login columns is-centered mt-2">

        <nav class="panel column is-two-fifths-desktop is-four-fifths-mobile ml-auto mr-auto">
            <p class="panel-heading mb-2">
                <a @click="$router.push({ name: 'tags' })">Home</a> / {{ currentTag | asReadable }}
            </p>

            <ul>
                <li v-for="item in tutorials" :key="item">
                    <div class="buttons">
                        <b-button type="is-primary" class="mb-3 mt-3 is-light" expanded
                        @click="goToVideosPage(currentTag, item)">{{ item | asReadable }}</b-button>
                    </div>
                </li>
            </ul>
        </nav>

    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import router from '../router'

export default {
  name: 'Tutorials',
  computed: {
    ...mapState('videos', ['tutorials', 'currentTag'])
  },
  methods: {
    ...mapMutations('videos', ['setCurrentTag']),
    ...mapActions('videos', ['loadTutorialsFromApi']),
    goToVideosPage: (tag, tutorial) => {
      router.push({ name: 'videos', params: { tag: tag, tutorial: tutorial } })
    }
  },
  mounted () {
    this.setCurrentTag(this.$route.params.tag)
    this.loadTutorialsFromApi()
  }
}
</script>
