<template>
  <div>
    <section class="hero is-info is-bold is-medium is-left">
      <div class="hero-content">
        <div class="container">
          <h1 class="title is-2">Create a space</h1>
          <p class="subtitle is-5">Add your space to the mix</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <space-form
          :space="space"
          :save-space="createSpace"
          :is-loading="requestLoading"
          v-ref:form>
        </space-form>
      </div>
    </section>
  </div>
</template>

<script>
import LocationInput from '../partials/LocationInput'
import SpaceForm from '../space/SpaceForm'
import Firebase from '../../services/Firebase'
import GeoFire from 'geofire'
import Auth from '../../services/Auth'
import Api from '../../services/Api'

export default {
  components: {
    LocationInput,
    SpaceForm
  },
  data () {
    return {
      requestLoading: false,
      location: {},
      space: {
        owner: Auth.getUser().uid,
        calendar_id: '',
        filter_id: '',
        name: '',
        description: '',
        location: {
          address: '',
          lat: '',
          lng: ''
        },
        availability: []
      },
      filterForm: {
        day: 'Monday',
        from: '9',
        to: '17'
      }
    }
  },
  computed: {
    timekitFilter: function () {
      return this.$refs.form.timekitFilter
    }
  },
  methods: {
    addFilter: function () {
      this.space.availability.push(this.filterForm)
      this.filterForm = {
        day: 'Monday',
        from: '8',
        to: '17'
      }
    },
    removeFilter: function (filter) {
      this.space.availability.splice(filter, 1)
    },
    createSpace: function () {
      this.requestLoading = true

      let timekitRequests = []

      timekitRequests.push(Api.createCalendar({
        name: this.space.name,
        description: this.space.name + ': ' + this.space.description
      })
      .then(response => {
        return response.data.id
      }))

      timekitRequests.push(Api.makeRequest({
        url: '/findtime/filtercollections',
        method: 'post',
        data: this.timekitFilter
      })
      .then(response => {
        return response.data.id
      }))

      Promise.all(timekitRequests).then(responses => {
        this.space.calendar_id = responses[0]
        this.space.filter_id = responses[1]

        let spaceRef = Firebase.child('spaces').push()
        let spaceID = spaceRef.key()
        let spaceRequest = spaceRef.set(this.space)

        let geoFire = new GeoFire(Firebase.child('_geofire/spaces'))
        let geoQuery = geoFire.set(spaceID, [
          this.space.location.lat,
          this.space.location.lng
        ])

        let userRelation = Firebase.child('users/' + Auth.getUser().uid + '/spaces/' + spaceID).set(true)

        Promise.all([spaceRequest, geoQuery, userRelation])
        .then(() => {
          this.requestLoading = false
          this.$router.go({
            name: 'me_spaces'
          })
        })
      })
    }
  }
}
</script>
