import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppProvider from './context/AppProvider';
import AuthProvider from './context/AuthProvider';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <AppProvider>
    <App />
    </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


