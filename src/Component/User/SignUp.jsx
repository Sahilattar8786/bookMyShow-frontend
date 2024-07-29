import {
  Box,
  Paper,
  TextField,
  Typography,
  Stack,
  Button,
  Experimental_CssVarsProvider
} from '@mui/material';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast ,ToastContainer } from 'react-toastify';
import { SignUp } from '../../app/Slice/userSlice';


export default function SignUpComponent() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const initialValue = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNo: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    email: Yup.string()
      .email('Invalid Email Format')
      .required('Email is Required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm Password is Required'),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone Number Must be Exactly 10 digits')
      .required('Phone Number Is Required'),
  });

  const handleSubmit =async (values, { setSubmitting }) => {
    // const result=await dispatch(SignUp(values))
      try{
         await dispatch(SignUp(values)).unwrap();
         toast.success('User Created Successfully ..!',{
           position: 'top-center',
           autoClose: 5000,
           onClose: () => navigate('/'),
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
         })
         setSubmitting(false);
      }catch(error){
        toast.error('SignUp Failed' ,{
          position: 'top-center',
          autoClose: 5000,
          // onClose: () => setSubmitting(false),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        console.error(error)
        return;
      }
  };

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
          width: 400,
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        <Typography variant="h4" color="primary" fontWeight={700}>
          Sign Up
        </Typography>

        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur }) => (
            <Form>
              <Stack spacing={2} width="100%" mt={2}>
                <Field name="name">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: 'red' }}
                ></ErrorMessage>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: 'red' }}
                ></ErrorMessage>
                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: 'red' }}
                ></ErrorMessage>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  style={{ color: 'red' }}
                />
                <Field name="phoneNo">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Phone No"
                      type="tel"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+91</InputAdornment>
                        ),
                        inputProps: { maxLength: 10 },
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phoneNo"
                  component="div"
                  style={{ color: 'red' }}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                  Sign Up
                </Button>
                <Typography variant="body2" align="center">
                  Already have an account? <Link to="/">Sign In</Link>
                </Typography>
                <Typography variant="body2" color="center">
                  <Link to="">Terms & Condition</Link>
                </Typography>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
      <ToastContainer/>
    </Box>
  );
}
