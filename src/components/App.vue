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
      return 'layout-default'
    }
  }
}
</script>
