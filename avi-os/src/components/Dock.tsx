import React from 'react';
import { motion } from 'framer-motion';
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

const DOCK_APPS = [
  { icon: Folder, label: 'Finder', color: 'bg-blue-500' },
  { icon: Terminal, label: 'Terminal', color: 'bg-gray-800' },
  { icon: Globe, label: 'Safari', color: 'bg-blue-400' },
  { icon: Mail, label: 'Mail', color: 'bg-blue-600' },
  { icon: Music, label: 'Music', color: 'bg-pink-500' },
  { icon: Camera, label: 'Photos', color: 'bg-gradient-to-br from-yellow-400 to-pink-500' },
  { icon: Calculator, label: 'Calculator', color: 'bg-gray-700' },
  { icon: Settings, label: 'System Preferences', color: 'bg-gray-500' },
];

export const Dock: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div 
        className="glass px-3 py-2 rounded-2xl border border-white/20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-end space-x-2">
          {DOCK_APPS.map((app, index) => {
            const Icon = app.icon;
            
            return (
              <motion.button
                key={app.label}
                className={`
                  group relative w-12 h-12 rounded-xl flex items-center justify-center
                  ${app.color} shadow-lg transition-all duration-200 focus-ring
                `}
                whileHover={{ 
                  scale: 1.2,
                  y: -8 
                }}
                whileTap={{ scale: 1.1 }}
                onHoverStart={() => {
                  // Trigger dock bounce animation on hover
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.7 + (index * 0.05),
                  type: "spring",
                  stiffness: 300,
                  damping: 25 
                }}
                aria-label={app.label}
              >
                <Icon className="w-6 h-6 text-white" />
                
                {/* App label tooltip */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="glass px-2 py-1 rounded-lg border border-white/20 whitespace-nowrap">
                    <span className="text-white/90 text-xs font-medium">{app.label}</span>
                  </div>
                </div>
                
                {/* App dot indicator (for running apps) */}
                {index < 3 && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 rounded-full bg-white/80"></div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};