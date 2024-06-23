import { Box, Card, CardMedia, Button, Paper, Typography, Divider, Grid ,CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowDeatailByTheatre } from '../../app/Slice/theatreSlice';
import { useNavigate, useParams } from 'react-router-dom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import moment from 'moment';


export default function TheaterDetail() {
    const {id}=useParams();
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchShowDeatailByTheatre(id))
      },[])
    const theatreData=useSelector(state=>state.theater.selectedTheatre)

    console.log(theatreData.length)
   
    if (!theatreData || theatreData.length === 0) {
      return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>No Data Found...</Typography>;
  }

  
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
    <Grid container spacing={2}>
      {theatreData.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <MovieCard movie={data.movie[0]} id={data._id} />
          
        </Grid>
      ))}
    </Grid>
  </Box>
  )
}

const MovieCard=({movie,id})=>{
  const navigate=useNavigate();
 return( 
  <Card>
  <CardMedia
    component="img"
    height="400"
    image={movie.poster}
    alt={movie.title}
  />
  <CardContent style={{textAlign:'start'}}>
    <Typography variant="h6">{movie.title}</Typography>
    {/* <Typography variant="body2" color="textSecondary">{movie.description}</Typography> */}
    <Typography variant="body2" color="textSecondary">{`Duration: ${movie.duration} minutes`}</Typography>
    <Typography variant="body2" color="textSecondary">{`Genre: ${movie.genere.join(', ')}`}</Typography>
    <Typography variant="body2" color="textSecondary">{`Language: ${movie.language}`}</Typography>
    <Typography variant="body2" color="textSecondary">{`Release Date: ${new Date(movie.releaseDate).toDateString()}`}</Typography>
    <Button variant='contained' onClick={()=>navigate(`/booking/${id}`)}>Book Ticket</Button>
  </CardContent>
</Card>
)}



