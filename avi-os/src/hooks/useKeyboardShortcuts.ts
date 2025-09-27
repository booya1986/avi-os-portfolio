import { useEffect } from 'react';
import { useWindowStore } from '../store/useWindowStore';

export const useKeyboardShortcuts = () => {
  const { windows, closeWindow, focusWindow, openWindow } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Close focused window with Escape
      if (event.key === 'Escape') {
        const focusedWindow = windows.reduce((prev, current) => 
          current.z > prev.z ? current : prev
        );
        if (focusedWindow) {
          closeWindow(focusedWindow.id);
        }
      }

      // Cmd/Ctrl + W to close focused window
      if ((event.metaKey || event.ctrlKey) && event.key === 'w') {
        event.preventDefault();
        const focusedWindow = windows.reduce((prev, current) => 
          current.z > prev.z ? current : prev
        );
        if (focusedWindow) {
          closeWindow(focusedWindow.id);
        }
      }

      // Quick app shortcuts
      if ((event.metaKey || event.ctrlKey) && event.shiftKey) {
        switch (event.key) {
          case 'T':
            event.preventDefault();
            openWindow('tv');
            break;
          case '2':
            event.preventDefault();
            openWindow('btn2');
            break;
          case '3':
            event.preventDefault();
            openWindow('btn3');
            break;
          case '4':
            event.preventDefault();
            openWindow('btn4');
            break;
          case '5':
            event.preventDefault();
            openWindow('btn5');
            break;
        }
      }

      // Tab through windows with Cmd/Ctrl + Tab
      if ((event.metaKey || event.ctrlKey) && event.key === 'Tab') {
        event.preventDefault();
        if (windows.length > 0) {
          const sortedWindows = [...windows].sort((a, b) => a.z - b.z);
          const currentIndex = sortedWindows.findIndex(w => 
            w.z === Math.max(...windows.map(win => win.z))
          );
          const nextIndex = (currentIndex + 1) % sortedWindows.length;
          focusWindow(sortedWindows[nextIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows, closeWindow, focusWindow, openWindow]);
};

// Hook for window-specific shortcuts
export const useWindowShortcuts = (windowId: string) => {
  const { closeWindow, toggleMaximize } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when this window is focused
      const activeElement = document.activeElement;
      const windowElement = document.querySelector(`[data-window-id="${windowId}"]`);
      
      if (!windowElement?.contains(activeElement)) {
        return;
      }

      // Escape to close
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeWindow(windowId);
      }

      // Cmd/Ctrl + M to maximize/minimize
      if ((event.metaKey || event.ctrlKey) && event.key === 'm') {
        event.preventDefault();
        event.stopPropagation();
        toggleMaximize(windowId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windowId, closeWindow, toggleMaximize]);
};