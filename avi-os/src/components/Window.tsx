import { useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowStore, WindowState } from '../store/useWindowStore';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window, children }) => {
  const { closeWindow, focusWindow, updateWindow, toggleMaximize } = useWindowStore();
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeWindow(window.id);
      }
    };

    if (windowRef.current) {
      windowRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (windowRef.current) {
        windowRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [window.id, closeWindow]);

  const handleFocus = () => {
    focusWindow(window.id);
  };

  const handleDragStop = (e: any, d: any) => {
    updateWindow(window.id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (
    e: any,
    direction: any,
    ref: HTMLElement,
    delta: any,
    position: any
  ) => {
    updateWindow(window.id, {
      x: position.x,
      y: position.y,
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{ zIndex: window.z }}
    >
      <Rnd
        size={{ width: window.width, height: window.height }}
        position={{ x: window.x, y: window.y }}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        minWidth={300}
        minHeight={200}
        bounds="parent"
        dragHandleClassName="window-drag-handle"
        enableResizing={{
          top: !window.isMaximized,
          right: !window.isMaximized,
          bottom: !window.isMaximized,
          left: !window.isMaximized,
          topRight: !window.isMaximized,
          bottomRight: !window.isMaximized,
          bottomLeft: !window.isMaximized,
          topLeft: !window.isMaximized,
        }}
        disableDragging={window.isMaximized}
      >
        <div
          ref={windowRef}
          className={`
            h-full rounded-2xl window-glass overflow-hidden
            ${window.z > 1 ? 'shadow-window-focus' : 'shadow-window'}
            transition-shadow duration-200
          `}
          onClick={handleFocus}
          tabIndex={0}
          role="dialog"
          aria-label={window.title}
        >
          {/* Window Header */}
          <div className="window-drag-handle flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => closeWindow(window.id)}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors focus-ring"
                  aria-label="Close window"
                >
                  <X className="w-2 h-2 text-white/80 m-auto" />
                </button>
                <button
                  onClick={() => toggleMaximize(window.id)}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors focus-ring"
                  aria-label={window.isMaximized ? 'Restore window' : 'Maximize window'}
                >
                  {window.isMaximized ? (
                    <Minimize2 className="w-2 h-2 text-white/80 m-auto" />
                  ) : (
                    <Maximize2 className="w-2 h-2 text-white/80 m-auto" />
                  )}
                </button>
              </div>
            </div>
            
            <h2 className="text-white/90 text-sm font-medium select-none">
              {window.title}
            </h2>
            
            <div className="w-16" /> {/* Spacer for centering title */}
          </div>

          {/* Window Content */}
          <div className="flex-1 h-full p-0 overflow-hidden">
            <div className="h-full" style={{ height: 'calc(100% - 64px)' }}>
              {children}
            </div>
          </div>
        </div>
      </Rnd>
    </motion.div>
  );
};