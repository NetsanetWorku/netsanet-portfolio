# 🔧 Navbar Troubleshooting Guide

## Issue: Can't See the Navbar

Your navbar is configured correctly with Home, About, Gallery, and Contact. Here's how to troubleshoot:

---

## ✅ Quick Fixes

### 1. Refresh the Browser
Press **Ctrl + F5** (Windows) or **Cmd + Shift + R** (Mac) to hard refresh and clear cache.

### 2. Check if Server is Running
Make sure your portfolio is running:
```cmd
cd B:\Portfolio\netsanet-portfolio
npm run dev
```

Or double-click: `start-portfolio.bat`

### 3. Check Browser Console
1. Press **F12** to open Developer Tools
2. Click **Console** tab
3. Look for any red error messages
4. Share the errors if you see any

---

## 🎯 What the Navbar Should Look Like

### Desktop View:
```
┌────────────────────────────────────────────────────────────┐
│ [Photo] Netsanet-Portfolio  [🔍]  Home About Gallery Contact │
└────────────────────────────────────────────────────────────┘
```

### Mobile View:
```
┌──────────────────────────────────┐
│ [Photo] Netsanet-Portfolio  [☰]  │
└──────────────────────────────────┘
```

---

## 🔍 Checklist

- [ ] Server is running (`npm run dev` or `start-portfolio.bat`)
- [ ] Browser is open to `http://localhost:5173`
- [ ] Page has loaded (not showing loading screen)
- [ ] Hard refresh done (Ctrl + F5)
- [ ] No errors in browser console (F12)
- [ ] Scroll to top of page (navbar is at top)

---

## 📱 Desktop vs Mobile

### On Desktop (Screen > 768px):
You should see:
- Profile photo
- "Netsanet-Portfolio" text
- Search bar
- **Home | About | Gallery | Contact** links
- TikTok and Telegram icons

### On Mobile (Screen < 768px):
You should see:
- Profile photo
- "Netsanet-Portfolio" text
- Search icon (🔍)
- Hamburger menu (☰)
- Click hamburger to see: Home, About, Gallery, Contact

---

## 🎨 Navbar Visibility Issues

### If navbar is hidden:
1. **Scroll to top** - Navbar is fixed at top of page
2. **Check screen size** - Resize browser window
3. **Check CSS** - Navbar might be transparent

### If navbar is there but links are missing:
1. **Check screen width** - Links hide on small screens
2. **Click hamburger menu** (☰) on mobile
3. **Look for desktop nav** - Should show on screens > 768px

---

## 🔧 Manual Check

### Open Browser Console (F12) and type:
```javascript
document.querySelector('header')
```

**If it returns `null`:**
- Header component not rendering
- Check if App.tsx includes Header

**If it returns an element:**
- Header is there
- Check CSS visibility
- Check if it's scrolled out of view

---

## 📂 Files to Check

### 1. App.tsx
Make sure Header is imported and used:
```typescript
import Header from './components/Header'

function App() {
  return (
    <div className={styles.app}>
      <Header />  ← Should be here
      ...
    </div>
  )
}
```

### 2. Header.tsx
Location: `src/components/Header/Header.tsx`
- Should have navItems array with 4 items
- Should render desktop and mobile nav

### 3. Header.module.scss
Location: `src/components/Header/Header.module.scss`
- Should have .header, .desktopNav, .mobileNav styles
- Check if display is not set to 'none'

---

## 🚀 Quick Test

### Test 1: Check if Header Exists
1. Open browser to `http://localhost:5173`
2. Right-click anywhere on page
3. Click "Inspect" or "Inspect Element"
4. Look for `<header>` tag in HTML
5. Should see header with class names

### Test 2: Check Navigation Links
1. In Inspector, find `<nav>` inside `<header>`
2. Should see `<ul>` with 4 `<li>` items
3. Each should have: Home, About, Gallery, Contact

### Test 3: Mobile Menu
1. Resize browser to mobile size (< 768px)
2. Look for hamburger icon (☰)
3. Click it
4. Menu should slide down with 4 links

---

## 💡 Common Issues

### Issue 1: Navbar Not Visible
**Cause:** CSS display issue
**Fix:** Check Header.module.scss for `display: none`

### Issue 2: Links Not Showing
**Cause:** Screen too small (mobile view)
**Fix:** Click hamburger menu or resize window

### Issue 3: Navbar Behind Content
**Cause:** z-index issue
**Fix:** Header should have `z-index: 1000`

### Issue 4: White Navbar on White Background
**Cause:** Color contrast issue
**Fix:** Navbar should have background color

---

## 🎯 Expected Behavior

### Desktop (> 768px):
- ✅ Profile photo visible
- ✅ "Netsanet-Portfolio" text visible
- ✅ Search bar visible
- ✅ **Home, About, Gallery, Contact links visible**
- ✅ TikTok and Telegram icons visible
- ✅ No hamburger menu

### Mobile (< 768px):
- ✅ Profile photo visible
- ✅ "Netsanet-Portfolio" text visible
- ✅ Search icon visible
- ✅ Hamburger menu (☰) visible
- ✅ Links hidden until hamburger clicked
- ✅ No social icons

---

## 📞 Next Steps

If navbar still not visible:

1. **Take a screenshot** of your browser
2. **Open Console** (F12) and screenshot any errors
3. **Check these:**
   - Is server running?
   - Is page loaded?
   - Is browser at `localhost:5173`?
   - Any red errors in console?

4. **Try:**
   - Close browser completely
   - Stop server (Ctrl+C)
   - Restart server (`npm run dev`)
   - Open browser again
   - Hard refresh (Ctrl+F5)

---

## ✅ Navbar Configuration

Your navbar is set up with:
- **Home** → Scrolls to hero section
- **About** → Scrolls to about section
- **Gallery** → Scrolls to gallery section
- **Contact** → Scrolls to contact section

All links should be visible on desktop and in mobile menu!

---

## 🎨 Visual Reference

```
DESKTOP:
┌──────────────────────────────────────────────────────────────┐
│ [😊] Netsanet-Portfolio  [🔍 Search]  Home About Gallery Contact [📱][✈️] │
└──────────────────────────────────────────────────────────────┘

MOBILE:
┌────────────────────────────┐
│ [😊] Netsanet-Portfolio [☰] │
└────────────────────────────┘

MOBILE MENU OPEN:
┌────────────────────────────┐
│ [😊] Netsanet-Portfolio [X] │
├────────────────────────────┤
│ Home                       │
│ About                      │
│ Gallery                    │
│ Contact                    │
└────────────────────────────┘
```

If you still can't see the navbar, let me know what you see on your screen!
