import Login from '../components/Login'
import Overview from '../components/Overview'

export default function (router) {
  router.map({
    '/login': {
      name: 'login',
      component: Login,
      layout: 'isolated'
    },

    '/overview': {
      name: 'overview',
      component: Overview
    }
  })

  router.redirect({
    '*': 'overview'
  })
}
