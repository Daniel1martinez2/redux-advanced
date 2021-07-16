import React, {useEffect} from 'react'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from 'react-redux';
import {sendCartData, fetchCartData} from './store/cart-actions'; 
import Notification from './components/UI/Notification'; 

let isInitial = true; 

function App() {
  const dispatch = useDispatch();
  const toggleCart = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification); 
  // init the cart fetching the current data in data base
  useEffect(()=> {
    dispatch(fetchCartData());
    console.log('aaaaa'); 
  },[dispatch]); 
  useEffect(()=>{
   if (isInitial) {
     isInitial = false; 
     return;
   }; 
   if(cart.changed){
     dispatch(sendCartData(cart)); 
  }
  },[cart, dispatch]); 
  return (
    <React.Fragment>
      {
        notification && 
        <Notification 
          status={notification.status}
          title={notification.title}
           message={notification.message}
        />
      }
      <Layout>
        {toggleCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;

