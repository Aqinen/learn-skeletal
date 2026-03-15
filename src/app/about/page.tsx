export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            About This Project
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Technologies Used</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">N</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Next.js 14</h3>
                  <p className="text-gray-600">React framework with App Router for modern web development</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">T</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">TypeScript</h3>
                  <p className="text-gray-600">Type-safe JavaScript for better development experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-semibold text-sm">T</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Tailwind CSS</h3>
                  <p className="text-gray-600">Utility-first CSS framework for rapid UI development</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold text-sm">R</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">React 18</h3>
                  <p className="text-gray-600">Modern React with latest features and optimizations</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Features</h2>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Responsive design that works on all devices</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Type-safe development with TypeScript</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Modern UI with Tailwind CSS</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">SEO optimized with Next.js App Router</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
