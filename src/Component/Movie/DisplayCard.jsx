import React from 'react';
import { Card, CardContent, CardMedia, Button, Box, Typography, Grid, Chip } from '@mui/material';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';

export default function DisplayCard({
  id,
  title,
  poster,
  genere,
  language,
  releaseDate,
  trailer,
  description,
  duration,
}) {
  const navigate=useNavigate()
  return (
    <Card sx={{ display: 'block', flexDirection: { xs: 'column', md: 'row' }, maxWidth: 800  }} onClick={()=>navigate(`/MovieDetail/${id}`)} key={id}>
      <CardMedia
        component="img"
        alt="Movie Poster"
        height="500"
        image={poster}
        title="Movie Poster"
      />
      <CardContent sx={{textAlign:"start"}}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {/* <Typography variant="subtitle" color="text.secondary" paragraph>
          {description}
        </Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" color="text.secondary">
              Language: {language}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: {duration} minutes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Release Date: {moment(releaseDate).format('dddd, MMMM D, YYYY')}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2,display:'flex',justifyContent:'center',mt:2 }}>
          {genere.map((g) => (
            <Chip key={g} label={g} variant="outlined" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
        {/* <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'space-between' }, mt: 2  }}>
          <Button variant="contained" color="primary" >
            Book Tickets
          </Button>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </Box> */}
      </CardContent>
    </Card>
  );
}
