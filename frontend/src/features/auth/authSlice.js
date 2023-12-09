import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser } from './authApi';


const initialState = {
  user:{},
  status: 'idle',
  isAuthenticated: false,
  error:null
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async ({email,password}) => {
    const response = await loginUser(email,password);
    return response.data;
  }
);



export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
        state.error = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })


      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated = false;
        

      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.isAuthenticated = true;
        state.user=action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null
      })
  },
});


export const { setError } = authSlice.actions;
export default authSlice.reducer;