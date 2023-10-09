import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedColor: null, // Initial state for selected color
  selectedSize: null, // Initial state for selected size
};

const productSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSize: (state, action) => {
      state.selectedSize = action.payload;
    },
  },
});

export const { setColor, setSize } = productSlice.actions;
export default productSlice.reducer;
