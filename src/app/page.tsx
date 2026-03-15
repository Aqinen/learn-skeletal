import { getGroupedClassifications } from '@/lib/orthoData';
import Link from 'next/link';

export default async function Home() {
  const boneRegions = await getGroupedClassifications();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ระบบจำแนกกระดูก
            <span className="text-blue-600"> Orthopedic Classifications</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            คลังข้อมูลการจำแนกชนิดกระดูกแต่ละส่วนสำหรับแพทย์และบุคลากรทางการแพทย์
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {boneRegions.map((region) => (
            <Link 
              key={region.id}
              href={`/bone/${region.id}`}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-blue-600 font-bold text-lg">
                    {region.id.split(' - ')[0]}
                  </span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {region.name}
              </h3>
              
              <p className="text-sm text-gray-600">
                {region.classifications.length} ระบบการจำแนก
              </p>
              
              <div className="mt-3 flex flex-wrap gap-1">
                {region.classifications.slice(0, 2).map((cls, idx) => (
                  <span 
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {cls.Classification_Name.split(' ')[0]}
                  </span>
                ))}
                {region.classifications.length > 2 && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    +{region.classifications.length - 2}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              เกี่ยวกับระบบนี้
            </h2>
            <p className="text-gray-600 mb-6">
              ระบบนี้รวบรวมการจำแนกชนิดกระดูกที่สำคัญในทางการแพทย์ 
              โดยแบ่งตามตำแหน่งของกระดูกและระบบการจำแนกที่ใช้ในการวินิจฉัยและวางแผนการรักษา
            </p>
            <Link 
              href="/about"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              ดูข้อมูลเพิ่มเติม
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
