const express = require('express')
const router = express.Router()

const Restaurantmodel = require('../../models/restaurant')
const restaurantList = require('../../models/seeds/restaurant.json')


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