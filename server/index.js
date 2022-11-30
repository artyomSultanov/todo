const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const config = require('./config')
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(router)

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`)
})
