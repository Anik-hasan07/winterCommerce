import { configureStore, createReducer } from '@reduxjs/toolkit';
import productReducer from './features/product/productSlice';


export const store = configureStore({
    reducer: {
      product: productReducer,
    //   auth: authReducer,
    //   cart: cartReducer,
    //   order:orderReducer,
    //   user:userReducer
    },
  });