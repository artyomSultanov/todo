require('dotenv').config()

module.exports = {
  port: process.env.PORT ?? 7000,
  app: {
    apiUrl: process.env.API_URL,
  },
}
