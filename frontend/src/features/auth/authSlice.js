import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser } from './authApi';


const initialState = {
  user:{},
  status: 'idle',
  isAuthenticated: false,
  error:null
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async ({name,email,password}) => {
    const response = await createUser(name,email,password);
    console.log("--response.data".response.data)
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
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
        state.isAuthenticated = false;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = true;
        state.user=action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null
      })




      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated = false;
        

      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
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