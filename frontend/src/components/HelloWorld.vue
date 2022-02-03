<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ count }}</h2>
      <h3>{{ kecske }}</h3>
      <h4>ServiceStatus: {{ serviceStatus }}</h4>

    <button @click="increment">add</button>

      <button @click="checkHealth">check srever status</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState('videos', ['kecske', 'serviceStatus']),
    ...mapState(['count'])
  },
  methods: {
    ...mapActions('videos', ['checkHealth']),
    ...mapMutations(['increment'])

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
