require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(express.urlencoded())

const productsRouter = require('./routes/products')
const userRouter = require('./routes/users')
const wishListRouter = require('./routes/wishList')
const cart = require('./routes/cart')

app.use('/api/', productsRouter)
app.use('/api/', wishListRouter)
app.use('/api/', cart)
app.use('/api/', userRouter)

const paymentRouter = require('./routes/payment')
app.use('/api/', paymentRouter)

const sellingProductsRouter = require('./routes/sellingProducts')
app.use('/api/', sellingProductsRouter)

//Serve fronted
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  )
} 
else {
  app.get('/', (req, res) => res.send('Environment not in production.'))
}


  

app.listen(8000, () => console.log('Server Started'))
