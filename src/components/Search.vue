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
        <p class="control">
          <location-input :id="'location'">
            <input type="text" class="input is-medium" id="location" placeholder="Enter a location">
          </location-input>
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
import LocationInput from './partials/LocationInput'
import SpaceList from './space/SpaceList'

export default {
  components: {
    SpaceList,
    LocationInput
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
  }
}
</script>
