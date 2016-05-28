# Timekit Marketplace Demo

A quick showcase on how to integrate [Timekit](http://timekit.io) with a booking centered web app.

You can play around with a hosted version here:  
[https://marketplace-demo.timekit.io](https://marketplace-demo.timekit.io)

## How it works

As a vendor, you are able to create spaces available for bookings and add simple availability rules to them. Visitors can then book these spaces and the creator of them can confirm/decline bookings.

The booking flow uses the [Booking.js](http://github.com/timekit-io/booking-js) widget.

It uses Firebase for auth and DB, and integrates with Timekit through the [JavaScript SDK](http://github.com/timekit-io/js-sdk)

Feel free to contribute and comment.

## Setup your own copy
1. Clone repo
2. Create a free account and app on Firebase.io
  - Copy the contents of `/firebase-rules.json` into your Firebase app rules
  - Create a new user in "Auth" that you want to login with
  - In "Database", create a new entity with the following structure:
    ```
    users: {
      your-firebase-user-uid: {
        timekit: {
          api_token: "your-timekit-api-token",
          email: "your-timekit-email"
        }
      }
    }
    ```
4. Edit `/src/services/Settings.js` and to match your settings
  - `timekit-app` should be set to your app slug registered on Timekit
  - `timekit-api-url` should be the API base URL (default will do in most cases)
  - `firebase-url` can be found in your Firebase dashboard
5. Run `npm install` and `npm run dev` to compile and start the dev server
6. Open http://localhost:8080 in your browser
7. Login with a valid Timekit user

## Notes
There’s a few known bugs/features like:
- Not validating forms
- Not listing spaces by distance
- Not being able to save connecting existing Timekit user to app

## Technical details
The web app is build using [Vue.js](http://vuejs.org) and [Webpack](http://webpack.github.io), through [vue-cli](https://github.com/vuejs/vue-cli), and it uses [Firebase](https://www.firebase.com) for data storage.
