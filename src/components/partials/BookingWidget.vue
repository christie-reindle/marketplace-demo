<template>
  <div>
    <div class="container">
      <div id="bookingjs"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    space: Object,
    filters: Object
  },
  data () {
    return {
      email: 'hh@henninghorn.dk',
      apiToken: 'GcRwTGIxurEYF7UQ7fN7P6Anw0iYu8n1'
    }
  },
  ready: function () {
    this.initBookingWidget()
  },
  methods: {
    initBookingWidget: function () {
      let widget = new window.TimekitBooking()

      widget.init({
        name: this.space.name,
        email: this.email,
        apiToken: this.apiToken,
        calendar: this.space.calendar_id,
        timekitConfig: {
          app: 'marketplace-demo',
          apiBaseUrl: 'http://api-localhost.timekit.io/'
        },
        timekitFindTime: {
          filtercollection_id: this.space.filter_id,
          length: this.filters.length
        },
        timekitCreateBooking: {
          graph: 'instant',
          action: 'confirm'
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
