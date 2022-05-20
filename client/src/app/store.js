import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import wishListReducer from '../features/wishList/wishListSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishList: wishListReducer
  },
})