<template>
  <div>
    <section class="hero is-info is-bold is-medium is-left">
      <div class="hero-content">
        <div class="container">
          <h1 class="title is-2">Search for a space</h1>
          <p class="subtitle is-5">Find nearby and available spaces</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <form @submit.prevent="search">
          <p class="control">
            <location-input :location.sync="searchForm.location" :id="'location'">
              <input type="text" class="input is-medium" id="location" placeholder="Enter a location">
            </location-input>
          </p>
          <p class="control">
            Find places within
          </p>
          <p class="control">
            <label class="radio">
              <input type="radio" name="radius" value="1" v-model="searchForm.radius" number>
              1 km
            </label>
            <label class="radio">
              <input type="radio" name="radius" value="3" v-model="searchForm.radius" number>
              3 km
            </label>
            <label class="radio">
              <input type="radio" name="radius" value="5" v-model="searchForm.radius" number>
              5 km
            </label>
            <label class="radio">
              <input type="radio" name="radius" value="10" v-model="searchForm.radius" number>
              10 km
            </label>
            <label class="radio">
              <input type="radio" name="radius" value="4000" v-model="searchForm.radius" number>
              4.000 km
            </label>
          </p>
          <p class="control">
            <button class="button is-primary is-medium" :class="{ 'is-loading': searchForm.loading }" @click.prevent="search">
              Search
            </button>
          </p>
        </form>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <space-list
          :spaces="spaces">
        </space-list>
      </div>
    </section>
  </div>
</template>

<script>
import LocationInput from './partials/LocationInput'
import SpaceList from './space/SpaceList'
import Firebase from '../services/Firebase'
import GeoFire from 'geofire'

export default {
  components: {
    SpaceList,
    LocationInput
  },
  data () {
    return {
      searchForm: {
        location: {
          lat: '',
          lng: '',
          address: ''
        },
        radius: 10,
        loading: false
      },
      spaces: []
    }
  },
  methods: {
    search: function () {
      this.spaces = []
      this.searchForm.loading = true

      window.setTimeout(() => {
        let spacesRef = Firebase.child('spaces')
        let geoFire = new GeoFire(Firebase.child('_geofire/spaces'))
        let geoQuery = geoFire.query({
          center: [
            this.searchForm.location.lat,
            this.searchForm.location.lng
          ],
          radius: this.searchForm.radius
        })

        geoQuery.on('ready', () => {
          this.searchForm.loading = false

          geoQuery.cancel()
        })

        geoQuery.on('key_entered', (key, location, distance) => {
          spacesRef.child(key).once('value', data => {
            let space = data.val()
            space.distance = distance
            this.spaces.push(space)
          })
        })
      }, 500)
    }
  }
}
</script>
