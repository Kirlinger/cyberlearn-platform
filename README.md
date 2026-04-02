# CyberLearn Platform

A production-ready educational web platform focused on cybersecurity and foundational tech learning.

## Stack
- React + Vite
- Tailwind CSS
- React Router
- React Syntax Highlighter

## Core features
- Premium responsive dashboard layout with sidebar + top navigation
- Dark mode toggle
- Trilingual UI switcher: **FR / HT / EN**
- Search across lesson catalog
- Reusable lesson architecture with:
  - Definition, why it matters, core concepts, deep explanation
  - Step-by-step flow
  - Code/command snippets in English
  - Common mistakes
  - Practical and challenge exercises
  - Mini quiz, summary, related topics, recommended next lesson
- Progress widgets
- Roadmaps, Labs, Glossary, Resources, Career pages

## Included initial real content
- Cybersecurity: 5 lessons
- Linux: 3 lessons
- Networking: 3 lessons
- Python: 3 lessons
- SQL: 3 lessons
- Roadmaps: 3 pages
- Labs: 3 pages
- Glossary page
- Resources page
- Career page

## Local development
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
npm run preview
```

## GitHub Pages deployment (automatic)
This repository includes a GitHub Actions workflow at `.github/workflows/deploy-gh-pages.yml`.

### Deployment behavior
- Trigger: push to `main`
- Build command: `npm run build`
- Deploy target branch: **`gh-pages`**
- Published folder: `dist`

### One-time GitHub setup
1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set source to **Deploy from a branch**.
4. Select branch: `gh-pages`, folder: `/ (root)`.
5. Save.

### Expected live URL
If your repo is named `cyberlearn-platform`, your site URL is:

`https://<your-github-username>.github.io/cyberlearn-platform/`

## Project documentation
- Architecture and extension guide: `src/docs/PROJECT_STRUCTURE.md`
