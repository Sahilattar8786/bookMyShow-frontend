import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
export const createBooking = createAsyncThunk(
    'bookings/create',
    async ({ seats, userId, show, totalPrice }, { rejectWithValue }) => {
      try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const response = await axios.post('http://localhost:7000/api/booking', {  
          userId,
          show,
          seats,
          totalPrice,
        },
        config);
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);
//fetch ticket detail by movie id 

export const getTicketsByUser=createAsyncThunk(
    'fetch/ticket' ,async(userId)=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response =await axios.get(`http://localhost:7000/api/booking/user/${userId}`,config);
            return response.data;
        }catch(error){
            return error.response.data;
        }
    }
)

// cancel booking
export const cancelBooking=createAsyncThunk(
    'cancel/booking',async(id)=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response =await axios.post(`http://localhost:7000/api/booking/cancel/${id}`,config);
            return response.data;
        }catch(error){
            return error.response.data;
        }
    }
)

const initialState={
    loading:false,
    booking:[],
    error:"",
    success:false
}

const booking =createSlice({
    name:'booking',
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createBooking.pending,(state)=>{
            state.loading=true;
        })
        .addCase(createBooking.fulfilled,(state,action)=>{
            state.loading=false;
            state.booking=action.payload;
            state.error=""
            state.success=true
        })
        .addCase(createBooking.rejected,(state,action)=>{
            state.loading=false;
            state.booking=[];
            state.error=action.payload;
            state.success=false;
        })
        .addCase(getTicketsByUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getTicketsByUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.booking=action.payload;
            state.error=""
        })
        .addCase(getTicketsByUser.rejected,(state,action)=>{
            state.loading=false;
            state.booking=[];
            state.error=action.payload;
            state.success=false;
        })
        .addCase(cancelBooking.pending,(state)=>{
            state.loading=true;
        })
        .addCase(cancelBooking.fulfilled,(state)=>{
            state.loading=false;
            state.error=""
            state.success=true
        })
        .addCase(cancelBooking.rejected,(state,action)=>{
            state.loading=false;
            state.booking=[];
            state.error=action.payload;
            state.success=false;
        })
    }
})


export default booking.reducer;