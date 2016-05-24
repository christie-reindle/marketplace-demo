<template>
  <div>
    <article class="message is-danger" v-show="errors">
      <div class="message-body">
        Invalid form data
      </div>
    </article>
    <space-form
      v-if="spaceLoaded"
      :space.sync="space"
      :save-space="saveSpace"
      :is-loading="requestLoading"
      v-ref:form>
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
import GeoFire from 'geofire'

export default {
  components: {
    SpaceForm
  },

  data () {
    return {
      space: Object,
      requestLoading: false,
      spaceLoaded: false,
      timekitFilter: {},
      errors: false
    }
  },
  created: function () {
    let spaceRef = Firebase.child('spaces/' + this.$route.params.id)

    spaceRef.once('value', data => {
      this.space = data.val()
      this.spaceLoaded = true
    })
  },
  computed: {
    timekitFilter: function () {
      return this.$refs.form.timekitFilter
    }
  },
  methods: {
    saveSpace: function () {
      this.requestLoading = true

      let timekitFilterRequest = Api.makeRequest({
        url: '/findtime/filtercollections/' + this.space.filter_id,
        method: 'put',
        data: this.timekitFilter
      })

      let spaceID = this.$route.params.id

      let firebaseRequest = Firebase.child('spaces/' + spaceID).update(this.space)

      let geoFire = new GeoFire(Firebase.child('_geofire/spaces'))
      let geoRequest = geoFire.set(spaceID, [
        this.space.location.lat,
        this.space.location.lng
      ])

      Promise.all([timekitFilterRequest, firebaseRequest, geoRequest])
      .then(responses => {
        this.requestLoading = false
        this.$router.go({
          name: 'me_spaces'
        })
      })
      .catch(errors => {
        this.errors = true
        this.requestLoading = false
      })
    }
  }
}
</script>
