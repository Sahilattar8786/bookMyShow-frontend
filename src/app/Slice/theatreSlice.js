import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTheatre=createAsyncThunk(
    'fetch/thetre',async()=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response= await axios.get('http://localhost:7000/api/theater/',config);
            return response.data;
        }catch(error){
            return error.response.data
        }
    }
)


const initialState={
    loading:false,
    theatres:[],
    error:''
}

const theatreSlice=createSlice({
    name:"theatre",
    initialState:initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTheatre.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchTheatre.fulfilled,(state,action)=>{
            state.loading=false;
            state.theatres=action.payload;
            state.error=""
        })
        .addCase(fetchTheatre.rejected,(state,action)=>{
            state.loading=false;
            state.theatres=[];
            state.error=action.payload;
        })
    }

})
export default theatreSlice.reducer;