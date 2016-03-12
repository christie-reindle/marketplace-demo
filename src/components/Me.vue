<template>
  <div>
    <section class="hero is-info is-bold is-medium is-left">
      <div class="hero-content">
        <div class="container">
          <h1 class="title is-2">Your account</h1>
          <p class="subtitle is-5">Welcome back, {{ name }}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="tabs">
          <ul>
            <li v-link-active>
              <a v-link="{ path: '/me/bookings' }">Bookings</a>
            </li>
            <li v-link-active>
              <a v-link="{ path: '/me/spaces' }">Spaces</a>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import Auth from '../services/Auth'

export default {
  data () {
    return {
      name: Auth.getUser().facebook.displayName
    }
  }
}
</script>
