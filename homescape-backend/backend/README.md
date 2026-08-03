# HomeScape Backend

Node.js + Express + MongoDB (Mongoose) backend for the **HomeScape** real-estate portal.

---

## 📂 Project Structure

```
backend/
├── config/
│   ├── db.js                 # Mongoose connection
│   └── cloudinary.js         # Cloudinary config (optional / disabled by default)
├── controllers/
│   ├── authController.js
│   ├── propertyController.js
│   ├── agentController.js
│   ├── inquiryController.js
│   └── uploadController.js
├── middleware/
│   ├── authMiddleware.js     # protect + authorize(role)
│   ├── errorMiddleware.js    # notFound + errorHandler
│   └── uploadMiddleware.js   # Multer local disk / Cloudinary switch
├── models/
│   ├── User.js
│   ├── Property.js
│   └── Inquiry.js
├── routes/
│   ├── authRoutes.js
│   ├── propertyRoutes.js
│   ├── agentRoutes.js
│   ├── inquiryRoutes.js
│   └── uploadRoutes.js
├── utils/
│   └── generateToken.js
├── uploads/                  # local image storage (served at /uploads)
├── .env.example
├── .gitignore
├── app.js                    # Express app (middlewares, routes)
├── server.js                 # Entry point (connects DB + listens)
├── seed.js                   # `npm run seed` – populates sample data
└── package.json
```

---

## 🚀 Local Setup

```bash
cd backend
cp .env.example .env         # then edit values (MONGO_URI, JWT_SECRET, …)
npm install
npm run seed                 # optional – load sample users/properties/inquiries
npm run dev                  # or `npm start`
```

Server listens on `http://localhost:<PORT>` (default `5000` in `.env.example`).
All APIs are prefixed with `/api`.

---

## 🔑 Environment Variables

| Key | Required | Description |
|---|---|---|
| `PORT` | yes | Server port |
| `MONGO_URI` | yes | MongoDB Atlas / local connection string |
| `DB_NAME` | no | Overrides DB name from the URI |
| `JWT_SECRET` | yes | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | no | e.g. `7d` (default) |
| `CORS_ORIGINS` | no | Comma-separated origins (default `*`) |
| `PUBLIC_BACKEND_URL` | no | Absolute base URL used for image URLs in production |
| `USE_CLOUDINARY` | no | `true` to switch uploads to Cloudinary |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | if Cloudinary on | Cloudinary credentials |

Full template lives in [`.env.example`](./.env.example).

---

## 📡 API Endpoints

Base URL: `http://localhost:<PORT>/api`

### Auth
| Method | Endpoint | Auth | Body / Query |
|---|---|---|---|
| POST | `/auth/register` | – | `{ name, email, password, role? }` |
| POST | `/auth/login` | – | `{ email, password }` |
| GET  | `/auth/me` | Bearer | – |

### Properties
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET    | `/properties` | – | Filters: `?location=&type=&minPrice=&maxPrice=` |
| GET    | `/properties/compare?ids=id1,id2,id3` | – | Bulk fetch |
| GET    | `/properties/:id` | – | – |
| POST   | `/properties` | Bearer | Body: title, type, price, location, bedrooms, bathrooms, area, description, image |
| PUT    | `/properties/:id` | Bearer (owner) | Partial update |
| DELETE | `/properties/:id` | Bearer (owner) | – |

### Agents
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET | `/agents` | – | Users with ≥ 1 property |
| GET | `/agents/:id` | – | Agent + their properties |

### Inquiries
| Method | Endpoint | Auth | Body |
|---|---|---|---|
| POST | `/inquiries` | – | `{ name, email, phone, message, propertyId }` |
| GET  | `/inquiries` | Bearer | Inquiries on your own listings |

### Upload
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| POST | `/upload` | Bearer | `multipart/form-data`, field `image` (jpg/jpeg/png/webp, ≤5 MB) → `{ url, filename }` |

Uploaded files are served statically at `/uploads/<filename>`.

---

## 🌱 Seed Data (`npm run seed`)

Creates:
- **2 users** — 1 agent + 1 normal user
- **10 properties** — spread across Mumbai, Goa, Bangalore, Pune, Delhi, Hyderabad, Ahmedabad, Jaipur, Chennai (Villa / Apartment / House / Studio / Plot / Commercial)
- **5 inquiries**

Sample credentials:

| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Agent | `agent@homescape.com`  | `Agent@123` |
| User  | `user@homescape.com`   | `User@123`  |

Seed is **not** automatic — only runs when you execute `npm run seed`.

---

## 🧩 Frontend Integration

Replace dummy data with `fetch`/`axios` calls to `REACT_APP_BACKEND_URL/api/...`.
Attach `Authorization: Bearer <token>` on protected routes.
When creating a property, upload the image first via `POST /api/upload`, then send the returned `url` as `image` in `POST /api/properties`.
