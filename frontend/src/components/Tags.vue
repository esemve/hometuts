<template>
    <div class="login columns is-centered mt-2">

        <nav class="panel column is-two-fifths-desktop is-four-fifths-mobile ml-auto mr-auto">
            <p class="panel-heading mb-2">
                Tags
            </p>

            <ul>
                <li v-for="item in tags" :key="item">
                    <div class="buttons">
                        <b-button type="is-primary" class="mb-3 mt-3 is-light" expanded
                        @click="goToTutorialsPage(item)">{{ item }}</b-button>
                    </div>
                </li>
            </ul>
        </nav>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../router'

export default {
  name: 'Tags',
  computed: {
    ...mapState('videos', ['tags'])
  },
  methods: {
    ...mapActions('videos', ['loadTagsFromApi']),
    goToTutorialsPage: (tag) => {
      router.push({ name: 'tutorials', params: { tag: tag } })
    }
  },
  mounted () {
    this.$store.dispatch('videos/loadTagsFromApi', { self: this })
  }
}
</script>
