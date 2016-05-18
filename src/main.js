import Vue from 'vue'
import Router from './services/Router'

if (process.env.NODE_ENV === 'development') {
  Vue.config.debug = true
}

/* eslint-disable no-new */
Router(Vue)

/*
new Vue({
  el: 'body',
  components: { App }
})
*/
