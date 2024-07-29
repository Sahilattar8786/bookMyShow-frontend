import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const LogInUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:7000/api/users/login",
        { email, password },
        config
      );
      localStorage.setItem('token', response.data.token);
      return response.data;
    
    } catch (error) {
      // If the API call fails, include the error message in the rejected action payload
      return rejectWithValue(error.response.data);
    }
  }
);
export const SignUp = createAsyncThunk(
  "user/signup",
  async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:7000/api/users/",
        values,
        config
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  error: "",
};
const userSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    LogOut(state) {
      state.loading = false;
      state.data = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LogInUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(LogInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(LogInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { LogOut } = userSlice.actions;
