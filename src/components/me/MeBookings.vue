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
            Space
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
            .
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Api from '../../services/Api'

export default {
  data () {
    return {
      bookings: []
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
