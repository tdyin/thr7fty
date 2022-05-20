import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'

function CheckoutForm() {
  const [check, setCheck] = useState(false)
  const [formData, setFormData] = useState({
    bName: '',
    cardNum: '',
    expDate: '',
    cvv: '',
    bAddress1: '',
    bAddress2: '',
    bCity: '',
    bState: '',
    bZipcode: '',
    sName: '',
    sAddress1: '',
    sAddress2: '',
    sCity: '',
    sState: '',
    sZipcode: '',
  })
  const {
    bName,
    cardNum,
    expDate,
    cvv,
    bAddress1,
    bAddress2,
    bCity,
    bState,
    bZipcode,
    sName,
    sAddress1,
    sAddress2,
    sCity,
    sState,
    sZipcode,
  } = formData

  const handleCheck = () => {
    setCheck(!check)
    if (!check) {
      setFormData((prevState) => ({
        ...prevState,
        sName: bName,
        sAddress1: bAddress1,
        sAddress2: bAddress2,
        sCity: bCity,
        sState: bState,
        sZipcode: bZipcode,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        sName: '',
        sAddress1: '',
        sAddress2: '',
        sCity: '',
        sState: '',
        sZipcode: '',
      }))
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Card className='my-3'>
        <Card.Header>Billing</Card.Header>
        <Card.Body>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Name on card'
              name='bName'
              value={bName}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Card number'
              name='cardNum'
              value={cardNum}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='date'
              placeholder='Expiry Date'
              name='expDate'
              value={expDate}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='number'
              placeholder='CVV'
              pattern='[0-9]{3}'
              name='cvv'
              value={cvv}
              onChange={onChange}
              required
            />
          </Form.Group>
          <h6 className='mb-3'>Billing address</h6>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Address 1'
              name='bAddress1'
              value={bAddress1}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Address 2'
              name='bAddress2'
              value={bAddress2}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='City'
              name='bCity'
              value={bCity}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='State'
              name='bState'
              value={bState}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Postal code'
              name='bZipcode'
              value={bZipcode}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <Card className='mb-3'>
        <Card.Header>Shipping</Card.Header>
        <Card.Body>
          <Form.Group className='mb-3'>
            <Form.Check
              type='checkbox'
              label='Same as billing adress'
              value={check}
              onChange={handleCheck}
            />
          </Form.Group>
          <h6 className='mb-3'>Shipping address</h6>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Name'
              name='sName'
              value={sName}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Address 1'
              name='sAddress1'
              value={sAddress1}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Address 2'
              name='sAddress2'
              value={sAddress2}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='City'
              name='sCity'
              value={sCity}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='State'
              name='sState'
              value={sState}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Postal code'
              name='sZipcode'
              value={sZipcode}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  )
}

export default CheckoutForm
