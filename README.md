# E-Commerce Demo (Fastify + MongoDB + React)

A simple full-stack e-commerce application featuring:

- Node.js backend with Fastify, MongoDB (Mongoose), JWT authentication
- User registration, login, profile management
- Product catalog, shopping cart, checkout
- Admin dashboard for user/content management
- Modular React frontend with authentication and protected routes

## Features

- User authentication (JWT, bcrypt)
- Product catalog (CRUD for admin)
- Shopping cart and order placement
- Admin: manage users and content
- RESTful API
- React frontend with route protection

## Project Structure

```tree
/ (root)
  server.js                # Fastify server entry
  models/                  # Mongoose schemas
  controllers/             # Route controllers
  routes/                  # Fastify route definitions
  frontend/                # React app (Vite)
    src/
      components/
      pages/
      context/
      hooks/
      api/
```

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- MongoDB (local or Atlas)

### Backend Setup

```sh
cd ecom_demo
npm install
cp .env.example .env # or create .env manually
node server.js
```

### Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API Endpoints

See `API_AND_FRONTEND_SETUP.md` for full API documentation.

## Environment Variables

- `.env` in root for backend (see `.env.example`)
- `.env` in `frontend/` for frontend config (optional)

## Development Notes

- All credentials/tokens are stored in localStorage (frontend)
- Use the admin dashboard for user/content management
- See `frontend_folder_structure.md` for React structure

---

## License

MIT
