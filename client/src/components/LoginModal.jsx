import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

function LoginModal(props) {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData

  const { user, isError, isScuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isScuccess || user) {
      props.onHide()
    }
    dispatch(reset())
  }, [props, user, isError, isScuccess, message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = { username, password }
    dispatch(login(userData)).then(() => {
      window.location.reload(false)
    })
  }

  return (
    <Modal show={props.show} onHide={props.onHide} size='sm' centered>
      <Modal.Header className='my-3 border-0 justify-content-center'>
        <Modal.Title style={{ fontSize: '2em' }}>Log in</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className='mb-4'>
            <Form.Control
              type='text'
              id='username'
              name='username'
              value={username}
              placeholder='Username'
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Control
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className='border-0 text-muted'>
          <Button className='w-100 mb-3' variant='dark' type='submit'>
            Continue
          </Button>
          <p>Don't have an account?</p>
          <Button variant='link' onClick={props.onSwitch}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default LoginModal
