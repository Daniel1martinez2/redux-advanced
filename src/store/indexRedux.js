import { configureStore } from "@reduxjs/toolkit";
//SLICES
import uiSlice from './ui-slice'; 
import cartSlice from './cart-slice'; 

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  }
}); 

export const uiActions = uiSlice.actions;
export const cartActions =  cartSlice.actions; 
export default store; 
