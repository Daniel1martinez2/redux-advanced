import React, {useEffect} from 'react'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from 'react-redux'; 

function App() {
  const toggleCart = useSelector(state => state.ui.cartVisible);
  const cart = useSelector(state => state.cart);
  useEffect(()=>{
    fetch(
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
  },[cart]); 
  return (
    <Layout>
      {toggleCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

