import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { PropertyListProps, ApartmentCard} from '../../types/Property/Property';




const PropertyList: React.FC<PropertyListProps> = ({ category }) => {
  const { propertyId } = useParams<{ propertyId?: string }>();
  //const [properties, setProperties] = useState<Record<string, ApartmentCard> | null>(null);
  const [properties, setProperties] = useState<ApartmentCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        debugger
        const response = await fetch(`/Data/${category}.json`);
        debugger
        const data = await response.json();
        setProperties(data.apartments);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [category]);

  if (loading) {
    return <p className="text-center text-gray-500">טוען נתונים...</p>;
  }

  if (!properties || properties.length === 0) {
    return <p className="text-center text-red-500">לא נמצאו דירות בקטגוריה "{category}".</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;