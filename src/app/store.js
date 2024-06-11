import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import movieSlice from "./Slice/movieSlice";


export const store=configureStore({
    reducer:{
        user:userSlice,
        movie:movieSlice
    }
})
