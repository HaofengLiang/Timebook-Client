import { useState } from 'react';
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

const drawerWidth = 240;

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ signOut, user }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <AppBar position="fixed" open={drawerOpen}>
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
      </AppBar>
      <Sidebar handleDrawerClose={handleDrawerClose} drawerOpen={drawerOpen} />
    </>
  );
}
