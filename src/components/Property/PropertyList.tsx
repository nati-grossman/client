import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { PropertyListProps, Property} from '../../types/Property/Property';








const PropertyList: React.FC<PropertyListProps> = ({ category }) => {
  const { propertyId } = useParams<{ propertyId?: string }>();
  const [properties, setProperties] = useState<Record<string, Property> | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        debugger
        const response = await fetch(`/Data/${category}.json`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      }
    };

    fetchProperties();
  }, [category]);

  if (!properties) {
    return <div>טוען נתונים...</div>;
  }

  if (propertyId && properties[propertyId]) {
    const property = properties[propertyId];
    return (
      <div>
        <h1>נכס ב{property.city}</h1>
        <p><strong>מחיר:</strong> {property.price}</p>
        <p>{property.description}</p>
        <Link to={`/${category}`}>🔙 חזרה לרשימה</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>רשימת נכסים ({category === "for-sale" ? "למכירה" : category === "for-rent" ? "להשכרה" : "לשבת"})</h1>
      <ul>
        {Object.entries(properties).map(([id, property]) => (
          <li key={id}>
            <Link to={`/${category}/${id}`}>נכס ב{property.city}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;