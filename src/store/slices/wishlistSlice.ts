import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WishlistState {
  items: string[];
}

const initialState: WishlistState = {
  items: [],
};

// Thunks for async actions
export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId: string, { dispatch }) => {
    console.log('Adding to wishlist:', productId);
    await axios.post(`/api/user/wishlist`, { productId });
    dispatch(addToWishlist(productId)); // Dispatch the synchronous reducer
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId: string, { dispatch }) => {
    console.log('Removing from wishlist:', productId);
    await axios.delete(`/api/user/wishlist/${productId}`);
    dispatch(removeFromWishlist(productId)); // Dispatch the synchronous reducer
  }
);

// Slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
