import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { FireBaseProvider } from './context/Firebase.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <FireBaseProvider>
        <App />
      </FireBaseProvider>
    </Router>
  </React.StrictMode>
);
