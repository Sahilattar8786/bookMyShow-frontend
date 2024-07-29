import React, { useEffect, useState } from 'react';
import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography, Grid, Dialog, DialogContent, DialogTitle,DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTheatre, fetchTheatre } from '../../../app/Slice/theatreSlice';
import AddTheaterForm from './AddTheaterForm';
import { Delete, Edit } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import ConfirmDelete from '../ConfirmDelete';
import { toast } from 'react-toastify';
export default function AdminTheater() {
  const [open, setOpen] = useState(false);
  const [Dopen, setDOpen] = useState(false);
  const [DID,setDID]=useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [dialogType, setDialogType] = useState('');
  const dispatch = useDispatch();
  const theatreData = useSelector(state => state.theater.theatres || []);

  useEffect(() => {
    dispatch(fetchTheatre());
  }, [dispatch]);

  const handleOpen = (theater = null) => {
    setSelectedTheater(theater);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTheater(null);
  };

  const handleRefresh = () => {
    dispatch(fetchTheatre());
  };
  console.log(selectedTheater);

  const handleConfirm=async(id)=>{
    try{
        await dispatch(deleteTheatre(DID)).unwrap()
        toast.success('Deleted Successfully ..!',{
          position: 'top-center',
          autoClose: 5000,
          onClose: () => handleRefresh(),
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setDID(null)
        setDOpen(false)
    }catch(error){
      toast.error(`${error.error}`,{
        position: 'top-center',
        autoClose: 5000,
        onClose: () => handleRefresh(),
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    setDOpen(false)
  }
  const deletehandler=(id)=>{
    setDOpen(true)
    setDID(id)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      backgroundColor: '#f5f5f5',
      p: 2
    }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" gutterBottom>Admin Theater Management</Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" sx={{ height: 'fit-content' }} onClick={() => handleOpen()}>Add Theater</Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary' }}>
            <TableRow>
              <TableCell><Typography variant="h6">S.No.</Typography></TableCell>
              <TableCell><Typography variant="h6">Theater Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Address</Typography></TableCell>
              <TableCell><Typography variant="h6">City</Typography></TableCell>
              <TableCell><Typography variant="h6">State</Typography></TableCell>
              <TableCell><Typography variant="h6">PinCode</Typography></TableCell>
              <TableCell><Typography variant="h6">Action</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {theatreData && theatreData.length > 0 ? (
              theatreData.map((theater, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{theater.name}</TableCell>
                  <TableCell>{theater.location?.address}</TableCell>
                  <TableCell>{theater.location?.city}</TableCell>
                  <TableCell>{theater.location?.state}</TableCell>
                  <TableCell>{theater.location?.pincode}</TableCell>
                  <TableCell>
                    <Button variant='contained' color='primary' startIcon={<Edit />} onClick={() => handleOpen(theater)}>Edit</Button>
                    <Button variant="contained" color='error' startIcon={<Delete />} onClick={()=>deletehandler(theater._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography variant="h5" color="initial" align="center">No Data Found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedTheater ? 'Update Theater' : 'Add Theater'}</DialogTitle>
        <DialogContent>
          <AddTheaterForm handleClose={handleClose} theater={selectedTheater} onSuccess={handleRefresh} />
        </DialogContent>
      </Dialog>
      <ConfirmDelete
        open={Dopen} 
        handleClose={handleClose} 
        handleConfirm={handleConfirm} 
      />
      <ToastContainer/>
    </Box>
  );
}