// Core application types
export type AppId = 'tv' | 'btn2' | 'btn3' | 'btn4' | 'btn5';

// Window management types
export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  isMaximized: boolean;
  previousBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// UI Component types
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds extends Position, Size {}

// App configuration types
export interface AppConfig {
  id: AppId;
  title: string;
  defaultSize: Size;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
}

// Dock types
export interface DockApp {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  isRunning?: boolean;
}

// Right rail button types
export interface RailButton {
  id: AppId;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}