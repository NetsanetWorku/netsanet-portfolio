# 📜 e-She Certificates Setup Guide

## ✅ What's Been Done

Your portfolio now has a **Certifications section** that will display all 8 of your e-She certificates!

### Files Created/Updated:
1. ✅ `src/types/index.ts` - Added Certification interface
2. ✅ `src/data/certifications.ts` - Configured all 8 certificates
3. ✅ `src/components/Experience/Experience.tsx` - Added certifications display
4. ✅ `src/components/Experience/Experience.module.scss` - Added certificate card styles
5. ✅ `src/App.tsx` - Integrated certifications into the app

---

## 📂 Step 1: Create the Documents Folder

1. Open File Explorer
2. Navigate to: `B:\Portfolio\netsanet-portfolio\public\`
3. Right-click → **New** → **Folder**
4. Name it: `documents`

**Full path:** `B:\Portfolio\netsanet-portfolio\public\documents\`

---

## 💾 Step 2: Save Your 8 Certificate PDFs

Save each PDF file to `B:\Portfolio\netsanet-portfolio\public\documents\` with these **EXACT** names:

### Certificate Files (use exact names with spaces):

1. `SS 1 How to Take a Course.pdf`
2. `SS 2 Keeping Yourself Safe Online.pdf`
3. `SS 3 Academic Integrity.pdf`
4. `SS 4 Set Goals to Manage Your Time.pdf`
5. `SS 5 How to Evaluate Resources.pdf`
6. `SS 6 How to Study Effectively.pdf`
7. `SS 7 Strategies for Successful Online Learning.pdf`
8. `AI Essentials.pdf`

### How to Save:
1. Locate each PDF file on your computer
2. Copy or move it to: `B:\Portfolio\netsanet-portfolio\public\documents\`
3. Make sure the filename matches **exactly** (including spaces and capitalization)

---

## 🎨 What Your Certificates Will Look Like

Your certificates will appear in the **Experience & Education** section as beautiful cards with:

- ✅ Certificate name (e.g., "How to Take a Course")
- ✅ Issuer badge (e-She)
- ✅ Description of what the certificate covers
- ✅ Issue date (2024)
- ✅ **"View Certificate"** button that opens the PDF

### Features:
- **Responsive grid layout** - Adapts to any screen size
- **Hover effects** - Cards lift up when you hover
- **Downloadable** - Click "View Certificate" to open/download PDF
- **Professional design** - Purple accent border matching your portfolio theme

---

## 📁 Final Folder Structure

```
netsanet-portfolio/
├── public/
│   ├── images/
│   │   ├── photo_2026-01-13_17-27-43.jpg ✓
│   │   ├── netsa.jpg ✓
│   │   ├── profile-1.jpg ⚠️
│   │   ├── profile-2.jpg ⚠️
│   │   ├── profile-3.jpg ⚠️
│   │   └── developer-photo.jpg ⚠️
│   └── documents/  ← CREATE THIS FOLDER
│       ├── SS 1 How to Take a Course.pdf
│       ├── SS 2 Keeping Yourself Safe Online.pdf
│       ├── SS 3 Academic Integrity.pdf
│       ├── SS 4 Set Goals to Manage Your Time.pdf
│       ├── SS 5 How to Evaluate Resources.pdf
│       ├── SS 6 How to Study Effectively.pdf
│       ├── SS 7 Strategies for Successful Online Learning.pdf
│       └── AI Essentials.pdf
```

---

## 🎯 Your 8 e-She Certificates

### Study Skills Series (7 certificates):

1. **How to Take a Course**
   - Course completion strategies and best practices

2. **Keeping Yourself Safe Online**
   - Online safety and digital security fundamentals

3. **Academic Integrity**
   - Ethics and integrity in academic work

4. **Set Goals to Manage Your Time**
   - Time management and goal-setting strategies

5. **How to Evaluate Resources**
   - Critical evaluation of information sources

6. **How to Study Effectively**
   - Effective study techniques and learning strategies

7. **Strategies for Successful Online Learning**
   - Best practices for online education success

### AI Course (1 certificate):

8. **AI Essentials**
   - Fundamentals of Artificial Intelligence and its applications

---

## 🚀 How to View Your Certificates

### After saving the PDFs:

1. **Run your portfolio:**
   - Double-click `start-portfolio.bat`
   - OR use Command Prompt: `npm run dev`

2. **Open browser:**
   - Go to `http://localhost:5173`

3. **Navigate to Experience section:**
   - Scroll down or click "Experience" in the navigation

4. **See your certificates:**
   - Below your education, you'll see a grid of 8 certificate cards
   - Each card has a "View Certificate" button

5. **Click "View Certificate":**
   - Opens the PDF in a new tab
   - Users can view, download, or print

---

## ✅ Checklist

- [ ] Create `public/documents/` folder
- [ ] Save all 8 PDF files with exact names
- [ ] Run portfolio (`start-portfolio.bat`)
- [ ] Open browser to `http://localhost:5173`
- [ ] Scroll to Experience section
- [ ] See your 8 certificates displayed
- [ ] Click "View Certificate" to test PDFs open correctly

---

## 🎨 Certificate Display Features

Your certificates section includes:

- **Grid Layout** - 2-3 certificates per row (responsive)
- **Card Design** - Clean, professional cards with purple accent
- **Hover Effects** - Cards lift up on hover
- **Issuer Badge** - "e-She" displayed prominently
- **Descriptions** - Brief description of each certificate
- **Issue Date** - Shows "Issued: 2024"
- **View Button** - Opens PDF in new tab
- **Mobile Friendly** - Stacks nicely on phones
- **Accessible** - Screen reader friendly

---

## 📞 Need Help?

### PDFs not showing?
- Check that folder is named exactly: `documents` (lowercase)
- Check that PDFs are in: `public/documents/`
- Check filenames match exactly (including spaces)
- Refresh browser (Ctrl + F5)

### Certificates not displaying?
- Make sure server is running
- Check browser console for errors (F12)
- Verify files are in correct location

---

## 🎉 You're Almost Done!

Just:
1. Create the `documents` folder
2. Save your 8 PDF files
3. Run the portfolio
4. Show off your certificates! 🎓

**Your portfolio will look amazing with all your e-She certifications displayed professionally!**
