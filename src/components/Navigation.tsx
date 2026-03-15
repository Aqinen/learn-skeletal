import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            🦴 Pre-Ghost Structural System
          </Link>
          
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              หน้าหลัก
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              เกี่ยวกับ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
