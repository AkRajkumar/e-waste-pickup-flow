# GitHub Deployment Guide

## Step 1: Create GitHub Repository
1. Go to https://github.com
2. Click "+" icon → "New repository"
3. Repository name: `e-waste-pickup-flow`
4. Make it Public
5. Don't initialize with README (we already have code)
6. Click "Create repository"

## Step 2: Update package.json
Replace `yourusername` with your actual GitHub username in:
```json
"homepage": "https://YOUR_USERNAME.github.io/e-waste-pickup-flow"
```

## Step 3: Push to GitHub
Run these commands in terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/e-waste-pickup-flow.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to GitHub Pages
```bash
npm run deploy
```

## Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Source should be set to "gh-pages" branch
4. Your site will be live at: https://YOUR_USERNAME.github.io/e-waste-pickup-flow

## Troubleshooting

If you get authentication error:
1. Generate Personal Access Token:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with "repo" permissions
2. Use token as password when pushing

Or use GitHub Desktop app for easier authentication.
