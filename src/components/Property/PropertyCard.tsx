import React from "react";
import { Property} from '../../types/Property/Property';





const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden w-80">
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-blue-600 font-semibold">{property.price}</p>
      </div>
    </div>
  );
};

export default PropertyCard;