import { getClassificationsByRegion, getGroupedClassifications } from '@/lib/orthoData';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BoneDetailPage({ params }: PageProps) {
  const { id } = params;
  
  // Decode URL parameter to handle spaces and special characters
  const decodedId = decodeURIComponent(id);
  
  console.log('Original ID:', id);
  console.log('Decoded ID:', decodedId);
  
  try {
    const classifications = await getClassificationsByRegion(decodedId);
    const allRegions = await getGroupedClassifications();
    const currentRegion = allRegions.find(r => r.id === decodedId);
    
    console.log('Found region:', currentRegion?.name);
    console.log('Classifications count:', classifications.length);

    if (!currentRegion || classifications.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลกระดูก</h1>
            <p className="mb-4">ID: {decodedId}</p>
            <Link href="/" className="text-blue-600 hover:underline">
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      );
    }

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              กลับหน้าหลัก
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {currentRegion.name}
            </h1>
            <p className="text-lg text-gray-600">
              ระบบการจำแนกทั้งหมด {classifications.length} ระบบ
            </p>
          </div>

          {/* Classifications Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {classifications.map((classification, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-blue-600 font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {classification.Classification_Name}
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                      📋 รายละเอียดการจำแนก
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ประเภท
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              รายละเอียด
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {(() => {
                            const description = classification.Type_Description;
                            const lines = description.split(';').map(line => line.trim());
                            const tableData = [];
                            
                            lines.forEach(line => {
                              if (line.includes('Type') || line.includes('type')) {
                                const parts = line.split(':');
                                if (parts.length >= 2) {
                                  const typePart = parts[0].trim();
                                  const descPart = parts[1].trim();
                                  tableData.push({ type: typePart, description: descPart });
                                }
                              } else if (line.includes('Based on') || line.includes('based on')) {
                                tableData.push({ 
                                  type: classification.Classification_Name, 
                                  description: line.trim() 
                                });
                              }
                            });
                            
                            // If no structured data found, create rows from the whole description
                            if (tableData.length === 0) {
                              const parts = description.split(',');
                              parts.forEach((part, index) => {
                                const subParts = part.split(':');
                                if (subParts.length >= 2) {
                                  tableData.push({ 
                                    type: subParts[0].trim(), 
                                    description: subParts[1].trim() 
                                  });
                                } else if (subParts[0].includes('Type') || subParts[0].includes('type')) {
                                  tableData.push({ 
                                    type: subParts[0].trim(), 
                                    description: part.replace(subParts[0], '').replace(':', '').trim() 
                                  });
                                }
                              });
                            }
                            
                            // Fallback if still no data
                            if (tableData.length === 0) {
                              tableData.push({ 
                                type: 'ทั่วไป', 
                                description: description 
                              });
                            }
                            
                            return tableData.map((row, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {row.type}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                  {row.description}
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">
                      🏥 การรักษา
                    </h4>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <table className="min-w-full divide-y divide-green-200">
                        <thead className="bg-green-100">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ประเภท
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              การรักษา
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-green-200">
                          {(() => {
                            const management = classification.Management;
                            const lines = management.split(';').map(line => line.trim());
                            const tableData = [];
                            
                            lines.forEach(line => {
                              const parts = line.split(':');
                              if (parts.length >= 2) {
                                const typePart = parts[0].trim();
                                const descPart = parts[1].trim();
                                tableData.push({ type: typePart, description: descPart });
                              } else if (line.includes('-') || line.includes('–')) {
                                const dashParts = line.split(/[-–]/);
                                if (dashParts.length >= 2) {
                                  tableData.push({ 
                                    type: dashParts[0].trim(), 
                                    description: dashParts[1].trim() 
                                  });
                                }
                              } else if (line.length > 0) {
                                // Handle cases where there's no clear separator
                                if (line.includes('I') || line.includes('II') || line.includes('III') || line.includes('IV')) {
                                  // Try to extract Roman numerals as types
                                  const romanMatch = line.match(/([IVXLCDM]+|[IVXLCDM]+-[IVXLCDM]+)/g);
                                  if (romanMatch) {
                                    romanMatch.forEach(roman => {
                                      const parts = roman.split('-');
                                      if (parts.length >= 2) {
                                        tableData.push({ type: parts[0].trim(), description: line.replace(roman, '').trim() });
                                      } else {
                                        const typeIndex = line.indexOf(roman);
                                        if (typeIndex > -1) {
                                          const before = line.substring(0, typeIndex).trim();
                                          const after = line.substring(typeIndex + roman.length).trim();
                                          tableData.push({ type: roman, description: after });
                                        }
                                      }
                                    });
                                  } else {
                                    tableData.push({ type: 'ทั่วไป', description: line });
                                  }
                                } else {
                                  tableData.push({ type: 'ทั่วไป', description: line });
                                }
                              }
                            });
                            
                            // If no structured data found, try to parse by common patterns
                            if (tableData.length === 0) {
                              const parts = management.split(',');
                              parts.forEach((part, index) => {
                                const subParts = part.split(':');
                                if (subParts.length >= 2) {
                                  tableData.push({ 
                                    type: subParts[0].trim(), 
                                    description: subParts[1].trim() 
                                  });
                                } else if (subParts[0].includes('I') || subParts[0].includes('II') || subParts[0].includes('III') || subParts[0].includes('IV')) {
                                  tableData.push({ 
                                    type: subParts[0].trim(), 
                                    description: part.replace(subParts[0], '').replace(':', '').trim() 
                                  });
                                }
                              });
                            }
                            
                            // Fallback if still no data
                            if (tableData.length === 0 && management.length > 0) {
                              tableData.push({ 
                                type: 'ทั่วไป', 
                                description: management 
                              });
                            }
                            
                            return tableData.map((row, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {row.type}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                  {row.description}
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              กระดูกส่วนอื่นๆ
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {allRegions.map((region) => (
                region.id === decodedId ? (
                  <div
                    key={region.id}
                    className="text-center p-3 bg-gray-100 opacity-50 rounded-lg cursor-not-allowed transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors">
                      <span className="text-xs font-bold text-gray-500 transition-colors">
                        {region.id.split(' - ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 transition-colors">
                      {region.name}
                    </p>
                    <div className="text-xs text-green-600 font-medium mt-1">
                      กำลังดูอยู่
                    </div>
                  </div>
                ) : (
                  <Link
                    key={region.id}
                    href={`/bone/${encodeURIComponent(region.id)}`}
                    className="text-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
                      <span className="text-xs font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
                        {region.id.split(' - ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 group-hover:text-blue-700 transition-colors">
                      {region.name}
                    </p>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading bone detail:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">เกิดข้อผิดพลาด</h1>
          <p className="mb-4">ไม่สามารถโหลดข้อมูลได้</p>
          <Link href="/" className="text-blue-600 hover:underline">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }
}
