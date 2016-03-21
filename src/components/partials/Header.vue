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
          <a v-link="{ name: 'create_space' }" class="header-tab" v-if="isAuthenticated">
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
import Api from '../../services/Api'
import Auth from '../../services/Auth'
import Firebase from '../../services/Firebase'
import Settings from '../../services/Settings'

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
        let socialUser = {}

        if (user.auth.provider === 'facebook') {
          this.user.name = user.facebook.displayName
          this.user.image = user.facebook.profileImageURL
          let fbUser = user.facebook.cachedUserProfile

          socialUser = {
            email: fbUser.email,
            first_name: fbUser.first_name,
            last_name: fbUser.last_name
          }
        }

        let timekitRef = Firebase.child('users/' + user.uid + '/timekit')

        timekitRef.once('value', function (data) {
          if (!data.exists()) {
            Api.createUser({
              email: socialUser.email,
              timezone: 'Europe/Copenhagen',
              first_name: socialUser.first_name,
              last_name: socialUser.last_name
            })
            .then(response => {
              timekitRef.set(response.data)
              Settings.set('timekit-email', response.data.email)
              Settings.set('timekit-api-token', response.data.api_token)
              Api.setUser(Settings.get('timekit-email'), Settings.get('timekit-api-token'))
            })
            .catch(error => {
              console.log('timekit error', error)
            })
          } else {
            Settings.set('timekit-email', data.val().email)
            Settings.set('timekit-api-token', data.val().api_token)
            Api.setUser(Settings.get('timekit-email'), Settings.get('timekit-api-token'))
          }
        })
      }
    })
  },
  methods: {
    login: function () {
      Auth.loginFacebook()
    },
    logout: function () {
      Auth.logout()
      Settings.remove('timekit-email')
      Settings.remove('timekit-api-token')
      this.$route.router.go('/')
    }
  }
}
</script>
