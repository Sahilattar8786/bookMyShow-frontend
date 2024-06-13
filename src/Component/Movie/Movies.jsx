import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { FindMovies, fetchMovies } from '../../app/Slice/movieSlice'
import DisplayCard from './DisplayCard'
import { Grid,Box,TextField,Button,Typography } from '@mui/material'

export default function Movies() {
  // const userInfo=useSelector(state=>state.user.data)
  const movieData=useSelector(state=>state.movie.movies)
  const [searchQury,setSearchQuery]=useState('');
  // const navigate=useNavigate();
  const dispatch=useDispatch()
  const handleSearch=()=>{
     console.log(searchQury)
     dispatch(FindMovies(searchQury))  
   } 
 
  useEffect(()=>{
      dispatch(fetchMovies())
  },[])
   console.log(movieData)
  return (
    <Box
     sx={{
      flexGrow:1,
      m:2
     }}
    > 
        <Box 
      sx={{
        display:'flex',
        alignItems:'center',
        marginBottom:2,
        justifyContent:'center'
      }}
      spacing={2}
      >
       <TextField 
         label="Search Movie"
         variant="outlined"
         value={searchQury}
         onChange={(e)=>setSearchQuery(e.target.value)}
         sx={{height:56}}
       />
       <Button variant="contained" 
        sx={{height:56}}
        onClick={()=>handleSearch()}
       >Search</Button>
      </Box>
      <Grid container spacing={1}>
        {movieData && movieData.length>0 ?
        (
           movieData.map((movie,index)=>(
               <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                 <DisplayCard 
                  id={movie._id}
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
          ):(
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '300px',
              }}
            >
              <Typography variant="h5" gutterBottom>
                No Movies Found
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Sorry, we couldn't find any movies matching your search criteria. Please try again with a different search term or check back later for new movie listings.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

    </Box>
  )
}
