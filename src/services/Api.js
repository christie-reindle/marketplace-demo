import Timekit from 'timekit-sdk'
import Settings from './Settings'

let config = { app: Settings.get('timekit-app') }

if (process.env.NODE_ENV === 'development') {
  config.apiBaseUrl = 'http://api-localhost.timekit.io/'
}

Timekit.configure(config)

if (Settings.get('timekit-email') && Settings.get('timekit-api-token')) {
  Timekit.setUser(Settings.get('timekit-email'), Settings.get('timekit-api-token'))
}

export default Timekit
