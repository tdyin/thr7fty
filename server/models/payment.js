const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  securityNumber: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Payment', paymentSchema)