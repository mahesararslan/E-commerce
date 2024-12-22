// redux/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {
    cart: [],
    total: 0,
    paymentMethod: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    name: "",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
        console.log("set order start: ", action.payload);
      state.order = { ...state.order, ...action.payload };
      console.log("set Order end: ", state.order);
    },
    resetOrder: (state) => {
      state.order = initialState.order;
    },
  },
});

export const { setOrder, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
