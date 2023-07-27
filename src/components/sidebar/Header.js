import {
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUserEmail } from '../../reducers/calendarConfigSlice';

export default function Header({
  signOut,
  user,
  drawerWidth,
  AppBar,
  handleDrawerOpen,
  handleDrawerClose,
  drawerOpen,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserEmail(user && user.attributes.email));
  }, [dispatch, user]);
  return (
    <>
      <AppBar position="fixed" open={drawerOpen}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <IconButton
              color="inherrit"
              onClick={handleDrawerOpen}
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {user && user.attributes.email}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Button variant="contained" color="secondary" onClick={signOut}>
                Sign Out
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Sidebar
        handleDrawerClose={handleDrawerClose}
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        userEmail={user && user.attributes.email}
      />
    </>
  );
}
