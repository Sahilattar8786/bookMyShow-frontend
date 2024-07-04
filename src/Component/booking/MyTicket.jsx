import React, { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import TicketCard from './TicketCard';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, getTicketsByUser } from '../../app/Slice/bookingSlice';
import { toast,ToastContainer} from 'react-toastify';

const TicketsList = () => {
    const userId = useSelector(state => state.user.data._id);
    const ticketData = useSelector(state => state.booking.booking); // Default to empty array if null
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTicketsByUser(userId));
    }, [dispatch, userId]);

    const handleCancelBooking = async(id) => {
       const result = await dispatch(cancelBooking(id));

        if(result.type==='cancel/booking/fulfilled'){
            toast.success('Booking Cancelled',{
                position:'top-right',
                autoClose:1000
            })
            dispatch(getTicketsByUser(userId))
        }else{
            toast.error('something Gone Wrong',{
                position:'top-right',
                autoClose:1000
            })
        }
    };
    console.log(userId);

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={2} justifyContent='center'>
                {ticketData.length > 0 ? (
                    ticketData.map(ticket => (
                        <Grid item xs={12} sm={6} md={4} key={ticket._id}>
                            <TicketCard ticket={ticket} cancel={handleCancelBooking} />
                        </Grid>
                    ))
                ) : (
                    <Typography>No Data Found</Typography>
                )}
            </Grid>
            <ToastContainer/>
        </Box>
    );
};

export default TicketsList;
