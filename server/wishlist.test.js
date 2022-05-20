//import { request } from 'express'
//import supertest from 'supertest'
//import app from './app.js'
const request = require("supertest")
const app = require('./server.js')
describe("WishList APIs", () => {
    it("GET /getWishList/:userId --> gets an array of products in wishlist for a userID", () => {})
    it("POST /createWishList --> creates a wishlist for a specific userID", () => {})
    it("DELETE /deleteWishList/:userId --> deletes a wishlist for a specific userID", () => {})
    it("POST /addToWishList/:userId/:productId --> adds a product to the wishlist of a userID", () => {})
    it("POST /removeFromWishList/:userId/:productId --> removes a product from a wishlist of a userID", () => {})
    
})
