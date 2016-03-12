<template>
  <div>
    <space-form
      v-if="spaceLoaded"
      :space.sync="space"
      :save-space="saveSpace"
      :is-loading="requestLoading">
    </space-form>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import SpaceForm from '../space/SpaceForm'
import Firebase from '../../services/Firebase'

export default {
  components: {
    SpaceForm
  },

  data () {
    return {
      space: Object,
      requestLoading: false,
      spaceLoaded: false
    }
  },
  created: function () {
    let spaceRef = Firebase.child('spaces/' + this.$route.params.id)

    spaceRef.once('value', data => {
      this.space = data.val()
      this.spaceLoaded = true
    })
  },
  methods: {
    saveSpace: function () {
      this.requestLoading = true

      let spaceRef = Firebase.child('spaces/' + this.$route.params.id)
      spaceRef.update(this.space)
      .then(() => {
        this.requestLoading = false
        this.$router.go({
          name: 'me_spaces'
        })
      })
    }
  }
}
</script>
