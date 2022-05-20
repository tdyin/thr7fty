import { useEffect, useState } from 'react'
import '../styles/cart.scss'
import { Button, Card, Container } from 'react-bootstrap'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// let makeCart = []
function Cart() {
  const navigate = useNavigate()
  const { cart } = useSelector((state) => state.cart)
  const [makeCart, setMakeCart] = useState(cart)

  useEffect(() => {
    setMakeCart(cart)
  }, [cart])

  function getTotal() {
    return makeCart.reduce((a, b) => a + b.price, 0)
  }


  return (
    <Container className='cart-page'>
      {cart.length === 0 ? (
        <h1 className='checkout-title'>
          <strong>Cart is Empty</strong>
        </h1>
      ) : (
        <>
          <div className='cart-left' style={{ paddingRight: '200px' }}>
            <h1 className='checkout-title'>
              <strong>My Cart</strong>
            </h1>
            <div className='cart-item'>
              <CartItem cart={makeCart} />
            </div>
          </div>

          <Card
            className='cart-right'
            style={{ flexDirection: 'col', border: 0, paddingTop: '100px' }}
          >
            <Card style={{ flexDirection: 'row', border: 0 }}>
              <Card.Body
                className='total-left'
                style={{ flexDirection: 'col' }}
              >
                <Card.Subtitle
                  style={{
                    paddingTop: '15px',
                    color: 'grey',
                    fontSize: '17px',
                    fontWeight: 'normal',
                  }}
                >
                  Shipping Cost
                </Card.Subtitle>
                <Card.Subtitle
                  style={{
                    paddingTop: '15px',
                    color: 'grey',
                    fontSize: '17px',
                    fontWeight: 'normal',
                  }}
                >
                  Tax
                </Card.Subtitle>
                <Card.Subtitle
                  style={{
                    paddingTop: '15px',
                    fontSize: '17px',
                    fontWeight: 'bold',
                  }}
                >
                  Estimated Total
                </Card.Subtitle>
              </Card.Body>
              <Card.Body
                className='total-right'
                style={{ flexDirection: 'col' }}
              >
                <Card.Subtitle
                  style={{
                    paddingTop: '15px',
                    color: 'grey',
                    fontSize: '17px',
                    fontWeight: 'normal',
                    textAlign: 'right',
                  }}
                >
                  FREE
                </Card.Subtitle>
                <Card.Subtitle
                  style={{
                    paddingTop: '15px',
                    color: 'grey',
                    fontSize: '17px',
                    fontWeight: 'normal',
                    textAlign: 'right',
                  }}
                >
                  -
                </Card.Subtitle>
                <Card.Subtitle
                  style={{
                    paddingTop: '15px',
                    fontSize: '17px',
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}
                >
                  ${getTotal().toFixed(2)}
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <Button
              style={{
                fontWeight: 'bold',
                marginTop: '5px',
                border: 0,
                backgroundColor: '#ffe135',
                color: 'black',
              }}
              onClick={() => {
                navigate('/checkout')
              }}
            >
              Checkout
            </Button>
          </Card>
        </>
      )}
    </Container>
  )
}

export default Cart
