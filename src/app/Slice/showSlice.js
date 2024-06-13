import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const GetShow=createAsyncThunk(
    'get/show',async(_,{rejectWithValue})=>{
        try{
             const config={
                 headers:{
                     'Content-Type':'application/json'
                 }
             }
             const response =await axios.get('http://localhost:7000/api/shows/',config);
             return response.data

        }
        catch(error){
             rejectWithValue(error.response.data)
        }
    }
)
export const searchSHow=createAsyncThunk(
    'search/show',async(name)=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }
          
            const response= await axios.post('http://localhost:7000/api/shows/find',{name},config);
            return response.data;

        }
        catch(error){
            return error.response.data;
        }
    }
)

 

const showSlice=createSlice({
    name:"shows",
    initialState:{
        loading:false,
        shows:[],
        error:''

    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(GetShow.pending,(state)=>{
            state.loading=true;
        })
        .addCase(GetShow.fulfilled,(state,action)=>{
            state.loading=false;
            state.shows=action.payload;
        })
        .addCase(GetShow.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload ? action.payload.error : 'Something went wrong'; 
        })
        .addCase(searchSHow.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(searchSHow.fulfilled,(state,action)=>{
            state.loading=false;
            state.shows=action.payload;
        })
        .addCase(searchSHow.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload? action.payload.error : 'Something went wrong';
        })

    }
})

export default showSlice.reducer;