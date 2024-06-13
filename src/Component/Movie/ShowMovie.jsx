import { Box, Card, CardMedia, Button, Paper, Typography } from '@mui/material';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail } from '../../app/Slice/movieSlice';
import { useParams } from 'react-router-dom';
import TheatersIcon from '@mui/icons-material/Theaters';
import moment from 'moment';
export default function ShowMovie() {
  const {id}=useParams()
  const movieData=useSelector(state=>state.movie.selectedMovie)
  const dispatch=useDispatch() 
  useEffect(()=>{
      dispatch(fetchMovieDetail(id))
  },[])
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      backgroundColor: '#f5f5f5',
      p: 2
    }}>
      <Box sx={{
        display: {
          xs: 'block', // Block display on extra small screens
          md: 'flex'   // Flex display on medium and larger screens
        },
        flexDirection: {
          xs: 'column', // Column direction on extra small screens
          md: 'row'     // Row direction on medium and larger screens
        },
        width: '100%',
        height: '100%',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        <Box sx={{
          flex: {
            xs: 1, // Equal size on smaller screens
            md: 3  // 30% on medium and larger screens
          },
          order: {
            xs: 1, // Order 1 on extra small screens
            md: 2  // Order 1 on medium and larger screens
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: {
            xs: '50%',   // 50% height on extra small screens
            md: '100%'   // 100% height on medium and larger screens
          },
          pt:{
            xs:-5,
            md:0
          },
          pb:{
            xs:-2
          }
        }}>
          {/* Content for the second box */}
          <Paper elevation={5} sx={{ width: '100%', height: '100%' , mr:{xs:0,md:-5} }}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                image={movieData.poster}
                alt={movieData.title}
                sx={{ height: '100%', objectFit: 'cover' }}
              />
            </Card>
          </Paper>
        </Box>
        <Box sx={{
          flex: {
            xs: 1, // Equal size on smaller screens
            md: 7  // 70% on medium and larger screens
          },
          order: {
            xs: 2, // Order 2 on extra small screens
            md: 1  // Order 2 on medium and larger screens
          },
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: {
            xs: 'center', // Centered on extra small screens
            md: 'flex-start'  // Flex start on medium and larger screens
          },
          alignItems: {
            xs:'flex-start',
            md:'flex-start'
          },
          height: {
            xs: '50%',   // 50% height on extra small screens
            md: '100%'   // 100% height on medium and larger screens
          },
          mt:{
            xs:-0.5
          }
        }}>
          {/* Content for the first box */}
          <Typography variant="h5" gutterBottom>
            {movieData.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Runtime: {movieData.duration} min
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Release Date: {moment(movieData.releaseDate).format('dddd, MMMM D, YYYY')}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph textAlign='start'>
            {movieData.description}
          </Typography>
          <Box
  sx={{
    display: 'flex',
    justifyContent: {
      xs: 'center', // Centered on extra small screens
      md: 'start',  // Aligned to the start on medium and larger screens
    },
    alignContent: {
      xs: 'center', // Centered on extra small screens
      md: 'start',  // Aligned to the start on medium and larger screens
    },
    textAlign: {
      xs: 'center', // Centered text on extra small screens
      md: 'center', // Centered text on medium and larger screens
    },
    width: {
      xs: '100%',  // Full width on extra small screens
      md: '50%',   // Half width on medium and larger screens
    },
  }}
>
<Button
  variant="contained"
  color="primary"
  href={movieData.trailer}
  target="_blank"
  endIcon={<TheatersIcon />}
  sx={{
    textTransform: 'none', // Prevents uppercase transformation
    justifyContent: 'center', // Centers the content horizontally
    alignItems: 'center', // Centers the content vertically
  }}
>
  Watch Trailer
</Button>
</Box>

          
        </Box>
      </Box>
    </Box>
  );
}
