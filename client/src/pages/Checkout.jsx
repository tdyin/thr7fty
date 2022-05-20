import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart, getCart } from '../features/cart/cartSlice'
import { useSelector } from 'react-redux'
import CheckoutSum from '../components/CheckoutSum'
import CheckoutForm from '../components/CheckoutForm'
import { Container, Row, Col, Form } from 'react-bootstrap'

function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return <h1> Page 404 </h1>
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(clearCart(user.username)).then(() => {
      localStorage.removeItem('cart')
      dispatch(getCart(user.username))
    })
    navigate('/confirmation')
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <CheckoutForm />
          </Col>
          <Col>
            <CheckoutSum />
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default Checkout
