<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <div class="content">
          <h2 class="title is-4">
            About your place
          </h2>
          <p>
            Enter some basic information about your place you want to rent.
          </p>
        </div>
      </div>
      <div class="column">
        <p class="control">
          <label class="label">
            Name
          </label>
          <input type="text" class="input" placeholder="You place's name" v-model="space.name">
        </p>
        <p class="control">
          <label class="label">
            Description
          </label>
          <input type="text" class="input" placeholder="Perhaps a few words about your space?" v-model="space.description">
        </p>
        <p class="control">
          <label class="label">
            Location
          </label>
          <location-input :location.sync="space.location" :id="'location'">
            <input type="text" class="input" id="location" placeholder="Enter a location" v-model="space.location.address">
          </location-input>
        </p>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column is-4">
        <div class="content">
          <h2 class="title is-4">
            Availability
          </h2>
          <p>
            Please specify on which days and hours of the day is your space available.
          </p>
        </div>
      </div>
      <div class="column">
        <p class="control">
          <label class="label">
            Add a availability slot
          </label>
        </p>
        <span class="select">
          <select v-model="filterForm.day">
            <option v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" :value="day">
              {{ day }}
            </option>
          </select>
        </span>
        <span class="select">
          <select v-model="filterForm.from">
            <option v-for="number in 24" :value="number + 1">{{ number + 1 }}:00</option>
          </select>
        </span>
        <span class="select">
          <select v-model="filterForm.to">
            <option v-for="number in 24" :value="number + 1">{{ number + 1 }}:00</option>
          </select>
        </span>
        <button class="button" @click.prevent="addFilter">Add filter</button>
        <hr>
        <table class="table is-striped" v-if="space.availability.length > 0">
          <thead>
            <tr>
              <th>
                Week day
              </th>
              <th>
                From
              </th>
              <th>
                To
              </th>
              <th>
                Remove?
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(index, filter) in space.availability">
              <td>
                {{ filter.day }}
              </td>
              <td>
                {{ filter.from }}:00
              </td>
              <td>
                {{ filter.to }}:00
              </td>
              <td>
                <button class="button is-small" @click.prevent="removeFilter(index)">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column is-4"></div>
      <div class="column">
        <button class="button is-primary is-medium" :class="{ 'is-loading': isLoading}" @click.prevent="saveSpace">
          Save
        </button>
      </div>
    </div>
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
      filterForm: {
        day: 'Monday',
        from: '8',
        to: '17'
      },
      timekitFilter: Object
    }
  },
  props: {
    space: Object,
    saveSpace: Function,
    isLoading: Boolean
  },
  computed: {
    timekitFilter: function () {
      let filter = {}

      filter.or = this.space.availability.map(slot => {
        return {
          specific_day_and_time: {
            day: slot.day,
            start: slot.from,
            end: slot.to
          }
        }
      })

      return filter
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
    }
  }
}
</script>
