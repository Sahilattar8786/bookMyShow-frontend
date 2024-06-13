import { Box, Button, Grid, TextField ,Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetShow, searchSHow } from '../../app/Slice/showSlice'
import ShowCardDetail from './ShowCardDetail'

export default function Show() {
  const dispatch=useDispatch()
  const showData=useSelector(state=>state.show.shows)
  const [searchQury,setSearchQuery]=useState('');
    useEffect(()=>{
       dispatch(GetShow())
    //    dispatch(searchSHow("harry"));
    },[])
   const handleSearch=()=>{
    console.log(searchQury);
     dispatch(searchSHow(searchQury));
   } 
  return (
    <Box sx={{
        display:'block',
        alignItems:'center',
        m:2
    }}>
      <Box 
      sx={{
        display:'flex',
        alignItems:'center',
        marginBottom:2,
        justifyContent:'center'
      }}
      spacing={2}
      >
       <TextField 
         label="Search Show"
         variant="outlined"
         value={searchQury}
         onChange={(e)=>setSearchQuery(e.target.value)}
         sx={{height:56}}
       />
       <Button variant="contained" 
        sx={{height:56}}
        onClick={()=>handleSearch()}
       >Search</Button>
      </Box>
      <Grid container spacing={1}>
  {showData && showData.length > 0 ? (
    showData.map((i) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={i._id}>
        <ShowCardDetail show={i} />
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '300px',
        }}
      >
        <Typography variant="h5" gutterBottom>
          No Movies Found
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Sorry, we couldn't find any movies matching your search criteria. Please try again with a different search term or check back later for new movie listings.
        </Typography>
      </Box>
    </Grid>
  )}
</Grid>
    </Box>
  )
}
