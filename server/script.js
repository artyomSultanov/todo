const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('It is working')
})

app.listen(4242, () => {
  console.log('Listening port 4242')
})
