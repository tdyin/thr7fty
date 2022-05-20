import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, searchProducts } from '../features/products/productSlice'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { getCart, reset as cartReset } from '../features/cart/cartSlice'
import { getWishList, reset as wishListReset } from '../features/wishList/wishListSlice'
import { logout, reset as userReset } from '../features/auth/authSlice'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'


function AppNavbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)
  const { wishList } = useSelector((state) => state.wishList)

  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const [search, setSearch] = useState('')
  const [cartLength, setCartLength] = useState(0)

  useEffect(() => {
    if (cart) {
      setCartLength(cart.length)
    }
    if (!user) {
      localStorage.removeItem('cart')
      localStorage.removeItem('wishList')
      dispatch(cartReset())
      dispatch(wishListReset())
    }
    if (user && !cart) {
      dispatch(getCart(user.username))
    }
    if (user && !wishList) {
      dispatch(getWishList(user.username))
    }
  }, [user, cart, wishList, dispatch])

  const onLogout = () => {
    dispatch(logout())
    dispatch(userReset())
    navigate('/')
    window.location.reload()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (search === '') {
      dispatch(getProducts())
      return
    }
    dispatch(searchProducts(search))
    setSearch('')
  }
  return (
    <>
      <Navbar style={{ background: '#fafafa' }} variant='light' expand='md'>
        <Container fluid style={{ maxWidth: '1000px' }}>
          <Navbar.Brand href='/' className='mx-3 my-2'>
            <img
              alt=''
              src='/logo.svg'
              width='140'
              className='d-inline-block align-top'
            />
          </Navbar.Brand>
          <Form className='d-flex flex-grow-1 mx-3' onSubmit={onSubmit}>
            <FormControl
              placeholder='Search'
              aria-label='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll' className='justify-content-end'>
            <Nav className='mx-4 my-2' navbarScroll>
              <Nav.Link>SHOP</Nav.Link>
              <Nav.Link>SELL</Nav.Link>
            </Nav>
            {user ? (
              <Nav className='me-5 my-2' navbarScroll>
                <Nav.Link href='/cart'>
                  <FaShoppingCart /> ({cartLength})
                </Nav.Link>
                <NavDropdown title={<FaUser />} id='navbarScrollingDropdown'>
                  <NavDropdown.Item href='/wishList'>
                    Wish List
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <>
                <Button
                  className='mx-2 my-2'
                  variant='outline-dark'
                  onClick={() => setLoginModal(true)}
                >
                  LOG IN
                </Button>
                <Button
                  className='mx-2 my-2'
                  variant='dark'
                  onClick={() => setRegisterModal(true)}
                >
                  SIGN UP
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar
        style={{ background: '#c7c7c7', padding: 0 }}
        variant='light'
        expand='md'
      >
        <Navbar.Collapse id='navbarScroll' className='justify-content-around'>
          <Nav className='my-2 gap-5' navbarScroll>
            <Nav.Link>Designers</Nav.Link>
            <NavDropdown title='Categories' id='navbarScrollingDropdown'>
              <NavDropdown.Item>Category A</NavDropdown.Item>
              <NavDropdown.Item>Category B</NavDropdown.Item>
              <NavDropdown.Item>Category C</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Sneakers</Nav.Link>
            <Nav.Link>Vintage</Nav.Link>
            <Nav.Link>Staff Picks</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <LoginModal
        show={loginModal}
        onHide={() => setLoginModal(false)}
        onSwitch={() => {
          setLoginModal(false)
          setRegisterModal(true)
        }}
      />
      <RegisterModal
        show={registerModal}
        onHide={() => setRegisterModal(false)}
        onSwitch={() => {
          setRegisterModal(false)
          setLoginModal(true)
        }}
      />
    </>
  )
}

export default AppNavbar
