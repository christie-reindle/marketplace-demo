import Firebase from './Firebase'

let Auth = (function () {
  var user = Firebase.getAuth()

  Firebase.onAuth(function (authData) {
    user = authData
  })

  var Auth = {}

  Auth.isAuthenticated = function () {
    return user !== null
  }

  Auth.loginPassword = function (email, password) {
    return Firebase.authWithPassword({
      email: email,
      password: password
    })
  }

  Auth.logout = function () {
    Firebase.unauth()
  }

  Auth.getUser = function () {
    return user
  }

  Auth.onAuthChange = function (fn) {
    Firebase.onAuth(fn)
  }

  return Auth
})()

export default Auth
