import React from 'react';
import PropertyList from '../Property/PropertyList';



const PropertiesForRent: React.FC = () => {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">דירות להשכרה</h1>
        <p className="text-gray-700 mb-4">מצאו את הדירה המושלמת להשכרה שמתאימה לצרכים ולתקציב שלכם.</p>
        {/* <PropertyList type="rent" /> */}
      </div>
    );
  };