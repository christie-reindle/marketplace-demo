import Timekit from 'timekit-sdk'

let config = { app: 'marketplace-demo' }

if (process.env.NODE_ENV === 'development') {
  config.apiBaseUrl = 'http://api-localhost.timekit.io/'
}

Timekit.configure(config)
Timekit.setUser('hh@henninghorn.dk', 'GcRwTGIxurEYF7UQ7fN7P6Anw0iYu8n1')

export default Timekit
