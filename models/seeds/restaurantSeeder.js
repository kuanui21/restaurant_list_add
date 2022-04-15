const Restaurantmodel = require('../restaurant')  // 載入 Restaurant model
const restaurantList = require('./restaurant.json')  // 載入種子資料的路徑
const db = require('../../config/mongoose')

const restaurant_list = restaurantList.results

db.once('open', () => {
  restaurant_list.forEach(restaurant => {
    Restaurantmodel.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })

  console.log('done')
})