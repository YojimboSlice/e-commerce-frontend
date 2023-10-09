import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // An array to hold the cart items
  subtotal: 0,
  isOpen: false,
  shippingData: null,
  finalTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.size === newItem.size,
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.subtotal = calculateSubtotal(state.items);
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
      state.subtotal = calculateSubtotal(state.items);
    },

    updateItemQuantity: (state, action) => {
      const { id, color, size, newQuantity } = action.payload;

      const itemToUpdate = state.items.find(
        (item) => item.id === id && item.color === color && item.size === size,
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
        state.subtotal = calculateSubtotal(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    toggleCart: (state, action) => {
      state.isOpen = action.payload;
    },

    setShippingData: (state, action) => {
      state.shippingData = action.payload;
    },

    setFinalTotal: (state, action) => {
      state.finalTotal = action.payload;
    },
  },
});

function calculateSubtotal(cartItems) {
  return cartItems.reduce(
    (total, item) =>
      Math.round((total + item.price * item.quantity) * 100) / 100,
    0,
  );
}

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
  toggleCart,
  setShippingData,
  setFinalTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
