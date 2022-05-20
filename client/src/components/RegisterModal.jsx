import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'
import { Modal, Button, Form } from 'react-bootstrap'

function RegisterModal(props) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
    checkbox: false,
  })
  const { username, email, phone, password, password2, checkbox } = formData

  const { user, isScuccess } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isScuccess || user) {
      props.onHide()
    }
  }, [props, user, isScuccess])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else if (checkbox === false) {
      toast.error('Please agree with TOS')
    } else {
      const userData = {
        username,
        email,
        phone,
        password,
      }

      dispatch(register(userData)).then(() => {
        window.location.reload(false)
      })
    }
  }

  return (
    <Modal show={props.show} onHide={props.onHide} size='sm' centered>
      <Modal.Header className='my-3 border-0 justify-content-center'>
        <Modal.Title style={{ fontSize: '2em' }}>Sign Up</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Name'
              id='username'
              name='username'
              value={username}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='email'
              placeholder='Email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='tel'
              placeholder='Phone'
              id='phone'
              name='phone'
              value={phone}
              onChange={onChange}
              pattern='[0-9]{10}'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Repeat password'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-0'>
            <Form.Check
              type='checkbox'
              id='checkbox'
              name='checkbox'
              value={checkbox}
              onChange={onChange}
              label={
                <label>
                  I agree with <a href='/'>Terms of Service</a>.
                </label>
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className='border-0 text-muted'>
          <Button className='w-100 mb-3' variant='dark' type='submit'>
            Continue
          </Button>
          <p>Already have an account?</p>
          <Button variant='link' onClick={props.onSwitch}>
            Log in
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default RegisterModal
