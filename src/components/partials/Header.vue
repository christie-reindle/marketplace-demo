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
          <a v-link="{ name: 'about' }" class="header-tab">
            About
          </a>
        </div>

        <!-- Hamburger menu (on mobile) -->
        <span class="header-toggle" :class="{ 'is-active': showMobileMenu }" @click="showMobileMenu = !showMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div class="header-right header-menu" :class="{ 'is-active': showMobileMenu }">
          <template v-if="!isAuthenticated">
            <span class="header-item">
              <a class="button is-info is-outlined" @click.prevent="displayLoginModal">Log in</a>
            </span>
          </template>
          <template v-else>
            <a v-link="{ name: 'me_bookings' }" class="header-item">
              <img :src="user.image" class="image is-24x24">&nbsp; Your account
            </a>
            <span class="header-item">
              <a class="button is-info is-outlined" @click.prevent="logout">Log out</a>
            </span>
          </template>
        </div>
      </div>
    </header>
  </div>
  <div class="modal" :class="{ 'is-active': loginModalVisible }">
    <div class="modal-background"></div>
    <div class="modal-container">
      <div class="modal-content">
        <div class="box">
          <form class="" action="index.html" method="post" @submit.prevent="loginUser">
            <p class="control">
              <input type="text" class="input" placeholder="E-mail" v-model="login.email">
            </p>
            <p class="control">
              <input type="password" class="input" placeholder="Password" v-model="login.password">
            </p>
            <p class="control">
              <button class="button is-primary">
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
    <button class="modal-close" @click="closeLoginModal"></button>
  </div>
</template>

<script>
import Api from '../../services/Api'
import Auth from '../../services/Auth'
// import Firebase from '../../services/Firebase'
import Settings from '../../services/Settings'

export default {
  data () {
    return {
      isAuthenticated: false,
      user: {
        image: ''
      },
      showMobileMenu: false,
      loginModalVisible: false,
      login: {
        email: '',
        password: ''
      }
    }
  },
  created: function () {
    Auth.onAuthChange(authData => {
      this.isAuthenticated = authData !== null

      if (this.isAuthenticated) {
        let user = Auth.getUser()

        if (user.auth.provider === 'password') {
          this.user.image = user.password.profileImageURL
        }

        Api.setUser(Settings.get('timekit-email'), Settings.get('timekit-api-token'))
      }
    })
  },
  methods: {
    displayLoginModal: function () {
      this.loginModalVisible = true
    },
    closeLoginModal: function () {
      this.loginModalVisible = false
    },
    login: function () {
      Auth.loginFacebook()
    },
    loginUser: function () {
      Auth.loginPassword(this.login.email, this.login.password)
      .then(response => {
        this.loginModalVisible = false
      }).catch(error => {
        console.log('error', error)
      })
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
