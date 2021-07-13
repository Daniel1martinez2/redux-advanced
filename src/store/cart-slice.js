import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from './indexRedux'; 

const cartInitialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}; 

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers:{
    addItemToCart(state, action) {
      const newItem = action.payload.item; 
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++; 
      if(!existingItem){
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        }); 
      }else{
        existingItem.quantity++; 
        existingItem.totalPrice += newItem.price; 
      }
    },
    removeItem (state, action) {
      const id = action.payload.id; 
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--; 
      if(existingItem.quantity ===1){
        state.items = state.items.filter(item => item.id !== id); 
      }else{
        existingItem.quantity --; 
        existingItem.totalPrice -= existingItem.price; 
      }
    },
  }
});

//Custom action creator Function----------------------------------------------------------------

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
        uiActions.showNotification({
        status: 'pending',
        title: 'sending...',
        message: 'Sending cart data'
      })
    ); 
    const sendRequest = async () => {
      const response = await fetch(
        'https://react-fire-50c82-default-rtdb.firebaseio.com/products.json',
        {
          method: 'PUT', 
           
          body: JSON.stringify(cart),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if(!response.ok){
        throw new Error('sending cart data failed'); 
      }; 
    };
    try {
      await sendRequest();
      
      //SUCCESS
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'success',
          message: 'Sending cart data successfully'
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed'
        })
      ); 
    }
  };
}; 

export default cartSlice; 