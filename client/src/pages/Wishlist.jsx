import { useSelector } from 'react-redux'
import {  Container } from 'react-bootstrap'
import WishListItem from '../components/WishListItem'
import '../styles/wishList.scss'
import { useEffect, useState } from 'react'

function WishList() {

  const { wishList } = useSelector((state) => state.wishList)
  const [ makeWishList, setMakeWishList ] = useState(wishList)

  useEffect(() => {
    setMakeWishList(wishList)
  }, [wishList])

  return (
    <Container 
      className='wishList-page' 
      style={{ 
        padding: '40px', 
        minheight: 'calc(100vh - 100px)' 
      }}>
    {wishList.length === 0 ? (
        <h1 className='wishList-title'>
              <strong>No Saved Products</strong>
            </h1>
      ) : (
        <div>
          <h1>
            <strong>My Wishlist</strong>
          </h1>
          <div>
            <WishListItem   wishList={makeWishList} />  
          </div>
        </div>
      )}
  </Container>
  )
}

export default WishList