import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; 
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homePage" element={<HomePage />} />
    </Routes>
  );
};

export default RoutesComponent;
