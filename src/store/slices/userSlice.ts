import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
  recentSearches: string[];
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  image: null,
  recentSearches: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
    addRecentSearch: (state, action: PayloadAction<string>) => {
      if (!state.recentSearches.includes(action.payload)) {
        state.recentSearches.unshift(action.payload);
        if (state.recentSearches.length > 5) {
          state.recentSearches.pop(); // Limit to 5 recent searches
        }
      }
    },
  },
});

export const { setUser, clearUser, addRecentSearch } = userSlice.actions;
export default userSlice.reducer;
