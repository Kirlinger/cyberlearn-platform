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

## Deploy to GitHub Pages
1. Create a public GitHub repo named `cyberlearn-platform`.
2. Push this code to the default branch.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
5. In GitHub repository settings, ensure **Pages** is set to the `gh-pages` branch.

> If your repository name differs, update `base` in `vite.config.js`.

## Project documentation
- Architecture and extension guide: `src/docs/PROJECT_STRUCTURE.md`
