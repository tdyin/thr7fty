import axios from 'axios'

// Get products
const getProducts = async () => {
  const response = await axios.get('/api/getProducts')
  return response.data
}

// get product by id
const getProduct = async (productId) => {
  const response = await axios.get('/api/getProduct/' + productId)
  return response.data
}

// Search products
const searchProducts = async (title) => {
  const response = await axios.get('/api/searchProducts/' + title)
  return response.data
}

const productService = {
  getProducts,
  getProduct,
  searchProducts
}

export default productService