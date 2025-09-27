# AVI-OS Homepage Integration: Wireframes & Implementation Specs

## 🎯 **Overview**
Detailed wireframes and technical specifications for integrating AVI-OS portfolio as a hero section on avilevi.co.il homepage with progressive disclosure UX pattern.

---

## 📱 **Desktop Wireframes**

### **Homepage Hero Section - Desktop (1200px+)**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Logo]                    [Navigation: Home | Blog | About | Contact]       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─ HERO PORTFOLIO SECTION ─────────────────────────────────────────────────┐ │
│  │                                                                          │ │
│  │  📺 "חווה את מערכת ההפעלה שלי בדפדפן"                                    │ │
│  │     "Experience My Browser-Based Operating System"                      │ │
│  │                                                                          │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │              │  │              │  │              │  │              │ │
│  │  │   📺 TV App  │  │ 🌐 Browser   │  │ 📝 Notes     │  │ 🎧 iPod     │ │
│  │  │  Screenshot  │  │  Screenshot  │  │  Screenshot  │  │  Screenshot  │ │
│  │  │              │  │              │  │              │  │              │ │
│  │  │ "YouTube TV" │  │ "Blog View"  │  │ "Sticky Note"│  │ "Podcasts"   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │                                                                          │ │
│  │                    ⚡ Key Features Grid ⚡                               │ │
│  │    🍎 Authentic macOS Interface  |  ⚡ 60fps Animations                 │ │
│  │    🪟 Advanced Window Management |  🎨 Glassmorphism Design             │ │
│  │                                                                          │ │
│  │  ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────┐ │ │
│  │  │  🚀 Launch AVI-OS   │  │   📖 Read About     │  │  📺 Watch Demo   │ │ │
│  │  │    (Primary CTA)    │  │   (Secondary CTA)   │  │   (Tertiary CTA) │ │ │
│  │  └─────────────────────┘  └─────────────────────┘  └──────────────────┘ │ │
│  │                                                                          │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  [Rest of homepage content continues below...]                              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### **Modal Overlay - Desktop**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ FULL SCREEN MODAL OVERLAY                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  ┌───┐                                                                   [✕] │
│  │🏠 │ avilevi.co.il/portfolio                                              │
│  └───┘                                                                       │
│                                                                              │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                          │ │
│ │                      FULL AVI-OS PORTFOLIO                               │ │
│ │                                                                          │ │
│ │  ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │  │ [Background Image]                                               │ │ │
│ │  │                                                                     │ │ │
│ │  │                     [Windows if any open]                          │ │ │
│ │  │                                                                     │ │ │
│ │  │                                                                     │ │ │
│ │  │  ┌─────┬─────┬─────┬─────┬─────┐                                   │ │ │
│ │  │  │ 📺  │ 🌐  │ 📝  │ 🎧  │ ⚙️  │ ← macOS-style dock              │ │ │
│ │  │  └─────┴─────┴─────┴─────┴─────┘                                   │ │ │
│ │  └─────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                          │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 **Mobile Wireframes**

### **Homepage Hero Section - Mobile (320px-768px)**

```
┌─────────────────────────────┐
│ [☰] [Logo]           [Search] │
├─────────────────────────────┤
│                             │
│ ┌─ PORTFOLIO HERO ─────────┐ │
│ │                         │ │
│ │ 📺 "הפורטפוליו שלי"       │ │
│ │   "My Interactive"      │ │
│ │   "Portfolio"           │ │
│ │                         │ │
│ │ ┌─────────────────────┐ │ │
│ │ │                     │ │ │
│ │ │   [App Screenshots  │ │ │
│ │ │    Carousel/Swiper] │ │ │
│ │ │                     │ │ │
│ │ │  TV → Browser →     │ │ │
│ │ │  Notes → iPod       │ │ │
│ │ └─────────────────────┘ │ │
│ │                         │ │
│ │ "4 Professional Apps"   │ │
│ │ "60fps Desktop OS"      │ │
│ │                         │ │
│ │ ┌─────────────────────┐ │ │
│ │ │  📱 View Gallery    │ │ │
│ │ └─────────────────────┘ │ │
│ │ ┌─────────────────────┐ │ │
│ │ │ 🖥️ Open on Desktop │ │ │
│ │ └─────────────────────┘ │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ [Rest of content...]        │
│                             │
└─────────────────────────────┘
```

### **Mobile Gallery Modal**

```
┌─────────────────────────────┐
│ Portfolio Gallery      [✕] │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │    📺 TV Application    │ │
│ │   [Screenshot/Video]    │ │
│ │                         │ │
│ │ "Interactive retro TV   │ │
│ │ with YouTube channel    │ │
│ │ integration"            │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ [• • • •] ← Pagination      │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🖥️ View Full Desktop   │ │
│ │    Experience          │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
```

---

## 🎨 **Visual Design Specifications**

### **Color Palette**
```css
/* Primary Portfolio Colors */
--portfolio-primary: #007AFF;      /* iOS Blue */
--portfolio-secondary: #5856D6;    /* iOS Purple */
--portfolio-accent: #FF3B30;       /* iOS Red */

/* Glass Morphism */
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

/* WordPress Theme Integration */
--wp-text-primary: var(--theme-text-color);
--wp-background: var(--theme-background);
```

### **Typography Scale**
```css
/* Hero Headlines */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(135deg, #007AFF, #5856D6);
  -webkit-background-clip: text;
  color: transparent;
}

/* Feature Text */
.feature-text {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--wp-text-primary);
}

/* CTA Buttons */
.cta-primary {
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1rem 2rem;
}
```

### **Animation Specifications**
```css
/* Hover Effects */
.app-preview:hover {
  transform: translateY(-8px) scale(1.02);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Button Interactions */
.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 122, 255, 0.3);
  transition: all 0.2s ease-out;
}

/* Modal Animations */
.modal-enter {
  opacity: 0;
  transform: scale(0.95);
}
.modal-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## ⚙️ **Technical Implementation Specs**

### **React Component Structure**
```typescript
components/
├── PortfolioHero/
│   ├── PortfolioHero.tsx           // Main hero component
│   ├── AppPreviewGrid.tsx          // App screenshots grid
│   ├── FeatureList.tsx             // Key features display
│   ├── CTAButtons.tsx              // Call-to-action buttons
│   └── PortfolioModal.tsx          // Full portfolio modal
├── MobileGallery/
│   ├── MobileGallery.tsx           // Mobile gallery modal
│   ├── AppCarousel.tsx             // Swipeable app carousel
│   └── GalleryModal.tsx            // Mobile modal wrapper
└── hooks/
    ├── useViewport.tsx             // Responsive breakpoints
    ├── usePortfolioModal.tsx       // Modal state management
    └── useLazyLoading.tsx          // Performance optimization
```

### **WordPress Integration Points**
```php
// functions.php additions
function enqueue_portfolio_assets() {
    if (is_front_page()) {
        wp_enqueue_script(
            'portfolio-hero',
            get_template_directory_uri() . '/assets/portfolio-hero.js',
            array('react', 'react-dom'),
            '1.0.0',
            true
        );

        wp_enqueue_style(
            'portfolio-hero-styles',
            get_template_directory_uri() . '/assets/portfolio-hero.css',
            array(),
            '1.0.0'
        );
    }
}
add_action('wp_enqueue_scripts', 'enqueue_portfolio_assets');

// Homepage template modification
function inject_portfolio_hero($content) {
    if (is_front_page()) {
        $portfolio_hero = '<div id="portfolio-hero-root"></div>';
        return $portfolio_hero . $content;
    }
    return $content;
}
add_filter('the_content', 'inject_portfolio_hero');
```

### **Performance Optimization**
```typescript
// Lazy loading strategy
const PortfolioModal = lazy(() =>
  import('./components/PortfolioModal').then(module => ({
    default: module.PortfolioModal
  }))
);

// Image optimization
const AppScreenshot = ({ src, alt, ...props }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    {...props}
  />
);

// Bundle splitting
const portfolioConfig = {
  splitChunks: {
    chunks: 'async',
    cacheGroups: {
      portfolioVendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'portfolio-vendor',
        chunks: 'all',
      },
    },
  },
};
```

---

## 📐 **Responsive Breakpoints**

### **Breakpoint Strategy**
```css
/* Mobile First Approach */
.portfolio-hero {
  /* Base styles for mobile */
}

@media (min-width: 640px) {
  /* Tablet portrait */
  .portfolio-hero {
    padding: 3rem 2rem;
  }
}

@media (min-width: 768px) {
  /* Tablet landscape */
  .portfolio-hero {
    padding: 4rem 3rem;
  }
}

@media (min-width: 1024px) {
  /* Desktop */
  .portfolio-hero {
    padding: 6rem 4rem;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1280px) {
  /* Large desktop */
  .portfolio-hero {
    padding: 8rem 6rem;
  }
}
```

### **Content Adaptation Rules**
```typescript
const useResponsiveContent = () => {
  const [viewport, setViewport] = useState<ViewportSize>('mobile');

  const contentConfig = {
    mobile: {
      showApps: 2,
      ctaLayout: 'stacked',
      heroLayout: 'vertical'
    },
    tablet: {
      showApps: 4,
      ctaLayout: 'horizontal',
      heroLayout: 'vertical'
    },
    desktop: {
      showApps: 4,
      ctaLayout: 'horizontal',
      heroLayout: 'horizontal'
    }
  };

  return contentConfig[viewport];
};
```

---

## 🎯 **Interaction Specifications**

### **Desktop Interactions**
```typescript
// App preview hover effects
const AppPreview = ({ app }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`app-preview ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openAppModal(app)}
    >
      <img src={app.screenshot} alt={app.name} />
      <div className="app-info">
        <h3>{app.name}</h3>
        <p>{app.description}</p>
      </div>
      {isHovered && (
        <div className="preview-overlay">
          <button>Quick Preview</button>
        </div>
      )}
    </div>
  );
};

// Modal launch interaction
const useLaunchPortfolio = () => {
  const openPortfolio = () => {
    // Track analytics
    gtag('event', 'portfolio_launch', {
      event_category: 'engagement',
      event_label: 'hero_section'
    });

    // Open modal with animation
    setModalOpen(true);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  return { openPortfolio };
};
```

### **Mobile Interactions**
```typescript
// Touch-friendly carousel
const AppCarousel = ({ apps }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex(prev =>
      prev < apps.length - 1 ? prev + 1 : prev
    ),
    onSwipedRight: () => setCurrentIndex(prev =>
      prev > 0 ? prev - 1 : prev
    ),
    trackMouse: true
  });

  return (
    <div {...swipeHandlers} className="app-carousel">
      {apps.map((app, index) => (
        <div
          key={app.id}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
        >
          <AppPreview app={app} />
        </div>
      ))}
    </div>
  );
};
```

---

## 📊 **Analytics & Tracking**

### **Event Tracking Setup**
```typescript
// Portfolio engagement events
const trackPortfolioEvent = (action: string, details?: object) => {
  gtag('event', action, {
    event_category: 'portfolio',
    event_label: 'homepage_hero',
    ...details
  });
};

// Key events to track
const events = {
  heroView: () => trackPortfolioEvent('hero_view'),
  appPreviewHover: (appName: string) =>
    trackPortfolioEvent('app_preview_hover', { app_name: appName }),
  ctaClick: (ctaType: string) =>
    trackPortfolioEvent('cta_click', { cta_type: ctaType }),
  modalOpen: () => trackPortfolioEvent('portfolio_modal_open'),
  modalClose: () => trackPortfolioEvent('portfolio_modal_close'),
  mobileGalleryOpen: () => trackPortfolioEvent('mobile_gallery_open')
};
```

### **Performance Monitoring**
```typescript
// Core Web Vitals tracking
const trackWebVitals = () => {
  // Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lcp = entries[entries.length - 1];
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      metric_name: 'LCP',
      metric_value: Math.round(lcp.startTime)
    });
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // First Input Delay
  new PerformanceObserver((list) => {
    const fid = list.getEntries()[0];
    gtag('event', 'web_vitals', {
      event_category: 'performance',
      metric_name: 'FID',
      metric_value: Math.round(fid.processingStart - fid.startTime)
    });
  }).observe({ entryTypes: ['first-input'] });
};
```

---

## 🚀 **Implementation Timeline**

### **Phase 1: Foundation (2-3 days)**
- [ ] Create React component structure
- [ ] Build responsive layouts
- [ ] Implement basic interactions
- [ ] Set up WordPress integration points

### **Phase 2: Content & Assets (1-2 days)**
- [ ] Create app screenshots/videos
- [ ] Write Hebrew/English copy
- [ ] Design CTA buttons and graphics
- [ ] Optimize images and assets

### **Phase 3: Advanced Features (2-3 days)**
- [ ] Build modal functionality
- [ ] Implement mobile gallery
- [ ] Add animations and transitions
- [ ] Performance optimization

### **Phase 4: Integration & Testing (1-2 days)**
- [ ] WordPress theme integration
- [ ] Cross-device testing
- [ ] Analytics implementation
- [ ] SEO optimization

### **Phase 5: Launch & Monitor (1 day)**
- [ ] Production deployment
- [ ] Performance monitoring
- [ ] User behavior analysis
- [ ] Iterative improvements

---

*Total estimated timeline: 7-11 days for complete implementation*
*This document serves as the complete specification for homepage portfolio integration*