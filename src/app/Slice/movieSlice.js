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

const movies = createSlice({
    name: "movies",
    initialState: {
        loading: false,
        movies: [],
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
            });
    }
});

export default movies.reducer;
