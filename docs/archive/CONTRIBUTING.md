# Contributing to Avi Levi Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines for contributing.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Setup
```bash
# Clone the repository
git clone https://github.com/avilevi/portfolio.git
cd portfolio

# Install all dependencies
npm run install:all

# Start development server
npm run dev
```

## 📁 Project Structure

This is a workspace-based monorepo structure:

```
portfolio/
├── avi-os/           # Main browser-OS application
├── docs/             # Documentation
├── .github/          # GitHub workflows and templates
└── package.json      # Root workspace configuration
```

## 🛠️ Development Workflow

### Making Changes
1. **Create a feature branch**: `git checkout -b feature/amazing-feature`
2. **Make your changes**: Follow the code style and patterns
3. **Test your changes**: Run `npm run type-check` and `npm run lint`
4. **Commit your changes**: Use descriptive commit messages
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**: Include detailed description

### Code Style
- **TypeScript**: All new code should use TypeScript
- **ESLint**: Code must pass linting (`npm run lint`)
- **Prettier**: Code will be auto-formatted
- **Naming**: Use camelCase for variables, PascalCase for components

### Commit Messages
Use descriptive commit messages following this pattern:
```
type(scope): description

Examples:
feat(ui): add new window animation
fix(store): resolve state update issue
docs(readme): update installation instructions
```

## 🎨 Adding New Features

### Adding New Apps to AVI-OS
1. **Define types** in `src/types/index.ts`
2. **Add configuration** in `src/constants/apps.ts`
3. **Create component** in `src/components/`
4. **Update app registry** in `App.tsx`
5. **Add to right rail** in `RightRail.tsx`

### UI Guidelines
- Follow Vision Pro glass aesthetic
- Use Tailwind utility classes
- Implement smooth Framer Motion animations
- Ensure keyboard accessibility
- Test on multiple browsers

## 🧪 Testing

### Before Submitting
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Preview build
npm run preview
```

### Browser Testing
Test in:
- Chrome/Edge (full support)
- Safari (full support)
- Firefox (graceful fallback)

## 📝 Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update type definitions
- Include examples in documentation

## 🚀 Deployment

The project automatically deploys via GitHub Actions:
- **Staging**: Deployed on every PR
- **Production**: Deployed on merge to main

## 🤝 Code Review

All contributions require code review:
- Code follows project patterns
- TypeScript types are properly defined
- Animations are smooth and performant
- Accessibility standards are met
- Documentation is updated

## 🐛 Reporting Issues

When reporting issues:
1. Use the issue templates
2. Include browser and OS information
3. Provide steps to reproduce
4. Include screenshots/videos if applicable

## 📞 Getting Help

- Open an issue for bug reports
- Start a discussion for feature requests
- Check existing documentation first

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing to make this portfolio even better! 🎉