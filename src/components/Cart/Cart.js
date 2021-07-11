import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';


const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items); 
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {
          cartItems.map(i => (
            <CartItem
              key={i.id}
              item={{ 
                title:i.name,
                quantity: i.quantity, 
                total: i.totalPrice, 
                price: i.price,
                id: i.id 
              }}
            />
          ))
        }
       
      </ul>
    </Card>
  );
};

export default Cart;
