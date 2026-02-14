# 📋 DEPLOY TO GITHUB - EXACT COMMANDS

## Your GitHub Account: priyankaarya28

---

## ✅ STEP 1: Create Empty Repository on GitHub

**MANUALLY DO THIS:**
1. Visit: https://github.com/new
2. Enter:
   - Repository name: `Smart-Bookmark-App`
   - Visibility: **Public**
3. Click **"Create repository"**
4. **IMPORTANT:** Don't add README, .gitignore, or license (we already have them)

---

## ✅ STEP 2: Run These Commands (Copy & Paste)

Open **PowerShell** in your project folder and run:

```powershell
git remote add origin https://github.com/priyankaarya28/Smart-Bookmark-App.git
git branch -M main
git push -u origin main
```

**If you get an error about origin already existing, run this first:**
```powershell
git remote remove origin
```

Then run the 3 commands above again.

---

## ✅ STEP 3: Verify Success ✓

Visit: https://github.com/priyankaarya28/Smart-Bookmark-App

You should see all your code there!

---

## ✅ STEP 4: Enable GitHub Pages

1. Go to your repo Settings (top menu)
2. Scroll down to **"Pages"**
3. Under "Build and deployment":
   - Source: **"Deploy from a branch"**
   - Branch: **"gh-pages"**
   - Folder: **"/ (root)"**
4. Click **"Save"**

Wait 1-2 minutes for deployment...

Your live app: https://priyankaarya28.github.io/Smart-Bookmark-App/

---

## 🎉 DONE!

Your repository is now on GitHub with:
- ✅ Source code
- ✅ Auto-deployment on every push
- ✅ Live demo on GitHub Pages
