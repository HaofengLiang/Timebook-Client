import { useState } from 'react';
import './Main.css';
import {
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { styled } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MemoizedCalendar from '../calendar/Calendar';
import ErrorScreen from '../error/ErrorScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MemoizedCalendar />,
    errorElement: <ErrorScreen />,
  },
]);

export default function Main({ signOut, user }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const drawerWidth = 240;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const HeaderWrapper = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    display: 'flex',
  }));

  const AppContent = styled('div', {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${drawerWidth}px`,
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `calc(${drawerWidth}px + ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <HeaderWrapper>
      <AppContent className="App-content" position="fixed" open={drawerOpen}>
        <MuiAppBar style={{ position: 'relative' }}>
          <Container maxWidth="xl">
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
        </MuiAppBar>
        <DrawerHeader />
        <RouterProvider router={router} />
      </AppContent>

      <Sidebar
        handleDrawerClose={handleDrawerClose}
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
      />
    </HeaderWrapper>
  );
}
