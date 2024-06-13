// TheaterCard.js
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React from 'react';

export default function TheaterCard({ theatre }) {
  const { name, location: { address, city, state, pincode } } = theatre;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={name} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
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
