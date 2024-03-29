import firebase from './firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Snackbar } from '@mui/material';

const auth = firebase.auth();

export function NavBar() {
  const pages = ['About Us', 'other Page'];
  const [user] = useAuthState(auth);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const signInWithGoogle = () => {
    setAnchorElUser(null);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  const signOutWithGoogle = () => {
    auth.signOut()
    setAnchorElUser(null);
  }

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography 
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ⚡Blitzrad⚡
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="Bookings of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem component={Link} to="/aboutus" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">About us</Typography>
                </MenuItem>
                {user && user.uid =="crW5255058ReQgNMrQ9R3eks7Op1" ?
                <MenuItem component={Link} to="/admin" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"> Admin Settings</Typography>
                </MenuItem> : null}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ⚡Blitzrad⚡
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button component={Link} to="/aboutus"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About us
              </Button>
              {user && user.uid =="crW5255058ReQgNMrQ9R3eks7Op1" ?
              <Button component={Link} to="/admin"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Admin Settings
              </Button> : null}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? user.displayName : "?"}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem component={user ? Link : null} to="/account" onClick={user? handleCloseUserMenu: handleClick}>
                <Typography textAlign="center">Bookings</Typography>
              </MenuItem>
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Please log in first."
                action={
                  <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleClose}>
                      ok
                    </Button>

                  </React.Fragment>
                }
              />
              {user ?
                <MenuItem onClick={signOutWithGoogle}>
                  <Typography textAlign="center"> Log out</Typography>
                </MenuItem>
                :
                <MenuItem onClick={signInWithGoogle}>
                  <Typography textAlign="center"> Log in</Typography>
                </MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
