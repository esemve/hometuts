<template>
    <div class="login columns is-centered mt-2">

        <nav class="panel column is-two-fifths-desktop is-four-fifths-mobile">
            <p class="panel-heading mb-2">
                Change password
            </p>

            <b-message type="is-danger" v-show="error">
                {{ error }}
            </b-message>

            <b-message type="is-success" v-if="success">
                {{ success }}
            </b-message>

            <b-field label="New password">
                <b-input type="password" v-model="newPassword1"></b-input>
            </b-field>

            <b-field label="New password again">
                <b-input type="password" v-model="newPassword2"></b-input>
            </b-field>

            <b-field class="has-text-centered">
                <b-button label="Change my password" type="is-primary" @click="changePassword()" />
            </b-field>
        </nav>

    </div>
</template>

<script>
import { mapActions } from 'vuex'

import HttpService from '../services/HttpService'

export default {
  name: 'Profile',
  data () {
    return {
      error: '',
      success: '',
      newPassword1: '',
      newPassword2: '',
      password: ''
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('user', ['updateToken']),
    changePassword () {
      this.error = ''
      this.success = ''

      if (this.newPassword1 === '') {
        this.error = 'Please fill the new password fields!'
      } else if (this.newPassword1 !== this.newPassword2) {
        this.error = 'The two new password is not the same!'
      }

      if (this.error !== '') {
        return
      }

      const that = this
      HttpService().post('password-change', {
        password: this.newPassword1
      }).then((response) => {
        console.log(response.data)
        that.success = 'Your password has been changed!'
        that.error = ''
        that.updateToken(response.data.token)
      }).catch(() => {
        that.error = 'Server error!'
        that.success = ''
      })
    }
  }
}
</script>
