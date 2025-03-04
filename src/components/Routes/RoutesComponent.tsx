import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage'; 
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import ApartmentsForRent from '../Rent/ApartmentsForRent';
import ApartmentsForSale from '../Sale/ApartmentsForSale';
import ShabbatHouses from '../Shabbat/ShabbatHouses';



const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homePage" element={<HomePage />} />

      <Route path="/rent/:location" element={<ApartmentsForRent />} />
      <Route path="/sales/:location" element={<ApartmentsForSale />} />
      <Route path="/shabbat/:location" element={<ShabbatHouses />} />
    </Routes>
  );
};

export default RoutesComponent;
