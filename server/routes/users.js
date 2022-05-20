const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Cart = require('../models/Cart')
const wishList = require('../models/wishList')

// Creates a new user
router.post('/createUser', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const securePassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            email: req.body.email,
            phone: req.body.phone,
            username: req.body.username,
            password: securePassword,
            order_history: [],
            payment_info: []
        })
        const testUser = await User.findOne({username: req.body.username})
        if (testUser != null){
            return res.status(400).json({message: "Username already exists"})
        }
        const cart = new Cart({
            userId: req.body.username,
            productIds: []
        })
        const wishlist = new wishList({
            userId: req.body.username,
            productIds: []
        })
        const newCart = await cart.save() 
        const newWishlist = await wishlist.save() 
        const saveUser = await newUser.save()
        res.status(201).json(saveUser)

    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

// Logs in an existing user
router.post('/login', async(req, res) => {
    const currUser = await User.findOne({username: req.body.username})
    
    if (currUser == null) {
        return res.status(400).json({message: "Cannot find user"})
    }
    try{
        if (await bcrypt.compare(req.body.password, currUser.password)){
            res.status(200).json(currUser)
        }
        else{
            res.status(400).json({message: "Incorrect password"})
        }
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})


module.exports = router

