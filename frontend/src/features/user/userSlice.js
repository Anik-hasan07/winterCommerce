import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgotPassword, updatePassword } from './userApi';



const initialState = {
  user:null,
  status: 'idle',
  isAuthenticated: false,
  isUpdate:false  ,
  error:null,
  message: null,
};

export const updatePasswordAsync = createAsyncThunk(
  'user/updatePassword',
  async (passwords) => {
    const response = await updatePassword(passwords);
    console.log("--response.data".response.data)
    return response.data;
  }
);
export const forgotPasswordAsync = createAsyncThunk(
  'user/forgotPassword',
  async (email) => {
    const response = await forgotPassword(email);
    console.log("--response.data".response.data)
    return response.data;
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
        state.error = action.payload; 
    },
    resetUpdatePassword: (state) => {
      state.isUpdate = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isUpdate = action.payload;
       
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })



      //forgot password
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = action.payload;
       
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
  },
});


export const { setError,resetUpdatePassword } = userSlice.actions;
export default userSlice.reducer;