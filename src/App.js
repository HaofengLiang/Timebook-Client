import './App.css';
import { useState } from 'react';
import Calendar from './components/calendar/Calendar';
import ErrorScreen from './components/error/ErrorScreen';
import Header from './components/sidebar/Header';
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  drawerWidth,
  Main,
  AppBar,
  DrawerHeader,
} from './components/sidebar/MuiComponents';

import { useDispatch } from 'react-redux';
import { setUserEmail } from './reducers/calendarConfigSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Calendar />,
    errorElement: <ErrorScreen />,
  },
]);

function App() {
  const dispatch = useDispatch();
  Auth.currentAuthenticatedUser()
    .then((user) => {
      if (!user) return;
      console.log(user.attributes);
      dispatch(setUserEmail(user.attributes.email));
    })
    .catch((error) => console.log(error));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <Header
            signOut={signOut}
            user={user}
            drawerWidth={drawerWidth}
            AppBar={AppBar}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            drawerOpen={drawerOpen}
          />
          <div className="App-content">
            <Main open={drawerOpen}>
              <DrawerHeader />
              <RouterProvider router={router} />
            </Main>
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
