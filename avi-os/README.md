# AVI-OS - Browser Operating System

A playful, creative, and dynamic digital workspace that feels like an operating system inside the browser. Built with React, TypeScript, and Vite, featuring a macOS-inspired dock and Vision Pro-style glass effects.

![AVI-OS Preview](https://via.placeholder.com/800x500/1a1a1a/white?text=AVI-OS+Preview)

## ✨ Features

🎪 **Vision Pro Glass Aesthetic** - Translucent, frosted-glass panels with soft shadows and rounded corners  
🖱️ **Draggable & Resizable Windows** - Full window management with focus states and z-index layering  
📺 **Working YouTube TV App** - Embedded Avi Levi YouTube channel with authentic retro TV frame  
🎨 **Smooth Animations** - Framer Motion powered dock bounces, window transitions, and hover effects  
⌨️ **Keyboard Accessible** - Full keyboard navigation, shortcuts, and screen reader support  
🎯 **Modern Architecture** - Clean separation of concerns with TypeScript types and utilities  
🔧 **Extensible Design** - Easy to add new apps and customize existing functionality  

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd avi-os

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

## 🏗️ Tech Stack

### Core Technologies
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety and IntelliSense
- **Vite** - Lightning-fast development and build tool
- **Tailwind CSS** - Utility-first CSS with custom glass effects
- **Framer Motion** - Smooth animations and gesture handling
- **react-rnd** - Professional drag-and-resize functionality
- **Zustand** - Lightweight, performant state management
- **Lucide React** - Beautiful, consistent icon library

### Development Tools
- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Consistent code formatting
- **PostCSS** - Advanced CSS processing
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
avi-os/
├── public/
│   └── wallpaper.jpg           # Desktop background image
├── src/
│   ├── components/             # React components
│   │   ├── Window.tsx         # Draggable window wrapper
│   │   ├── RetroTVWindow.tsx  # YouTube embed with retro TV frame
│   │   ├── PlaceholderWindow.tsx # Placeholder apps
│   │   ├── Dock.tsx           # Bottom macOS-style dock
│   │   └── RightRail.tsx      # Right sidebar app launcher
│   ├── constants/             # Application constants
│   │   ├── apps.ts           # App configurations and mappings
│   │   └── dock.ts           # Dock app definitions
│   ├── hooks/                 # Custom React hooks
│   │   └── useKeyboardShortcuts.ts # Keyboard shortcut handling
│   ├── store/                 # State management
│   │   └── useWindowStore.ts  # Window management with Zustand
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts          # Application-wide types
│   ├── utils/                 # Utility functions
│   │   └── windowUtils.ts    # Window positioning and management
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and Tailwind imports
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build configuration
```

## 🎮 Usage & Controls

### Mouse Controls
- **Click TV button** (top right) → Opens YouTube channel window
- **Click buttons 2-5** → Opens placeholder app windows
- **Drag title bar** → Move windows around
- **Drag window edges** → Resize windows
- **Red button** → Close window
- **Green button** → Maximize/restore window
- **Click window** → Bring to front

### Keyboard Shortcuts
- **Escape** → Close focused window
- **Cmd/Ctrl + W** → Close focused window
- **Cmd/Ctrl + M** → Maximize/minimize focused window
- **Cmd/Ctrl + Tab** → Cycle through windows
- **Cmd/Ctrl + Shift + T** → Open TV app
- **Cmd/Ctrl + Shift + 2-5** → Open respective placeholder apps

## 🛠️ Customization

### Adding New Applications
1. **Define App Type**:
   ```typescript
   // In src/types/index.ts
   export type AppId = 'tv' | 'btn2' | 'btn3' | 'btn4' | 'btn5' | 'newApp';
   ```

2. **Add App Configuration**:
   ```typescript
   // In src/constants/apps.ts
   export const DEFAULT_WINDOW_SIZES = {
     // ... existing apps
     newApp: { width: 800, height: 600 },
   };
   ```

3. **Create Component**:
   ```typescript
   // src/components/NewAppWindow.tsx
   export const NewAppWindow: React.FC = () => {
     return <div>Your new app content</div>;
   };
   ```

4. **Add to RightRail**:
   ```typescript
   // In src/constants/apps.ts - RAIL_BUTTONS array
   {
     id: 'newApp',
     icon: YourIcon,
     label: 'New App',
     color: 'hover:bg-your-color/20',
   }
   ```

5. **Register in App.tsx**:
   ```typescript
   case 'newApp':
     return <NewAppWindow />;
   ```

### Styling Customization

#### Glass Effects
```css
/* In src/index.css */
.glass {
  @apply bg-white/10 backdrop-blur-xl border border-white/20;
}

.custom-glass {
  @apply bg-blue-500/10 backdrop-blur-lg border border-blue-500/30;
}
```

#### Color Schemes
```typescript
// In src/constants/apps.ts
export const APP_CONFIGS = {
  yourApp: {
    color: 'from-purple-400/20 to-pink-400/20',
    borderColor: 'border-purple-400/30',
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
};
```

#### Animations
```typescript
// In tailwind.config.js
keyframes: {
  'your-animation': {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1.1)' },
  },
},
animation: {
  'your-anim': 'your-animation 0.3s ease-out',
}
```

### Background Customization
Replace `public/background.jpeg` with your image:
- **Recommended size**: 1920x1080 or higher
- **Format**: JPG, PNG, or WebP
- **Optimization**: Use compressed images for better performance

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Development Server
The app runs at `http://localhost:5173/` with:
- ⚡ Hot Module Replacement (HMR)
- 🔥 Fast refresh for React components
- 📦 Automatic dependency optimization
- 🎯 TypeScript error overlay

### Performance Considerations
- **Lazy Loading**: Consider React.lazy() for large components
- **Memoization**: Use React.memo() for expensive renders
- **Window Constraints**: Built-in viewport boundary checking
- **Z-index Management**: Automatic layering system prevents conflicts

## 🌐 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|--------|
| **Chrome/Edge** | ✅ Full | All features including backdrop-filter |
| **Safari** | ✅ Full | Excellent performance with native support |
| **Firefox** | ⚠️ Partial | backdrop-filter not supported, graceful fallback |
| **Mobile Safari** | ✅ Good | Touch gestures work, optimized for tablets |
| **Chrome Mobile** | ✅ Good | Full feature support on tablets |

## 📋 Accessibility Features

- **Screen Reader Support** - All interactive elements have proper ARIA labels
- **Keyboard Navigation** - Full keyboard operability with logical tab order
- **High Contrast** - Works with system high contrast modes  
- **Focus Management** - Clear focus indicators and management
- **Semantic HTML** - Proper heading structure and landmarks

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
# Install Vercel CLI  
npm install -g vercel

# Deploy
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project as inspiration or foundation for your own browser-OS!

## 🙏 Acknowledgments

- **macOS** - Design inspiration for dock and window chrome
- **Vision Pro OS** - Glass aesthetic and depth effects  
- **Framer Motion** - Smooth animation capabilities
- **Tailwind CSS** - Utility-first styling approach