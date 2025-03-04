import React, { useState } from 'react';

const PropertyFilters: React.FC = () => {
  const [city, setCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-wrap gap-4 justify-center">
      {/* בחירת עיר */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">בחר עיר</option>
        <option value="tel-aviv">תל אביב</option>
        <option value="jerusalem">ירושלים</option>
        <option value="beersheba">באר שבע</option>
      </select>

      {/* טווח מחירים */}
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">בחר טווח מחירים</option>
        <option value="0-2000">0 - 2,000 ₪</option>
        <option value="2000-5000">2,000 - 5,000 ₪</option>
        <option value="5000+">5,000 ₪ ומעלה</option>
      </select>

      {/* מספר חדרים */}
      <select
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">בחר מספר חדרים</option>
        <option value="1">חדר אחד</option>
        <option value="2">שני חדרים</option>
        <option value="3">שלושה חדרים</option>
        <option value="4+">ארבעה חדרים ומעלה</option>
      </select>

      {/* כפתור חיפוש */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        חפש
      </button>
    </div>
  );
};

export default PropertyFilters;
