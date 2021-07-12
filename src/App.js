import React, {useEffect} from 'react'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from 'react-redux';
import { uiActions } from './store/indexRedux';
import Notification from './components/UI/Notification'; 

let isInitial = true; 

function App() {
  const dispatch = useDispatch();
  const toggleCart = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification); 

  useEffect(()=>{
    const fetchDataBase = async () => {
      //INIT
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'sending...',
          message: 'Sending cart data'
        })
      ); 
      const response = await fetch(
        'https://react-fire-50c82-default-rtdb.firebaseio.com/products.json',
        {
          method: 'PUT', 
          //PUT:  We also store data on Firebase -> but the difference to post is that
          // ** The new data will not be added in a list of data, but it will override existing data 
          body: JSON.stringify(cart),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if(!response.ok){
        throw new Error('sending cart data failed'); 
      }; 
      //SUCCESS
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'success',
          message: 'Sending cart data successfully'
        })
      ); 
    };
    if(isInitial){
      isInitial = false; 
      return
    }
    fetchDataBase().catch(error => {
      //ERROR
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error',
            message: 'Sending cart data failed'
          })
        ); 
    }); 
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

