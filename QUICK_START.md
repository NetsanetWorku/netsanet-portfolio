# 🚀 Quick Start Guide - Netsanet Portfolio

## What's Been Added

### ✨ New Components
1. **Navbar Component** - Modern, responsive navigation with search
2. **Enhanced Home Component** - Hero section with animations
3. **Global Styles** - Tailwind CSS + CSS animations

### 🎨 New Technologies
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **PHP Backend** - API for contact forms and data

### 📱 Features
- Animated name with gradient and glow effect
- Responsive navbar (Desktop + Mobile)
- Search functionality
- Smooth scroll navigation
- Tech stack badges
- Social media links
- PHP backend API for contact forms

---

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
cd /workspaces/netsanet-portfolio
npm install
```

### 2. Install Tailwind CSS (if not already installed)

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🎯 File Structure

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx         (NEW - Main navbar)
│   │   └── index.ts           (NEW - Export)
│   ├── Home/
│   │   └── Home.tsx           (UPDATED - Tailwind CSS)
│   └── ... (other components)
├── styles/
│   ├── global.scss            (NEW - Global + animations)
│   ├── CSS_ANIMATIONS_GUIDE.css (NEW - Animation reference)
│   └── ... (other styles)
├── App.tsx                    (UPDATED - Uses Navbar)
└── main.tsx                   (UPDATED - Uses global.scss)

backend/
└── api.php                    (NEW - Backend API)

Configuration Files:
├── tailwind.config.js         (NEW - Tailwind config)
├── postcss.config.js          (NEW - PostCSS config)
└── ... (existing config files)
```

---

## 🎨 Key CSS Animations

### 1. Animated Name (Gradient + Glow)

```html
<h1 class="animated-name glow">Netsanet Worku</h1>
```

**CSS:**
```css
.animated-name {
  background: linear-gradient(45deg, #3B82F6, #1D4ED8, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

.animated-name.glow {
  animation: glow 2s ease-in-out infinite, gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
  50% { text-shadow: 0 0 20px rgba(59, 130, 246, 1); }
}
```

### 2. Fade In Effect

```html
<div class="animate-fadeIn">Content</div>
```

### 3. Slide In Effect

```html
<div class="animate-slideIn">Content</div>
```

### 4. Float Animation (Profile Image)

```html
<img class="animate-float" src="profile.jpg" />
```

### 5. Wave Animation

```html
<p class="animate-wave">Hello, I'm</p>
```

### 6. Pulse Animation

```html
<button class="animate-pulse">Click me</button>
```

---

## 🌐 Navbar Component Usage

### Basic Usage

```tsx
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* Rest of your content */}
    </>
  );
}
```

### Features

- **Navigation Items**: Home, About, Projects, Contact
- **Search Bar**: Real-time search with functionality
- **Responsive**: Desktop menu + Mobile hamburger
- **Scroll Detection**: Header changes on scroll
- **Smooth Scrolling**: Anchor navigation

### Navigation Items (Customizable)

Edit in `src/components/Navbar/Navbar.tsx`:

```tsx
const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];
```

---

## 📱 Responsive Design

### Tailwind Breakpoints

```tsx
// Mobile first (default)
<div class="text-base md:text-lg lg:text-xl">
  Responsive text
</div>

// Other utilities
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#1F2937',
      secondary: '#9CA3AF',
      accent: '#3B82F6',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
  },
}
```

### Animations

Edit `tailwind.config.js`:

```js
animation: {
  'slide-in': 'slideIn 0.8s ease-out',
  'fade-in': 'fadeIn 0.6s ease-out',
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite',
  'wave': 'wave 1.5s ease-in-out infinite',
}
```

---

## 🔧 Navbar Customization

### Change Navigation Items

```tsx
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
];
```

### Modify Colors

Change navbar background colors in the JSX:

```tsx
// Light theme on scroll
isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-b from-gray-900/90 to-transparent'

// Text colors
isScrolled ? 'text-gray-700 hover:text-blue-500' : 'text-white hover:text-blue-300'
```

---

## 🔌 Backend API (PHP)

### API Endpoints

#### Contact Form Submission
```
POST /backend/api.php?route=contact
```

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": { ... }
}
```

#### Get Portfolio Data
```
GET /backend/api.php?route=portfolio
```

#### Get Projects
```
GET /backend/api.php?route=projects
```

#### Get Skills
```
GET /backend/api.php?route=skills
```

### Using the API in React

```tsx
async function submitContact(formData) {
  const response = await fetch('/backend/api.php?route=contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const result = await response.json();
  return result;
}
```

---

## 🏗️ Build & Deploy

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📚 Available NPM Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

---

## 🎓 Learning Resources

### Tailwind CSS
- [Official Documentation](https://tailwindcss.com)
- [Interactive Playground](https://play.tailwindcss.com)

### React & TypeScript
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Animations
- See `src/styles/CSS_ANIMATIONS_GUIDE.css` for complete animation reference

### Vite
- [Vite Documentation](https://vitejs.dev)

---

## ✅ Common Issues & Solutions

### Issue: Styles not applying

**Solution**: Make sure to import `global.scss` in `main.tsx`:

```tsx
import './styles/global.scss'
```

### Issue: Navbar not showing

**Solution**: Ensure the Navbar component is imported and used in `App.tsx`:

```tsx
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      {/* Other content */}
    </>
  )
}
```

### Issue: Animations not working

**Solution**: Check that Tailwind CSS is properly configured in `tailwind.config.js`

### Issue: PHP Backend not responding

**Solution**: 
1. Ensure PHP is installed and running
2. Check that `backend/api.php` exists
3. Update API endpoint URL in React components
4. Enable CORS headers in PHP file

---

## 🚀 Next Steps

1. **Customize Content**: Update data in `src/data/` files
2. **Add More Sections**: Create new components as needed
3. **Style Adjustments**: Modify `tailwind.config.js` for branding
4. **Backend Integration**: Connect React forms to PHP API
5. **Deploy**: Upload to your hosting provider

---

## 📞 Support

For detailed code information, see:
- `COMPLETE_CODE_GUIDE.md` - Full documentation
- `CODE_EXAMPLES.html` - HTML examples
- `src/styles/CSS_ANIMATIONS_GUIDE.css` - Animation reference

---

**Created**: January 16, 2026  
**Updated**: January 16, 2026  
**Developer**: Netsanet Worku

Happy coding! 🎉
