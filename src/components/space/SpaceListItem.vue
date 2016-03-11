<template>
  <div>
    <div class="content">
      <h2>
        {{ space.name }}
      </h2>
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
