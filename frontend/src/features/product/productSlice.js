import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById } from './productAPI';

const initialState = {
    products: [],
    status: 'idle',
    selectedProduct:null,
    error: null,
  };
  
  export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
      const response = await fetchAllProducts();
      return response.data.products;
    }
  );

  export const fetchAllProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
      const response = await fetchProductById(id);
      console.log("response-------->>::::",response);
      return response.data.product;
    }
  );
  

  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      setError: (state, action) => {
        state.error = action.payload; 
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProductsAsync.pending, (state) => {
          state.status = 'loading';
          
        })
        .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload;
          console.log("-------state",state.products)
        })



        .addCase(fetchAllProductByIdAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.selectedProduct = action.payload;
        })
    },
  });
  export const { setError } = productSlice.actions;
  export const selectAllProducts = (state) => state.product.products;
  export const selectProductById = (state) => state.product.selectedProduct;

  export default productSlice.reducer;