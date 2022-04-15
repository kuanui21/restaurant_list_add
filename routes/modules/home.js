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

module.exports = router