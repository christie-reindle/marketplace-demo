import Timekit from 'timekit-sdk'

let config = { app: 'marketplace-demo' }

if (process.env.NODE_ENV === 'development') {
  config.apiBaseUrl = 'http://api-localhost.timekit.io/'
}

Timekit.configure(config)

export default Timekit
