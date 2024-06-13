import React, {useState } from 'react';
import { Box, Typography, Stack, TextField,Paper,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogInUser } from '../../app/Slice/userSlice';
import { useNavigate } from'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function  LogIn  ()  {
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const error1=useSelector(state=>state.user.error)
   const loading=useSelector(state=>state.user.loading);
   
   const handleLogin=(email,password)=>{
     console.log(email,password) 
     dispatch(LogInUser({email,password})).then((response)=>{
        toast.success('Login Successful', {
          position: "top-right",
          autoClose: 1000,
          onClose: () => navigate('/movie')
        });
     }).catch((error)=>{
        toast.error(error1, { // Use error.message if available
          position: 'top-right',
          autoClose: 1000
        });
     })
   }
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ backgroundColor: '#f5f5f5' }}
           
        >
            <Paper elevation={3} sx={{
                 p: 4, 
                 borderRadius: 2,
                 width:400 ,
                 '&:hover': { 
                    transform: 'scale(1.05)', 
                    transition: 'transform 0.3s ease-in-out' },
                 m:2
                 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" mb={2} color={"primary"}  fontWeight={700}>
                        Login
                    </Typography>
                    <Stack spacing={2}  width="100%">
                        <TextField label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)} fullWidth />
                        <TextField label="Password" variant="outlined" type="password" onChange={(e)=>setPassword(e.target.value)} fullWidth />
                        <Button variant="contained" color="primary" fullWidth onClick={()=>handleLogin(email,password)}>
                            Login
                        </Button>
                        <Link href="#" variant="body2" align="center">
                            Forgot password?
                        </Link>
                        <Typography variant="body2" align="center">
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </Typography>
                    </Stack>
                </Box>
            </Paper>
            <ToastContainer />
        </Box>
    );
};

