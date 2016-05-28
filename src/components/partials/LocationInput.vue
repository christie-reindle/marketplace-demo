<template>
  <slot></slot>
</template>
<script>
import GoogleMapsLoader from 'google-maps'
import Settings from '../../services/Settings'

export default {
  props: {
    location: {
      lat: '',
      lng: '',
      address: ''
    },
    id: String
  },
  ready: function () {
    GoogleMapsLoader.LIBRARIES = ['places']
    GoogleMapsLoader.KEY = Settings.get('google-maps-key')
    GoogleMapsLoader.load(google => {
      let input = document.getElementById(this.id)
      let autocomplete = new google.maps.places.Autocomplete(input)

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let place = autocomplete.getPlace()

        let location = {
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }

        this.location = location
      })
    })
  }
}
</script>
