# Deploy: GitHub + Vercel

## 1. Push to GitHub

Run these in the project folder (`designer-portfolio`):

```bash
git init
git add .
git commit -m "Initial commit: designer portfolio"
```

Create a new repo on GitHub (empty, no README), then:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/designer-portfolio.git
git push -u origin main
```

Or with GitHub CLI:

```bash
gh repo create designer-portfolio --public --source=. --remote=origin --push
```

## 2. Environment variable (contact form)

Before or after deploy, you need your Web3Forms key in production:

1. Copy `.env.example` to `.env` locally and add your key (for local dev).
2. In Vercel: Project → Settings → Environment Variables → add:
   - **Name:** `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value:** your Web3Forms access key
   - Apply to Production (and Preview if you want)

## 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New Project** → import `designer-portfolio`.
3. Vercel should auto-detect **Vite**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add `VITE_WEB3FORMS_ACCESS_KEY` under Environment Variables.
5. Click **Deploy**.

`vercel.json` includes SPA rewrites so `/work/...` routes work after deploy.

## 4. Later updates

```bash
git add .
git commit -m "Describe your change"
git push
```

Vercel redeploys automatically on each push to `main`.
