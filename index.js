const express = require('express')
const app = express()
const port = 3000

// routes
app.get('/', (req, res) => {
  res.send('Home Page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
