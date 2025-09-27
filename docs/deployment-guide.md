# Deployment Guide - AVI-OS Portfolio

Complete guide for deploying the AVI-OS Interactive Portfolio to various hosting platforms.

## 🚀 **Current Deployment**

**Live Site**: https://booya1986.github.io/avi-os-portfolio/
**Status**: ✅ Automatically deployed via GitHub Actions
**Last Updated**: December 2024

## 🛠️ **GitHub Pages (Current Setup)**

### Automatic Deployment
The repository is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** triggers GitHub Actions workflow
2. **Quality checks** run (TypeScript, ESLint, build verification)
3. **Production build** created with Vite
4. **Deployment** to GitHub Pages automatically

### Manual GitHub Pages Setup
If you need to reconfigure GitHub Pages:

1. Go to repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Save settings
4. Push to main branch to trigger deployment

### Workflow Configuration
The deployment workflow is in `.github/workflows/deploy.yml`:

```yaml
# Key features:
- Automated dependency installation
- TypeScript and ESLint validation
- Production build with asset optimization
- Deployment to gh-pages branch
```

## 🌐 **Alternative Deployment Options**

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from avi-os directory
cd avi-os
vercel --prod

# Follow prompts for configuration
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd avi-os
npm run build
netlify deploy --prod --dir=dist
```

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "cd avi-os && npm run build"
  publish = "avi-os/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Configure firebase.json
{
  "hosting": {
    "public": "avi-os/dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

# Deploy
cd avi-os && npm run build
firebase deploy
```

## 🔧 **Build Configuration**

### Production Build
```bash
cd avi-os
npm run build
```

**Build Output**:
- `dist/` folder contains optimized production files
- Assets are optimized and compressed
- Bundle is split for optimal loading
- Source maps are excluded for smaller size

### Environment Variables
For different deployment environments:

```bash
# Development
NODE_ENV=development npm run dev

# Production
NODE_ENV=production npm run build
```

### Asset Optimization
The build process automatically:
- ✅ Compresses images and assets
- ✅ Minifies JavaScript and CSS
- ✅ Generates optimized bundle splits
- ✅ Applies proper base paths for subdirectory deployment

## 🛡️ **Security & Performance**

### Content Security Policy
Add CSP headers for enhanced security:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               img-src 'self' data: https:;
               media-src 'self' https:;
               script-src 'self' 'unsafe-inline';
               style-src 'self' 'unsafe-inline';">
```

### Performance Optimizations
- **Asset Preloading**: Critical resources loaded first
- **Code Splitting**: JavaScript bundles split by route
- **Image Optimization**: WebP format where supported
- **Caching**: Static assets cached for 1 year

## 🔍 **Monitoring & Analytics**

### Adding Analytics
To add Google Analytics or similar:

```typescript
// In main.tsx or App.tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Performance Monitoring
Consider adding:
- **Lighthouse CI** for performance tracking
- **Sentry** for error monitoring
- **LogRocket** for user session replay

## 🐛 **Common Deployment Issues**

### Asset Loading Problems
**Problem**: Images/assets not loading in production
**Solution**: Use import statements instead of absolute paths

```typescript
// ❌ Don't use absolute paths
<img src="/image.png" />

// ✅ Import as modules
import image from '/image.png';
<img src={image} />
```

### Build Failures
**Problem**: Build fails in CI/CD
**Solutions**:
1. Clear dependency cache: `rm -rf node_modules package-lock.json`
2. Check TypeScript errors: `npm run type-check`
3. Fix ESLint issues: `npm run lint:fix`

### Routing Issues
**Problem**: 404 errors on direct URL access
**Solution**: Configure server redirects to `index.html`

### Base Path Issues
**Problem**: Assets not loading in subdirectory deployment
**Solution**: Check `vite.config.ts` base path configuration

## 📊 **Deployment Checklist**

Before deploying:
- [ ] Run `npm run type-check` (no TypeScript errors)
- [ ] Run `npm run lint` (no ESLint errors)
- [ ] Run `npm run build` (successful build)
- [ ] Test locally with `npm run preview`
- [ ] Verify all assets load correctly
- [ ] Check responsive design on mobile
- [ ] Test all interactive features
- [ ] Verify external links work
- [ ] Check console for errors

## 🔄 **Rollback Strategy**

If deployment issues occur:

1. **GitHub Pages**: Revert commit in git history
2. **Vercel**: Use Vercel dashboard to rollback
3. **Netlify**: Deploy previous build from dashboard
4. **Firebase**: Use `firebase hosting:clone` command

## 📚 **Resources**

- **GitHub Actions**: [Official Documentation](https://docs.github.com/en/actions)
- **Vite Deployment**: [Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- **Repository**: [https://github.com/booya1986/avi-os-portfolio](https://github.com/booya1986/avi-os-portfolio)

---

**Need Help?** Check the [CLAUDE.md](../CLAUDE.md) technical documentation or [planning.md](./planning.md) for development context.