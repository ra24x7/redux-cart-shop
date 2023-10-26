
import './App.css';
import Products from './features/products/Products';
import CartItems from './features/cart/Cart';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAsyncCart } from "./features/cart/CartSlice";



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncCart());
},[]);

  const [showCart,setShowCart] = useState(false);
  const items = useSelector( state => state.cart.items );

  return (
   
   <div className="App">

    <button onClick={()=>setShowCart(!showCart)} >`Cart [{items.length}]`</button>
    {showCart ? <CartItems/> : <Products/>}
  

   </div>)
};


export default App;
