import React, { useState, useRef, useCallback } from 'react';
import {
  playClickSound,
  playOpenSound,
  playCloseSound,
  playHoverSound,
  playMinimizeSound,
  playMaximizeSound,
  playTypingSound,
  soundManager
} from './utils/soundUtils';

// Import images
import backgroundImage from '/daniel-leone-v7daTKlZzaw-unsplash.jpg';
import tvIcon from '/tv2.png';
import siteIcon from '/site.png';
import noteIcon from '/note.png';
import ipodIcon from '/ipod.png';
import chatIcon from '/chat.png';

interface WindowState {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  originalX?: number;
  originalY?: number;
  originalWidth?: number;
  originalHeight?: number;
}

function App() {
  console.log('AVI-OS rendering...');
  
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [noteTexts, setNoteTexts] = useState<{[key: string]: string}>({});
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundManager.getEnabled());
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    windowId: string | null;
    startX: number;
    startY: number;
    windowStartX: number;
    windowStartY: number;
  }>({
    isDragging: false,
    windowId: null,
    startX: 0,
    startY: 0,
    windowStartX: 0,
    windowStartY: 0,
  });
  
  const [resizeState, setResizeState] = useState<{
    isResizing: boolean;
    windowId: string | null;
    startX: number;
    startY: number;
    windowStartWidth: number;
    windowStartHeight: number;
    resizeDirection: string;
  }>({
    isResizing: false,
    windowId: null,
    startX: 0,
    startY: 0,
    windowStartWidth: 0,
    windowStartHeight: 0,
    resizeDirection: '',
  });
  const nextZIndex = useRef(1000);
  
  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    soundManager.setEnabled(newSoundEnabled);
    if (newSoundEnabled) {
      playClickSound(); // Test sound when enabling
    }
  };
  
  const openWindow = (type: string, title: string) => {
    const id = `${type}-${Date.now()}`;
    const existingWindow = windows.find(w => w.type === type);
    
    if (existingWindow) {
      // Focus existing window
      focusWindow(existingWindow.id);
      if (existingWindow.isMinimized) {
        toggleMinimize(existingWindow.id);
      }
      return;
    }
    
    // Play opening sound
    playOpenSound();
    
    const newWindow: WindowState = {
      id,
      type,
      title,
      x: 100 + windows.length * 30,
      y: 50 + windows.length * 30,
width: type === 'tv' ? 1000 : type === 'browser' ? 1000 : type === 'notes' ? 400 : type === 'ipod' ? 420 : type === 'chat' ? 600 : 500,
      height: type === 'tv' ? 700 : type === 'browser' ? 700 : type === 'notes' ? 500 : type === 'ipod' ? 680 : type === 'chat' ? 500 : 400,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex.current++,
    };
    
    setWindows(prev => [...prev, newWindow]);
  };
  
  const closeWindow = (id: string) => {
    // Play closing sound
    playCloseSound();
    setWindows(prev => prev.filter(w => w.id !== id));
  };
  
  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex.current++ } : w
    ));
  };
  
  const toggleMinimize = (id: string) => {
    // Play minimize sound
    playMinimizeSound();
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };
  
  const toggleMaximize = (id: string) => {
    // Play maximize sound
    playMaximizeSound();
    setWindows(prev => prev.map(w => {
      if (w.id !== id) return w;
      
      if (w.isMaximized) {
        // Restore to original size
        return {
          ...w,
          isMaximized: false,
          x: w.originalX || w.x,
          y: w.originalY || w.y,
          width: w.originalWidth || w.width,
          height: w.originalHeight || w.height,
        };
      } else {
        // Maximize and store original size
        return {
          ...w,
          isMaximized: true,
          originalX: w.x,
          originalY: w.y,
          originalWidth: w.width,
          originalHeight: w.height,
          x: 20,
          y: 20,
          width: window.innerWidth - 40,
          height: window.innerHeight - 40,
        };
      }
    }));
  };
  
  const startDrag = (e: React.MouseEvent, windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    if (!window || window.isMaximized) return;
    
    setDragState({
      isDragging: true,
      windowId,
      startX: e.clientX,
      startY: e.clientY,
      windowStartX: window.x,
      windowStartY: window.y,
    });
    
    focusWindow(windowId);
  };
  
  const startResize = (e: React.MouseEvent, windowId: string, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const window = windows.find(w => w.id === windowId);
    if (!window || window.isMaximized) return;
    
    setResizeState({
      isResizing: true,
      windowId,
      startX: e.clientX,
      startY: e.clientY,
      windowStartWidth: window.width,
      windowStartHeight: window.height,
      resizeDirection: direction,
    });
    
    focusWindow(windowId);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragState.isDragging && dragState.windowId) {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;
      
      setWindows(prev => prev.map(w => 
        w.id === dragState.windowId ? {
          ...w,
          x: Math.max(0, Math.min(window.innerWidth - w.width, dragState.windowStartX + deltaX)),
          y: Math.max(0, Math.min(window.innerHeight - w.height, dragState.windowStartY + deltaY)),
        } : w
      ));
    }
    
    if (resizeState.isResizing && resizeState.windowId) {
      const deltaX = e.clientX - resizeState.startX;
      const deltaY = e.clientY - resizeState.startY;
      
      setWindows(prev => prev.map(w => {
        if (w.id !== resizeState.windowId) return w;
        
        let newWidth = resizeState.windowStartWidth;
        let newHeight = resizeState.windowStartHeight;
        let newX = w.x;
        let newY = w.y;
        
        if (resizeState.resizeDirection.includes('e')) {
          newWidth = Math.max(300, resizeState.windowStartWidth + deltaX);
        }
        if (resizeState.resizeDirection.includes('w')) {
          newWidth = Math.max(300, resizeState.windowStartWidth - deltaX);
          newX = Math.min(w.x, w.x + w.width - 300);
        }
        if (resizeState.resizeDirection.includes('s')) {
          newHeight = Math.max(200, resizeState.windowStartHeight + deltaY);
        }
        if (resizeState.resizeDirection.includes('n')) {
          newHeight = Math.max(200, resizeState.windowStartHeight - deltaY);
          newY = Math.min(w.y, w.y + w.height - 200);
        }
        
        // Ensure window doesn't go outside viewport
        if (newX + newWidth > window.innerWidth) newWidth = window.innerWidth - newX;
        if (newY + newHeight > window.innerHeight) newHeight = window.innerHeight - newY;
        if (newX < 0) { newWidth += newX; newX = 0; }
        if (newY < 0) { newHeight += newY; newY = 0; }
        
        return { ...w, width: newWidth, height: newHeight, x: newX, y: newY };
      }));
    }
  }, [dragState, resizeState, setWindows]);
  
  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      windowId: null,
      startX: 0,
      startY: 0,
      windowStartX: 0,
      windowStartY: 0,
    });
    setResizeState({
      isResizing: false,
      windowId: null,
      startX: 0,
      startY: 0,
      windowStartWidth: 0,
      windowStartHeight: 0,
      resizeDirection: '',
    });
  }, [setDragState, setResizeState]);
  
  React.useEffect(() => {
    if (dragState.isDragging || resizeState.isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState, resizeState, handleMouseMove, handleMouseUp]);
  
  const renderWindowContent = (window: WindowState) => {
    switch (window.type) {
      case 'browser':
        return (
          <div className="h-full w-full relative bg-white overflow-hidden rounded-2xl">
            {/* Browser header with window controls */}
            <div 
              className="bg-gray-100 p-2 border-b border-gray-300 rounded-t-2xl cursor-move select-none"
              onMouseDown={(e) => startDrag(e, window.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {/* Close Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      closeWindow(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                    title="Close"
                  >
                    <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100">×</span>
                  </button>
                  
                  {/* Minimize Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMinimize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                    title="Minimize"
                  >
                    <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100">−</span>
                  </button>
                  
                  {/* Maximize Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMaximize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                    title={window.isMaximized ? "Restore" : "Maximize"}
                  >
                    <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100">
                      {window.isMaximized ? "−" : "+"}
                    </span>
                  </button>
                </div>
                
                <div className="text-gray-600 text-sm font-medium">🌐 Avi Levi Blog</div>
                <div className="w-16" />
              </div>
            </div>
            
            {/* Browser content */}
            <div style={{ height: 'calc(100% - 44px)' }}>
              <iframe
                src="https://avilevi.co.il"
                className="w-full h-full border-0"
                title="Avi Levi Blog"
              />
            </div>
          </div>
        );
      case 'notes': {
        const currentText = noteTexts[window.id] || '';
        const characterCount = currentText.length;

        return (
          <div className="h-full w-full relative bg-yellow-200 overflow-hidden rounded-2xl">
            {/* Sticky note header with window controls */}
            <div 
              className="bg-yellow-300 p-2 border-b border-yellow-400 rounded-t-2xl cursor-move select-none"
              onMouseDown={(e) => startDrag(e, window.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {/* Close Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      closeWindow(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                    title="Close"
                  >
                    <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100">×</span>
                  </button>
                  
                  {/* Minimize Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMinimize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                    title="Minimize"
                  >
                    <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100">−</span>
                  </button>
                  
                  {/* Maximize Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMaximize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                    title={window.isMaximized ? "Restore" : "Maximize"}
                  >
                    <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100">
                      {window.isMaximized ? "−" : "+"}
                    </span>
                  </button>
                </div>
                
                <h3 className="text-yellow-800 font-semibold text-sm">📝 Sticky Notes</h3>
                
                <div className="flex items-center space-x-2">
                  {/* Clear Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setNoteTexts(prev => ({ ...prev, [window.id]: '' }));
                    }}
                    className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-yellow-100 text-xs rounded transition-colors"
                    title="Clear"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            
            {/* Note content area */}
            <div className="p-4" style={{ height: 'calc(100% - 70px)' }}>
              <textarea
                value={currentText}
                onChange={(e) => setNoteTexts(prev => ({ ...prev, [window.id]: e.target.value }))}
                onKeyDown={(e) => {
                  // Play typing sound for most key presses
                  playTypingSound(e.key);
                }}
                className="w-full h-full bg-transparent border-0 outline-0 resize-none text-gray-800 text-base leading-relaxed"
                placeholder="Write your notes here..."
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              />
            </div>
            
            {/* Character counter */}
            <div className="absolute bottom-2 right-4 text-yellow-700 text-xs font-mono bg-yellow-100/50 px-2 py-1 rounded">
              {characterCount} chars
            </div>
            
            {/* Sticky note shadow */}
            <div className="absolute -bottom-1 -right-1 w-full h-full bg-yellow-400 -z-10 opacity-30 rounded-2xl"></div>
            
            {/* Paper texture overlay */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 24px,
                  rgba(0,0,0,0.1) 24px,
                  rgba(0,0,0,0.1) 25px
                )`
              }}
            />
          </div>
        );
      }
      case 'ipod':
        return (
          <div className="h-full w-full relative overflow-hidden rounded-3xl" style={{
            background: 'linear-gradient(145deg, #f0f0f0 0%, #e8e8e8 50%, #d0d0d0 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.2)'
          }}>
            
            {/* iPod Top Section with Window Controls */}
            <div 
              className="bg-gradient-to-b from-gray-100 to-gray-200 p-3 border-b border-gray-300 rounded-t-3xl cursor-move select-none"
              onMouseDown={(e) => startDrag(e, window.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      closeWindow(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                    title="Close"
                  >
                    <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100">×</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMinimize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                    title="Minimize"
                  >
                    <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100">−</span>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMaximize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                    title={window.isMaximized ? "Restore" : "Maximize"}
                  >
                    <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100">
                      {window.isMaximized ? "−" : "+"}
                    </span>
                  </button>
                </div>
                <div className="text-gray-600 text-sm font-light tracking-wider">iPod</div>
                <div className="w-16" />
              </div>
            </div>

            {/* iPod Body - Adjusted for larger screen */}
            <div className="p-4" style={{ height: 'calc(100% - 56px)' }}>
              
              {/* iPod Screen - Much Larger */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg mb-6 border border-gray-700 relative overflow-hidden" style={{
                height: '420px',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(255,255,255,0.1)'
              }}>
                {/* Screen Bezel */}
                <div className="absolute inset-0 rounded-lg" style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                  pointerEvents: 'none'
                }}></div>
                
                {/* Spotify Embed - Larger and better for episode browsing */}
                <div className="absolute inset-2 rounded">
                  <iframe
                    src="https://open.spotify.com/embed/show/0AIFnYGT4T0xGDgNUtvtCe?utm_source=generator&theme=0&t=0&height=400"
                    width="100%"
                    height="100%"
                    frameBorder={0}
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded"
                    title="Spotify Podcast Player"
                  />
                </div>
              </div>

              {/* iPod Click Wheel - Smaller to accommodate larger screen */}
              <div className="mx-auto relative" style={{ width: '160px', height: '160px' }}>
                {/* Outer Ring */}
                <div className="w-full h-full rounded-full relative" style={{
                  background: 'linear-gradient(145deg, #f5f5f5 0%, #e0e0e0 50%, #d5d5d5 100%)',
                  boxShadow: 'inset 0 0 16px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.2)'
                }}>
                  
                  {/* Touch Ring */}
                  <div className="absolute inset-3 rounded-full" style={{
                    background: 'linear-gradient(145deg, #e8e8e8 0%, #f0f0f0 50%, #e5e5e5 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
                  }}>
                    
                    {/* Menu Button */}
                    <button className="absolute -top-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-bold text-gray-600 hover:text-gray-800 transition-colors">
                      MENU
                    </button>
                    
                    {/* Forward Button */}
                    <button className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors text-sm">
                      ⏭
                    </button>
                    
                    {/* Play/Pause Button */}
                    <button className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-bold text-gray-600 hover:text-gray-800 transition-colors">
                      ⏯
                    </button>
                    
                    {/* Back Button */}
                    <button className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors text-sm">
                      ⏮
                    </button>
                    
                    {/* Center Select Button */}
                    <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all duration-150 active:scale-95" style={{
                      background: 'linear-gradient(145deg, #f8f8f8 0%, #e8e8e8 100%)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.8)',
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}>
                      <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* iPod Branding */}
              <div className="text-center mt-3">
                <div className="text-gray-400 text-xs font-light tracking-widest mb-1">
                  A V I - P O D
                </div>
                <div className="text-gray-500 text-xs">
                  Podcast Edition
                </div>
              </div>
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="h-full w-full relative bg-white overflow-hidden rounded-2xl shadow-2xl">
            {/* Chat header with window controls */}
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 border-b border-blue-400 rounded-t-2xl cursor-move select-none"
              onMouseDown={(e) => startDrag(e, window.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {/* Close Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      closeWindow(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                    title="Close"
                  >
                    <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100">×</span>
                  </button>
                  
                  {/* Minimize Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMinimize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                    title="Minimize"
                  >
                    <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100">−</span>
                  </button>
                  
                  {/* Maximize Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMaximize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                    title={window.isMaximized ? "Restore" : "Maximize"}
                  >
                    <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100">
                      {window.isMaximized ? "−" : "+"}
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-white">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="text-sm font-medium">💬 Chat with Avi</div>
                </div>
                <div className="w-16" />
              </div>
            </div>
            
            {/* Chat content */}
            <div className="flex flex-col h-full" style={{ height: 'calc(100% - 44px)' }}>
              {/* Chat messages area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {/* Welcome message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-gray-800 text-sm">Hi there! 👋 I'm Avi. Welcome to my portfolio chat! Feel free to ask me anything about my work, experience, or projects.</p>
                      <span className="text-xs text-gray-500 mt-1 block">Just now</span>
                    </div>
                  </div>
                  
                  {/* Example conversation */}
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-blue-500 text-white rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-sm">Hi Avi! What technologies do you work with?</p>
                      <span className="text-xs text-blue-200 mt-1 block">12:34 PM</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      👤
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-gray-800 text-sm">Great question! I work primarily with React, TypeScript, Node.js, and Python. I also have experience with cloud platforms like AWS and Google Cloud. You can check out my projects in the other apps! 🚀</p>
                      <span className="text-xs text-gray-500 mt-1 block">12:35 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat input area */}
              <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Type a message to Avi..."
                    onKeyDown={(e) => {
                      // Play typing sound for chat input
                      playTypingSound(e.key);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">This is a demo chat interface. In a real implementation, this would connect to a chatbot service.</p>
              </div>
            </div>
          </div>
        );
      case 'tv':
        return (
          <div className="h-full w-full relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden rounded-2xl">
            {/* TV Top Control Bar */}
            <div 
              className="bg-gray-800 p-2 border-b border-gray-700 rounded-t-2xl cursor-move select-none"
              onMouseDown={(e) => startDrag(e, window.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {/* Close Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      closeWindow(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                    title="Close"
                  >
                    <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100">×</span>
                  </button>
                  
                  {/* Minimize Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMinimize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
                    title="Minimize"
                  >
                    <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100">−</span>
                  </button>
                  
                  {/* Maximize Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      toggleMaximize(window.id);
                    }}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
                    title={window.isMaximized ? "Restore" : "Maximize"}
                  >
                    <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100">
                      {window.isMaximized ? "−" : "+"}
                    </span>
                  </button>
                </div>
                
                <div className="text-gray-300 text-sm font-mono">📺 AVI-VISION TV</div>
                <div className="w-16" />
              </div>
            </div>
            
            {/* TV Content */}
            <div style={{ height: 'calc(100% - 44px)' }} className="relative">
              {/* Full Screen Retro TV Frame */}
              <div className="absolute inset-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl border-4 border-gray-700">
                
                {/* TV Control Panel - Right Side */}
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 space-y-6 z-20">
                  {/* Volume Dial */}
                  <div className="w-8 h-8 rounded-full bg-gray-600 border-3 border-gray-500 shadow-inner relative">
                    <div className="w-1 h-4 bg-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full rotate-45"></div>
                    <div className="text-gray-400 text-xs absolute -bottom-5 left-1/2 transform -translate-x-1/2">VOL</div>
                  </div>
                  
                  {/* Channel Dial */}
                  <div className="w-8 h-8 rounded-full bg-gray-600 border-3 border-gray-500 shadow-inner relative">
                    <div className="w-1 h-4 bg-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full rotate-90"></div>
                    <div className="text-gray-400 text-xs absolute -bottom-5 left-1/2 transform -translate-x-1/2">CH</div>
                  </div>
                  
                  {/* Power LED */}
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg animate-pulse"></div>
                </div>

                {/* TV Screen - Takes most of the space */}
                <div className="absolute inset-8 right-20 bottom-20 bg-black rounded-2xl overflow-hidden shadow-inner border-6 border-gray-600">
                  {/* YouTube Latest Video with Channel Navigation */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black overflow-hidden flex flex-col z-20">
                    
                    {/* Channel Header */}
                    <div className="bg-gradient-to-r from-red-900/20 to-red-700/20 border-b border-red-500/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-2xl text-white shadow-lg">
                            📺
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg">Avi Levi</h3>
                            <p className="text-red-300 text-sm">@avilevi86</p>
                          </div>
                        </div>
                        
                        <a 
                          href="https://www.youtube.com/@avilevi86/featured" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                          📺 Visit Channel
                        </a>
                      </div>
                    </div>

                    {/* Latest Video Embed */}
                    <div className="flex-1 relative bg-black">
                      <iframe
                        src="https://www.youtube.com/embed/4aRptcECJyE?rel=0&modestbranding=1&playsinline=1&controls=1"
                        className="absolute inset-0 w-full h-full border-0"
                        style={{ zIndex: 10 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title="Avi Levi Latest Video"
                      />
                    </div>

                    {/* Channel Info Footer */}
                    <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border-t border-white/10 p-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-300">
                          <span>🔴 Now Playing: Latest video from @avilevi86</span>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <span>YouTube</span>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* CRT Screen Glass Effect - moved here and made non-blocking */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/30 pointer-events-none z-30 rounded-xl"></div>
                  <div className="absolute top-2 left-2 w-16 h-8 bg-white/10 rounded-full blur-sm pointer-events-none z-30"></div>
                  
                  {/* Scanlines Effect */}
                  <div className="absolute inset-0 pointer-events-none z-30 opacity-30">
                    <div 
                      className="w-full h-full"
                      style={{
                        background: `repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0,0,0,0.1) 2px,
                          rgba(0,0,0,0.1) 4px
                        )`
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* TV Brand and Speaker Grilles */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-8 z-40">
                  {/* Left Speaker Grille */}
                  <div className="w-16 h-8 bg-gray-700 rounded-lg">
                    <div className="grid grid-cols-8 gap-1 p-1 h-full">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="bg-gray-600 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Brand Logo */}
                  <div className="text-gray-300 text-lg font-mono tracking-widest font-bold">
                    AVI-VISION
                  </div>
                  
                  {/* Right Speaker Grille */}
                  <div className="w-16 h-8 bg-gray-700 rounded-lg">
                    <div className="grid grid-cols-8 gap-1 p-1 h-full">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="bg-gray-600 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* TV Model Number */}
                <div className="absolute bottom-2 right-8 text-gray-500 text-xs font-mono z-40">
                  Model: AV-2024
                </div>
              </div>
              
              {/* Retro TV Ambient Glow */}
              <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-3xl"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p>App functionality will be added later</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Desktop Content - No bottom dock */}
      <div className="relative z-10 h-full">
        {/* Sound Control */}
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={toggleSound}
            onMouseEnter={() => playHoverSound()}
            className="backdrop-blur-2xl rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
            title={soundEnabled ? "Sound On - Click to mute" : "Sound Off - Click to enable"}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {soundEnabled ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416c.363 0 .706.159.997.587l3.384 3.383A.705.705 0 0 0 11 19.298V4.702Z"/>
                  <path d="M16 9a5 5 0 0 1 0 6"/>
                  <path d="M19 7a8 8 0 0 1 0 10"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416c.363 0 .706.159.997.587l3.384 3.383A.705.705 0 0 0 11 19.298V4.702Z"/>
                  <line x1="22" y1="9" x2="16" y2="15"/>
                  <line x1="16" y1="9" x2="22" y2="15"/>
                </svg>
              )}
            </div>
          </button>
        </div>
        
        {/* Empty space for desktop */}
      </div>

      {/* Right Rail Buttons - macOS Dock Style */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        {/* Unified Dock Background */}
        <div 
          className="backdrop-blur-2xl rounded-2xl px-2 py-3 shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(25px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <div className="flex flex-col space-y-2">
            {/* TV Button */}
            <button 
              className="group flex items-center justify-center transition-all duration-200 ease-out transform-gpu"
              onClick={() => {
                playClickSound();
                openWindow('tv', 'Avi Levi — YouTube');
              }}
              onMouseEnter={() => playHoverSound()}
              style={{ 
                width: '80px', 
                height: '80px',
                transformOrigin: 'center bottom'
              }}
            >
              <img
                src={tvIcon} 
                alt="TV" 
                className="transition-all duration-200 ease-out"
                style={{ 
                  width: '68px', 
                  height: '68px',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                  transform: 'var(--scale, scale(1))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1.3)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(-8px)');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(0)');
                }}
              />
            </button>
            
            {/* Browser Button */}
            <button 
              className="group flex items-center justify-center transition-all duration-200 ease-out transform-gpu"
              onClick={() => {
                playClickSound();
                openWindow('browser', 'Avi Levi — Blog');
              }}
              onMouseEnter={() => playHoverSound()}
              style={{ 
                width: '80px', 
                height: '80px',
                transformOrigin: 'center bottom'
              }}
            >
              <img
                src={siteIcon} 
                alt="Browser" 
                className="transition-all duration-200 ease-out"
                style={{ 
                  width: '68px', 
                  height: '68px',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                  transform: 'var(--scale, scale(1))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1.3)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(-8px)');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(0)');
                }}
              />
            </button>
            
            {/* Notes Button */}
            <button 
              className="group flex items-center justify-center transition-all duration-200 ease-out transform-gpu"
              onClick={() => {
                playClickSound();
                openWindow('notes', 'Sticky Notes');
              }}
              onMouseEnter={() => playHoverSound()}
              style={{ 
                width: '80px', 
                height: '80px',
                transformOrigin: 'center bottom'
              }}
            >
              <img
                src={noteIcon} 
                alt="Notes" 
                className="transition-all duration-200 ease-out"
                style={{ 
                  width: '68px', 
                  height: '68px',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                  transform: 'var(--scale, scale(1))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1.3)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(-8px)');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(0)');
                }}
              />
            </button>
            
            {/* iPod Button */}
            <button 
              className="group flex items-center justify-center transition-all duration-200 ease-out transform-gpu"
              onClick={() => {
                playClickSound();
                openWindow('ipod', 'iPod Podcast Player');
              }}
              onMouseEnter={() => playHoverSound()}
              style={{ 
                width: '80px', 
                height: '80px',
                transformOrigin: 'center bottom'
              }}
            >
              <img
                src={ipodIcon} 
                alt="iPod" 
                className="transition-all duration-200 ease-out"
                style={{ 
                  width: '68px', 
                  height: '68px',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                  transform: 'var(--scale, scale(1))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1.3)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(-8px)');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(0)');
                }}
              />
            </button>
            
            {/* Chat Button */}
            <button 
              className="group flex items-center justify-center transition-all duration-200 ease-out transform-gpu"
              onClick={() => {
                playClickSound();
                openWindow('chat', 'Chat with Avi');
              }}
              onMouseEnter={() => playHoverSound()}
              style={{ 
                width: '80px', 
                height: '80px',
                transformOrigin: 'center bottom'
              }}
            >
              <img
                src={chatIcon} 
                alt="Chat" 
                className="transition-all duration-200 ease-out"
                style={{ 
                  width: '68px', 
                  height: '68px',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                  transform: 'var(--scale, scale(1))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1.3)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(-8px)');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--scale', 'scale(1)');
                  e.currentTarget.parentElement?.style.setProperty('transform', 'translateY(0)');
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Windows */}
      {windows.filter(w => !w.isMinimized).map((window) => (
        <div 
          key={window.id}
          className="fixed shadow-2xl cursor-default bg-transparent"
          style={{
            left: window.x,
            top: window.y,
            width: window.width,
            height: window.height,
            zIndex: window.zIndex,
          }}
          onClick={() => focusWindow(window.id)}
        >
          {/* Window Content - Each app handles its own styling and controls */}
          <div className="w-full h-full overflow-hidden">
            {renderWindowContent(window)}
          </div>
          
          {/* Resize Handles */}
          {!window.isMaximized && (
            <>
              {/* Corner handles */}
              <div
                className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize opacity-0 hover:opacity-100"
                onMouseDown={(e) => startResize(e, window.id, 'nw')}
              />
              <div
                className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize opacity-0 hover:opacity-100"
                onMouseDown={(e) => startResize(e, window.id, 'ne')}
              />
              <div
                className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize opacity-0 hover:opacity-100"
                onMouseDown={(e) => startResize(e, window.id, 'sw')}
              />
              <div
                className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize opacity-0 hover:opacity-100"
                onMouseDown={(e) => startResize(e, window.id, 'se')}
              />
              
              {/* Edge handles */}
              <div
                className="absolute top-0 left-3 right-3 h-1 cursor-n-resize opacity-0 hover:opacity-100"
                onMouseDown={(e) => startResize(e, window.id, 'n')}
              />
              <div
                className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize opacity-0 hover:opacity-100"
                onMouseDown={(e) => startResize(e, window.id, 's')}
              />
              <div
                className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize opacity-0 hover:opacity-100"
                onMouseDown={(e) => startResize(e, window.id, 'w')}
              />
              <div
                className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize opacity-0 hover:opacity-100"
                onMouseDown={(e) => startResize(e, window.id, 'e')}
              />
            </>
          )}
        </div>
      ))}

    </div>
  );
}

export default App;
