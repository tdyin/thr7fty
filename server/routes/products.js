const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// Search
router.get('/searchProducts/:title', async (req, res) => {
  try {
    const title = req.params.title
    Product.find({title:{$regex: title, $options: '$i'}})
      .then(data => {
        res.send(data)
      })
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})
// Getting all
router.get('/getProducts', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) { 
    res.status(500).json({message: err.message})
  }
})
// Getting one
router.get('/getProduct/:id', getProduct, (req, res) => {
  res.send(res.product)
})
// Creating one
router.post('/addProduct', async (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
    price: req.body.price,
    brand: req.body.brand,
    size: req.body.size,
    condition: req.body.condition,
    imgurl: req.body.imgurl
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}) 
// Updating one
router.patch('/updateProduct/:id', getProduct, async (req, res) => {
  if (req.body.title != null) {
    res.product.title = req.body.title
  }
  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  if (req.body.categories != null) {
    res.product.categories = req.body.categories
  }
  if (req.body.price != null) {
    res.product.price = req.body.price
  }
  if (req.body.brand != null) {
    res.product.brand = req.body.brand
  }
  if (req.body.size != null) {
    res.product.size = req.body.size
  }
  if (req.body.condition != null) {
    res.product.condition = req.body.condition
  }
  if (req.body.imgurl != null) {
    res.product.imgurl = req.body.imgurl
  }
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
// Deleting one
router.delete('/deleteProduct/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove()
    res.json({ message: 'Deleted Product' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
}

module.exports = router
