import React from 'react';
import { AppId } from '../store/useWindowStore';
import { Wrench, Palette, Code, Sparkles } from 'lucide-react';

interface PlaceholderWindowProps {
  appId: AppId;
}

const APP_CONFIGS = {
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
};

const BUTTON_NUMBERS = {
  btn2: '2',
  btn3: '3',
  btn4: '4',
  btn5: '5',
};

export const PlaceholderWindow: React.FC<PlaceholderWindowProps> = ({ appId }) => {
  if (appId === 'tv') return null;
  
  const config = APP_CONFIGS[appId];
  const Icon = config.icon;
  const buttonNumber = BUTTON_NUMBERS[appId];

  return (
    <div className={`h-full w-full bg-gradient-to-br ${config.color} flex flex-col items-center justify-center p-8`}>
      <div className={`rounded-3xl ${config.bgColor} ${config.borderColor} border-2 p-8 backdrop-blur-sm`}>
        <div className="text-center space-y-6">
          <div className={`w-16 h-16 mx-auto rounded-2xl ${config.bgColor} flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${config.iconColor}`} />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white/90">
              Coming Soon
            </h3>
            <p className="text-white/70 text-lg">
              Add Button {buttonNumber} functionality later
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-white/50 text-sm">
            <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};