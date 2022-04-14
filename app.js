const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') // 載入 mongoose
const Restaurantmodel = require('./models/restaurant')  // 載入 Restaurant model

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurantmodel.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.nameInput
  const nameEn = req.body.nameEnInput
  const category = req.body.categoryInput
  const image = req.body.imageInput
  const location = req.body.locationInput
  const phone = req.body.phoneInput
  const googleMap = req.body.googleMapInput
  const rating = req.body.ratingInput
  const description = req.body.descriptionInput

  return Restaurantmodel.create({
    name, name_en: nameEn, category, image, location, phone, google_map: googleMap, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`The express app is running on http://localhost:${port}`)
})