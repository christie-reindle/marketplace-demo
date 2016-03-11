<template>
  <div>
    <template v-for="space in spaces">
      <space-list-item
        :space="space">
      </space-list-item>
    </template>
  </div>
</template>

<script>
import SpaceListItem from './SpaceListItem'

export default {
  components: {
    SpaceListItem
  },
  props: {
    spaces: Array
  }
}
</script>
