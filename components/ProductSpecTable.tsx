"use client";

interface SpecRow {
  label: string;
  values: string[];
}

interface ProductSpecTableProps {
  title: string;
  subtitle?: string;
  headers: string[];
  rows: SpecRow[];
}

export default function ProductSpecTable({ title, subtitle, headers, rows }: ProductSpecTableProps) {
  return (
    <div className="mb-12">
      <h2 className="text-[#E31E24] text-3xl md:text-4xl font-bold mb-2">{title}</h2>
      {subtitle && <h3 className="text-black text-[clamp(1.25rem,2.6vw,1.625rem)] font-bold mb-8" dangerouslySetInnerHTML={{ __html: subtitle }} />}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#6A9F30] text-white">
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className={`border border-gray-300 px-4 py-3 font-semibold ${index === 0 ? 'text-left' : 'text-center'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border border-gray-300 px-4 py-2 font-medium">{row.label}</td>
                {row.values.map((value, valueIndex) => (
                  <td 
                    key={valueIndex} 
                    className="border border-gray-300 px-4 py-2 text-center"
                    colSpan={value.includes('colSpan') ? row.values.length - 1 : 1}
                  >
                    {value.replace('colSpan:', '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
