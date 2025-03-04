import React from 'react';
import { useParams } from "react-router-dom";
import PropertyList from '../Property/PropertyList';

import SectionHeader from '../SectionHeader';
import PropertyFilters from '../Property/PropertyFilters';

const ApartmentsForSale: React.FC = () => {
  const { location } = useParams();

  return (
    <div className="p-6">
      <SectionHeader title="דירות למכירה" subtitle="מצאו את הדירה המושלמת לקנייה" />
      <PropertyFilters category="for-sale"/>
      <PropertyList category="for-sale" />
    </div>
  );
};

export default ApartmentsForSale;
