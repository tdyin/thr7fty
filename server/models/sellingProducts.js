const mongoose = require('mongoose')

const sellingProductsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productsSold:{ 
    type:[String]
    }

})

module.exports = mongoose.model('sellingProducts', sellingProductsSchema)