# Netsanet Portfolio - Complete Code Documentation

## 📋 Project Overview

This is a modern, fully-featured portfolio website built with:
- **Frontend**: React 18 + TypeScript + Tailwind CSS + SCSS
- **Backend**: PHP 8+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + SCSS Modules + CSS Animations

## 🚀 Key Features

### ✨ Animated Navbar
- **Navigation Items**: Home, About, Projects, Contact
- **Search Bar**: Real-time search functionality
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Scroll Detection**: Header changes appearance on scroll
- **Smooth Scrolling**: Anchor link navigation

### 💫 Animated Name Display
The name "Netsanet Worku" features:
- **Gradient Background**: Blue gradient that shifts smoothly
- **Glow Effect**: CSS animation for glowing text
- **Responsive**: Adjusts size based on screen width

CSS Animations Used:
```css
.animated-name {
  background: linear-gradient(45deg, #3B82F6, #1D4ED8, #3B82F6);
  animation: gradientShift 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.animated-name.glow {
  animation: glow 2s ease-in-out infinite;
}
```

## 📁 Project Structure

```
netsanet-portfolio/
├── public/
│   ├── images/           # Portfolio images
│   └── documents/        # Resume and documents
├── src/
│   ├── components/
│   │   ├── Navbar/       # NEW: Modern navbar component
│   │   ├── Header/       # Legacy header (can be removed)
│   │   ├── Home/         # Hero section with animations
│   │   ├── Projects/     # Projects showcase
│   │   ├── Skills/       # Skills display
│   │   ├── Experience/   # Work experience & education
│   │   ├── Contact/      # Contact form
│   │   └── Gallery/      # Image gallery
│   ├── data/             # Static data files
│   ├── styles/
│   │   ├── global.scss   # NEW: Global styles + animations
│   │   ├── index.scss
│   │   ├── animations.scss
│   │   ├── themes.scss
│   │   ├── utilities.scss
│   │   └── variables.scss
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── backend/
│   └── api.php           # NEW: PHP backend API
├── tailwind.config.js    # NEW: Tailwind configuration
├── postcss.config.js     # NEW: PostCSS configuration
├── vite.config.ts
├── tsconfig.json
├── package.json
└── index.html
```

## 🎨 Available CSS Animations

### Global Animations
1. **fadeIn** - Smooth fade-in effect
2. **slideIn** - Slide from left with fade
3. **slideInRight** - Slide from right with fade
4. **slideUp** - Slide up from bottom
5. **typewriter** - Typewriter effect
6. **float** - Floating motion (used on profile image)
7. **glow** - Glowing text effect (used on name)
8. **wave** - Wave motion effect
9. **shimmer** - Shimmer/shine effect
10. **gradientShift** - Animated gradient background
11. **pulse** - Pulsing opacity effect

### Tailwind Animation Classes
- `animate-fadeIn`
- `animate-slideIn`
- `animate-slideInRight`
- `animate-slideUp`
- `animate-float`
- `animate-glow`
- `animate-wave`
- `animate-shimmer`
- `animate-gradientShift`
- `animate-pulse`

## 🔧 Component Guide

### Navbar Component (`src/components/Navbar/Navbar.tsx`)

```tsx
<Navbar />
```

**Features:**
- Fixed position at top
- Transparent gradient on initial scroll, white background when scrolled
- Desktop: Full navigation + search bar
- Mobile: Hamburger menu + search icon
- Smooth scroll to sections
- Search functionality

**Navigation Items:**
- Home
- About
- Projects
- Contact

### Home Component (`src/components/Home/Home.tsx`)

**Features:**
- Hero section with animated profile image
- Animated name with gradient and glow effect
- Professional headline
- Description
- Tech stack badges
- Call-to-action buttons
- Social media links
- Scroll indicator

### Global Styles (`src/styles/global.scss`)

Includes:
- All CSS animations
- Button styles (.btn, .btn-primary, etc.)
- Card styles with hover effects
- Responsive utilities
- Theme variables

## 🌐 Backend API (`backend/api.php`)

### Endpoints

#### 1. Contact Form
**POST** `/backend/api.php?route=contact`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

Response:
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your message here",
    "timestamp": "2024-01-16 10:30:00"
  }
}
```

#### 2. Get Portfolio Data
**GET** `/backend/api.php?route=portfolio`

Response:
```json
{
  "name": "Netsanet Worku",
  "title": "Full-Stack Developer",
  "university": "Madda Walabu University",
  "year": "Third Year",
  "field": "Computer Science",
  "social": {
    "tiktok": "https://tiktok.com/@netsanet.worku",
    "telegram": "https://t.me/Abi_yam21",
    "github": "https://github.com/NetsanetWorku"
  }
}
```

#### 3. Get Projects
**GET** `/backend/api.php?route=projects`

Returns array of projects with:
- id, title, description, technologies, link, image

#### 4. Get Skills
**GET** `/backend/api.php?route=skills`

Returns skills grouped by category:
- Frontend, Backend, Database, Tools

## 🎯 Usage Instructions

### Installation

```bash
# Install dependencies
npm install

# Install Tailwind CSS (if not in package.json)
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind (if needed)
npx tailwindcss init -p
```

### Development

```bash
# Start development server
npm run dev

# The site will be available at http://localhost:5173
```

### Build for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## 🔐 PHP Configuration

For the PHP backend to work:

1. **Ensure PHP is installed** on your server
2. **Update API endpoint** in your React components:
   ```jsx
   const response = await fetch('/backend/api.php?route=contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(contactData)
   });
   ```
3. **File permissions**: Make sure `contact_log.json` can be written to

## 🎨 Tailwind CSS Configuration

### Customized Animations
The `tailwind.config.js` includes custom animations:

```js
animation: {
  'slide-in': 'slideIn 0.8s ease-out',
  'fade-in': 'fadeIn 0.6s ease-out',
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite',
  'wave': 'wave 1.5s ease-in-out infinite',
}
```

### Colors
```js
colors: {
  primary: '#1F2937',
  secondary: '#9CA3AF',
  accent: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components use Tailwind's responsive prefixes:
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

## 🛠️ Technologies Stack

**Frontend:**
- React 18.2.0
- TypeScript 5.9.3
- Tailwind CSS 3.4.1
- SCSS 1.77.0
- Vite 5.4.21

**Backend:**
- PHP 8+
- REST API

**Development:**
- Jest (Testing)
- ESLint (Linting)
- Autoprefixer (CSS compatibility)

## 📚 File Descriptions

### Key Files

| File | Purpose |
|------|---------|
| `src/components/Navbar/Navbar.tsx` | Main navigation component |
| `src/components/Home/Home.tsx` | Hero/landing section |
| `src/styles/global.scss` | Global styles and animations |
| `tailwind.config.js` | Tailwind customization |
| `backend/api.php` | PHP API endpoints |
| `src/App.tsx` | Root application component |

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [PHP Official](https://www.php.net/)

## 🚀 Deployment

### Vercel (Recommended for React)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Deploy dist folder to gh-pages branch
```

### Traditional Server (with PHP)
1. Build React app: `npm run build`
2. Upload `dist/` folder to web server
3. Upload `backend/` folder with PHP support
4. Update API endpoint in components

## 📞 Support

For questions or issues, please refer to the documentation in each component or contact through the portfolio contact form.

---

**Created**: January 16, 2026  
**Developer**: Netsanet Worku  
**University**: Madda Walabu University  
**Location**: Asela, Ethiopia
