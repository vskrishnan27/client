import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
// base url for axios of aws 
// axios.defaults.baseURL = "http://ec2-15-206-116-6.ap-south-1.compute.amazonaws.com/server/"



root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

