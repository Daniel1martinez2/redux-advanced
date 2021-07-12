import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  cartVisible: false,
  notification: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers:{
    toggle(state){
      state.cartVisible = !state.cartVisible; 
    },
    showNotification(state,action){
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      }
    }
  }
});

export default uiSlice;