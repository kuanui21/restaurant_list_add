const express = require('express')
const router = express.Router()

const Restaurantmodel = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurantmodel.find()
    .lean()
    .sort({ _id: "asc" })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {

  const keyword = req.query.keyword
  const keyword_sm = keyword.toLowerCase()

  if (keyword.length <= 0) {
    return res.redirect('/')
  }

  Restaurantmodel.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword_sm) ||
          restaurant.category.toLowerCase().includes(keyword_sm)
      })
      res.render('index', { restaurants: filterRestaurants, keyword, })
    })
    .catch(error => console.log(error))
})

module.exports = router