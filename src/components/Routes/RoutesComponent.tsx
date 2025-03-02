import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage'; 
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import PropertyList from '../Property/PropertyList';
import ForSale from '../ForSale/ForSale';

import ApartmentPage from '../ApartmentPage/ApartmentPage';

import PropertiesForSale from '../Sale/PropertiesForSale';


const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homePage" element={<HomePage />} />



      <Route path="/for-sale" element={<PropertiesForSale />} />
      {/*
      <Route path="/for-sale" element={<ForSale />} />
      <Route path="/for-sale/:houseId" element={<ForSale />} />
      */}
<Route 
          path="/apartments/:neighborhood" 
          element={<ApartmentPage />} 
        />

      {/*
      <Route path="/for-sale" element={<PropertyList category="for-sale" />} />
        <Route path="/for-sale/:propertyId" element={<PropertyList category="for-sale" />} />
      */}

        <Route path="/for-rent" element={<PropertyList category="for-rent" />} />
        <Route path="/for-rent/:propertyId" element={<PropertyList category="for-rent" />} />

        <Route path="/shabbat" element={<PropertyList category="shabbat" />} />
        <Route path="/shabbat/:propertyId" element={<PropertyList category="shabbat" />} />
    </Routes>
  );
};

export default RoutesComponent;
