# AVI-OS - Development Documentation

Interactive desktop operating system experience built with React, TypeScript, and Vite. This document covers technical setup, development workflow, and application architecture.

🚀 **Live Demo**: [https://booya1986.github.io/avi-os-portfolio/](https://booya1986.github.io/avi-os-portfolio/)

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 📱 Applications

- **📺 TV App**: Retro television with YouTube integration
- **🌐 Browser App**: Embedded web browsing capability
- **📝 Notes App**: Interactive sticky notes with persistence
- **🎧 iPod App**: Podcast player with Spotify integration
- **💬 Chat App**: Demo conversational interface

## 🏗️ Architecture

### Core Components
- **Window Management**: Drag, resize, minimize, maximize system
- **Dock System**: macOS-style application launcher with hover effects
- **State Management**: Zustand for global application state
- **Sound System**: Web Audio API for interactive feedback
- **Asset Pipeline**: Vite-optimized image and resource loading

### Tech Stack
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety and IntelliSense
- **Vite** - Lightning-fast development and build tool
- **Tailwind CSS** - Utility-first CSS with custom glass effects
- **Framer Motion** - Smooth animations and gesture handling
- **react-rnd** - Professional drag-and-resize functionality
- **Zustand** - Lightweight, performant state management

## 🎨 Adding New Applications

```typescript
// 1. Define your app type
type AppType = 'tv' | 'browser' | 'notes' | 'ipod' | 'chat' | 'your-app';

// 2. Add window configuration
const WINDOW_SIZES = {
  'your-app': { width: 600, height: 400 }
};

// 3. Add to dock configuration
const RAIL_BUTTONS = [
  {
    id: 'your-app',
    icon: YourIcon,
    label: 'Your App'
  }
];

// 4. Implement app content in renderWindowContent()
```

## 🧪 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript validation
npm run format          # Format with Prettier

# Utilities
npm run clean           # Clean build artifacts
npm run analyze         # Bundle analyzer
```

## 📁 Project Structure

```
avi-os/
├── src/
│   ├── components/     # React components
│   │   ├── Window.tsx  # Window management
│   │   ├── Dock.tsx    # Application dock
│   │   └── ...
│   ├── constants/      # Configuration constants
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Zustand state management
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Utility functions
│   └── App.tsx         # Main application
├── public/             # Static assets
│   ├── *.png          # Application icons
│   └── *.jpg          # Background images
└── dist/              # Built application (generated)
```

## 🔧 Configuration

### Vite Configuration
The project uses a custom Vite configuration optimized for GitHub Pages deployment:

```typescript
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/avi-os-portfolio/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
```

### TypeScript Configuration
Strict TypeScript settings ensure code quality:
- No implicit any types
- Strict null checks
- Unused variable detection
- Import/export validation

## 🚀 Deployment

The application automatically deploys to GitHub Pages via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions runs build pipeline
3. Deploys to `gh-pages` branch
4. Available at production URL

For manual deployment:
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

## 🐛 Troubleshooting

### Asset Loading Issues
If images don't load in production:
```typescript
// Import as modules instead of using absolute paths
import iconImage from '/icon.png';
// Use in JSX: <img src={iconImage} />
```

### Build Errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
npm run clean
npm run build
```

### Development Server Issues
```bash
# Check if port is in use
lsof -ti:5173

# Use different port
npm run dev -- --port 3000
```

## 📚 Resources

- **Main Documentation**: See [repository README](../README.md) for portfolio overview
- **Technical Details**: Check [CLAUDE.md](../CLAUDE.md) for development log
- **Project Planning**: Review [docs/planning.md](../docs/planning.md) for roadmap

---

For questions or contributions, see the main repository documentation.