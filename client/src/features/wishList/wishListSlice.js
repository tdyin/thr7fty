import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import wishListService from './wishListService'

const wishList = JSON.parse(localStorage.getItem('wishList'))

const initialState = {
  wishList: wishList ? wishList : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get wishList
export const getWishList = createAsyncThunk(
  '/api/getWishList',
  async (userId, thunkAPI) => {
    try {
      return await wishListService.getWishList(userId)
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

// add item to wishList
export const addToWishList = createAsyncThunk(
    '/api/addToWishList',
    async (wishListData, thunkAPI) => {
      try {
        // productId = JSON.parse(localStorage.getItem('savedProductId'))
        return await wishListService.addToWishList(wishListData)
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

// remove item from wishlist
export const removeFromWishList = createAsyncThunk(
  '/api/removeFromWishList',
  async (wishListData, thunkAPI) => {
    try {
      // productId = JSON.parse(localStorage.getItem('deletedProductId')) 
      return await wishListService.removeFromWishList(wishListData)
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


export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setWishList: (state, action) => {
      state.wishList = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wishList = action.payload
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })
      .addCase(removeFromWishList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })
  },
})

export const { reset, setWishList } = wishListSlice.actions
export default wishListSlice.reducer
