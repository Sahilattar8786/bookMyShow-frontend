// TheaterCard.js
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TheaterCard({ theatre }) {
  const { _id, name, location: { address, city, state, pincode } } = theatre;
  console.log(theatre)
  const navigate=useNavigate()
  return (
    <Card sx={{ maxWidth: 345 }} key={_id} onClick={()=>navigate(`/theatreDetail/${_id}`)}>
      <CardHeader title={name} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle" color="text.secondary">
              {address}, {city}, {state} - {pincode}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, mb: 0 }}>
          <Button variant="contained">View Shows</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
