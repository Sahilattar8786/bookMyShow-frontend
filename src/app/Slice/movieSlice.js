import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch movies
export const fetchMovies = createAsyncThunk(
    'fetch/movies',
    async (_, { rejectWithValue }) => { // Fixed to use _ instead of { rejectwithValue }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get('http://localhost:7000/api/movie', config);
            return response.data; // Return the response data directly
        } catch (error) {
            return rejectWithValue(error.response.data); // Use rejectWithValue to pass error data
        }
    }
);

// find movies 
export const FindMovies=createAsyncThunk(
    'find/movies',async(name)=>{
        try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            };
            const response =await axios.post('http://localhost:7000/api/movie/find',{name},config);
            return response.data
        }catch(error){
             return error.response.data ;
        }    
    }
)
//movie Deatil 
export const fetchMovieDetail=createAsyncThunk(
    'fecth/movieDeatails',async(id)=>{
        try{
           
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const response= await axios.post(`http://localhost:7000/api/movie/${id}`,config);
            return response.data

        }catch(error){
            return error.response.data;
        }
    }
)
const movies = createSlice({
    name: "movies",
    initialState: {
        loading: false,
        movies: [],
        selectedMovie:[],
        error: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload; // Access payload directly
                state.error = ''; // Clear error on success
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.error : 'Something went wrong'; // Correctly access error payload
            })
            .addCase(FindMovies.pending,(state)=>{
                state.loading=true;
            })
            .addCase(FindMovies.fulfilled,(state,action)=>{
                state.loading=false;
                state.movies=action.payload;
                state.error=" "
            })
            .addCase(FindMovies.rejected,(state,action)=>{
                state.loading=false;
                state.movies=[]
                state.error=action.payload || action.payload.error;
            })
            .addCase(fetchMovieDetail.pending,(state)=>{
                state.loading=true;
            })
            .addCase(fetchMovieDetail.fulfilled,(state,action)=>{
                state.loading=false;
                state.selectedMovie=action.payload;
                state.error=""
            })
            .addCase(fetchMovieDetail.rejected,(state,action)=>{
                state.loading=false;
                state.selectedMovie=[]
                state.error=action.payload || action.payload.error;
            })
    }
});

export default movies.reducer;
