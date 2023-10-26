import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchCartItems,addItem,updateItem,deleteItem} from './CartAPI';
 
const initialState = {
    items: [],
    status: 'idle',
};

export const fetchAsyncCart = createAsyncThunk(
    'cart/fetchCartItems',
    async () => {
        const response = await fetchCartItems();
        return response.data;
    }
);

export const fetchAsyncAddItem = createAsyncThunk(
    'cart/addItem',
    async (item) => {
        const {id,title,brand,thumbnail,price,description} = item;
        const response = await addItem({id,title,brand,thumbnail,price,description,quantity:1});
        return response.data;
    }
);

export const fetchAsyncDeleteItem = createAsyncThunk(
    'cart/deleteItem',
    async (id,change) => {
        await deleteItem(id);
        return id;
    }
);

export const fetchAsyncUpdateItem = createAsyncThunk(
    'cart/updateItem',
    async ({id,change}) => {
        const response = await updateItem(id,change);
        return response.data
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
       
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAsyncCart.fulfilled, (state,action) => {
                state.status = 'idle';
                state.items = action.payload;
            })
            .addCase(fetchAsyncAddItem.fulfilled, (state,action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            .addCase(fetchAsyncDeleteItem.fulfilled, (state,action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id ===action.payload)
                state.items.splice(index,1);
            })
            .addCase(fetchAsyncUpdateItem.fulfilled, (state,action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id ===action.payload.id)
                state.items.splice(index,1,action.payload);
            });
    },
});


export default cartSlice.reducer;



