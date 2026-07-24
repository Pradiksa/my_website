# Pradiksa P — Portfolio

A React + Tailwind + Framer Motion portfolio site.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## 2. Push it to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 3. Turn on GitHub Pages (one-time setup)

1. On GitHub, open your repo → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to **GitHub Actions**.

That's it — the included workflow at `.github/workflows/deploy.yml` will
automatically build and publish the site every time you push to `main`.
After the first push, check the **Actions** tab to watch it deploy; once it
finishes, your site will be live at:

```
https://<your-username>.github.io/<your-repo>/
```

## Editing your content

Open `src/Portfolio.jsx` — your name, contact info, tech stack, projects,
and timeline are all in the constants near the top of the file
(`PROFILE`, `TECH_STACK`, `DEFAULT_PROJECTS`, `TIMELINE`). Edit those and
push again to update the live site.

## Notes

- The admin panel's "Manage Projects" data is saved in the visitor's own
  browser via `localStorage` (see `src/storageShim.js`), since a static
  GitHub Pages site has no server-side database. Projects you add through
  the admin panel on your own browser won't automatically appear for other
  visitors — for permanent changes, edit `DEFAULT_PROJECTS` directly in
  `Portfolio.jsx` and push.
- Add your own photo by setting `photo: "your-image-url-or-path"` in the
  `PROFILE` object.
