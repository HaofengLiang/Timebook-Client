import './App.css';
import { useState } from 'react';
import Login from './components/auth/Login';
import Calendar from './components/calendar/Calendar';

function App() {
  let [userId, setUserId] = useState(null);

  const onLogin = (id) => {
    setUserId(id);
    console.log('Login with id: ' + id);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      {userId ? <Calendar /> : <Login onLogin={onLogin} />}
    </div>
  );
}

export default App;
