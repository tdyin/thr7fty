const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const Product = require('../models/product')

// Getting one
router.get('/getCart/:userId', async (req, res) => {
  try {
    let cart = await Cart.find({ userId: req.params.userId })

    const cartProducts = []
    for (const id of cart[0].productIds) {
      const product = await Product.findById(id)
      cartProducts.push(product)
    }

    // res.json(cart)
    res.json(cartProducts)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// Creating one
router.post('/createCart', async (req, res) => {
  const cart = new Cart({
    userId: req.body.userId,
    productIds: [],
  })
  try {
    const newCart = await cart.save()
    res.status(201).json(newCart)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting a Cart
router.delete('/deleteCart/:userId', getCart, async (req, res) => {
  try {
    await res.cart.remove()
    res.json({ message: 'Deleted Cart' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Add to Cart
router.post('/addToCart/:userId/:productId', async (req, res) => {
  let cart
  const query = { id: req.params.userId }
  let productId = req.params.productId
  try {
    cart = await Cart.find({ userId: req.params.userId })
    // console.log(cart[0])
    let isIncluded = false
    for (i = 0; i < cart[0].productIds.length; i++) {
      if (cart[0].productIds[i] == productId) {
        isIncluded = true
        break
      }
    }
    if (isIncluded != true) {
      const updatedCart = await Cart.updateOne(
        { userId: req.params.userId },
        { $push: { productIds: productId } }
      )
      res.status(201).json(updatedCart)
    } else {
      res
        .status(400)
        .json({ message: 'Product has already been added to cart' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Remove from Cart
router.post('/removeFromCart/:userId/:productId', async (req, res) => {
  let cart
  const query = { id: req.params.userId }
  let productId = req.params.productId
  try {
    cart = await Cart.find({ userId: req.params.userId })
    console.log(cart[0].productIds)
    let isIncluded = false
    for (i = 0; i < cart[0].productIds.length; i++) {
      if (cart[0].productIds[i] == productId) {
        isIncluded = true
        break
      }
    }
    if (isIncluded == true) {
      const updatedCart = await Cart.updateOne(
        { userId: req.params.userId },
        { $pull: { productIds: productId } }
      )
      res.status(201).json(updatedCart)
    } else {
      res
        .status(200)
        .json({ message: 'Product has already been removed from cart' })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Clear Cart
router.post('/clearCart/:userId/', async (req, res) => {
  const query = { id: req.params.userId }
  try {
    const updatedCart = await Cart.updateOne(
      { userId: req.params.userId },
      { $set: { productIds: [] } }
    )
    res.status(201).json(updatedCart)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

async function getCart(req, res, next) {
  let cart
  try {
    cart = await Cart.find({ userId: req.params.userId })
    if (cart == null) {
      return res.status(404).json({ message: 'Cannot find cart' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.cart = cart
  next()
}

module.exports = router
