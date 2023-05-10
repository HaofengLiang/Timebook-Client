import './App.css';
import { useState } from 'react';
import Login from './components/auth/Login';
import Calendar from './components/calendar/Calendar';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

function App() {
  let [userId, setUserId] = useState(null);

  // Configure Amplify in index file or root file
  Amplify.configure({
    Auth: {
      region: awsExports.REGION,
      userPoolId: awsExports.USER_POOL_ID,
      userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
    }
  })

  const onLogin = (id) => {
    setUserId(id);
    console.log('Login with id: ' + id);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <header className="App-header">
            <h3>{user.username}</h3>
            <button onClick={signOut}>Sign out</button>
          </header>
          <div className="App-content">
            {userId ? <Calendar /> : <Login onLogin={onLogin} />}
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
