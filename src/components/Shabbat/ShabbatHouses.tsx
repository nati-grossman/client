import React from 'react';
import { useParams } from "react-router-dom";
import PropertyList from '../Property/PropertyList';

import SectionHeader from '../SectionHeader';
import PropertyFilters from '../Property/PropertyFilters';

const ShabbatHouses: React.FC = () => {
  const { location } = useParams();

  return (
    <div className="p-6">
      <SectionHeader title="בתים לשבת" subtitle="בתים נוחים ומאובזרים לשבת" />
      <PropertyFilters category="for-shabbat"/>
      <PropertyList category="for-shabbat" />
    </div>
  );
};

export default ShabbatHouses;
