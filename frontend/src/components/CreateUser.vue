<template>
  <div class="login columns is-centered mt-2">

    <nav class="panel column is-two-fifths-desktop is-four-fifths-mobile">
      <p class="panel-heading mb-2">
        Create a new user
      </p>

      <b-field label="Username">
        <b-input v-model="username"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password1"></b-input>
      </b-field>

      <b-field label="Password (again)">
        <b-input type="password" v-model="password2"></b-input>
      </b-field>

      <b-field>
        <b-switch v-model="isAdmin"
                  true-value="Yes"
                  false-value="No">
          This is an admin user
        </b-switch>
      </b-field>

      <b-field class="has-text-centered">
        <b-button label="Create" type="is-primary" @click="createUser()" />
      </b-field>
    </nav>

  </div>
</template>

<script>

import HttpService from '../services/HttpService'

export default {
  name: 'CreateUser',
  data () {
    return {
      isAdmin: false,
      username: '',
      password1: '',
      password2: ''
    }
  },
  computed: {
  },
  methods: {
    createUser () {
      if (this.newPassword1 === '') {
        this.$buefy.toast.open({
          message: 'Please fill the password fields!',
          type: 'is-danger'
        })
        return
      } else if (this.password1 !== this.password2) {
        this.$buefy.toast.open({
          message: 'The two password are not the same!',
          type: 'is-danger'
        })
        return
      } else if (this.username === '') {
        this.$buefy.toast.open({
          message: 'Please fill the username field!',
          type: 'is-danger'
        })
        return
      }

      HttpService().post('users/create', {
        username: this.username,
        isAdmin: this.isAdmin === 'Yes' ? 1 : 0,
        password: this.password1
      }).then((response) => {
        this.$router.push({ name: 'users' })
      }).catch((error) => {
        if (error.status === 409) {
          this.$buefy.toast.open({
            message: 'This username is already used!',
            type: 'is-danger'
          })
        } else {
          this.$buefy.toast.open({
            message: 'Error!',
            type: 'is-danger'
          })
        }
      })
    }
  }
}
</script>
