<template>
  <div>
    <div class="container">
      <div id="bookingjs"></div>
    </div>
  </div>
</template>

<script>
import Firebase from '../../services/Firebase'
import Settings from '../../services/Settings'

export default {
  props: {
    space: Object,
    filters: Object
  },
  data () {
    return {
      email: 'hh@henninghorn.dk',
      apiToken: 'PpHkb93DCwJDQQHNS09JLardIQczCuGa'
    }
  },
  ready: function () {
    Firebase.child('users/' + this.space.owner + '/timekit').once('value', data => {
      let timekitCredentials = data.val()
      this.initBookingWidget(timekitCredentials.email, timekitCredentials.api_token)
    })
  },
  methods: {
    initBookingWidget: function (email, token) {
      let widget = new window.TimekitBooking()

      widget.init({
        name: this.space.name,
        email: email,
        apiToken: token,
        calendar: this.space.calendar_id,
        timekitConfig: {
          app: Settings.get('timekit-app'),
          apiBaseUrl: Settings.get('timekit-api-url')
        },
        timekitFindTime: {
          filtercollection_id: this.space.filter_id,
          start: 'today',
          length: this.filters.length,
          future: this.filters.future
        },
        timekitCreateBooking: {
          graph: 'confirm_decline',
          action: 'create',
          where: this.space.location.address
        },
        callbacks: {
          createBookingSuccessful: (response) => {
            console.log('DONE', response)
          }
        }
      })
    }
  }
}
</script>
