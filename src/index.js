import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { Amplify, Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import axios from 'axios';

Amplify.configure(awsmobile);

async function getAuthToken() {
  const session = await Auth.currentSession();
  return 'Bearer ' + session.getIdToken().getJwtToken();
}

axios.defaults.baseURL = 'http://localhost:8080/v1';

axios.interceptors.request.use(
  async (config) => {
    config.headers.authorization = await getAuthToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
