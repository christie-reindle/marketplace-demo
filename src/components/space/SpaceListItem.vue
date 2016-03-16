<template>
  <div>
    <div class="content">
      <h2 class="title">
        {{ space.name }}
      </h2>
      <p class="subtitle is-6">
        {{ space.location.address }} <small>({{ parseFloat(space.distance).toFixed(2) }} km away)</small>
      </p>
      <p>
        {{ space.description }}
      </p>
      <button
        class="button is-success"
        :class="{ 'is-loading': isLoading, 'is-disabled': timeslots.length == 0 }"
        @click.prevent="bookSpace">
        Book space
      </button>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import Api from '../../services/Api'

export default {
  props: {
    space: Object,
    filters: Object
  },
  data () {
    return {
      isLoading: true,
      timeslots: {}
    }
  },
  methods: {
    findTime: function () {
      this.isLoading = true

      Api.findTime({
        calendar_ids: [
          this.space.calendar_id
        ],
        filtercollection_id: this.space.filter_id,
        start: '1 day',
        future: '10 days',
        length: this.filters.length
      })
      .then(response => {
        this.isLoading = false
        this.timeslots = response.data
      })
      .catch(error => {
        console.log('findtime error', error)
        this.isLoading = false
      })
    },
    bookSpace: function () {
      this.$dispatch('book-space', this.space)
    }
  },
  created: function () {
    this.findTime()
  },
  filters: {
    moment: function (timestamp) {
      return Moment(timestamp).format('HH:mm D/M YYYY')
    }
  },
  events: {
    'filter-update': function () {
      this.findTime()
    }
  }
}
</script>
