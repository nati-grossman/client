import React from 'react';
import { useParams } from "react-router-dom";
// import PropertyList from '../Property/PropertyList';

const ApartmentsForSale: React.FC = () => {
  const { location } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">דירות למכירה</h1>
      <p className="text-gray-700 mb-4">מצאו את הבית המושלם למכירה שמתאים לצרכים שלכם.</p>
      {/* <PropertyList type="sale" /> */}
    </div>
  );
};

export default ApartmentsForSale;
