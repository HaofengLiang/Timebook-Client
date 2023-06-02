import './App.css';
import Calendar from './components/calendar/Calendar';
import ErrorScreen from './components/error/ErrorScreen';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { useState } from "react"
import {
  AppBar, Container, Toolbar, Typography, Box, Button, IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from './components/sidebar/Sidebar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Calendar />,
    errorElement: <ErrorScreen />,
  },
])
function Header({ signOut, user }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (<><AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <IconButton
          color="inherrit"
          onClick={handleDrawerOpen}
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}>
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
          <Button
            variant='contained'
            color="secondary"
            onClick={signOut}>
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
    <Sidebar handleDrawerClose={handleDrawerClose} drawerOpen={drawerOpen} /></>
  );
}

function App() {
  // Configure Amplify in index file or root file
  Amplify.configure({
    Auth: {
      region: awsExports.REGION,
      userPoolId: awsExports.USER_POOL_ID,
      userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
    }
  })

  return (
    <Authenticator>
      {({ signOut, user }) =>
        <div className="App">
          <Header signOut={signOut} user={user} />
          <div className="App-content">
            <RouterProvider router={router} />
          </div>
        </div>
      }
    </Authenticator>
  );
}

export default App;
