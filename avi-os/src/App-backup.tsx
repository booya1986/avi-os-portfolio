import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from './store/useWindowStore';
import { Window } from './components/Window';
import { RetroTVWindow } from './components/RetroTVWindow';
import { PlaceholderWindow } from './components/PlaceholderWindow';
import { Dock } from './components/Dock';
import { RightRail } from './components/RightRail';

function App() {
  console.log('App component rendering...');
  
  let windows = [];
  let useWindowStoreResult;
  
  try {
    useWindowStoreResult = useWindowStore();
    windows = useWindowStoreResult.windows;
    console.log('Windows from store:', windows);
  } catch (error) {
    console.error('Error accessing window store:', error);
  }

  const renderWindowContent = (window: any) => {
    switch (window.appId) {
      case 'tv':
        return <RetroTVWindow />;
      case 'btn2':
      case 'btn3':
      case 'btn4':
      case 'btn5':
        return <PlaceholderWindow appId={window.appId} />;
      default:
        return <div>Unknown app</div>;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Debug info */}
      <div style={{ position: 'fixed', top: 10, left: 10, color: 'white', zIndex: 9999, fontSize: '12px' }}>
        App Loaded - Windows: {windows.length}
      </div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.jpeg)',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Desktop Content */}
      <div className="relative z-10 h-full">
        {/* Windows */}
        <div className="absolute inset-0" style={{ perspective: '1000px' }}>
          <AnimatePresence>
            {windows.map((window) => (
              <Window key={window.id} window={window}>
                {renderWindowContent(window)}
              </Window>
            ))}
          </AnimatePresence>
        </div>

        {/* UI Elements */}
        <Dock />
        <RightRail />
      </div>
    </div>
  );
}

export default App;