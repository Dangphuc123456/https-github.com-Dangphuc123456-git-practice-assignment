import React from 'react';
import ReactDOM from 'react-dom/client'; // Chú ý import đúng
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Sử dụng createRoot thay vì render

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
