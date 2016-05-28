import Timekit from 'timekit-sdk'
import Settings from './Settings'

let config = {
  app: Settings.get('timekit-app'),
  apiBaseUrl: Settings.get('timekit-api-url')
}

Timekit.configure(config)

if (Settings.get('timekit-email') && Settings.get('timekit-api-token')) {
  Timekit.setUser(Settings.get('timekit-email'), Settings.get('timekit-api-token'))
}

export default Timekit
