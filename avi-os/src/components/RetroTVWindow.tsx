import React from 'react';

export const RetroTVWindow: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="relative w-full h-full max-w-4xl max-h-full">
        {/* Retro TV Frame */}
        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-gray-700">
          {/* TV Dials/Controls on the right side */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
            <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-500 shadow-inner relative">
              <div className="w-1 h-3 bg-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-500 shadow-inner relative">
              <div className="w-1 h-3 bg-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
            </div>
          </div>
          
          {/* TV Screen with inner shadow */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-inner border-4 border-gray-600">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none z-10"></div>
            
            {/* YouTube Embed Container */}
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed?listType=playlist&list=UUdz7iR7sYg2gevHXEyeeM1Q"
                title="Avi Levi YouTube Channel"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  border: 'none',
                }}
              />
            </div>
          </div>
          
          {/* TV Brand/Logo */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="text-gray-400 text-xs font-mono">AVI-VISION</div>
          </div>
        </div>
        
        {/* Retro TV glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-blue-500/5 blur-xl -z-10"></div>
      </div>
    </div>
  );
};