import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import FieldsShowcase from "../Fields/FieldsShowcase";
import StepsDemo from "../Steps/StepsDemo";
import ApartmentsForRent from "../Rent/ApartmentsForRent";
import ApartmentsForSale from "../Sale/ApartmentsForSale";
import ShabbatHouses from "../Shabbat/ShabbatHouses";
import CategorySelectionPage from "../AdPosting/CategorySelectionPage";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homePage" element={<HomePage />} />
      <Route path="/fields-showcase" element={<FieldsShowcase />} />
      <Route path="/post-ad" element={<StepsDemo />} />
      <Route path="/rent/:location" element={<ApartmentsForRent />} />
      <Route path="/sales/:location" element={<ApartmentsForSale />} />
      <Route path="/shabbat/:location" element={<ShabbatHouses />} />
      <Route path="/select-category" element={<CategorySelectionPage />} />
    </Routes>
  );
};

export default RoutesComponent;
