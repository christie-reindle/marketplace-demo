import Storage from 'putainde-localstorage'

let store = Storage.create({
  namespace: 'marketplace'
})

store.set('timekit-app', 'marketplace-demo')
store.set('firebase-url', 'https://timekit-rmt.firebaseio.com/')
store.set('google-maps-key', 'AIzaSyACwmNz_uSpQQTao9KStvrYdDJV7qgRfXA')
store.set('default-user-email', 'marketplace-demo@timekit.io')
store.set('default-user-password', 'marketplace-demo-password')

if (process.env.NODE_ENV === 'development') {
  store.set('timekit-api-url', 'http://api-localhost.timekit.io/')
} else {
  store.set('timekit-api-url', 'https://api.timekit.io/')
}

function get (key) {
  return store.get(key)
}

function set (key, value) {
  store.set(key, value)
}

function remove (key) {
  store.remove(key)
}

export default {
  get,
  set,
  remove
}
