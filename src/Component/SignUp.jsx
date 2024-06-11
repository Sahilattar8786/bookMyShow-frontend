import { Box, Paper, TextField, Typography, Stack, Button} from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment';
export default function SignUp() {
  return (
    <Box 
     display="flex"
     alignItems="center"
     justifyContent="center"
     height="100vh"
     sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Paper
       elevation={3}
       sx={{
         p: 4,
         borderRadius: 2,
         width:400,
         '&:hover': { 
            transform: 'scale(1.05)', 
            transition: 'transform 0.3s ease-in-out' } 
         }} 
      >
       <Typography variant="h4" color="primary" fontWeight={700}>Sign Up</Typography>
       <Stack spacing={2} width="100%" mt={2}>
         <TextField label="Name" variant='outlined' fullWidth></TextField>
         <TextField label="Email" variant='outlined' fullWidth></TextField>
         <TextField label="Password" type='password' variant='outlined' fullWidth></TextField>
         <TextField label="Confirm Password" variant='outlined' fullWidth></TextField>
         <TextField label="Phone No" type='number'  variant='outlined' 

          InputProps={{
            startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            inputProps: { maxLength: 10 } // Ensure only 10 digits can be entered
          }}
         fullWidth></TextField>
         <Button variant='contained' color='primary' fullWidth>Sign Up</Button>
         <Typography variant="body2" align="center">
            Already have an account? <Link to="/">Sign In</Link>
         </Typography>
         <Typography variant="body2" color="center">
           <Link to="">Terms & Condition</Link>
         </Typography>
       </Stack>
      </Paper>
    </Box>
  )
}
