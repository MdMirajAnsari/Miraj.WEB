# Miraj Portfolio - Angular Version

This is the Angular conversion of Mohammad Miraj's portfolio website, originally built with React.

## 🚀 Tech Stack

- **Angular 19** - Modern web framework
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **SCSS** - Enhanced styling capabilities
- **Three.js** - 3D graphics and animations (planned)
- **EmailJS** - Contact form functionality
- **Particles.js** - Interactive background effects (planned)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          # Navigation component
│   │   ├── hero/            # Hero section with intro
│   │   ├── about/           # About section with services
│   │   ├── tech/            # Technologies showcase
│   │   ├── projects/        # Projects portfolio
│   │   ├── experience/      # Work experience timeline
│   │   └── contact/         # Contact form
│   ├── services/
│   │   ├── constants.service.ts    # App constants and data
│   │   └── email.service.ts        # Email functionality
│   ├── app.component.*             # Root component
│   └── main.ts                     # Application bootstrap
├── assets/                         # Images and static files
│   ├── backgrounds/
│   ├── company/
│   ├── icons/
│   ├── projects/
│   └── tech/
└── styles.scss                    # Global styles with TailwindCSS
```

## 🎨 Components Overview

### Navigation Component
- Responsive navigation with mobile menu
- Smooth scroll to sections
- External blog link integration

### Hero Component
- Animated scroll indicator
- Professional introduction
- Background world map

### About Component
- Service cards display
- Professional summary
- Hover animations

### Tech Component
- Technology stack showcase (placeholder)
- Interactive technology icons (planned)

### Projects Component
- Portfolio project showcase (placeholder)
- Project cards with links (planned)

### Experience Component
- Work experience timeline (placeholder)
- Company logos and descriptions (planned)

### Contact Component
- Contact form integration (placeholder)
- EmailJS service integration (planned)

## 🛠️ Services

### Constants Service
- Centralized data management
- TypeScript interfaces for type safety
- Navigation links, services, technologies, experiences, and projects data

### Email Service
- EmailJS integration for contact forms
- Type-safe email interfaces
- Error handling and user feedback

## 🎭 Styling Approach

### TailwindCSS Integration
- Utility-first CSS framework
- Custom color scheme (primary, secondary, tertiary)
- Responsive design utilities
- Custom component classes

### Custom CSS Classes
- `.nav-links` - Navigation hover effects
- `.glassmorphism` - Glass-like effects
- `.card-shadow` - Consistent card styling
- `.hero-heading` - Typography styling
- `.canvas-loader` - Loading animations

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation menu
- Flexible grid layouts
- Optimized for all screen sizes

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Angular CLI

### Installation
```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test
```

### Environment Configuration
- Update EmailJS credentials in `email.service.ts`
- Configure asset paths as needed
- Customize TailwindCSS theme in `tailwind.config.js`

## 🎯 Conversion Status

### ✅ Completed
- [x] Project structure and configuration
- [x] Component architecture setup
- [x] Services implementation
- [x] Basic component templates
- [x] TailwindCSS integration
- [x] Asset organization
- [x] TypeScript type safety

### 🚧 In Progress / Planned
- [ ] 3D canvas components (Three.js integration)
- [ ] Animation system (equivalent to framer-motion)
- [ ] Particle background effects
- [ ] Complete component implementations
- [ ] Contact form functionality
- [ ] Timeline component for experience
- [ ] Project showcase with filtering
- [ ] Performance optimizations

## 🔄 Migration Notes

### Key Differences from React Version
1. **State Management**: Using Angular services instead of React hooks
2. **Component Communication**: Angular dependency injection vs React props
3. **Styling**: Same TailwindCSS classes but with Angular directives
4. **Animations**: Will use Angular Animations API instead of framer-motion
5. **Routing**: Angular Router (not implemented yet) vs React Router

### Component Equivalents
- React JSX → Angular Templates with directives
- React hooks → Angular lifecycle methods and signals
- React Context → Angular Services with dependency injection
- React Router → Angular Router (planned)

## 📈 Performance Considerations

- Lazy loading for route-based components
- OnPush change detection strategy
- Optimized bundle splitting
- Asset optimization and compression
- Tree-shaking for unused code elimination

## 🎨 Design System

### Color Palette
- Primary: `#3498db` (Blue)
- Secondary: `#2c3e50` (Dark Blue-Gray)
- Tertiary: `#f5f5f5` (Light Gray)

### Typography
- Headings: Poppins font family
- Body: Roboto font family
- Monospace: System monospace stack

### Animation Principles
- Smooth transitions (0.3s ease)
- Subtle hover effects
- Loading state animations
- Scroll-triggered animations (planned)

## 🚀 Deployment

The application can be deployed to various platforms:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

Build command: `ng build --configuration production`

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

## 📞 Contact

- **Mohammad Miraj**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]
- Email: [Your Email]

---

*This Angular version maintains the design and functionality of the original React portfolio while leveraging Angular's enterprise-grade features and TypeScript's type safety.*