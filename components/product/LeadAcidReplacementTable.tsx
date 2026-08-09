"use client";

import ProductSpecTable from '../ProductSpecTable';
import leadAcidData from '@/data/products/lead-acid-replacement.json';

export default function LeadAcidReplacementTable() {
  return (
    <ProductSpecTable 
      title={leadAcidData.title}
      subtitle={leadAcidData.subtitle}
      headers={leadAcidData.headers}
      rows={leadAcidData.specifications}
    />
  );
}
