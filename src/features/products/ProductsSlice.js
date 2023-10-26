import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchProducts} from './ProductsAPI';
 
const initialState = {
    products: [],
    status: 'idle',
};

export const fetchAsyncProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetchProducts();
        return response.data;
    }
);


export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            });
    },
});


// export const {}  = productsSlice.actions;

export default productsSlice.reducer;



