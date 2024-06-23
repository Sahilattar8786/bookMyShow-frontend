import { Box, Card, CardMedia, Button, Paper, Typography, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowData } from '../../app/Slice/showSlice';
import { useNavigate, useParams } from 'react-router-dom';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import moment from 'moment';

export default function ShowDetail() {
  const { id } = useParams();
  const showData = useSelector(state => state.show.selectedShow);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    dispatch(fetchShowData(id));
  }, [dispatch, id]);

  // If showData or showData.movie is not yet available, render a loading state
  if (!showData || !showData.movie || showData.movie.length === 0) {
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }} >Loading...</Typography>;
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      p: 3,
    }}>
      <Box sx={{
        display: {
          xs: 'block', // Block display on extra small screens
          md: 'flex'   // Flex display on medium and larger screens
        },
        flexDirection: {
          xs: 'column', // Column direction on extra small screens
          md: 'row'     // Row direction on medium and larger screens
        },
        width: '100%',
        // maxWidth: '900px',
        boxShadow: 5,
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'white',
        mb: 4,
      }}>
        <Box sx={{
          flex: {
            xs: 1, // Equal size on smaller screens
            md: 3  // 30% on medium and larger screens
          },
          order: {
            xs: 1, // Order 1 on extra small screens
            md: 2  // Order 1 on medium and larger screens
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: {
            xs: '50%',   // 50% height on extra small screens
            md: '100%'   // 100% height on medium and larger screens
          },
          pt: {
            xs: 0,
            md: 0
          },
          pb: {
            xs: 0
          }
        }}>
          {/* Content for the second box */}
          <Paper elevation={5} sx={{ width: '100%', height: '100%' }}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                image={showData.movie[0].poster}  // Accessing the first element in the movie array
                alt={showData.movie[0].title}
                sx={{ height: '100%', objectFit: 'cover' }}
              />
            </Card>
          </Paper>
        </Box>
        <Box sx={{
          flex: {
            xs: 1, // Equal size on smaller screens
            md: 7  // 70% on medium and larger screens
          },
          order: {
            xs: 2, // Order 2 on extra small screens
            md: 1  // Order 2 on medium and larger screens
          },
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: {
            xs: 'center', // Centered on extra small screens
            md: 'flex-start'  // Flex start on medium and larger screens
          },
          alignItems: {
            xs: 'flex-start',
            md: 'flex-start'
          },
          height: {
            xs: '50%',   // 50% height on extra small screens
            md: '100%'   // 100% height on medium and larger screens
          },
          mt: {
            xs: 0
          }
        }}>
          {/* Content for the first box */}
          <Typography variant="h4" gutterBottom>
            {showData.movie[0].title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Runtime: {showData.movie[0].duration} min
          </Typography>
          <Typography variant="body1" gutterBottom>
            Release Date: {moment(showData.movie[0].releaseDate).format('dddd, MMMM D, YYYY')}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" paragraph textAlign='start'>
            {showData.movie[0].description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Theater Information
          </Typography>
          <Typography variant="body1" paragraph textAlign='start'>
            {showData.theater[0].name}
          </Typography>
          <Typography variant="body2" paragraph>
            {showData.theater[0].location.address}, {showData.theater[0].location.city}, {showData.theater[0].location.state}, {showData.theater[0].location.pincode}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ShowTime: {moment(showData.showTime).format('dddd, MMMM D, YYYY h:mm A')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Seats Available: {showData.seatsAvailable}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Price: ₹{showData.price}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'center', // Centered on extra small screens
                md: 'start',  // Aligned to the start on medium and larger screens
              },
              alignContent: {
                xs: 'center', // Centered on extra small screens
                md: 'start',  // Aligned to the start on medium and larger screens
              },
              textAlign: {
                xs: 'center', // Centered text on extra small screens
                md: 'center', // Centered text on medium and larger screens
              },
              width: {
                xs: '100%',  // Full width on extra small screens
                md: '50%',   // Half width on medium and larger screens
              },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              href={showData.movie[0].trailer}
              target="_blank"
              endIcon={<BookOnlineIcon />}
              sx={{
                textTransform: 'none', // Prevents uppercase transformation
                justifyContent: 'center', // Centers the content horizontally
                alignItems: 'center', // Centers the content vertically
              }}
              onClick={()=>navigate(`/booking/${showData._id}`)}
            >
              Book Ticket
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
