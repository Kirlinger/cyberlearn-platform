# Project Structure and Extension Guide

## Folder map
- `src/components`: Reusable UI blocks (layout, code block, quiz, progress)
- `src/pages`: Route-level pages (home, lesson detail, roadmap/labs/resource pages)
- `src/data`: Structured content (lessons, translation labels, static site content)
- `src/docs`: Internal docs for maintainers

## Add a new lesson
1. Open `src/data/lessons.js`.
2. Add a new `mkLesson({...})` object with a unique `id`.
3. Fill all required fields:
   - `title`, `definitionFr`, `conceptHt`, `whyItMatters`
   - `coreConcepts`, `deepExplanation`, `steps`, `code`
   - `commonMistakes`, `practicalExercises`, `challengeExercises`
   - `quiz`, `summary`, `relatedTopics`, `nextLesson`
4. Save and run `npm run dev`.
5. The lesson automatically appears in the catalog and route `/lesson/:id`.

## Add language labels
- Update `src/data/translations.js` for `fr`, `ht`, and `en` keys.
- Keep command/code examples in English.

## Scaling guidance
- Move lesson data to CMS or markdown pipeline (future phase).
- Add authentication and learner profiles.
- Persist progress in backend (PostgreSQL + API).
- Add indexing/search service for full-text performance.

## Routing
All routes are registered in `src/App.jsx`.
