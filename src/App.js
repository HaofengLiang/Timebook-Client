import './App.css';
import MemoizedCalendar from './components/calendar/Calendar';
import ErrorScreen from './components/error/ErrorScreen';
import Header from './components/sidebar/Header';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MemoizedCalendar />,
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

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <Header signOut={signOut} user={user} router={router} />
        </div>
      )}
    </Authenticator>
  );
}


export default App;
