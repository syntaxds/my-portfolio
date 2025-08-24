import { useState } from 'react';
import { Link } from 'react-router-dom';
import GradientBlinds from './GradientBlinds';
import Prism from './prism';

function PhotographyPortfolio() {
  return (
    <div className="min-h-screen bg-black relative" style={{ overflowY: 'hidden' }}>
      {/* Content layer positioned absolutely over the background */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center py-12 px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-white">
            Photography Portfolio
          </h1>
          
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-8 text-center border border-gray-700 pointer-events-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">View My Photography Work</h2>
            <p className="text-gray-300 mb-6">
              Click the button below to download or view in new tab to see my portfolio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ds-photography_portfolio.pdf"
                download="Derryl_Sipahutar_Photography_Portfolio.pdf"
                className="inline-block px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                📥 Download Portfolio PDF
              </a>
              
              <a
                href="/ds-photography_portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-gray-400 text-white rounded-lg font-medium hover:border-gray-300 hover:bg-white/10 transition-colors"
              >
                👁️ View in New Tab
              </a>
            </div>
          </div>
          
          {/* Re-enable pointer events for the back button */}
          <div className="text-center mt-8 pointer-events-auto">
            <Link
              to="/"
              className="px-6 py-3 bg-gray-800/90 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-gray-700/90 transition-colors border border-gray-600"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Prism background - full viewport responsive */}
      <div className="absolute inset-0 w-full h-full">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.2}
          glow={1}
        />
      </div>

      {/*<div style={{width: '100%', height: '100%', position: 'relative' }}>
        <GradientBlinds
          gradientColors={['#04003eff', '#060116ff']}
          angle={0}
          noise={0.3}
          blindCount={122}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>*/}
    </div>
  );
}

export default PhotographyPortfolio;