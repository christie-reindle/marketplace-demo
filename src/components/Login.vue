<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-quarter"></div>
          <div class="column is-half">
            <h2 class="title">Log in</h2>
            <p class="control">
              <label class="label">E-mail</label>
              <input class="input" type="email" placeholder="E-mail" id="email">
            </p>
            <p class="control">
              <label class="label">Password</label>
              <input class="input" type="password" placeholder="Password">
            </p>
            <p class="control">
              <button class="button is-success">
                Log in
              </button>
              <button class="button is-info" @click.prevent="loginFacebook">
                Facebook login
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Auth from '../services/Auth'

export default {
  methods: {
    loginFacebook: function () {
      Auth.loginFacebook()
    }
  },
  created: function () {
    if (Auth.isAuthenticated()) {
      this.$route.router.go('introduction')
    }

    Auth.onAuthChange(authData => {
      if (authData === null) {
        this.$route.router.go('login')
      } else {
        this.$route.router.go('introduction')
      }
    })
  }
}

</script>
