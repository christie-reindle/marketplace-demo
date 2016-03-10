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
          <span class="select">
            <select name="" id="">
              <option value="">Within 1 km</option>
              <option value="">Within 3 km</option>
              <option value="">Within 5 km</option>
              <option value="">Within 10 km</option>
            </select>
          </span>
        </p>
        Location: {{ location | json }}
      </div>
    </section>
  </div>
</template>

<script>
import GoogleMapsLoader from 'google-maps'

export default {
  data () {
    return {
      location: {}
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
