import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import About from './pages/About'
import Footer from './components/Footer'
import Confirmation from './pages/Confirmation'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import WishList from './pages/Wishlist'

function App() {
  return (
    <>
      <Router>
        <AppNavbar />
        <Modal.Body>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<WishList />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Modal.Body>
        <Footer />
      </Router>
      <ToastContainer autoClose={2000} hideProgressBar />
    </>
  )
}

export default App
