<template>
  <div>
    <space-form
      v-if="spaceLoaded"
      :space.sync="space"
      :timekit-filter.sync="timekitFilter"
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
import Api from '../../services/Api'

export default {
  components: {
    SpaceForm
  },

  data () {
    return {
      space: Object,
      requestLoading: false,
      spaceLoaded: false,
      timekitFilter: Object
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

      let timekitRequest = Api.makeRequest({
        url: '/findtime/filtercollections/' + this.space.filter_id,
        method: 'put',
        data: this.timekitFilter
      })
      .then(response => {
        return response.data
      })

      let firebaseRequest = Firebase.child('spaces/' + this.$route.params.id).update(this.space)

      Promise.all([timekitRequest, firebaseRequest])
      .then(responses => {
        this.requestLoading = false
        this.$router.go({
          name: 'me_spaces'
        })
      })
    }
  }
}
</script>
