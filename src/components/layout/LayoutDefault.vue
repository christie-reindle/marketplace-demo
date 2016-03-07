<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></footer>
  </div>
</template>

<script>
import AppHeader from '../partials/Header'
import AppFooter from '../partials/Footer'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
