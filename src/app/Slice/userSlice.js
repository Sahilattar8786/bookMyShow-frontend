import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const login=createAsyncThunk(
    'user/login', async()=>{

    }
)

const initialState={
    loading:false,
    data:[],
    error:''
}
const userSlice=createSlice({
    name:'userInfo',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
            state.error=''
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.data=[]
            state.error=action.error.message
        })
    }
})


export default userSlice.reducer;
