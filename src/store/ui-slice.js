import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  cartVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers:{
    toggle(state){
      state.cartVisible = !state.cartVisible; 
    }
  }
});

export default uiSlice;