import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthenticationProvider } from './contexts/AuthenticationContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

