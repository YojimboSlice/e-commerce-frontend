import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/shop/productSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
