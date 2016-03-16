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
    <div v-show="view == 'search'">
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
            <hr>
            <p class="control">
              <label class="label">
                Booking length
              </label>
              <span class="select">
                <select v-model="filtersForm.length">
                  <option v-for="hours in 8" :value="(hours + 1) + ' hours'">
                    {{ (hours + 1) }} hours
                  </option>
                </select>
              </span>
            </p>
            <p class="control">
              <button class="button is-small" @click.prevent="updateFilter">
                Update filter
              </button>
            </p>
          </form>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <space-list
            :spaces="spaces"
            :filters="filtersForm">
          </space-list>
        </div>
      </section>
    </div>
    <template v-if="view == 'booking'">
      <section class="section">
        <div class="container">
          <div class="content">
            <h2 class="title is-3">
              {{ selectedSpace.name }}
            </h2>
            <p class="subtitle">
              Complete the booking using Timekit's Booking.js widget below
            </p>
            <button class="button is-small is-danger is-outlined" @click.prevent="view = 'search'">
              Cancel booking
            </button>
            <booking-widget
              :space="selectedSpace"
              :filters="filtersForm">
            </booking-widget>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import LocationInput from './partials/LocationInput'
import SpaceList from './space/SpaceList'
import Firebase from '../services/Firebase'
import GeoFire from 'geofire'
import BookingWidget from './partials/BookingWidget'

export default {
  components: {
    SpaceList,
    LocationInput,
    BookingWidget
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
      filtersForm: {
        length: '1 hours'
      },
      spaces: [],
      view: 'search'
    }
  },
  methods: {
    updateFilter: function () {
      this.$broadcast('filter-update')
    },
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
            let space = Object.assign({ distance: distance }, data.val())
            this.spaces.push(space)
          })
        })
      }, 500)
    }
  },
  events: {
    'book-space': function (space) {
      this.selectedSpace = space
      this.view = 'booking'
    }
  }
}
</script>
