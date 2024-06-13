import { Paper } from '@mui/material'
import React from 'react'

export default function forgotPassword() {
  return (
    <Box
     display="flex"
     alignItems="center"
     justifyContent="center"
     height="100vh"
     sx={{ backgroundColor: '#f5f5f5' }}
    >
        <Paper elevation={3} sx={{
            p:4,
            borderRadius: 2,
            width:400
        }}>
         <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" mb={2}>
                Forgot Password
            </Typography>
            <Stack spacing={2} width="100%">
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    sx={{ mb: 1 }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Send Link
                </Button>
            </Stack>
            </Box>
        </Paper>
      
    </Box>
  )
}
