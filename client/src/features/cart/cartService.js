import axios from 'axios'

// Get cart
const getCart = async (userId) => {
  const response = await axios.get('/api/getCart/' + userId)

  if (response.data) {
    localStorage.setItem('cart', JSON.stringify(response.data))
  }

  return response.data
}

// Add to cart
const addToCart = async (cartData) => {
  const response = await axios.post(
    '/api/addToCart/' + cartData.username + '/' + cartData.productId
  )
  return response.data
}

// Remove from cart
const removeFromCart = async (cartData) => {
  const response = await axios.post(
    '/api/removeFromCart/' + cartData.username + '/' + cartData.productId
  )
  return response.data
}

// Clear cart
const clearCart = async (userId) => {
  const response = await axios.post('/api/clearCart/' + userId)
  return response.data
}

const cartService = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
}

export default cartService
