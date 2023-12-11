import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loadUser, loginUser, logoutUser, updateUser } from './authApi';


const initialState = {
  user:null,
  status: 'idle',
  isAuthenticated: false,
  isUpdated:null,
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
    console.log("response.data----",response.user);
    return response.user;
  }
);
export const loadUserAsync = createAsyncThunk(
  'auth/loadUser',
  async () => {
    const response = await loadUser();
    return response.user;
  }
);
export const logoutUserAsync = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    const response = await logoutUser();
    return response.user;
  }
);
export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async ({name,email}) => {
    const response = await updateUser(name,email);
    console.log("-----------updateUserAsync",response)
    return response.data;
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
        state.error = action.payload; 
    },
    resetUpdateStatus: (state) => {
      state.isUpdated = false;
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



      .addCase(loadUserAsync.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated = false;
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = true;
        state.user=action.payload;
      })
      .addCase(loadUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null
      })


      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isAuthenticated = true;
        state.user=action.payload;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        state.isAuthenticated = false;
      })




      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.user= action.payload; 
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
     
      })
  },
});


export const { setError,resetUpdateStatus } = authSlice.actions;
export default authSlice.reducer;