import { fetchAsyncProducts } from './ProductsSlice';
import './Products.css';
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from 'react';
import { fetchAsyncAddItem } from '../cart/CartSlice';
const Products = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);

    useEffect(()=>{
        dispatch(fetchAsyncProducts());
    },[]);

    return (
        <div > 
            {products.map((product)=>( 
                 <div className="card">
                    <img src={product.thumbnail} alt={product.title} style={{ width: "100%" }} />
                    <h1>{product.title}</h1>
                    <p className="price">{product.price}</p>
                    <p>{product.description}</p>
                    <p>
                    <button onClick={() => (dispatch(fetchAsyncAddItem(product)))}>Add to Cat</button>
                    </p>
                </div>      
            ))}
        </div>
    );
};

export default Products;