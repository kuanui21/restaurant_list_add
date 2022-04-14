const mongoose = require('mongoose')
const Restaurantmodel = require('../restaurant')  // 載入 Restaurant model
const restaurantList = require('./restaurant.json')  // 載入種子資料的路徑

const restaurant_list = restaurantList.results

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

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