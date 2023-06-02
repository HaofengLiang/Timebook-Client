import './App.css';
import Main from './components/sidebar/Main';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

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
          <Main signOut={signOut} user={user} />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
