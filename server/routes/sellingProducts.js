const express = require('express')
const router = express.Router()
const SellingProducts = require('../models/sellingProducts')

// Getting all
router.get('/getSellingProducts', async (req, res) => {
    try{
        const sellingProducts = await SellingProducts.find()
        res.json(sellingProducts)
    } catch (err ){
        res.status(500).json({ message: err.message })
    }
})
// Getting one
router.get('/getSellingProducts/:userId', getSellingProducts, (req, res) => {
  res.send(res.sellingProducts)
})
// Creating one
router.post('/createSellingProducts', async (req, res) => {
    const sellingProducts = new SellingProducts ({
      userId: req.body.userId,
      productsSold: []
    })

    try{
        const newSellingProducts = await sellingProducts.save()
        res.status(201).json(newSellingProducts)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
}) 

//Push in Products sold
router.post('/addProductsSold/:userId/:productId', async (req, res) => {
  let sellingProducts
  const query = { userId: req.params.userId };
  let productSold = req.params.productId;
  try {
    sellingProducts = await SellingProducts.find({"userId": req.params.userId})
    console.log(sellingProducts[0])
    let isIncluded = false
    for (let i in sellingProducts[0].productsSold) {
      if (sellingProducts[0].productsSold[i] == productSold){
          isIncluded = true;
          break
      }
    }
    if (isIncluded != true) {
      const updatedSellingProducts = await SellingProducts.updateOne(query, 
        { $push: { productsSold: productSold } });
      res.status(201).json(updatedSellingProducts)
    } else{
    res.status(200).json({message: "Product has already been added to cart"})
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// Remove from Cart
router.post('/removeProductsSold/:userId/:productId', async (req, res) => {
  let sellingProducts
  const query = { userId: req.params.userId };
  let productSold = req.params.productId;
  try {
    sellingProducts = await SellingProducts.find({"userId": req.params.userId})
    console.log(sellingProducts[0].productsSold)
    let isIncluded = false
    for (let i in sellingProducts[0].productsSold) {
      if (sellingProducts[0].productsSold[i] == productSold){
          isIncluded = true;
          break
      }
    }
    if (isIncluded == true) {
      const updatedSellingProducts = await SellingProducts.updateOne(query, 
        { $pull: { productsSold: productSold } });
      res.status(201).json(updatedSellingProducts)
    } else{
      res.status(200).json({message: "Product has already been removed from cart"})
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// Deleting one
router.delete('/deleteSellingProducts/:userId', async (req, res) => {
    try{
      await SellingProducts.remove({"userId": req.params.userId})
      res.json({ message: 'Deleted Selling History' })
    } catch (err){
      res.json({ message: err.message })
    }
})

async function getSellingProducts(req, res, next) {
  let sellingProducts
  try {
    sellingProducts = await SellingProducts.find({"userId": req.params.userId})
    if (sellingProducts == null) {
      return res.status(404).json({ message: 'Cannot find selling History' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.sellingProducts = sellingProducts
  next()
}

module.exports = router
