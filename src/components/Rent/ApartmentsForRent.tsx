import React from 'react';
import { useParams } from "react-router-dom";
import PropertyList from '../Property/PropertyList';

import SectionHeader from '../SectionHeader';
import PropertyFilters from '../Property/PropertyFilters';


const ApartmentsForRent: React.FC = () => {
  const { location } = useParams();

  return (
    <div className="p-6">
      <SectionHeader title="דירות להשכרה" subtitle="מצאו את הדירה המושלמת עבורכם" />
      <PropertyFilters />
      {/* <PropertyList type="rent" /> */}
    </div>
  );
};


export default ApartmentsForRent;
