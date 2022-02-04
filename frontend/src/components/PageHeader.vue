<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                        src="../assets/logo.png"
                >
            </b-navbar-item>
        </template>
        <template #end>
            <b-navbar-item tag="div" v-if="isLoggedIn">
                <div class="buttons">
                    <a class="button is-light" @click="logout">
                        Log out
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('user', ['logout'])
  }
}
</script>
