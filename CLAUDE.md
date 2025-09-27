# CLAUDE.md - Technical Development Log

This file documents the technical development process and deployment setup for the Avi Levi Interactive Portfolio OS.

## 🚀 Live Deployment

**Production URL:** https://booya1986.github.io/avi-os-portfolio/

## 🛠️ Development Session Summary

### Session Overview
Complete deployment setup and technical issue resolution for an interactive desktop OS portfolio built with React + TypeScript.

### Key Achievements

#### 1. GitHub Repository Setup
- ✅ Initialized git repository
- ✅ Added all project files to version control
- ✅ Set up GitHub remote origin
- ✅ Created production-ready repository structure

#### 2. GitHub Pages Deployment Configuration
- ✅ Created GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Configured automated CI/CD pipeline
- ✅ Set up proper permissions for GitHub Pages deployment
- ✅ Switched from third-party actions to official GitHub Actions

#### 3. Code Quality & Type Safety Fixes
- ✅ **ESLint Issues Resolved:** Fixed 17 linting errors including:
  - Eliminated all `any` types with proper TypeScript definitions
  - Fixed React Hook dependency arrays and useCallback usage
  - Removed unused variables and imports
  - Fixed case block variable declarations

- ✅ **TypeScript Build Errors Fixed:**
  - Added proper type exports from store modules
  - Fixed type-only imports for `verbatimModuleSyntax` compliance
  - Resolved react-rnd type compatibility issues
  - Added null safety checks for DOM element access

#### 4. Build System Fixes
- ✅ **Rollup Dependency Issue:** Resolved MODULE_NOT_FOUND error for `@rollup/rollup-linux-x64-gnu`
  - Implemented fresh dependency installation in CI
  - Cleared npm cache and package-lock.json before installs
  - Streamlined to single Node.js version (20.x)

- ✅ **Asset Loading Fix:** Resolved missing images and background
  - Converted absolute paths to imported modules
  - Fixed Vite base path configuration for GitHub Pages
  - Ensured proper asset optimization and loading

#### 5. Production Deployment Pipeline
- ✅ Automated build process with quality gates:
  - TypeScript compilation
  - ESLint validation
  - Production build generation
  - Asset optimization
  - GitHub Pages deployment

## 🏗️ Technical Stack

### Core Technologies
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 7.x
- **Styling:** Tailwind CSS 3.4
- **State Management:** Zustand 5.x
- **Animations:** Framer Motion 12.x
- **UI Components:** Lucide React icons
- **Window Management:** react-rnd 10.x

### Development Tools
- **Linting:** ESLint 9.x with TypeScript support
- **Type Checking:** TypeScript 5.8
- **Formatting:** Prettier 3.6
- **Package Manager:** npm with workspaces
- **Version Control:** Git with conventional commits

### Deployment Infrastructure
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Asset Optimization:** Vite production build
- **Domain:** GitHub subdomain (booya1986.github.io)

## 📁 Project Structure

```
avi-os-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD pipeline configuration
├── avi-os/                      # Main application workspace
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── constants/           # Configuration constants
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Zustand state management
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Utility functions
│   │   └── App.tsx              # Main application component
│   ├── public/                  # Static assets (images, sounds)
│   ├── dist/                    # Built application (generated)
│   ├── package.json             # Dependencies and scripts
│   ├── vite.config.ts           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── tsconfig.json            # TypeScript configuration
├── docs/                        # Documentation
│   └── planning.md              # Project planning and status
├── package.json                 # Root workspace configuration
├── README.md                    # Project overview
└── CLAUDE.md                    # Technical development log (this file)
```

## 🔧 Development Commands

### Local Development
```bash
# Install dependencies
npm install

# Start development server
cd avi-os && npm run dev

# Development server runs at http://localhost:5173
```

### Code Quality
```bash
# TypeScript type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deployment Process

### Automatic Deployment
1. Push to `main` branch triggers GitHub Actions
2. Workflow installs dependencies and clears caches
3. Runs type checking and linting validation
4. Builds production bundle with Vite
5. Deploys to GitHub Pages automatically

### Manual Deployment Steps (if needed)
1. Ensure GitHub Pages is enabled in repository settings
2. Set source to "GitHub Actions" in Pages settings
3. Push changes to `main` branch
4. Monitor workflow in Actions tab
5. Site updates at https://booya1986.github.io/avi-os-portfolio/

## ⚡ Performance Optimizations

### Build Optimizations
- **Asset Bundling:** Vite optimizes and bundles all assets
- **Tree Shaking:** Unused code is eliminated from final bundle
- **Code Splitting:** Dynamic imports for better loading performance
- **Image Optimization:** Automatic image compression and format conversion

### Runtime Optimizations
- **React 18 Features:** Concurrent rendering for smoother interactions
- **Hardware Acceleration:** CSS transforms use GPU acceleration
- **Efficient Re-renders:** Proper React patterns minimize unnecessary updates
- **State Management:** Zustand provides lightweight state management

## 🐛 Common Issues & Solutions

### Asset Loading Issues
**Problem:** Images not showing on GitHub Pages
**Solution:** Import images as modules instead of using absolute paths
```typescript
// ❌ Wrong
src="/image.png"

// ✅ Correct
import image from '/image.png'
src={image}
```

### TypeScript Build Errors
**Problem:** Module not exported errors
**Solution:** Add proper type exports in store modules
```typescript
// Add to store files
export type { AppId, WindowState } from '../types';
```

### GitHub Actions Permission Errors
**Problem:** 403 errors during deployment
**Solution:** Use official GitHub Actions with proper permissions
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## 📚 Development Notes

### Code Style Guidelines
- Use functional components with hooks
- Implement proper TypeScript types (no `any`)
- Follow React best practices for performance
- Use semantic HTML and ARIA labels for accessibility
- Implement responsive design patterns

### State Management Patterns
- Zustand for global application state
- React state for component-local state
- Custom hooks for reusable stateful logic
- Props for component communication

### Animation Guidelines
- Use Framer Motion for complex animations
- CSS transforms for simple hover effects
- Hardware acceleration for smooth performance
- Respect user's motion preferences

## 🔐 Security Considerations

- No sensitive data exposed in client code
- All external resources loaded securely (HTTPS)
- CSP-friendly implementation (no inline scripts)
- Proper iframe sandbox attributes for embedded content

## 📈 Future Enhancements

### Potential Improvements
- [ ] Add more interactive applications
- [ ] Implement theme switching (light/dark)
- [ ] Add keyboard shortcuts system
- [ ] Mobile responsive optimizations
- [ ] PWA features (offline support)
- [ ] Analytics integration
- [ ] SEO optimizations

### Technical Debt
- [ ] Add comprehensive test coverage
- [ ] Implement error boundaries
- [ ] Add performance monitoring
- [ ] Set up automated dependency updates

---

**Last Updated:** December 2024
**Deployment Status:** ✅ Production Ready
**Build Status:** ✅ Passing All Checks