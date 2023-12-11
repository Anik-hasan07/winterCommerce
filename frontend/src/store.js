import { configureStore} from '@reduxjs/toolkit';
import productReducer from './features/product/productSlice';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';


export const store = configureStore({
    reducer: {
      product: productReducer,
      auth: authReducer,
      user: userReducer
    //   cart: cartReducer,
    //   order:orderReducer,
    //   user:userReducer
    },
  });