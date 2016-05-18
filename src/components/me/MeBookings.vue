<template>
  <div>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Email
          </th>
          <th>
            Time
          </th>
          <th>
            Space
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings">
          <td>
            <template v-for="customer in booking.customers">
              {{ customer.name }}
            </template>
          </td>
          <td>
            <template v-for="customer in booking.customers">
              {{ customer.email }}
            </template>
          </td>
          <td>
            {{ booking.attributes.event_info.start | moment }} - {{ booking.attributes.event_info.end | moment }}
          </td>
          <td>
            x
          </td>
          <td>
            <confirm-decline
              :booking="booking">
            </confirm-decline>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Api from '../../services/Api'
import ConfirmDecline from '../booking/ConfirmDecline'
import Moment from 'moment'

export default {
  components: {
    ConfirmDecline
  },
  data () {
    return {
      bookings: []
    }
  },
  filters: {
    moment: function (timestamp) {
      return Moment(timestamp).format('HH:mm D/M YYYY')
    }
  },
  ready: function () {
    Api.getBookings()
    .then(response => {
      this.bookings = response.data
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>
