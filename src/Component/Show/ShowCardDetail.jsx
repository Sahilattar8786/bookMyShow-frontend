import { Card, CardMedia,Stack ,Box, CardContent, Typography,Grid, Button } from '@mui/material'
import React from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
export default function ShowCardDetail({show}) {
  const { _id,movie, theater, showTime, seatsAvailable, price} =show ; 
  const navigate=useNavigate()
  return (
    <Card sx={{
        display:'block',
        flexDirection:'row',
        maxWidth:800
    }}
     key={_id}
     onClick={()=>navigate(`/showDetail/${_id}`)}
    >
      <CardMedia 
        component="img"
        alt="Contemplative Reptile"
        height="500"
        image={movie[0].poster}
        title="Contemplative Reptile"
      />
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        flex:1
      }}>
        <CardContent sx={{
            flex:'1 0 auto'
        }} >
          <Typography component='div' variant='h5'>
              {movie[0].title}
          </Typography> 
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {theater[0].name}
          </Typography> 
          <Grid container spacing={1} justifyContent='center'>
            <Grid item>
              <Typography variant="body2" fontWeight="700" color="error">
                {moment(showTime).format('dddd, MMMM D, YYYY h:mm A')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" textAlign='center'>
                {seatsAvailable} seats available
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Price: ₹{price}</Typography>
            </Grid>
          </Grid>
          <Box sx={{
            display:{
                xs:'flex',
                md:'block'
            },
            spacing:2,
            justifyContent:'center',
         }}>
            <Button variant='contained' color='primary' sx={{m:1}}>
                Book Tickets
            </Button>
         </Box>
        </CardContent>
      </Box>
    </Card>
  )
}
