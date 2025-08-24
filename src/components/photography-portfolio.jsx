import { useState } from 'react';
import { Link } from 'react-router-dom';
import GradientBlinds from './GradientBlinds';
import Prism from './prism';
import TextPressure from './textpressure';

function PhotographyPortfolio() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background layer - lowest z-index with pointer events enabled */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
        <GradientBlinds
          gradientColors={['#04003eff', '#060116ff']}
          angle={-90}
          noise={0.2}
          blindCount={100}
          blindMinWidth={50}
          spotlightRadius={1}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.1}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* Text pressure layer - middle z-index, no pointer events */}
      <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none">
        <TextPressure
          text="RTMNS-RAW"
          flex={false}
          alpha={true}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>

      {/* Content layer - highest z-index */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center py-12 px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-white">
            
          </h1>
          
          <div className="bg-transparent-900/90 backdrop-blur-sm rounded-lg p-8 text-center border border-gray-800 pointer-events-auto" style={{ pointerEvents: 'none' }}>
            <h2 className="text-2xl font-bold mb-4 text-white">PHOTOGRAPHY PORTFOLIO</h2>
            <p className="text-gray-300 mb-6">
              See my recent work by choosing one of the options below.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ds-photography_portfolio.pdf"
                download="Derryl_Sipahutar_Photography_Portfolio.pdf"
                className="inline-block px-8 py-3 border border-gray-400 text-white rounded-lg font-medium hover:border-gray-300 hover:bg-white/10 transition-colors"
                style={{ pointerEvents: 'auto' }}
              >
                Download PDF Ver.
              </a>
              
              <a
                href="/ds-photography_portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-gray-400 text-white rounded-lg font-medium hover:border-gray-300 hover:bg-white/10 transition-colors"
                style={{ pointerEvents: 'auto' }}
              >
                View in New Tab
              </a>
            </div>
          </div>
          
          {/* Back button with pointer events enabled */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-block px-8 py-3 border border-gray-400 text-white rounded-lg font-medium hover:border-gray-300 hover:bg-white/10 transition-colors"
              style={{ pointerEvents: 'auto' }}
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Prism background if you want to use it instead/additionally */}
      {/*
      <div className="absolute inset-0 z-1 w-full h-full">
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
      */}
    </div>
  );
}

export default PhotographyPortfolio;