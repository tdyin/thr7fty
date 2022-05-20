import { Row, Col, Container } from 'react-bootstrap'
import WishListItemCard from './WishListItemCard'

function WishList({ wishList }) {

  return (
    <Container style={productsStyle}>
      <Row className='justify-content-md-center'>
          {wishList.map((product) => (
            <Col key={product._id}>
              <WishListItemCard product={product} />
            </Col>
          ))}
      </Row>
    </Container>
  )
}

const productsStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  margin: '10px auto',
  padding: '30px',
}

export default WishList