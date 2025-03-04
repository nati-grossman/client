import React from "react";
import { ApartmentCard} from '../../types/Property/Property';
import { useNavigate } from "react-router-dom";

const PropertyCard: React.FC<{ property: ApartmentCard }> = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div
      className="border rounded-lg shadow-lg overflow-hidden w-80 bg-white hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{property.title}</h3>
        <p className="text-gray-500">{property.location}</p>
        <p className="text-blue-600 font-semibold text-lg mt-2">{property.price}</p>
        <p className="text-gray-700 mt-2 text-sm">{property.shortDescription}</p>
      </div>
    </div>
  );
};

export default PropertyCard;