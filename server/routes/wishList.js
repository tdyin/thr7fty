const express = require('express')
const router = express.Router()
const WishList = require('../models/wishList')
const Product = require('../models/product')

// Getting one
router.get('/getWishList/:userId', async (req, res) => {
  try {
    
    let wishList = await WishList.find({userId: req.params.userId})
    // console.log(wishList)
    const wishListProducts = []
    for (const id of wishList[0].productIds) {
      const product = await Product.findById(id)
      wishListProducts.push(product)
    }
    res.json(wishListProducts)
    // res.json(wishList)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// Creating one
router.post('/createWishList', async (req, res) => {
  const wishList = new WishList({
    userId: req.body.userId,
    productIds: []
  })
  try {
    const newWishList = await wishList.save()
    res.status(201).json(newWishList)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}) 

// Deleting a Wish List
router.delete('/deleteWishList/:userId', getWishList, async (req, res) => {
  try {
    await res.wishList.remove()
    res.json({ message: 'Deleted Wish List' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Add to Wish List
router.post('/addToWishList/:userId/:productId', async (req, res) => {
  let wishList
  const query = { id: req.params.userId };
  let productId = req.params.productId;
  try {
    wishList = await WishList.find({"userId": req.params.userId})
    console.log(wishList[0].productIds)
    let isIncluded = false
    for (i=0; i < wishList[0].productIds.length; i++) {
      if (wishList[0].productIds[i] == productId) {
          isIncluded = true;
          break
      }
    }
    if (isIncluded != true) {
      const updatedWishList = await WishList.updateOne({userId: req.params.userId},
        { $push: { productIds: productId } });
      res.status(201).json(updatedWishList)
    } else {
      res.status(200).json({message: "Product has already been added to wish list"})
    }
    
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// Remove from Wish List
router.post('/removeFromWishList/:userId/:productId', async (req, res) => {
  let wishList
  const query = { id: req.params.userId };
  let productId = req.params.productId;
  try {
    wishList = await WishList.find({"userId": req.params.userId})
    console.log(wishList[0].productIds)
    let isIncluded = false
    for (i=0; i < wishList[0].productIds.length; i++) {
      
      if (wishList[0].productIds[i] == productId) {
          isIncluded = true;
          break
      }
    }
    if (isIncluded == true) {
      const updatedWishList = await WishList.updateOne({userId: req.params.userId}, 
        { $pull: { productIds: productId } });
      res.status(201).json(updatedWishList)
    } else {
      res.status(200).json({message: "Product has already been removed from wish list"})
    }
    
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});


async function getWishList(req, res, next) {
  let wishList
  try {
    wishList = await WishList.find({"userId": req.params.userId})
    if (wishList == null) {
      return res.status(404).json({ message: 'Cannot find wishList' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.wishList = wishList
  next()
}

module.exports = router
