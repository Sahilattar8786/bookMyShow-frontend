import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const CreatePayment = createAsyncThunk(
  'create/payment',
  async ({ seats, userId, show, totalPrice }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization':'Bearer '+localStorage.getItem('token')
        },
      };
      const response = await axios.post('http://localhost:7000/api/payment/checkout', { userId, seats, show, totalPrice }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'verify/payment',
  async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature ,seats,show,userId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization':'Bearer '+localStorage.getItem('token')
        },
      };

      const response = await axios.post('http://localhost:7000/api/payment/paymentVerification', { razorpay_order_id, razorpay_payment_id, razorpay_signature,seats,show,userId }, config);
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    paymnetInfo: null,
    error: null,
    verificationInfo: null,
    verificationError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreatePayment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentInfo = action.payload;
      })
      .addCase(CreatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyPayment.pending, (state, action) => {
        state.loading = true;
        state.verificationError = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationInfo = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.verificationError = action.payload;
      });
  },
});

export default paymentSlice.reducer;
