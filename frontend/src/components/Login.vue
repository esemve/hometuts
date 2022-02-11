<template>
  <div class="login columns is-centered mt-2">

    <nav class="panel column is-two-fifths-desktop is-four-fifths-mobile">
      <p class="panel-heading mb-2">
        Login
      </p>

      <b-field label="Username">
        <b-input maxlength="30" v-model="username"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password"></b-input>
      </b-field>

      <b-message type="is-danger" v-show="invalidLoginAttempt">
        Invalid user name / password!
      </b-message>

      <b-field class="has-text-centered">
          <b-button label="Login" type="is-primary" @click="login({ username, password })" />
      </b-field>
    </nav>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState('user', ['invalidLoginAttempt', 'token'])
  },
  methods: {
    ...mapActions('user', ['login'])
  }
}
</script>
