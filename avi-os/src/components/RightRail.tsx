import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Wrench, Palette, Code, Sparkles } from 'lucide-react';
import { useWindowStore, type AppId } from '../store/useWindowStore';

const RAIL_BUTTONS = [
  {
    id: 'tv' as AppId,
    icon: Tv,
    label: 'YouTube TV',
    color: 'hover:bg-red-500/20 hover:border-red-500/40',
  },
  {
    id: 'btn2' as AppId,
    icon: Wrench,
    label: 'Tools',
    color: 'hover:bg-purple-500/20 hover:border-purple-500/40',
  },
  {
    id: 'btn3' as AppId,
    icon: Palette,
    label: 'Design',
    color: 'hover:bg-blue-500/20 hover:border-blue-500/40',
  },
  {
    id: 'btn4' as AppId,
    icon: Code,
    label: 'Code',
    color: 'hover:bg-green-500/20 hover:border-green-500/40',
  },
  {
    id: 'btn5' as AppId,
    icon: Sparkles,
    label: 'Magic',
    color: 'hover:bg-orange-500/20 hover:border-orange-500/40',
  },
];

export const RightRail: React.FC = () => {
  const { openWindow } = useWindowStore();

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-4">
        {RAIL_BUTTONS.map((button, index) => {
          const Icon = button.icon;
          
          return (
            <motion.button
              key={button.id}
              onClick={() => openWindow(button.id)}
              className={`
                group relative w-14 h-14 rounded-full glass border-2 border-white/20
                transition-all duration-300 focus-ring
                ${button.color}
              `}
              whileHover={{ 
                scale: 1.1,
                y: -2 
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              aria-label={button.label}
            >
              <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors m-auto" />
              
              {/* Tooltip */}
              <div className="absolute right-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="glass px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                  <span className="text-white/90 text-sm font-medium">{button.label}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};