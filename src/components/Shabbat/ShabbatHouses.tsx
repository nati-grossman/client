import React from 'react';
import { useParams } from "react-router-dom";
// import PropertyList from '../Property/PropertyList';

const ShabbatHouses: React.FC = () => {
  const { location } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">דירות לשבת</h1>
      <p className="text-gray-700 mb-4">מצאו מקום מושלם לשבת הקרובה.</p>
      {/* <PropertyList type="shabbat" /> */}
    </div>
  );
};

export default ShabbatHouses;
