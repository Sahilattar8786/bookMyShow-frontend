import {Box, Card, CardContent, CardMedia, Chip, Typography ,Button } from '@mui/material'
import React from 'react'

export default function DisplayCard({title,poster,genere,language
    ,releaseDate,trailer,description,duration})
     {
      console.log(language)

  return (
    <div>
       <Card sx={{
         maxWidth:345 ,
         m:2,
         boxShadow:3
       }}>
        <CardMedia
         component='img'
         height="450"
         image={poster}
         alt={`${title} poster`}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Duration:{duration}
            </Typography>
            <Box mt={1}>
                    {genere.map((gen, index) => (
                        <Chip
                            key={index}
                            label={gen.trim()}
                            variant="outlined"
                            sx={{ mr: 0.5, mt: 0.5 }}
                        />
                    ))}
                </Box>
            <Typography>
                RelaseDate:{releaseDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Langauge:{language
                }
            </Typography>
        </CardContent>
         <Box sx={{
            display:{
                xs:'flex',
                md:'block'
            },
            spacing:2,
            justifyContent:'center',
            pb:2
         }}>
            <Button variant='contained' color='primary' sx={{m:1}}>
                Book Tickets
            </Button>
            <Button variant='contained' color='primary' sx={{m:1}}>
                View Details
            </Button>
         </Box>

       </Card>
    </div>
  )
}
