import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the state interface
interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[]; // Array of cart items
}

const initialState: CartState = {
  items: [],
};

// Thunks for async actions
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({productId, quantity}: {productId:string, quantity: number}, { dispatch }) => {
    console.log('Adding to cart:', {productId, quantity});
    await axios.post(`/api/user/cart`, { productId }); // API to add product to cart
    dispatch(addToCart({ productId, quantity: quantity })); // Add product with initial quantity of 1
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, { dispatch }) => {
    console.log('Removing from cart:', productId);
    await axios.delete(`/api/user/cart/${productId}`); // API to remove product from cart
    dispatch(removeFromCart(productId)); // Dispatch the synchronous reducer
  }
);

export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch }) => {
    console.log('Clearing cart');
    await axios.delete(`/api/user/cart`); // API to clear the entire cart
    dispatch(clearCart()); // Dispatch the synchronous reducer
  }
);

export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantity',
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { dispatch }
  ) => {
    console.log('Updating quantity:', productId, quantity);
    await axios.put(`/api/user/cart`, { productId, quantity }); // API to update quantity
    dispatch(updateQuantity({ productId, quantity })); // Dispatch the synchronous reducer
  }
);

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increment quantity
      } else {
        state.items.push(action.payload); // Add new item to the cart
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload); // Remove product by ID
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload; // Set cart state directly
    },
    clearCart: (state) => {
      state.items = []; // Clear the cart array in the state
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity; // Update quantity
      }
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, setCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
