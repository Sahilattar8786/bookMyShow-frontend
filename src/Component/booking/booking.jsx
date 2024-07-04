import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from 'axios';
import { fetchShowData } from '../../app/Slice/showSlice';
import {  createBooking } from '../../app/Slice/bookingSlice';
import { toast,ToastContainer } from 'react-toastify';
import { CreatePayment, verifyPayment } from '../../app/Slice/paymentSlice';
import { current } from '@reduxjs/toolkit';

export default function BookingPage() {
  const { showId } = useParams();
  const dispatch = useDispatch();
  const userData =useSelector(state=>state.user)
  const userId = useSelector(state => state.user.data._id); // Assume user ID is stored in state.user.id
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const selectedShow = useSelector(state => state.show.selectedShow) || null;
  const bookingState =useSelector(state=>state.booking)
  const[isPaymentSuccess,setIsPaymentSuccess]=useState(false);
  useEffect(() => {
    if (showId) {
      dispatch(fetchShowData(showId));
    }
  }, [dispatch, showId]);

  useEffect(() => {
    if (selectedShow) {
      const initializeSeats = (bookedSeats) => {
        const rows = 10;
        const seatsPerRow = 12;
        const newSeats = [];
        for (let row = 0; row < rows; row++) {
          const seatRow = { row: row + 1, seats: [] };
          for (let seat = 0; seat < seatsPerRow; seat++) {
            const seatLabel = `${row + 1}-${seat + 1}`;
            seatRow.seats.push({
              label: seatLabel,
              isAvailable: !bookedSeats.includes(seatLabel)
            });
          }
          newSeats.push(seatRow);
        }
        setSeats(newSeats);
      };

      if (selectedShow.bookedSeat) {
        initializeSeats(selectedShow.bookedSeat.map(seat => seat.seatNumber));
      }
    }
  }, [selectedShow]);

  const handleSeatClick = (seatLabel) => {
    setSelectedSeats(prev =>
      prev.includes(seatLabel) ? prev.filter(s => s !== seatLabel) : [...prev, seatLabel]
    );
  };

  const handleConfirmBooking = async () => {
    const totalPrice = selectedSeats.length * selectedShow.price
    console.log(totalPrice,selectedSeats,showId,userId)

     const result = await dispatch(createBooking({seats:selectedSeats,show:showId,totalPrice,userId}))
  

    if(result.type ==="bookings/create/fulfilled"){
       toast.success('Booking Successful',{
        position: 'top-right',
        autoClose: 5000,
        onClose: () => dispatch(fetchShowData(showId)),
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       })
    }
    setSelectedSeats([])
  };
  // razorpay script 
  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
    };
    document.body.appendChild(script);
  }, []);
  const handlePayment = async () => {
    const totalPrice = selectedSeats.length * selectedShow.price;
    const paymentData = { seats: selectedSeats, userId, totalPrice, show: showId };

    const paymentResult = await dispatch(CreatePayment(paymentData));
    
    console.log(paymentResult);
    if (!paymentResult.payload.success) {
      alert('Order Creation Failed');
      return;
    }

    const options = {
      key: process.env.RAZORPAY_API_KEY,
      amount: paymentResult.payload.order.amount,
      currency: paymentResult.payload.order.currency,
      name: 'The BookMyShow',
      description: 'Payment for Movie Ticket',
      order_id: paymentResult.payload.order.id,
      handler: async function (response) {
        const verifyData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature ,
          seats:selectedSeats,
          show:showId ,
          userId
        };
        const verifyResult = await dispatch(verifyPayment(verifyData));
        if (verifyResult.type === "verify/payment/fulfilled") {
          toast.success('Payment Successful');
          setIsPaymentSuccess(true)
        } else {
          toast.error('Payment Failed');
        }
      },
      prefill: {
        name: userData.name,
        email:userData.email,
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    setSelectedSeats([]);
  };
  useEffect(()=>{
    if(isPaymentSuccess){
      dispatch(fetchShowData(showId))
    }
  },[showId,isPaymentSuccess,dispatch])
  if (!selectedShow) {
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>{selectedShow.movie && selectedShow.movie[0] ? selectedShow.movie[0].title : 'Movie Title Not Available'}</Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: 'center', mb: 2, backgroundColor: 'skyblue', p: 1, borderRadius: 1, color: 'white' }}
      >
        <VideocamIcon sx={{ mr: 1 }} /> Screen This Side
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 1
        }}
      >
        {seats.flatMap(row =>
          row.seats.map(seat => (
            <Button
              key={seat.label}
              variant={selectedSeats.includes(seat.label) ? 'contained' : 'outlined'}
              color={seat.isAvailable ? 'primary' : 'secondary'}
              onClick={() => handleSeatClick(seat.label)}
              disabled={!seat.isAvailable}
              sx={{ minWidth: 0, p: 1 }}
            >
              {seat.label}
            </Button>
          ))
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handlePayment}
        disabled={selectedSeats.length === 0}
      >
        Confirm Booking
      </Button>
       <ToastContainer/>
    </Box>
  );
}
