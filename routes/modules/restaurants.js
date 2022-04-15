const express = require('express')
const router = express.Router()

const Restaurantmodel = require('../../models/restaurant')
const restaurantList = require('../../models/seeds/restaurant.json')

router.get('/search', (req, res) => {
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

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('', (req, res) => {
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

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurantmodel.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurantmodel.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurantmodel.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router