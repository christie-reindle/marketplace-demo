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
            <article class="message is-danger" v-show="searchForm.empty">
              <div class="message-body">
                Please enter a location
              </div>
            </article>
            <p class="control">
              <location-input :location.sync="searchForm.location" :id="'location'">
                <input type="text" class="input is-medium" id="location" placeholder="Enter a location">
              </location-input>
            </p>
            <p class="control">
              Find places within a radius of
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
            <p><i>Tip: Try searching for "Copenhagen"</i></p>
          </form>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-4 content" v-if="spaces.length > 0">
              <h3 class="title">
                Booking preferences
              </h3>
              <p class="subtitle is-6">
                Check availability across search results
              </p>
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
                <label class="label">
                  Available within
                </label>
                <span class="select">
                  <select v-model="filtersForm.future">
                    <option v-for="days in 7" :value="(days + 1) + ' days'">
                      {{ (days + 1) }} days
                    </option>
                  </select>
                </span>
              </p>
              <p class="control">
                <button class="button is-info is-small" @click.prevent="updateFilter">
                  Update filter
                </button>
              </p>
            </div>
            <div class="column">
              <space-list
                :spaces="spaces"
                :filters="filtersForm">
              </space-list>
            </div>
          </div>
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
        loading: false,
        empty: false
      },
      filtersForm: {
        length: '1 hours',
        future: '1 days'
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
        if (this.searchForm.location.address === '') {
          this.searchForm.empty = true
          this.searchForm.loading = false
          return
        } else {
          this.searchForm.empty = false
        }

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
          spacesRef.child(key).once('value')
          .then(data => {
            if (data.exists()) {
              let space = Object.assign({ distance: distance }, data.val())
              this.spaces.push(space)
            }
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
