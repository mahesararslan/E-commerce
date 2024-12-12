import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface WishlistState {
  items: string[]
}

const initialState: WishlistState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        async function UpdateWishlist() {
          console.log("Adding to wishlist: ", action.payload)
          await axios.post(`/api/user/wishlist`, { productId: action.payload });
          state.items.push(action.payload)
        }

        UpdateWishlist();
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      async function updateWishlist() {
        console.log("Removing from wishlist: ", action.payload)
        await axios.delete(`/api/user/wishlist/${action.payload}`);
        state.items = state.items.filter(id => id !== action.payload)
      }

      updateWishlist();
    },
    setWishlist: (state, action: PayloadAction<string[]>) => {
      console.log("Setting wishlist: ", action.payload)
      state.items = action.payload
    },
  },
})

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
