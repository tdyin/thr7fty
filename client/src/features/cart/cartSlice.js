import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

const cart = JSON.parse(localStorage.getItem('cart'))

const initialState = {
  cart: cart ? cart : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get cart
export const getCart = createAsyncThunk(
  '/api/getCart',
  async (userId, thunkAPI) => {
    try {
      return await cartService.getCart(userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// add item to cart
export const addToCart = createAsyncThunk(
  '/api/addToCart',
  async (cartData, thunkAPI) => {
    try {
      // productId = JSON.parse(localStorage.getItem('addedProductId'))
      return await cartService.addToCart(cartData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// remove item to cart
export const removeFromCart = createAsyncThunk(
  '/api/removeFromCart',
  async (cartData, thunkAPI) => {
    try {
      // productId = JSON.parse(localStorage.getItem('removedProductId'))
      return await cartService.removeFromCart(cartData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// clear cart
export const clearCart = createAsyncThunk(
  '/api/clearCart/',
  async (userId, thunkAPI) => {
    try {
      return await cartService.clearCart(userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setCart: (state, action) => {
      state.cart = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cart = action.payload
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })
  },
})

export const { reset, setCart } = cartSlice.actions
export default cartSlice.reducer
