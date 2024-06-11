import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchMovies } from '../app/Slice/movieSlice'
import DisplayCard from './DisplayCard'
import { Grid,Box } from '@mui/material'

export default function Movies() {
  const userInfo=useSelector(state=>state.user.data)
  const movieData=useSelector(state=>state.movie.movies)
  const navigate=useNavigate();
  const dispatch=useDispatch()
 
  useEffect(()=>{
      dispatch(fetchMovies())
  },[dispatch])
   console.log(movieData)
  return (
    <Box
     sx={{
      flexGrow:1,
      p:3
     }}
    >
      <Grid container spacing={3}>
        {
           movieData.map((movie,index)=>(
               <Grid item xs={12} sm={6} md={4} key={index} >
                 <DisplayCard 
                  title={movie.title}
                  poster={movie.poster}
                  genere={movie.genere}
                  language={movie.language}
                  releaseDate={movie.releaseDate}
                  trailer={movie.trailer}
                  description={movie.description}
                  duration={movie.duration}
                   />
                </Grid>
           ))
        }
      </Grid>

    </Box>
  )
}
