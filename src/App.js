import "./App.css";
import { useState } from "react";
import Calendar from "./components/calendar/Calendar";
import ErrorScreen from "./components/error/ErrorScreen";
import Header from "./components/sidebar/Header";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  drawerWidth,
  Main,
  AppBar,
  DrawerHeader,
} from "./components/sidebar/MuiComponents";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Calendar />,
    errorElement: <ErrorScreen />,
  },
]);

function App() {
  // Configure Amplify in index file or root file
  Amplify.configure({
    Auth: {
      region: awsExports.REGION,
      userPoolId: awsExports.USER_POOL_ID,
      userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
    },
  });

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
