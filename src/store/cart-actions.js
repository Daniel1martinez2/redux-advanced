import { uiActions, cartActions } from './indexRedux'; 
//
export const fetchCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch('https://react-fire-50c82-default-rtdb.firebaseio.com/products.json'); 
      const data = await response.json(); 
      console.log(data);
      return data; 
      }; 
      try {
        const cartData = await fetchData();
        dispatch(cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })); 
        
      } catch (error) {
      console.log(error);
    }; 
  }; 
}; 
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
           
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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