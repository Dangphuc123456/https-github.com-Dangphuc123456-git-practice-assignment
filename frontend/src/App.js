// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
