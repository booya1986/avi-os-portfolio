import { create } from 'zustand';
import type { AppId, WindowState } from '../types';
import { DEFAULT_WINDOW_SIZES, WINDOW_TITLES } from '../constants/apps';
import { centerWindow, getViewportSize, getMaximizeBounds, getNextZIndex } from '../utils/windowUtils';

// Re-export types for external use
export type { AppId, WindowState } from '../types';

interface WindowStore {
  windows: WindowState[];
  openWindow: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<WindowState>) => void;
  toggleMaximize: (id: string) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],

  openWindow: (appId: AppId) => {
    const { windows } = get();
    
    // Check if window already exists and focus it
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      get().focusWindow(existingWindow.id);
      return;
    }

    const defaultSize = DEFAULT_WINDOW_SIZES[appId];
    const viewportSize = getViewportSize();
    const position = centerWindow(defaultSize, viewportSize);

    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: WINDOW_TITLES[appId],
      ...position,
      ...defaultSize,
      z: getNextZIndex(),
      isMaximized: false,
    };

    set({
      windows: [...windows, newWindow],
    });
  },

  closeWindow: (id: string) => {
    set(state => ({
      windows: state.windows.filter(w => w.id !== id),
    }));
  },

  focusWindow: (id: string) => {
    const { windows } = get();
    const windowToFocus = windows.find(w => w.id === id);
    
    if (!windowToFocus) return;

    set({
      windows: windows.map(w => 
        w.id === id ? { ...w, z: getNextZIndex() } : w
      ),
    });
  },

  updateWindow: (id: string, updates: Partial<WindowState>) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, ...updates } : w
      ),
    }));
  },

  toggleMaximize: (id: string) => {
    const { windows } = get();
    const window = windows.find(w => w.id === id);
    
    if (!window) return;

    if (window.isMaximized) {
      // Restore to previous size
      const restore = window.previousBounds || {
        ...centerWindow(DEFAULT_WINDOW_SIZES[window.appId], getViewportSize()),
        ...DEFAULT_WINDOW_SIZES[window.appId],
      };
      
      get().updateWindow(id, {
        ...restore,
        isMaximized: false,
        previousBounds: undefined,
      });
    } else {
      // Maximize
      const maximizeBounds = getMaximizeBounds();
      
      get().updateWindow(id, {
        previousBounds: {
          x: window.x,
          y: window.y,
          width: window.width,
          height: window.height,
        },
        ...maximizeBounds,
        isMaximized: true,
      });
    }
  },
}));