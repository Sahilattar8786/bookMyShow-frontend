import { AppBar, Container, IconButton, Toolbar,Menu ,Typography, Box, Button ,MenuItem, Avatar ,Tooltip } from '@mui/material'
import React, { useState } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import MenuIcon from '@mui/icons-material/Menu'
export default function Navbar() {
  const userinfo=true;
  const [anchorElNav,setAnchorElNav]=useState(null);
  const [anchorElUser,setAnchorElUser]=useState(null);
  
  const handleOpneNavMenu=(event)=>{
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu=(event)=>{
    setAnchorElNav(null)
  }
  const handleOpneUserMenu=(event)=>{
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu=(event)=>{
    setAnchorElUser(null)
  }
  const pages = ['Movies', 'Theater', 'Shows'];
  const settings = ['Profile', 'My Tickets', 'Logout'];


  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
           <MovieIcon sx={{
            display:{
              xs:'none',
              md:'flex'
            },
            mr:1
           }} />
           <Typography
             variant='h6'
             noWrap
             component="a"
             href='/'
             sx={{
              mr:2,
              display:{
                xs:'none',
                md:'flex'
              },
              fontFamily:'monospace',
              fontWeight:700,
              letterSpacing:'.3rem',
              color:'inherit',
              textDecoration:'none'
             }
            }>
              BOOKMYSHOW
            </Typography>
            <Box sx={{
              flexGrow:1,
              display:{
                xs:'flex',
                md:'none'
              }
            }}>
              <IconButton
               size='large'
               aria-label='account of current user'
               aria-controls='menu-appbar'
               aria-haspopup='true'
               onClick={handleOpneNavMenu}
               color='inherit'
              >
                <MenuIcon/>
              </IconButton>
               <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical:'bottom',
                  horizontal:'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical:'top',
                  horizontal:'right'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display:{xs:'block',md:'none'}
                }}
               >
                {
                  pages.map((page)=>(
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                       <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
                }
               </Menu>
            </Box>
            <Box sx={{
               flexGrow:1,
               display:{
                xs:'none',
                md:'flex'
               }
            }}>
              {pages.map((page)=>(
                <Button
                  key={page}
                  sx={{
                    my:2 ,
                    color:'white',
                    display:'block'
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {userinfo &&(
             <Box sx={{
              flexGrow:0
             }}>
              <Tooltip title="Open Setting">
                  <IconButton onClick={handleOpneUserMenu} sx={{p:0}}>
                     <Avatar></Avatar>
                  </IconButton>
              </Tooltip>
              <Menu
              sx={{mt:'45px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical:'top',
                horizontal:'right'
              }}
              keepMounted
              transformOrigin={{
                vertical:'top',
                horizontal:'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
                {settings.map((setting)=>(
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                     <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}

              </Menu>
             </Box>)
            } 
        </Toolbar>
      </Container>

    </AppBar>
  )
}