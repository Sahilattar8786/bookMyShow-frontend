import React from 'react';
import { Box, Typography, Stack, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
const Login = () => {
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
                    transition: 'transform 0.3s ease-in-out' }

                 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" mb={2} color={"primary"}  fontWeight={700}>
                        Login
                    </Typography>
                    <Stack spacing={2}  width="100%">
                        <TextField label="Email" variant="outlined" fullWidth />
                        <TextField label="Password" variant="outlined" type="password" fullWidth />
                        <Button variant="contained" color="primary" fullWidth>
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
        </Box>
    );
};


const Login1=()=>{
    return(
    <Box
     display="flex"
     justifyContent='center'
     alignItems='center'
     height='100vh'
     sx={{ backgroundColor: '#f5f5f5' }}
    >
        <Paper elevation={3} sx={{
            p:4 ,
            borderRadius:2,
            width:400
        }}>
           <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h4" color="primary" fontWeight={700}>Login</Typography>
              <Stack spacing={2} width="100%" mt={2}>
                <TextField label="Email" variant='outlined' fullWidth></TextField>
                <TextField label="Password" variant='outlined' fullWidth></TextField>
                <Button variant='contained' color='primary' fullWidth>Login</Button>
                <Link href="#" variant="body2" align="center">Forgot password?</Link>
                <Typography variant="body2" color="primary">
                    Don't have an account? <Link href="">Sign Up</Link>
                </Typography>
              </Stack>
           </Box>
        </Paper>
    </Box>
    )
}
export default Login;
