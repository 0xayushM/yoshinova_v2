"use client";

import ProductSpecTable from '../ProductSpecTable';
import floorMountedData from '@/data/products/floor-mounted-ess.json';

export default function FloorMountedESSTable() {
  return (
    <ProductSpecTable 
      title={floorMountedData.title}
      subtitle={floorMountedData.subtitle}
      headers={floorMountedData.headers}
      rows={floorMountedData.specifications}
    />
  );
}
