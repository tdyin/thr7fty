import { Card, Button } from 'react-bootstrap'
import { addToCart, getCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addToWishList, getWishList } from '../features/wishList/wishListSlice'
import { VscHeart } from 'react-icons/vsc'

function ProductCard({ product }) {
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem('user'))

  const add = () => {
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

  const save = (e) => {
    if (user) {
      const wishListData = { username: user.username, productId: product._id}
      dispatch(addToWishList(wishListData)).then(() => {
        localStorage.removeItem('wishList')
        dispatch(getWishList(user.username))
        toast.success('Saved to wishlist!')
      })
    } else {
      toast.error('You have to log in first.')
    }
  }

  return (
    <Card bg='light' style={{ margin: '10px', width: '300px' }}>
      <Card.Img variant='top' src={product.imgurl} style={imgStyle} />
      <Card.Body>
        <div className='info' style={{ marginBottom: '20px' }}>
          <Card.Title style={{ fontWeight: 'bold' }}>
            {product.title}
          </Card.Title>
          <Card.Subtitle>${product.price}</Card.Subtitle>
        </div>
        {user ? (
          <div className='button' style={buttonsStyle}>
            <Button className='heartButton' onClick={save} style={heartStyle}>
              {<VscHeart />}
            </Button>
            <Button variant='dark' onClick={add}>
              Buy
            </Button>
          </div>
        ) : (
          ''
        )}
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
  justifyContent: 'end',
}

const heartStyle = {
  fontSize: '25px',
  background: 'none',
  color: 'black',
  border: 'none',
  position: 'absolute',
  top: -5,
  right: 0,
}

export default ProductCard
