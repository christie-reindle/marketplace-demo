import Login from '../components/Login'
import Introduction from '../components/Introduction'
import Search from '../components/Search'

export default function (router) {
  router.map({
    '/login': {
      name: 'login',
      component: Login,
      layout: 'default'
    },

    '/introduction': {
      name: 'introduction',
      component: Introduction,
      layout: 'default'
    },

    '/search': {
      name: 'search',
      component: Search,
      layout: 'default'
    }
  })

  router.redirect({
    '*': 'introduction'
  })
}
