import { useState } from 'react';
import { Link } from 'react-router-dom';

function PhotographyPortfolio() {
  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">Photography Portfolio</h1>
        
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">View My Photography Work</h2>
          <p className="text-gray-400 mb-6">
            Click the button below to download or view in new tab to see my portfolio.
          </p>
          
          <div className="space-y-4">
            <a
              href="/ds-photography_portfolio.pdf"
              download="Derryl_Sipahutar_Photography_Portfolio.pdf"
              className="inline-block px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors mr-4"
            >
              📥 Download Portfolio PDF
            </a>
            
            <a
              href="/ds-photography_portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border border-gray-600 rounded-lg font-medium hover:border-gray-400 transition-colors"
            >
              👁️ View in New Tab
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PhotographyPortfolio;