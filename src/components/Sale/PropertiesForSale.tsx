import React from 'react';
import PropertyList from '../Property/PropertyList';


const PropertiesForSale: React.FC = () => {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">דירות למכירה</h1>
        <p className="text-gray-700 mb-4">גלו את מיטב הדירות למכירה בעיר, עם מחירים משתלמים ומיקומים מעולים.</p>
        {/* <PropertyList type="sale" /> */}
      </div>
    );
  };


export default PropertiesForSale;