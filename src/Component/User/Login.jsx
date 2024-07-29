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
   
   const handleLogin =async (email, password) => {
    console.log(email, password);
    if(!email && !password){
        toast.warning('Please Enter Email and Password',{
            position: 'top-right',
            autoClose: 5000,
            onClose: () => navigate('/movie'),
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }else{
        try{
            const result = await dispatch(LogInUser({email,password})).unwrap()
            console.log(result)

            toast.success("Login Successfull",{
                position: 'top-center',
                autoClose: 5000,
                onClose: () => navigate(result.isAdmin ? '/admin' : '/movie'),
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }catch(error){
            toast.error(`${error.error}`,{
                position: 'top-center',
                autoClose: 5000,
                onClose: () => navigate('/'),
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
   


  };
  
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


