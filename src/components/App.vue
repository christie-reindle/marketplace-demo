<template>
  <div>
    <component :is="layout"></component>
  </div>
</template>

<script>
import LayoutDefault from './layout/LayoutDefault'

export default {
  components: {
    LayoutDefault
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
