import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/recentSearchesSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import wishlistReducer from './slices/wishlistSlice';
import RecentSearchesReducer from './slices/recentSearchesSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    RecentSearches: RecentSearchesReducer,
    product: productReducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    cart: cartReducer
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
