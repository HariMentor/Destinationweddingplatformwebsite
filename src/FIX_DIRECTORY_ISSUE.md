# 🔧 Fix: Module Not Found - Directory Issue

## 🚨 The Problem

Your error shows:
```
Module not found: Can't resolve '@/components/AccessGateWrapper'
Path: ./Destinationweddingplatformwebsite/src/app/layout.tsx
```

This means:
- Next.js is looking in `Destinationweddingplatformwebsite/src/app/`
- But your components are in the root `/components` directory

## 🎯 Root Cause

You're either:
1. Running `npm run dev` from the **wrong directory**, OR
2. Your project has a **nested/duplicate structure**

---

## ✅ Solution 1: Navigate to Correct Directory (Most Common)

### Step 1: Check Where You Are

```bash
pwd
```

If you see something like:
- `/some/path/Destinationweddingplatformwebsite/src` ❌
- `/some/path/Destinationweddingplatformwebsite` ❌
- `/some/path/parent/folder` ❌

### Step 2: Find the Correct Directory

The **correct directory** should contain:
- ✅ `app/` folder
- ✅ `components/` folder
- ✅ `styles/` folder
- ✅ `package.json` file
- ✅ `next.config.js` file

### Step 3: Navigate There

```bash
# List what's in your current directory
ls -la

# If you see a folder called "Destinationweddingplatformwebsite"
cd Destinationweddingplatformwebsite

# If you see a "src" folder, DON'T go into it
# Instead, make sure you're at the root level

# Check again
ls -la

# You should see: app/, components/, package.json, etc.
```

### Step 4: Run Dev Server

```bash
npm run dev
```

---

## ✅ Solution 2: Fix Nested Structure

If your files are in `src/` but should be at root level:

### Diagnostic Script

**Mac/Linux:**
```bash
chmod +x check-directory.sh
./check-directory.sh
```

**Windows:**
```bash
check-directory.bat
```

### Manual Fix

If you have this structure (WRONG):
```
/your-project
  └── src/
      ├── app/
      ├── components/
      └── styles/
```

Move to this structure (CORRECT):
```
/your-project
  ├── app/
  ├── components/
  └── styles/
```

**Commands:**
```bash
# Mac/Linux
mv src/app ./
mv src/components ./
mv src/styles ./
mv src/lib ./
rm -rf src

# Windows (PowerShell)
Move-Item src/app .
Move-Item src/components .
Move-Item src/styles .
Move-Item src/lib .
Remove-Item src -Recurse
```

---

## ✅ Solution 3: Fix tsconfig.json Paths

Your `tsconfig.json` should have:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**NOT:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // ❌ WRONG if files aren't in src/
    }
  }
}
```

---

## 🔍 Verification Checklist

Run these commands from your terminal:

```bash
# 1. Check current directory
pwd

# 2. List files (should see app/, components/, etc.)
ls -la

# 3. Verify app directory exists
ls app/

# 4. Verify components directory exists
ls components/

# 5. Verify package.json exists
cat package.json | head -n 5
```

**Expected output:**
```
✅ app/ exists and contains layout.tsx, page.tsx
✅ components/ exists and contains .tsx files
✅ package.json exists with "name": "wedzway-platform"
```

---

## 🚀 Step-by-Step Fix

### 1. Find Your Project Root

```bash
# Search for package.json
find ~ -name "package.json" -path "*/wedzway*" 2>/dev/null

# This will show you where your project actually is
```

### 2. Navigate to the Directory

```bash
cd /path/shown/above
```

### 3. Verify Structure

```bash
ls -la
```

You should see:
```
drwxr-xr-x  app/
drwxr-xr-x  components/
drwxr-xr-x  styles/
-rw-r--r--  package.json
-rw-r--r--  next.config.js
-rw-r--r--  tsconfig.json
```

### 4. Clean and Reinstall

```bash
rm -rf .next node_modules
npm install
```

### 5. Run Dev Server

```bash
npm run dev
```

---

## 🆘 Still Not Working?

### Check for Multiple Installations

```bash
# Find all package.json files
find . -name "package.json" -type f

# Find all node_modules folders
find . -name "node_modules" -type d

# Find all app directories
find . -name "app" -type d
```

If you see multiple results, you have duplicate installations.

### Nuclear Option: Fresh Clone

If the structure is completely messed up:

1. **Backup your work** (if you made changes)
2. **Delete the project folder**
3. **Re-clone or re-download** the project
4. **Navigate to the correct directory**
5. **Run:**
   ```bash
   npm install
   npm run dev
   ```

---

## 📋 Common Scenarios

### Scenario A: Working in VS Code

If you opened the wrong folder in VS Code:

1. **File → Close Folder**
2. **File → Open Folder**
3. Select the folder containing `app/`, `components/`, `package.json`
4. Open terminal in VS Code
5. Run `npm run dev`

### Scenario B: Multiple Terminals

If you have multiple terminal windows open:

1. **Close all terminals**
2. **Open ONE new terminal**
3. **Navigate to project root**
4. **Run `npm run dev`**

### Scenario C: Downloaded as ZIP

If you downloaded the project as a ZIP:

1. Extract the ZIP
2. The actual project might be in a subfolder
3. Navigate into it until you see `package.json`
4. Run commands from there

---

## ✅ Success Indicators

When in the **correct directory**, you should see:

**Terminal Output:**
```bash
$ ls
app/                     package.json
components/              next.config.js
styles/                  tsconfig.json
lib/                     middleware.ts
```

**npm run dev Output:**
```
▲ Next.js 14.2.0
- Local:   http://localhost:3000
✓ Ready in 2.1s
```

**No Errors About:**
- ❌ Module not found
- ❌ Can't resolve '@/components'
- ❌ Destinationweddingplatformwebsite/src

---

## 📞 Quick Help Commands

```bash
# Where am I?
pwd

# What's in this directory?
ls -la

# Show me the tree structure
tree -L 2

# Find package.json
find . -name "package.json" -maxdepth 3

# Find app directory
find . -name "app" -type d -maxdepth 3
```

---

## 🎯 Final Checklist

Before running `npm run dev`:

- [ ] You're in the directory with `package.json`
- [ ] You can see `app/` folder with `ls`
- [ ] You can see `components/` folder with `ls`
- [ ] You can see `next.config.js` with `ls`
- [ ] You've run `npm install`
- [ ] No other dev server is running
- [ ] You're running `npm run dev` (not vite)

---

## 💡 Remember

The **correct structure** is:
```
/your-project-root/          ← Run commands from here!
  ├── app/                   ← Next.js pages
  ├── components/            ← React components
  ├── styles/                ← CSS files
  ├── lib/                   ← Utilities
  ├── package.json           ← Dependencies
  ├── next.config.js         ← Next.js config
  └── tsconfig.json          ← TypeScript config
```

**NOT:**
```
/your-project-root/
  └── src/                   ← ❌ Wrong!
      ├── app/
      └── components/
```

**NOT:**
```
/some-parent-folder/         ← ❌ Don't run from here!
  └── your-project/          ← Run from this level
      ├── app/
      └── components/
```

---

**Once you're in the correct directory and run `npm run dev`, everything should work!** 🚀
