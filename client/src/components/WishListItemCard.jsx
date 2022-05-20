import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { addToCart, getCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { getWishList, removeFromWishList } from '../features/wishList/wishListSlice'
import { FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'

function WishListItemCard({ product }) {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))

  const addProduct = () => {
    if (user) {
      const cartData = { username: user.username, productId: product._id }
      dispatch(addToCart(cartData)).then(() => {
        localStorage.removeItem('cart')
        dispatch(getCart(user.username))
        toast.success('Added to the cart!')
      })
    } else {
      toast.error('You have to log in first.')
    }
  }

  const removedProduct = () => {
    const wishListData = { username: user.username, productId: product._id }
    dispatch(removeFromWishList(wishListData)).then(() => {
      localStorage.removeItem('wishList')
      dispatch(getWishList(user.username))
      toast.success('Remove success!')
    })
  }

  return (
    <Card bg='light' style={{ margin: '10px', width: '300px' }}>
      <Card.Img variant='top' src={product.imgurl} style={imgStyle} />
      <Card.Body>
        <div className='info' style={{ marginBottom: '20px' }}>
          <Card.Title style={{ fontWeight: 'bold' }}>
            {product.title}
          </Card.Title>
          <Card.Subtitle>
            ${product.price}
          </Card.Subtitle>
        </div>
        <div className='button' style={buttonsStyle}>
          <Button className='heartButton' onClick={removedProduct} style={ heartStyle }>{<FaHeart />}</Button>
          <Button variant='dark' onClick={addProduct}>Buy</Button>
        </div>
        
      </Card.Body>
    </Card>
  )
}



const imgStyle = {
  objectFit: 'cover',
  width: '298px',
  height: '300px',
}

const buttonsStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'end'
}

const heartStyle = {
  fontSize: '20px', 
  background: 'none', 
  color: 'black', 
  border: 'none', 
  position: 'absolute', 
  top: 0, 
  right: 0,
}


export default WishListItemCard
