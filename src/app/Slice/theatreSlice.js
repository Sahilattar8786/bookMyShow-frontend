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
// fetch show details 

export const fetchShowDeatailByTheatre=createAsyncThunk(
    'fethch/showDetailByTheatre',async(id)=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response = await axios.post(`http://localhost:7000/api/shows/theatre/${id}`,config);
            return response.data
             
        }catch(error){
            return error.response.data;
        }
    }
)
// serach theatre 

export const searchTheatre=createAsyncThunk(
    'search/theatre',async(req,res)=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response= await axios.post('http://localhost:7000/api/theater/find',req,config);
            return response.data;
        }
        catch(error){
            return error.response.data;
        }
    }
)

const initialState={
    loading:false,
    theatres:[],
    selectedTheatre:[],
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
        .addCase(fetchShowDeatailByTheatre.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchShowDeatailByTheatre.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedTheatre=action.payload;
            state.error=""
        })
        .addCase(fetchShowDeatailByTheatre.rejected,(state,action)=>{
            state.loading="false";
            state.selectedTheatre=[];
            state.error=action.payload || 'something error' ;
        })
    }

})
export default theatreSlice.reducer;