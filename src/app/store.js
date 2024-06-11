import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import movieSlice from "./Slice/movieSlice";
import showSlice from "./Slice/showSlice";


export const store=configureStore({
    reducer:{
        user:userSlice,
        movie:movieSlice,
        show:showSlice
    }
})
