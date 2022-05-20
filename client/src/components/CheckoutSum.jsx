import { useState, useEffect } from 'react'
import { ListGroup, Card, Badge, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

function CheckoutSum() {
  const dispatch = useDispatch()

  const { cart } = useSelector((state) => state.cart)

  const [cartItems, setCartItems] = useState(cart)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const calcTotal = cartItems.reduce((a, b) => a + b.price, 0)
    setTotal(calcTotal)
  }, [cart, cartItems, dispatch])

  return (
    <>
      <Card className='my-3'>
        <Card.Header>Cart</Card.Header>
        <Card.Body>
          <ListGroup>
            {cartItems.length > 0 ? (
              cartItems.map((product) => (
                <ListGroup.Item
                  as='li'
                  className='d-flex justify-content-between align-items-start'
                  key={product._id}
                >
                  <div className='ms-2 me-auto'>{product.title}</div>
                  <Badge bg='dark' pill>
                    ${product.price}
                  </Badge>
                </ListGroup.Item>
              ))
            ) : (
              <h3>No products</h3>
            )}
          </ListGroup>
          <h4 className='mt-3 text-end'>Total: ${total.toFixed(2)}</h4>
        </Card.Body>
        <Button
          className='mx-3 mb-3'
          variant='dark'
          type='submit'
        >
          Confirm
        </Button>
      </Card>
    </>
  )
}

export default CheckoutSum
