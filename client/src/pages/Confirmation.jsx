import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Confirmation() {
  return (
    <Container fluid className='m-3' style={{height: 'calc(100vh - 250px)'}}>
      <Row>
        <Col>
          <h1 className='text-center'>Thank you!</h1>
          <h2 className='text-center'>Your order has been placed.</h2>
        </Col>
      </Row>
    </Container>
  )
}

export default Confirmation
