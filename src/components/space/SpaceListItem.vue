<template>
  <div>
    <div class="content">
      <h2 class="title">
        {{ space.name }}
      </h2>
      <p class="subtitle is-6">
        {{ space.location.address }} <small>({{ parseFloat(space.distance).toFixed(2) }} km away)</small>
      </p>
      <p>
        {{ space.description }}
      </p>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: {
    space: Object
  }
}
</script>
