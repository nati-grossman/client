import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginAndRegister/LoginPage/LoginPage";
import RegisterPage from "../LoginAndRegister/RegisterPage/RegisterPage";
import FieldsShowcase from "../TempComponnents/FieldsShowcase";
import AdPostingForm from "../PostingProperty/Steps/AdPostingForm";
import ApartmentsForRent from "../Apartments/Rent/ApartmentsForRent";
import ApartmentsForSale from "../Apartments/Sale/ApartmentsForSale";
import ShabbatHouses from "../Apartments/Shabbat/ShabbatHouses";
import CategorySelectionPage from "../AdPosting/CategorySelectionPage";
import HomeAddress from "../HomeAddress/HomeAddress";
import HomeFeatures from "../HomeFeatures/HomeFeatures";
import ValuationForm from "../ValuationForm/ValuationForm";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homePage" element={<HomePage />} />
      <Route path="/fields-showcase" element={<FieldsShowcase />} />
      <Route path="/post-ad" element={<AdPostingForm />} />
      <Route path="/rent/:location" element={<ApartmentsForRent />} />
      <Route path="/sales/:location" element={<ApartmentsForSale />} />
      <Route path="/shabbat/:location" element={<ShabbatHouses />} />
      <Route path="/select-category" element={<CategorySelectionPage />} />
      <Route path="/home-address" element={<HomeAddress />} />
      <Route path="/home-features" element={<HomeFeatures />} />
      <Route path="/valuation" element={<ValuationForm />} />
    </Routes>
  );
};

export default RoutesComponent;
