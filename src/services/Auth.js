import Firebase from './Firebase'

let Auth = (function () {
  var user = Firebase.getAuth()

  var Auth = {}

  Auth.isAuthenticated = function () {
    return user !== null
  }

  Auth.loginFacebook = function () {
    Firebase.authWithOAuthRedirect('facebook', function (error) {
      console.log('Facebook login error', error)
    }, {
      scope: 'email'
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
