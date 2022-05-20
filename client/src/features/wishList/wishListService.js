import axios from 'axios'

// Get wishList
const getWishList = async (userId) => {
  const response = await axios.get('/api/getWishList/' + userId)
  if (response.data) {
    localStorage.setItem('wishList', JSON.stringify(response.data))
  }

  return response.data
}

// Add to wishList
const addToWishList = async (wishListData) => {
    const response = await axios.post(
      '/api/addToWishList/' + wishListData.username +  "/" + wishListData.productId)
    return response.data
  }

// Remove from wishList
const removeFromWishList = async (wishListData) => {
  const response = await axios.post(
    '/api/removeFromWishList/' + wishListData.username +  "/" + wishListData.productId)
  return response.data
}

const wishListService = {
  getWishList,
  addToWishList,
  removeFromWishList
}

export default wishListService