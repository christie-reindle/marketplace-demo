<template>
  <div>
    <template v-if="!booking.completed">
      <button type="button" class="button is-success is-small" @click.prevent="confirm"
        :class="{ 'is-loading': isLoading == 'confirm', 'is-disabled': isLoading }">
        Confirm
      </button>
      <button type="button" class="button is-danger is-small" @click.prevent="decline"
        :class="{ 'is-loading': isLoading == 'decline', 'is-disabled': isLoading }">
        Decline
      </button>
    </template>
    <template v-if="booking.completed">
      <span class="tag is-success" v-if="booking.state == 'confirmed'">
        Confirmed
      </span>
      <span class="tag is-danger" v-if="booking.state == 'declined'">
        Declined
      </span>
    </template>
  </div>
</template>

<script>
import Api from '../../services/Api'

export default {
  props: {
    booking: Object
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    confirm: function () {
      this.handleBooking('confirm')
    },
    decline: function () {
      this.handleBooking('decline')
    },
    handleBooking: function (action) {
      this.isLoading = action

      Api.updateBooking({
        id: this.booking.id,
        action: action
      })
      .then(response => {
        this.booking = response.data
        this.isLoading = false
      })
      .catch(error => {
        console.log('TK error', error)
        this.isLoading = false
      })
    }
  }
}
</script>
