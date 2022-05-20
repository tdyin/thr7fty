import { Row, Col, Container } from 'react-bootstrap'
import ProductCard from './ProductCard'

function Products({ products }) {
  return (
    <Container style={productsStyle}>
      <Row className='justify-content-md-center'>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <h3>No products</h3>
        )}
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

export default Products
