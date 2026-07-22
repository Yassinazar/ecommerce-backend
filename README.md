# eCommerce Backend

A simple REST API backend for an eCommerce application. It manages two core resources — **Products** (items users can browse or purchase) and **Carts** (what a customer is planning to buy) — using Express and MongoDB.

## Installation

1. Clone the repository and move into the project folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values if needed:
   ```
   cp .env.example .env
   ```
4. Make sure MongoDB is running locally (default connection string points to `mongodb://127.0.0.1:27017/ecommerce`).

## Running the Project

Seed the database with sample products:
```
npm run seed
```

Start the server:
```
npm start
```

For development with automatic restarts on file changes:
```
npm run dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

**Products**
- `GET /api/products` — fetch all products
- `GET /api/products/:id` — fetch a single product
- `POST /api/products` — create a new product
- `PUT /api/products/:id` — update an existing product
- `DELETE /api/products/:id` — delete a product

**Carts**
- `POST /api/carts` — create a new empty cart
- `GET /api/carts/:id` — fetch a cart with product details populated
- `POST /api/carts/:id/items` — add an item (`productId`, `quantity`) to a cart

## Technologies Used

- Node.js
- Express
- MongoDB / Mongoose
- dotenv
- cors
                                              Final project completed