// import Firebase from './Firebase'
import Timekit from 'timekit-sdk'

let config = { app: 'marketplace-demo' }

if (process.env.NODE_ENV === 'development') {
  config.apiBaseUrl = 'http://api-localhost.timekit.io/'
}

Timekit.configure(config)

// let firebaseAuth = Firebase.getAuth()
// if (firebaseAuth) {
//   Firebase.child('users/' + firebaseAuth.uid + '/timekit').once('value', function (data) {
//     let credentials = data.val()
//     Timekit.setUser(credentials.email, credentials.api_token)
//   })
// }

Timekit.setUser('hh@henninghorn.dk', 'PpHkb93DCwJDQQHNS09JLardIQczCuGa')

export default Timekit
