<template>
  <div>
    <section class="hero is-success is-bold is-medium is-left">
      <div class="hero-content">
        <div class="container">
          <h1 class="title is-2">Search for a space</h1>
          <p class="subtitle is-5">Find nearby and available spaces</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <p class="control">
          <input type="text" class="input is-large" placeholder="Enter a location" id="location">
        </p>
        <p class="control">
          Find places within
        </p>
        <p class="control">
          <label class="radio">
            <input type="radio" name="radius">
            1 km
          </label>
          <label class="radio">
            <input type="radio" name="radius">
            3 km
          </label>
          <label class="radio">
            <input type="radio" name="radius">
            5 km
          </label>
          <label class="radio">
            <input type="radio" name="radius">
            10 km
          </label>
        </p>
        <p class="control">
          <button class="button is-primary is-medium">
            Search
          </button>
        </p>
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
import SpaceList from './space/SpaceList'
import GoogleMapsLoader from 'google-maps'

export default {
  components: {
    SpaceList
  },
  data () {
    return {
      location: {},
      spaces: [
        {
          name: 'A space',
          description: 'Wow, something awesome'
        },
        {
          name: 'B space',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, porro!'
        },
        {
          name: 'C space',
          description: 'Lorem ipsum dolor sit amet.'
        }
      ]
    }
  },
  ready: function () {
    GoogleMapsLoader.LIBRARIES = ['places']
    GoogleMapsLoader.load(google => {
      let input = document.getElementById('location')
      let autocomplete = new google.maps.places.Autocomplete(input)

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let place = autocomplete.getPlace()
        let location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }

        this.location = location
      })
    })
  }
}
</script>
