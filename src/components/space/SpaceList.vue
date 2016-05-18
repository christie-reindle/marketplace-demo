<template>
  <div>
    <template v-for="space in spaces">
      <div class="box">
        <space-list-item
          :space="space"
          :filters="filters">
        </space-list-item>
      </div>
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
    spaces: Array,
    filters: Object
  }
}
</script>
