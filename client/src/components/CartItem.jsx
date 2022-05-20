import { Row, Col, Container } from 'react-bootstrap'
import CartItemCard from './CartItemCard'

function CartItem({ cart }) {
  // console.log(cart)
  return cart.map((product) => (
    <Container style={productsStyle} key={product._id}>
      <Row className='justify-content-md-center'>
        <Col>
          <CartItemCard key={product._id} product={product} />
        </Col>
      </Row>
    </Container>
  ))
}

const productsStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  margin: '10px auto',
  //   padding: '30px',
}

export default CartItem
