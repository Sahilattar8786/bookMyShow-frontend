import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from 'axios';
import { fetchShowData } from '../../app/Slice/showSlice';

export default function BookingPage() {
  const { showId } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.id); // Assume user ID is stored in state.user.id
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const selectedShow=useSelector(state=>state.show.selectedShow)
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/shows/${showId}`);
        const show = response.data;
        setShowDetails(show);
  
        // Initialize seats with booked status
        initializeSeats(show.bookedSeat.map(seat => seat.seatNumber));
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };
  
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
  
    fetchShowDetails();
  }, [showId]);
  

  const handleSeatClick = (seatLabel) => {
    setSelectedSeats(prev =>
      prev.includes(seatLabel) ? prev.filter(s => s !== seatLabel) : [...prev, seatLabel]
    );
  };

  const handleConfirmBooking = async () => {
    const amount = selectedSeats.length * showDetails.price;
    try {
      await axios.post('/api/bookings', {
        showId,
        userId,
        seats: selectedSeats,
        totalPrice: amount
      });

      // Update seat availability after booking
      setSeats(prevSeats =>
        prevSeats.map(row => ({
          ...row,
          seats: row.seats.map(seat => ({
            ...seat,
            isAvailable: selectedSeats.includes(seat.label) ? false : seat.isAvailable
          }))
        }))
      );

      setSelectedSeats([]);
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };
  
  if (!showDetails) {
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>{showDetails.movie[0].title}</Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: 'center', mb: 2, backgroundColor: 'skyblue', p: 1, borderRadius: 1 ,color:'white'}}
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
        onClick={handleConfirmBooking}
        disabled={selectedSeats.length === 0}
      >
        Confirm Booking
      </Button>
    </Box>
  );
}
