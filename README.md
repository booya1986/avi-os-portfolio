# Avi Levi Portfolio

A modern, interactive portfolio featuring innovative projects and creative implementations.

![Portfolio Preview](./avi-os/public/wallpaper.jpg)

## 🚀 Projects

### AVI-OS - Browser Operating System
A complete desktop operating system experience running in the browser with professional-grade applications and authentic macOS-style interface.

**🎯 Core Features:**
- 🍎 **Authentic macOS Dock**: Glass morphism with proper hover magnification and lift animations
- 🪟 **Advanced Window Management**: Drag, resize, minimize, maximize with proper state restoration
- 🎨 **Professional Icon System**: Custom PNG icons with perfect scaling and alignment
- ⚡ **60fps Animations**: Hardware-accelerated transforms with optimized performance

**📱 Integrated Applications:**
- 📺 **TV App**: Immersive retro television with working YouTube channel integration
- 🌐 **Browser App**: Embedded web browsing with your personal blog (avilevi.co.il)
- 📝 **Sticky Notes**: Realistic yellow notes with character counter and clear functionality  
- 🎧 **iPod Podcast Player**: Authentic iPod design with Spotify integration for episode browsing

**🎨 Design Excellence:**
- **Glassmorphism UI**: Advanced backdrop blur with realistic lighting effects
- **Icon Consistency**: All apps use 54px custom PNG icons with unified hover behavior
- **Authentic Interactions**: True-to-platform animations and feedback
- **Clean Interface**: Production-ready with no debug elements

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Custom Animations

📁 **[View Project](./avi-os/)** | 🌐 **[Live Demo](#)** | 📖 **[Documentation](./docs/planning.md)**

## 🛠️ Development

### Quick Start
```bash
# Navigate to project
cd avi-os

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript validation

## 📁 Repository Structure

```
portfolio/
├── avi-os/                    # Main browser-OS project
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── constants/         # App configurations
│   │   ├── hooks/             # Custom React hooks
│   │   ├── store/             # Zustand state management
│   │   ├── types/             # TypeScript definitions
│   │   └── utils/             # Utility functions
│   ├── public/                # Static assets
│   ├── package.json           # Dependencies & scripts
│   └── README.md             # Project documentation
├── docs/                      # Documentation
│   └── planning.md           # Project planning & status
├── .github/                   # GitHub configuration
│   └── workflows/            # CI/CD workflows
└── README.md                 # Repository overview
```

## 🎨 Design Philosophy

This portfolio showcases:
- **Innovation**: Creative implementations of familiar interfaces
- **Performance**: Optimized for 60fps animations and smooth interactions  
- **Accessibility**: Full keyboard navigation and screen reader support
- **Modern Tech**: Latest React patterns, TypeScript, and build tools
- **User Experience**: Intuitive, playful, and engaging interactions

## 🌐 Deployment

### Production Build
```bash
cd avi-os
npm run build
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## 🤝 Contact

**Avi Levi**
- 📺 [YouTube Channel](https://www.youtube.com/@avilevi86)
- 💼 [LinkedIn](#)
- 🐙 [GitHub](#)
- 📧 [Email](#)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ using React, TypeScript, and modern web technologies*