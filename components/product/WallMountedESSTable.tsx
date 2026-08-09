"use client";

import ProductSpecTable from '../ProductSpecTable';
import wallMountedData from '@/data/products/wall-mounted-ess.json';

export default function WallMountedESSTable() {
  return (
    <ProductSpecTable 
      title={wallMountedData.title}
      subtitle={wallMountedData.subtitle}
      headers={wallMountedData.headers}
      rows={wallMountedData.specifications}
    />
  );
}
