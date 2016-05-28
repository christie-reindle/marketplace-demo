<template>
  <div>
    <github-ribbon></github-ribbon>
    <component :is="layout"></component>
  </div>
</template>

<script>
import LayoutDefault from './layout/LayoutDefault'
import GithubRibbon from './partials/GithubRibbon'

export default {
  components: {
    LayoutDefault,
    GithubRibbon
  },
  computed: {
    layout: function () {
      let layout = 'layout-default'
      if (this.$route.layout) layout = 'layout-' + this.$route.layout
      return layout
    }
  }
}
</script>
