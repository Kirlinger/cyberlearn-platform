# Luxe Parfum Store

Modern full-stack luxury perfume e-commerce app.

## Stack
- React + Vite + Tailwind CSS
- Node.js + Express + MongoDB
- JWT authentication + bcrypt hashing
- Security middleware: helmet, cors, express-rate-limit, express-mongo-sanitize

## Setup
1. Copy `.env.example` into backend `.env` and frontend `.env` as needed.
2. Install dependencies:
   - `cd backend && npm install`
   - `cd ../frontend && npm install`
3. Run app:
   - Backend: `npm run dev` in `backend`
   - Frontend: `npm run dev` in `frontend`

## Features
- Luxury homepage with black/gold premium theme
- Product listing and detail view
- Secure registration/login
- Shopping cart + checkout
- WhatsApp ordering button with prefilled message
- Admin dashboard for product CRUD and order view
- Fully responsive across mobile/tablet/desktop
- Validation and API error handling

## Deployment
- Deploy backend to Render/Railway with MongoDB Atlas env vars.
- Deploy frontend to Vercel/Netlify and set `VITE_API_URL`.
