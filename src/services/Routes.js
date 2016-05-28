import Auth from '../services/Auth'
import About from '../components/About'
import Search from '../components/Search'
import SpaceCreate from '../components/space/SpaceCreate'
import Me from '../components/Me'
import MeBookings from '../components/me/MeBookings'
import MeSpaces from '../components/me/MeSpaces'
import MeSpacesEdit from '../components/me/MeSpacesEdit'

export default function (router) {
  router.map({
    '/about': {
      name: 'about',
      component: About,
      layout: 'default'
    },

    '/search': {
      name: 'search',
      component: Search,
      layout: 'default'
    },

    '/create_space': {
      name: 'create_space',
      component: SpaceCreate,
      layout: 'default',
      auth: true
    },

    '/me': {
      name: 'me',
      component: Me,
      layout: 'default',
      auth: true,
      subRoutes: {
        '/bookings': {
          name: 'me_bookings',
          component: MeBookings
        },
        '/spaces': {
          name: 'me_spaces',
          component: MeSpaces
        },
        '/spaces/:id': {
          name: 'me_spaces_edit',
          component: MeSpacesEdit
        }
      }
    }
  })

  router.redirect({
    '*': 'search'
  })

  router.beforeEach(function (transition) {
    if (transition.to.auth && !Auth.isAuthenticated()) {
      transition.redirect('/')
    } else {
      transition.next()
    }
  })
}
