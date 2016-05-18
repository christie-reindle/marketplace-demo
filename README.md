# Timekit Marketplace Demo

A quick showcase on how to integrate [Timekit](http://timekit.io) with a booking centered web app.

You are able to create spaces available for bookings and add simple availability rules to them. User can then book these spaces and the creator of them can confirm/decline bookings.
The booking flow uses the [Booking.js](http://booking.timekit.io) widget.

Feel free to contribute and comment.

## Setup your own copy
1. Clone repo
2. Edit `/src/services/Settings.js` and to match your settings
3. Copy the contents of `/firebase-rules.json` into your Firebase app rules
4. Run `npm install` and `npm run dev` to test

## Notes
There’s a few bugs/features like:
- Not validating forms
- Not listing spaces by distance
- Not being able to save connecting existing Timekit user to app

## Technical details
The web app is build using [Vue.js](http://vuejs.org) and [Webpack](http://webpack.github.io), through [vue-cli](https://github.com/vuejs/vue-cli), and it uses [Firebase](https://www.firebase.com) for data storage.