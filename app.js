const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('This is restaurant list page.')
})

app.listen(port, () => {
  console.log(`The express app is running on http://localhost:${port}`)
})