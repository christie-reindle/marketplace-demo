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
        <div class="columns">
          <div class="column is-4">
            <div class="content">
              <h2 class="title is-4">
                About your place
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate totam, saepe ipsum libero possimus expedita quibusdam ullam asperiores eum temporibus.
              </p>
            </div>
          </div>
          <div class="column">
            <p class="control">
              <label class="label">
                Name
              </label>
              <input type="text" class="input" placeholder="You place's name">
            </p>
            <p class="control">
              <label class="label">
                Description
              </label>
              <input type="text" class="input" placeholder="A few words about your space">
            </p>
            <p class="control">
              <label class="label">
                Location
              </label>
              <location-input :location.sync="location" :id="'location'">
                <input type="text" class="input" id="location" placeholder="Enter a location">
              </location-input>
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4">
            <div class="content">
              <h2 class="title is-4">
                Availability
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, nobis.
              </p>
            </div>
          </div>
          <div class="column">
            <select name="" id="">
              <option v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" :value="day">
                {{ day }}
              </option>
            </select>
            <select name="" id="">
              <option v-for="number in 24" :value="number + 1">{{ number + 1 }}:00</option>
            </select>
            <select name="" id="">
              <option v-for="number in 24" :value="number + 1">{{ number + 1 }}:00</option>
            </select>
            <ul v-if="availability.length > 0">
              <li v-for="slot in availability">
                Day: {{ slot.day }} | From: {{ slot.from }} | To: {{ slot.to }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LocationInput from '../partials/LocationInput'

export default {
  components: {
    LocationInput
  },
  data () {
    return {
      location: {},
      availability: []
    }
  }
}
</script>
