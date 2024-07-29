import { AppBar, Container, IconButton, Toolbar,Menu ,Typography, Box, Button ,MenuItem, Avatar ,Tooltip } from '@mui/material'
import React, { useState } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
  const [anchorElNav,setAnchorElNav]=useState(null);
  const [anchorElUser,setAnchorElUser]=useState(null);
  const userInfo=useSelector(state=>state.user.data);
  
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
  // const pages = ['Movies', 'Theater', 'Shows'];
  const pages = [
    { name: "Movies", path: 'admin/movie' },
    { name: 'Show', path: 'admin/show' },
    { name: 'Theater', path: 'admin/theater' }
  ];

  const settings =[{ name:'Profile',path:'profile'},{name:'My Tickets', path:"myTicket"}]
  const navigate=useNavigate();

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
                    <MenuItem key={page.name} onClick={()=>navigate(`/${page.path}`)}>
                       <Typography textAlign="center">{page.name}</Typography>
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
                  key={page.name}
                  sx={{
                    my:2 ,
                    color:'white',
                    display:'block'
                  }}
                  onClick={()=>navigate(`/${page.path}`)}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            {userInfo && userInfo.pic &&(
             <Box sx={{
              flexGrow:0
             }}>
              <Tooltip title="Open Setting">
                  <IconButton onClick={handleOpneUserMenu} sx={{p:0}}>
                     <Avatar src={userInfo.pic}></Avatar>
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
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                     <Typography textAlign='center' onClick={()=>navigate(`/${setting.path}`)}>{setting.name}</Typography>
                  </MenuItem>
                ))}
                 <MenuItem key="">
                  <Typography textAlign='center'>
                     Logout
                  </Typography>
                 </MenuItem>

              </Menu>
             </Box>)
            } 
        </Toolbar>
      </Container>

    </AppBar>
  )
}
