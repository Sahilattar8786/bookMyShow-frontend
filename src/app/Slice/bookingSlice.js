import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
export const createBooking=createAsyncThunk(
    'create/booking', async ({seats,totalPrice,show})=>{
         try{
             const config={
                 headers:{
                     'Content-Type':'application/json'
                 }
             }
             const userId=useSelector(state=>state.user.data._id)
             const response= await axios.post('http://localhost:7000/api/booking',{userId,seats,totalPrice,show},config);
             return response.data;
         }catch(error){
             return error.response.data;
         }
    }
)


const booking =createSlice({
    name:'booking',
    initialState:[],
    extraReducers:(builder)=>{
        builder
        .addCase(createBooking.pending,(state)=>{
            state.loading=true;
        })
        .addCase(createBooking.fulfilled,(state,action)=>{
            state.loading=false;
            state.booking=action.payload;
            state.error=""
        })
        .addCase(createBooking.rejected,(state,action)=>{
            state.loading=false;
            state.booking=[];
            state.error=action.payload;
        })
    }
})


export default booking.reducer;