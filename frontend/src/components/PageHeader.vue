<template>
    <b-navbar v-show="!isVideoPlay">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                        src="../assets/logo.png"
                >
            </b-navbar-item>
        </template>
        <template #end>
            <b-navbar-dropdown label="Menu" v-if="isLoggedIn">
                <b-navbar-item @click="$router.push({ name: 'tags' })">
                    Home
                </b-navbar-item>
                <b-navbar-item @click="$router.push({ name: 'profile' })">
                    Password
                </b-navbar-item>
                <hr class="navbar-divider">
                <b-navbar-item href="#">
                    Users
                </b-navbar-item>
                <b-navbar-item href="#">
                    Server
                </b-navbar-item>
                <hr class="navbar-divider">
                <b-navbar-item @click="logout">
                    Log out
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    ...mapState('videos', ['isVideoPlay'])
  },
  methods: {
    ...mapActions('user', ['logout'])
  }
}
</script>
