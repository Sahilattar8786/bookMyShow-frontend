import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import moment from 'moment';

const TicketCard = ({ ticket, cancel }) => {
    // Check if ticket or show is null/undefined
    if (!ticket || !ticket.show) {
        return null; // or render a loading state or message
    }

    const show = ticket.show;
    const movie = show.movie ? show.movie[0] : null;
    const theater = show.theater ? show.theater[0] : null;
    const textColor = ticket.status === 'confirmed' ? 'blue' : 'red';

    // Check if movie or theater is null/undefined
    if (!movie || !theater) {
        return null; // or render a loading state or message
    }

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body1">{theater.name}</Typography>
                <Typography variant="body2">{`${theater.location.address}, ${theater.location.city}, ${theater.location.state}, ${theater.location.pincode}`}</Typography>
                <Typography variant="body2">{`Show Time: ${moment(show.showTime).format('MMMM Do YYYY, h:mm a')}`}</Typography>
                <Typography variant="body2">{`Seats: ${ticket.seats.join(', ')}`}</Typography>
                <Typography variant="body2">{`Total Price: ₹${ticket.totalPrice}`}</Typography>
                <Typography variant="body2">{`Booking Time: ${moment(ticket.bookingTime).format('MMMM Do YYYY, h:mm a')}`}</Typography>
                <Typography variant='body2'>{`Payment ID :${ticket.paymentId} `}</Typography>
                <Typography variant="body2" style={{ color: textColor }}>
                    {ticket.status}
                </Typography>
                <Button variant='contained' onClick={() => cancel(ticket._id)}>Cancel Booking</Button>
            </CardContent>
        </Card>
    );
};

export default TicketCard;
