import type { Position, Size, Bounds } from '../types';

// Window positioning utilities
export const centerWindow = (windowSize: Size, viewportSize: Size): Position => {
  return {
    x: Math.max(50, (viewportSize.width - windowSize.width) / 2),
    y: Math.max(50, (viewportSize.height - windowSize.height) / 2),
  };
};

// Constrain window within viewport bounds
export const constrainToBounds = (
  position: Position,
  size: Size,
  viewportSize: Size,
  padding: number = 50
): Position => {
  const maxX = viewportSize.width - size.width - padding;
  const maxY = viewportSize.height - size.height - padding;
  
  return {
    x: Math.max(padding, Math.min(maxX, position.x)),
    y: Math.max(padding, Math.min(maxY, position.y)),
  };
};

// Generate unique window ID
export const generateWindowId = (appId: string): string => {
  return `${appId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get viewport size
export const getViewportSize = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

// Calculate maximize bounds
export const getMaximizeBounds = (padding: number = 20): Bounds => {
  const viewport = getViewportSize();
  return {
    x: padding,
    y: padding,
    width: viewport.width - (padding * 2),
    height: viewport.height - 120, // Leave space for dock
  };
};

// Check if window is out of bounds
export const isWindowOutOfBounds = (bounds: Bounds, viewportSize: Size): boolean => {
  return (
    bounds.x < 0 ||
    bounds.y < 0 ||
    bounds.x + bounds.width > viewportSize.width ||
    bounds.y + bounds.height > viewportSize.height
  );
};

// Snap window to grid (optional utility)
export const snapToGrid = (position: Position, gridSize: number = 20): Position => ({
  x: Math.round(position.x / gridSize) * gridSize,
  y: Math.round(position.y / gridSize) * gridSize,
});

// Z-index management
let globalZIndex = 1;

export const getNextZIndex = (): number => {
  return ++globalZIndex;
};

export const resetZIndex = (): void => {
  globalZIndex = 1;
};