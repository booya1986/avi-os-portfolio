import {
  Folder,
  Terminal,
  Globe,
  Mail,
  Music,
  Camera,
  Calculator,
  Settings
} from 'lucide-react';
import type { DockApp } from '../types';

// Dock applications configuration
export const DOCK_APPS: DockApp[] = [
  { 
    icon: Folder, 
    label: 'Finder', 
    color: 'bg-blue-500',
    isRunning: true 
  },
  { 
    icon: Terminal, 
    label: 'Terminal', 
    color: 'bg-gray-800',
    isRunning: true 
  },
  { 
    icon: Globe, 
    label: 'Safari', 
    color: 'bg-blue-400',
    isRunning: true 
  },
  { 
    icon: Mail, 
    label: 'Mail', 
    color: 'bg-blue-600' 
  },
  { 
    icon: Music, 
    label: 'Music', 
    color: 'bg-pink-500' 
  },
  { 
    icon: Camera, 
    label: 'Photos', 
    color: 'bg-gradient-to-br from-yellow-400 to-pink-500' 
  },
  { 
    icon: Calculator, 
    label: 'Calculator', 
    color: 'bg-gray-700' 
  },
  { 
    icon: Settings, 
    label: 'System Preferences', 
    color: 'bg-gray-500' 
  },
];

// Dock animation settings
export const DOCK_ANIMATION = {
  scale: {
    hover: 1.2,
    active: 1.1,
    normal: 1,
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  },
  stagger: 0.05,
} as const;