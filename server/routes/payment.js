const express = require('express')
const router = express.Router()
const Payment = require('../models/payment')

// Getting all
router.get('/getPayment', async (req, res) => {
    try{
        const payment = await Payment.find()
        res.json(payment)
    } catch (err ){
        res.status(500).json({ message: err.message })
    }
})
// Getting one
router.get('/getPayment/:id', getPayment, (req, res) => {
  res.send(res.payment)
})
// Creating one
router.post('/createPayment', async (req, res) => {
    const payment = new Payment ({
        name: req.body.name,
        address: req.body.address,
        cardNumber: req.body.cardNumber,
        expirationDate: req.body.expirationDate,
        securityNumber: req.body.securityNumber,
    })

    try{
        const newPayment = await payment.save()
        res.status(201).json(newPayment)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
}) 
// Updating one
 router.patch('/updatePayment/:id', getPayment, async (req, res) => {
    if (req.body.name != null) {
        res.payment.name = req.body.name
      }
      if (req.body.address != null) {
        res.payment.address = req.body.address
      }
      if (req.body.cardNumber != null) {
        res.payment.cardNumber = req.body.cardNumber
      }
      if (req.body.expirationDate != null) {
        res.payment.expirationDate = req.body.expirationDate
      }
      if (req.body.securityNumber != null) {
        res.payment.securityNumber = req.body.securityNumber
      }
      
      try {
        const updatedPayment = await res.payment.save()
        res.json(updatedPayment)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})
// Deleting one
router.delete('/deletePayment/:id', getPayment, async (req, res) => {
    try{
        await res.payment.remove()
        res.json({ message: 'Deleted Payment' })
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

async function getPayment(req, res, next) {
  let payment
  try {
    payment = await Payment.findById(req.params.id)
    if (payment == null) {
      return res.status(404).json({ message: 'Cannot find payment' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.payment = payment
  next()
}

module.exports = router
