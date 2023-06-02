import './App.css';
import Calendar from './components/calendar/Calendar';
import ErrorScreen from './components/error/ErrorScreen';
import Header from './components/sidebar/Header';
import { DrawerHeader } from './components/sidebar/Header';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Calendar />,
    errorElement: <ErrorScreen />,
  },
]);

const drawerWidth = 240;

const HeaderWrapper = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
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
}));

function App() {
  // Configure Amplify in index file or root file
  Amplify.configure({
    Auth: {
      region: awsExports.REGION,
      userPoolId: awsExports.USER_POOL_ID,
      userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
    },
  });

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <Header signOut={signOut} user={user} />
          <div className="App-content">
            <DrawerHeader />
            <RouterProvider router={router} />
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
