
import { useDispatch,useSelector } from "react-redux";
import styles from './Cart.module.css';
import { fetchAsyncDeleteItem,fetchAsyncUpdateItem } from "./CartSlice";


const Cart = () => {

    const items = useSelector( state => state.cart.items );
    const dispatch = useDispatch();

    const handleChange = (e,id) => {

        console.log(e.target.value);
        dispatch(fetchAsyncUpdateItem({id, change:{quantity:+e.target.value}}))

    };

   

    return (

        <div className={styles.container}>
               <h1>Order Summary</h1>
               

            {items.map(item => (
                <div>
                    
                    <div className={styles.order_summary}>
                 
                    <div className={styles.summary_card}>
                        <div className={styles.card_item}>
                            <div className={styles.product_img}>
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                />
                            </div>
                            <div className={styles.product_info}>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <h1>{item.price}</h1>
                            <div className={styles.close_btn} onClick={() => dispatch(fetchAsyncDeleteItem(item.id))}>
                                X
                            </div>
                            <div className={styles.quantity}>
                               <select className={styles.qty_input} value={item.quantity} onChange={(e) => handleChange(e,item.id)}>
                                <option className={styles.pqt} value={1}>1</option>
                                <option className={styles.pqt} value={2}>2</option>
                                <option className={styles.pqt} value={3}>3</option>
                               </select>
                            </div>

                            </div>
                        </div>
                       
                    </div>
                </div>
               
            </div>

            ))}

            <div className={styles.total_qty}>Total: {items.reduce((acc,item) => item.price*item.quantity + acc,0)}</div>
        </div>

    )
}


export default Cart;

