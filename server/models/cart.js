const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productIds: {
    type: [String]
  }
})

module.exports = mongoose.model('Cart', cartSchema)