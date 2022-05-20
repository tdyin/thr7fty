const { builtinModules } = require('module')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  imgurl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)