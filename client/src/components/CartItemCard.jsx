import { Card, Button } from 'react-bootstrap'
import { removeFromCart, getCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import '../styles/cart.scss'

function CartItemCard({ product }) {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))

  const removedProduct = () => {
    const cartData = { username: user.username, productId: product._id }
    dispatch(removeFromCart(cartData)).then(() => {
      localStorage.removeItem('cart')
      dispatch(getCart(user.username))
      toast.success('Delete success!')
    })
  }

  return (
    <Card
      style={{
        margin: '15px',
        width: '700px',
        flexDirection: 'row',
        borderRight: 0,
        borderLeft: 0,
        borderBottom: 0,
      }}
    >
      <Card.Img src={product.imgurl} style={imgStyle} />
      <Card.Body style={{ flexDirection: 'col' }}>
        <Card.Title style={{ fontSize: '20px', fontWeight: 'normal' }}>
          {product.title}
        </Card.Title>
        <Card.Subtitle
          style={{ paddingTop: '5px', fontSize: '17px', fontWeight: 'normal' }}
        >
          Category: {product.categories}
        </Card.Subtitle>
        <Card.Subtitle
          style={{ paddingTop: '10px', fontSize: '17px', fontWeight: 'normal' }}
        >
          Size: {product.size}
        </Card.Subtitle>
      </Card.Body>
      <Card.Body style={{ flexDirection: 'col' }}>
        <Card.Title
          style={{ fontSize: '20px', textAlign: 'right', fontWeight: 'normal' }}
        >
          Price
        </Card.Title>
        <Card.Subtitle
          style={{
            paddingTop: '5px',
            color: 'grey',
            fontSize: '17px',
            textAlign: 'right',
            fontWeight: 'normal',
          }}
        >
          ${product.price.toFixed(2)}
        </Card.Subtitle>
        <Button
          className='removeBtn'
          onClick={removedProduct}
          style={removeBtnStyle}
        >
          Remove
        </Button>
      </Card.Body>
    </Card>
  )
}

const imgStyle = {
  objectFit: 'cover',
  width: '225px',
  height: '225px',
  paddingTop: '20px',
}

const removeBtnStyle = {
  border: 'none',
  backgroundColor: 'transparent',
  color: 'grey',
  fontSize: '17px',
  position: 'absolute',
  bottom: -30,
  right: 0,
  fontWeight: 'normal',
}

export default CartItemCard
