import { useEffect } from 'react'
import AppCarousel from '../components/AppCarousel'
import Products from '../components/Products'
import { getProducts, reset } from '../features/products/productSlice'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
  const dispatch = useDispatch()

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if (isError) console.log(message)

    dispatch(getProducts())
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  return (
    <div>
      <AppCarousel />
      {isLoading ? (
        <Spinner animation='border' />
      ) : (
        <Products products={products} />
      )}
    </div>
  )
}

export default Home
