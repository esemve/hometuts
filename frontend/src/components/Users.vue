<template>
  <div class="login columns is-centered mt-2">

    <nav class="panel column is-two-fifths-desktop is-four-fifths-mobile">
      <p class="panel-heading mb-2">
        Users
      </p>

      <b-button label="Create" type="is-primary is-fullwidth" @click="$router.push({ name: 'createUser' })" />

      <b-table
        :data="users"
        :bordered="false"
        :striped="false"
        :narrowed="false"
        :hoverable="true"
        :loading="false"
        :focusable="false"
        :mobile-cards="false">

        <b-table-column field="username" label="User" v-slot="props">
          {{ props.row.username }}
        </b-table-column>

        <b-table-column field="isAdmin" label="Admin" v-slot="props" width="100">
          <b-field>
            <b-switch v-model="props.row.isAdmin"
                      :true-value="true"
                      :false-value="false"
                      :disabled="props.row.isAdmin === true && adminsCount < 2"
                      @input="changeRole(props.row.id, props.row.isAdmin)"
            >
            </b-switch>
          </b-field>
        </b-table-column>

        <b-table-column field="isAdmin" label="Delete" v-slot="props" width="90">
          <b-button label="Delete" type="is-danger" @click="confirmDelete(props.row.id)" />
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">No records</div>
        </template>

      </b-table>

    </nav>

  </div>
</template>

<script>
import HttpService from '../services/HttpService'

export default {
  name: 'Users',
  data () {
    return {
      users: [],
      adminsCount: 0
    }
  },
  computed: {
  },
  methods: {
    changeRole (id, value) {
      if (this.hasAnotherAdminExceptThis(id)) {
        let i = 0
        for (const user of this.users) {
          if (user.id === id) {
            this.users[i].isAdmin = value
            break
          }
          i++
        }

        HttpService().get(value ? `users/${id}/add_addmin_role` : `users/${id}/remove_admin_role`).then(() => {
          this.calculateAdminsCount()
        }).catch(() => {
          this.$router.go()
        })
      }
    },
    calculateAdminsCount () {
      this.adminsCount = 0
      for (const user of this.users) {
        if (user.isAdmin === true) {
          this.adminsCount++
        }
      }
    },
    hasAnotherAdminExceptThis (id) {
      let hasAnotherAdmin = false
      for (const user of this.users) {
        if (user.id !== id && user.isAdmin === true) {
          hasAnotherAdmin = true
          break
        }
      }

      return hasAnotherAdmin
    },
    confirmDelete (id) {
      if (this.hasAnotherAdminExceptThis(id) === false) {
        this.$buefy.toast.open({
          message: 'You can\'t remove all of admins!',
          type: 'is-danger'
        })
        return
      }

      this.$buefy.dialog.confirm({
        title: 'Deleting account',
        message: 'Are you sure you want to <b>delete</b> this account? This action cannot be undone.',
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          HttpService().delete(`users/${id}`).then(() => {
            this.users = this.users.filter(function (user) {
              return user.id !== id
            })

            this.$buefy.toast.open({
              message: 'Account deleted!',
              type: 'is-success'
            })
          }).catch(() => {
            this.$buefy.toast.open({
              message: 'Error!',
              type: 'is-danger'
            })
          })
        }
      })
    },
    loadUsersFromApi () {
      HttpService().get('users').then((response) => {
        this.users = response.data.users
        this.calculateAdminsCount()
      }).catch(() => {
        console.log('ERROR')
      })
    }
  },
  mounted () {
    this.loadUsersFromApi()
  }
}
</script>
