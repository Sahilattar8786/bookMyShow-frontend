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

export const addTheatre=createAsyncThunk(
    'add/theatre',async(theaterData,{rejectWithValue})=>{
        try{
            const token=localStorage.getItem('token')
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            }
            const response= await axios.post('http://localhost:7000/api/theater',theaterData,config);
            return response.data;
        }
        catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)
export const updateTheatre=createAsyncThunk(
    'update/theatre',async({id,theaterData},{rejectWithValue})=>{
        try{
            const token=localStorage.getItem('token')
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            }
            const response= await axios.put(`http://localhost:7000/api/theater/${id}`,theaterData,config);
            return response.data;
        }
        catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteTheatre=createAsyncThunk(
    'delete/theatre',async(id,{rejectWithValue})=>{
        try{
            const token=localStorage.getItem('token')
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            }
            const response= await axios.delete(`http://localhost:7000/api/theater/${id}`,config);
            return response.data;
        }
        catch(error){
            return rejectWithValue(error.response.data);
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
        //fetch Theatre
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
        //FetchShowDetails By Theatre
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
        //Add Theatre
        .addCase(addTheatre.pending,(state) => {
            state.loading = true;
          })
        .addCase(addTheatre.fulfilled, (state, action) => {
            state.loading = false;
            // state.theatres.push(action.payload);
            state.error = "";
          })
        .addCase(addTheatre.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Something went wrong';
          })
          //delete theatre 
        .addCase(deleteTheatre.pending,(state)=>{
            state.loading=true;
          })
        .addCase(deleteTheatre.fulfilled,(state)=>{
            state.loading=false;
            // state.theatres=state.theatres.filter(theatre=>theatre._id!==action.payload);
            state.error=""
        })
        .addCase(deleteTheatre.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || 'Something went wrong';
        })
        //update theatre 
        .addCase(updateTheatre.pending,(state)=>{
            state.loading=true;
        })
        .addCase(updateTheatre.fulfilled,(state)=>{
            state.loading=false;
            // state.theatres=state.theatres.map(theatre=>theatre._id===action.payload._id? action.payload : theatre);
            state.error=""
        })
        .addCase(updateTheatre.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || 'Something went wrong';
        })

    }

})
export default theatreSlice.reducer;