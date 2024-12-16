import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RecentSearchesState {
  searches: string[];
}

const initialState: RecentSearchesState = {
  searches: [],
};

// Async thunk to update searches in the backend
export const updateRecentSearchesAsync = createAsyncThunk(
  'recentSearches/updateRecentSearches',
  async (search: string, { dispatch }) => {
    try {
      await axios.post('/api/user/recent-searches', { search });
      dispatch(addRecentSearch(search)); // Dispatch the synchronous reducer
    } catch (error) {
      console.error('Failed to update recent searches:', error);
    }
  }
);

const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const search = action.payload;
      console.log("BEFORE: ", state.searches);
      // Remove the search if it already exists to avoid duplicates
      state.searches = state.searches.filter((item) => item !== search);
      console.log("AFTER: ", state.searches);
      // Add the new search to the end
      state.searches.push(search);

      // Keep only the latest 5 searches
      if (state.searches.length > 5) {
        state.searches = state.searches.slice(1,6) // Remove the oldest search
      }
    },
    setRecentSearches: (state, action: PayloadAction<string[]>) => {
      state.searches = action.payload.slice(0, 5); // Initialize with up to 5 searches
    },
  },
  extraReducers: (builder) => {
    // Optionally, you can handle fulfilled/rejected state of the async thunk
    builder.addCase(updateRecentSearchesAsync.rejected, (state, action) => {
      console.error('Error updating recent searches:', action.error.message);
    });
  },
});

export const { addRecentSearch, setRecentSearches } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
