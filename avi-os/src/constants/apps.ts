import { Tv, Wrench, Palette, Code, Sparkles } from 'lucide-react';
import type { AppId, AppConfig, RailButton } from '../types';

// Default window sizes for each app
export const DEFAULT_WINDOW_SIZES: Record<AppId, { width: number; height: number }> = {
  tv: { width: 960, height: 560 },
  btn2: { width: 520, height: 360 },
  btn3: { width: 520, height: 360 },
  btn4: { width: 520, height: 360 },
  btn5: { width: 520, height: 360 },
};

// Window titles for each app
export const WINDOW_TITLES: Record<AppId, string> = {
  tv: 'Avi Levi — YouTube',
  btn2: 'Coming Soon',
  btn3: 'Coming Soon',
  btn4: 'Coming Soon',
  btn5: 'Coming Soon',
};

// Right rail button configuration
export const RAIL_BUTTONS: RailButton[] = [
  {
    id: 'tv',
    icon: Tv,
    label: 'YouTube TV',
    color: 'hover:bg-red-500/20 hover:border-red-500/40',
  },
  {
    id: 'btn2',
    icon: Wrench,
    label: 'Tools',
    color: 'hover:bg-purple-500/20 hover:border-purple-500/40',
  },
  {
    id: 'btn3',
    icon: Palette,
    label: 'Design',
    color: 'hover:bg-blue-500/20 hover:border-blue-500/40',
  },
  {
    id: 'btn4',
    icon: Code,
    label: 'Code',
    color: 'hover:bg-green-500/20 hover:border-green-500/40',
  },
  {
    id: 'btn5',
    icon: Sparkles,
    label: 'Magic',
    color: 'hover:bg-orange-500/20 hover:border-orange-500/40',
  },
];

// App placeholder configurations
export const APP_CONFIGS = {
  btn2: {
    color: 'from-purple-400/20 to-pink-400/20',
    borderColor: 'border-purple-400/30',
    icon: Wrench,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  btn3: {
    color: 'from-blue-400/20 to-cyan-400/20',
    borderColor: 'border-blue-400/30',
    icon: Palette,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  btn4: {
    color: 'from-green-400/20 to-emerald-400/20',
    borderColor: 'border-green-400/30',
    icon: Code,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  btn5: {
    color: 'from-orange-400/20 to-yellow-400/20',
    borderColor: 'border-orange-400/30',
    icon: Sparkles,
    iconColor: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
} as const;

// Button number mapping
export const BUTTON_NUMBERS: Record<Exclude<AppId, 'tv'>, string> = {
  btn2: '2',
  btn3: '3',
  btn4: '4',
  btn5: '5',
};

// YouTube configuration
export const YOUTUBE_CONFIG = {
  channelId: 'UCdz7iR7sYg2gevHXEyeeM1Q',
  playlistEmbedUrl: 'https://www.youtube.com/embed?listType=playlist&list=UUdz7iR7sYg2gevHXEyeeM1Q',
  channelUrl: 'https://www.youtube.com/@avilevi86',
} as const;