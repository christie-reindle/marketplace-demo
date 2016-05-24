import Storage from 'putainde-localstorage'

let store = Storage.create({
  namespace: 'marketplace'
})

store.set('timekit-app', 'marketplace-demo')
store.set('firebase-url', 'https://timekit-rmt.firebaseio.com/')

if (process.env.NODE_ENV === 'development') {
  store.set('timekit-api-url', 'http://api-localhost.timekit.io/')
} else {
  store.set('timekit-api-url', 'http://api.timekit.io/')
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
