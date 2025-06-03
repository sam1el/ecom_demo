# E-commerce API Documentation

## Authentication
- `POST /register` — Register a new user
- `POST /login` — Login and receive JWT token
- `GET /profile` — Get current user profile (auth required)
- `PUT /profile` — Update current user profile (auth required)

## Product Catalog
- `GET /products` — List all products
- `GET /products/:id` — Get product by ID
- `POST /products` — Create product (admin only)
- `PUT /products/:id` — Update product (admin only)
- `DELETE /products/:id` — Delete product (admin only)

## Shopping Cart
- `GET /cart` — Get current user's cart (auth required)
- `POST /cart` — Add item to cart (auth required)
- `DELETE /cart` — Remove item from cart (auth required)

## Orders
- `POST /orders` — Create order from cart (auth required)
- `GET /orders` — List user's orders (auth required)

## Admin
- `GET /admin/users` — List all users (admin only)
- `PUT /admin/users/:id` — Update user (admin only)
- `DELETE /admin/users/:id` — Delete user (admin only)
- `GET /admin/contents` — List all content (admin only)
- `POST /admin/contents` — Create content (admin only)
- `PUT /admin/contents/:id` — Update content (admin only)
- `DELETE /admin/contents/:id` — Delete content (admin only)

---

# Frontend Setup Plan

## 1. Choose a Frontend Framework
- Recommended: React (with Vite or Create React App)

## 2. Project Structure
- `/frontend` (new folder)
- Pages: Login, Register, Product Catalog, Cart, Checkout, Admin Dashboard, User Management, Content Management

## 3. Install Dependencies
- React, React Router, Axios, UI library (e.g., Material-UI or Ant Design)

## 4. Connect to API
- Use Axios for HTTP requests
- Store JWT in localStorage
- Protect routes with authentication

## 5. Example Vite React Setup
```sh
cd /Users/sam1el/work/jb_project/ecom_demo
npm create vite@latest frontend -- --template react
cd frontend
npm install axios react-router-dom @mui/material @emotion/react @emotion/styled
```

## 6. Start the Frontend
```sh
npm run dev
```

---

Would you like a sample React component or a more detailed frontend folder structure next?
