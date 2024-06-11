import { createSlice } from "@reduxjs/toolkit";



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
        .addCase()
    }
})

export default showSlice.reducer;