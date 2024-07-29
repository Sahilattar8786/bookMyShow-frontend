import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTheatre,updateTheatre } from '../../../app/Slice/theatreSlice';
import { toast } from 'react-toastify';

export default function AddTheaterForm({ handleClose, theater, onSuccess }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [errors,seterrors]=useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })
  const dispatch = useDispatch();

  useEffect(() => {
    if (theater) {
      setName(theater.name || '');
      setAddress(theater.location?.address || '');
      setCity(theater.location?.city || '');
      setState(theater.location?.state || '');
      setPincode(theater.location?.pincode || '');
    }
  }, [theater]);

  const validation=()=>{
    let errors={}
    let isValid=true ;
    if(!name){
      errors.name='Name is required'
      isValid=false;
    }
    if(!address){
      errors.address='Address is required'
      isValid=false;
    }
    if(!city){
      errors.city='City is required'
      isValid=false;
    }
    if(!state){
      errors.state='State is required'
      isValid=false;
    }
    if(!pincode){
      errors.pincode='Pincode is required'
      isValid=false;
    }
    seterrors(errors)
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if(!validation()){
      return;
    }
    const theaterData = {
      name,
      location: { address, city, state, pincode },
    };

    try {
      if (theater) {
        await dispatch(updateTheatre({ id: theater._id,theaterData })).unwrap();
        toast.success('Updated Successfully',{
          position: 'top-center',
          autoClose: 5000,
          onClose: () => handleClose(),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        if (onSuccess) onSuccess();

      } else {
        console.log(theaterData);
        // Unwrap the result to handle resolved/rejected state
        await dispatch(addTheatre(theaterData)).unwrap();
        toast.success('Theater added successfully!',{
          position: 'top-center',
          autoClose: 5000,
          onClose: () => handleClose(),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error(`Error: ${error.error}`,{
        position: 'top-center',
        autoClose: 5000,
        onClose: () => handleClose(),
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    handleClose();
  };
  return (
    <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
      <TextField
        label="Theater Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        margin="normal"
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={!!errors.address}
        helperText={errors.address}
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={!!errors.city}
        helperText={errors.city}
        fullWidth
        margin="normal"
      />
      <TextField
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        error={!!errors.state}
        helperText={errors.state}
        fullWidth
        margin="normal"
      />
      <TextField
        label="PinCode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        error={!!errors.pincode}
        helperText={errors.pincode}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {theater ? 'Update' : 'Add'}
      </Button>
      <Button onClick={handleClose} variant="contained" color="secondary" sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Box>
  );
}
