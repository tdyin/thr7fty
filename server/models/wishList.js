const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productIds: {
    type: [String]
  }
})

module.exports = mongoose.model('WishList', wishListSchema)