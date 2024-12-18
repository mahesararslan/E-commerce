// categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Category {
    _id: string
    name: string
    image: string
    description: string
  }

interface CategoryState {
  categories: Category[];
  isFetched: boolean;
}

const initialState: CategoryState = {
  categories: [],
  isFetched: false, // Initially false
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.isFetched = true; // Set to true after categories are fetched
    },
  },
});

export const { setCategories } = categorySlice.actions; 
export default categorySlice.reducer;
