const { builtinModules } = require('module')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Array,
    required: true
  },
  wishlist: {
    type: Array,
    required: true
  },
  order_history: {
      type: Array,
      required: true
  }
})

module.exports = mongoose.model('User', userSchema)