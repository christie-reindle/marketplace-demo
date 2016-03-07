<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header-left">
          <a href="#" class="header-item">
            <span class="icon">
              <i class="fa fa-child"></i>
            </span> Rent My Thing
          </a>
          <a v-link="'introduction'" class="header-tab">
            Introduction
          </a>
          <a v-link="'search'" class="header-tab">
            Search
          </a>
        </div>

        <!-- Hamburger menu (on mobile) -->
        <span class="header-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div class="header-right header-menu">
          <template v-if="!isAuthenticated">
            <span class="header-item">
              <a v-link="'create-profile'">Create profile</a>
            </span>
            <span class="header-item">
              <a class="button is-info is-outlined" v-link="'login'">Log in</a>
            </span>
          </template>
          <template v-else>
            <span class="header-item">
              <img :src="user.image" class="image is-24x24">&nbsp; {{ user.name }}
            </span>
            <span class="header-item">
              <a class="button is-info is-outlined" @click.prevent="logout()">Log out</a>
            </span>
          </template>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Auth from '../../services/Auth'

export default {
  data () {
    return {
      isAuthenticated: false,
      user: {
        name: '',
        image: ''
      }
    }
  },
  created: function () {
    Auth.onAuthChange(authData => {
      this.isAuthenticated = authData !== null

      if (this.isAuthenticated) {
        let user = authData

        if (user.auth.provider === 'facebook') {
          this.user.name = user.facebook.displayName
          this.user.image = user.facebook.profileImageURL
        }
      }
    })
  },
  methods: {
    logout: function () {
      Auth.logout()
      this.$route.router.go('/')
    }
  }
}
</script>
