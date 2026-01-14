# 🔧 Fix PowerShell Execution Policy Issue

## The Problem
PowerShell is blocking npm commands due to execution policy restrictions.

## ✅ SOLUTION 1: Use Command Prompt (EASIEST!)

### Step-by-Step:

1. **Press** `Win + R` on your keyboard
2. **Type** `cmd` and press Enter
3. **Copy and paste this:**
   ```cmd
   cd B:\Portfolio\netsanet-portfolio
   ```
4. **Press Enter**
5. **Copy and paste this:**
   ```cmd
   npx vite
   ```
6. **Press Enter**
7. **Wait** for the server to start (you'll see a URL like `http://localhost:5173`)
8. **Open your browser** and go to that URL

---

## ✅ SOLUTION 2: Use Batch Files

I've created 2 batch files for you:

### Option A: `start-portfolio.bat`
- Double-click this file
- Uses `npx vite` directly

### Option B: `start-portfolio-powershell.bat`
- Double-click this file
- Bypasses PowerShell policy automatically

**Try both and see which works!**

---

## ✅ SOLUTION 3: Fix PowerShell Permanently (One-time)

### Steps:

1. **Right-click** the Start button
2. **Click** "Windows PowerShell (Admin)" or "Terminal (Admin)"
3. **Copy and paste this command:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
4. **Press Enter**
5. **Type** `Y` and press Enter to confirm
6. **Close** PowerShell
7. **Now you can use** `npm run dev` normally!

---

## ✅ SOLUTION 4: Quick Command (No Admin Needed)

In PowerShell, run this single command:

```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

---

## 🎯 RECOMMENDED: Use Command Prompt

**This is the simplest solution that always works:**

1. Open Command Prompt (not PowerShell)
2. Navigate to your project:
   ```cmd
   cd B:\Portfolio\netsanet-portfolio
   ```
3. Run:
   ```cmd
   npx vite
   ```

**That's it!** Your portfolio will start running.

---

## 📝 What Each Command Does

- `npm run dev` - Runs the dev script from package.json
- `npx vite` - Runs Vite directly (bypasses npm scripts)
- Both do the same thing, but `npx vite` works in Command Prompt

---

## 🌐 After Server Starts

You'll see output like:
```
VITE v5.x.x  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Click or copy the Local URL** and open it in your browser!

---

## ✅ Checklist

- [ ] Try Command Prompt method (EASIEST)
- [ ] Or double-click `start-portfolio.bat`
- [ ] Or double-click `start-portfolio-powershell.bat`
- [ ] Or fix PowerShell permanently (if you want)
- [ ] Open browser to the URL shown
- [ ] Navigate to Gallery section
- [ ] Enjoy your portfolio!

---

## 🆘 Still Having Issues?

If none of these work:

1. Make sure Node.js is installed:
   ```cmd
   node --version
   ```
   Should show: v18.x.x or higher

2. Make sure npm is installed:
   ```cmd
   npm --version
   ```
   Should show: 9.x.x or higher

3. Try reinstalling dependencies:
   ```cmd
   cd B:\Portfolio\netsanet-portfolio
   npm install
   ```

---

## 💡 Pro Tip

**Always use Command Prompt (cmd) for npm commands on Windows if you have execution policy issues!**

It's simpler and doesn't have the same restrictions as PowerShell.
