# Designer Portfolio

A simple designer portfolio built with React, Vite, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server (Vite)  |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## Project structure

```
src/
  App.jsx                 # Router: home + work detail pages
  pages/
    HomePage.jsx          # Landing (me, projects, contact)
    WorkDetailPage.jsx    # Single project / article / case study
  routes/paths.js         # URL helpers
  content/
    site.js               # Nav section IDs
    me.js
    work.js               # Card list + full page body for each item
    contact.js
  components/
    layout/               # Header, Section, WorkDetailHeader, …
    sections/             # Me, Projects, Contact
    work/                 # ContentGrid, ContentCard, ContentBody
    contact/              # ContactForm
    ui/
  lib/
    contactForm.js        # Web3Forms API call
  assets/lottie/
```

## Customize

1. **Nav** — `src/content/site.js`
2. **Me section** — `src/content/me.js`
3. **Work cards & pages** — `src/content/work.js`
   - Each item needs `id`, `title`, `subtitle`, `tag`, and `body` (blocks).
   - URL: `/work/{id}` (e.g. `/work/banking-app-redesign`)
   - Block types: `paragraph`, `heading`, `image` (see `ContentBody.jsx`)
4. **Contact form** — Copy `.env.example` to `.env`, add your [Web3Forms](https://web3forms.com) access key (free; messages go to your email). Edit labels and copy in `src/content/contact.js`.

## Adding a work item

Add one object to `WORK_ITEMS` in `work.js`. The same entry powers the grid card and the detail page. Use images in `public/images/` or any URL in `body` image blocks.

## Contact form setup (one-time)

1. Create a free account at [web3forms.com](https://web3forms.com).
2. Add your email address as the notification recipient.
3. Copy your **Access Key**.
4. In the project root: `cp .env.example .env` (or copy manually on Windows).
5. Paste the key: `VITE_WEB3FORMS_ACCESS_KEY=...`
6. Restart `npm run dev`.

On Netlify/Vercel, add the same variable in the host’s environment settings before deploy.

## Deploy (GitHub + Vercel)

Step-by-step instructions: **[DEPLOY.md](DEPLOY.md)**

- `vercel.json` — SPA routing for `/work/...` on Vercel
- Set `VITE_WEB3FORMS_ACCESS_KEY` in Vercel environment variables after import

`public/_redirects` covers the same routing if you use Netlify instead.
