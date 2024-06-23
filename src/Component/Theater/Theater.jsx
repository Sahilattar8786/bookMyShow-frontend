import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTheatre,searchTheatre } from '../../app/Slice/theatreSlice';
import TheaterCard from './TheaterCard';
  
export default function Theater() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const theatreData = useSelector(state => state.theater.theatres);
  const session = sessionStorage.getItem('userInfo');
  useEffect(() => {
    dispatch(fetchTheatre());
  }, [dispatch]);

  const handleSearch = () => {
    console.log(searchQuery);
    dispatch(searchTheatre(searchQuery));
  };
  console.log(session);
  return (
    <Box sx={{ display: 'block', alignItems: 'center', m: 5 }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center' }}
        spacing={2}
      >
        <TextField
          label="Search Show"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ height: 56 }}
        />
        <Button
          variant="contained"
          sx={{ height: 56 }}
          onClick={() => handleSearch()}
        >
          Search
        </Button>
      </Box>
      <Grid container spacing={1}>
        {theatreData && theatreData.length > 0 ? (
          theatreData.map((i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i._id}>
              <TheaterCard theatre={i} />
            </Grid>
          ))
        ) : (
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
                No Theatre Found
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Sorry, we couldn't find any Theatre matching your search criteria. Please try again with a different search term or check back later for new movie listings.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
