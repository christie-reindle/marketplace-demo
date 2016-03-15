<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header-left">
          <a v-link="{ name: 'search' }" class="header-item">
            <span class="icon">
              <i class="fa fa-child"></i>
            </span> Rent a space
          </a>
          <a v-link="{ name: 'create_space' }" class="header-tab">
            Create space
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
              <a class="button is-info is-outlined" @click.prevent="login">Log in</a>
            </span>
          </template>
          <template v-else>
            <a v-link="{ name: 'me_bookings' }" class="header-item">
              <img :src="user.image" class="image is-24x24">&nbsp; {{ user.name }}
            </a>
            <span class="header-item">
              <a class="button is-info is-outlined" @click.prevent="logout">Log out</a>
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
        let user = Auth.getUser()

        if (user.auth.provider === 'facebook') {
          this.user.name = user.facebook.displayName
          this.user.image = user.facebook.profileImageURL
        }

        // Api.createUser({
        //   email: fbUser.email,
        //   timezone: 'Europe/Copenhagen',
        //   first_name: fbUser.first_name,
        //   last_name: fbUser.last_name
        // })
        // .then(response => {
        //   timekitRef.set(response.data)
        // })
        // .catch(error => {
        //   console.log('timekit error', error)
        // })
      }
    })
  },
  methods: {
    login: function () {
      Auth.loginFacebook()
    },
    logout: function () {
      Auth.logout()
      this.$route.router.go('/')
    }
  }
}
</script>
