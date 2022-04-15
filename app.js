const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') // 載入 mongoose
const methodOverride = require('method-override')

const Restaurantmodel = require('./models/restaurant')  // 載入 Restaurant model
const restaurantList = require('./models/seeds/restaurant.json')

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

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Restaurantmodel.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keyword_sm = keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    if (keyword.length > 0) {
      return restaurant.name.toLowerCase().includes(keyword_sm) ||
        restaurant.category.toLowerCase().includes(keyword_sm)
    } else {
      return res.redirect('/')
    }
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
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

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurantmodel.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurantmodel.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.nameInput
  const nameEn = req.body.nameEnInput
  const category = req.body.categoryInput
  const image = req.body.imageInput
  const location = req.body.locationInput
  const phone = req.body.phoneInput
  const googleMap = req.body.googleMapInput
  const rating = req.body.ratingInput
  const description = req.body.descriptionInput

  return Restaurantmodel.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.name_en = nameEn
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = googleMap
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurantmodel.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`The express app is running on http://localhost:${port}`)
})