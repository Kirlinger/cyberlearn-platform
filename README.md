# Luxe Parfum - Production-Ready Perfume E-commerce

Full-stack perfume store with React + Vite frontend and Node/Express/MongoDB backend.

## Features
- Luxury responsive UI (black/gold/white)
- Product listing and detail pages
- JWT authentication (register/login/logout)
- bcrypt password hashing
- Profile page, cart, checkout
- WhatsApp order button with prefilled cart details
- Admin dashboard: create/update/delete products + view orders
- Input validation, sanitize middleware, helmet, rate limiting, error handling

## Project Structure
- `frontend/` React + Vite + Tailwind client
- `backend/` Express API + MongoDB + JWT

## Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

## Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Environment Variables
### Backend (`backend/.env`)
- `PORT=5000`
- `MONGO_URI=...`
- `JWT_SECRET=strong-random-secret`
- `CLIENT_URL=http://localhost:5173`

### Frontend (`frontend/.env`)
- `VITE_API_URL=http://localhost:5000/api`

## Security Notes
- Passwords hashed with bcrypt (12 salt rounds)
- JWT signed with secret and 7-day expiration
- Protected routes (`protect`, `adminOnly`)
- Rate limiting on `/api/auth`
- Request sanitization: Mongo sanitize + XSS clean + HPP + Helmet
- Strong password policy and email validation

## Deployment
### Backend
- Deploy to Render/Railway/Fly.io
- Set env vars from `.env.example`
- Start command: `npm start`

### Frontend
- Deploy to Vercel/Netlify
- Set `VITE_API_URL` to backend URL
- Build command: `npm run build`
- Publish directory: `dist`

## Default Flow
1. Register user
2. Browse products
3. Add to cart
4. Checkout (logged in)
5. Place WhatsApp order or API order
6. Admin logs in to manage catalog and orders
