# HomeScape

<div align="center">
  <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80" alt="HomeScape banner" width="100%" />
</div>

<h1 align="center">HomeScape</h1>

<p align="center">
  A full-stack MERN real estate platform for discovering, comparing, and managing premium property listings with a modern, responsive experience.
</p>

<p align="center">
  <strong>Secure authentication</strong> · <strong>Property ownership controls</strong> · <strong>Cloudinary image uploads</strong> · <strong>Advanced real estate search</strong>
</p>

---

## Features

- ✅ Authentication with JWT
- ✅ User authorization and owner-only property access
- ✅ Property listings with real data
- ✅ Property details pages
- ✅ Add property form for authenticated users
- ✅ Delete own property only
- ✅ Cloudinary-powered image upload
- ✅ Advanced search and filtering
- ✅ Property comparison
- ✅ Agent management
- ✅ Inquiry system
- ✅ Responsive design for desktop, tablet, and mobile

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cloudinary
- Multer
- CORS
- dotenv

---

## Project Structure

```bash
HomeScape/
├── .gitignore
├── README.md
├── frontend/
│   ├── .gitignore
│   ├── .eslintrc.cjs
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       ├── components/
│       │   ├── Footer.jsx
│       │   └── Navbar.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── hooks/
│       │   ├── useCompare.js
│       │   └── useReveal.js
│       ├── layouts/
│       │   └── MainLayout.jsx
│       ├── pages/
│       │   ├── AddProperty.jsx
│       │   ├── AgentProfile.jsx
│       │   ├── ComparePage.jsx
│       │   ├── Home.jsx
│       │   ├── InquiryPage.jsx
│       │   ├── Login.jsx
│       │   ├── NotFound.jsx
│       │   ├── PropertyDetails.jsx
│       │   ├── PropertyList.jsx
│       │   └── Register.jsx
│       └── utils/
├── homescape-backend/
│   └── backend/
│       ├── app.js
│       ├── package.json
│       ├── README.md
│       ├── server.js
│       ├── seed.js
│       ├── seedAgents.js
│       ├── config/
│       │   ├── cloudinary.js
│       │   └── db.js
│       ├── controllers/
│       │   ├── agentController.js
│       │   ├── authController.js
│       │   ├── inquiryController.js
│       │   ├── propertyController.js
│       │   └── uploadController.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   ├── errorMiddleware.js
│       │   └── uploadMiddleware.js
│       ├── models/
│       │   ├── Agent.js
│       │   ├── Inquiry.js
│       │   ├── Property.js
│       │   └── User.js
│       ├── routes/
│       │   ├── agentRoutes.js
│       │   ├── authRoutes.js
│       │   ├── inquiryRoutes.js
│       │   ├── propertyRoutes.js
│       │   └── uploadRoutes.js
│       ├── uploads/
│       └── utils/
│           └── generateToken.js
└── LICENSE (if added later)
```

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd HomeScape
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../homescape-backend/backend
npm install
```

### 4. Set up environment variables

Create a `.env` file in the backend directory and configure the following values:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/homescape
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGINS=http://localhost:5173
```

For the frontend, create a `.env` file in the `frontend` folder:

```bash
VITE_API_URL=http://localhost:5000/api
```

### 5. Run the backend

```bash
cd ../homescape-backend/backend
npm run dev
```

### 6. Run the frontend

```bash
cd ../../frontend
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## Environment Variables

Example configuration for backend:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/homescape
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGINS=http://localhost:5173
```

Example configuration for frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

> Never commit real credentials or environment files to Git.

---

## Screenshots

### Home

![Home Placeholder](https://via.placeholder.com/1200x700?text=Home+Page)

### Property Listings

![Property Listings Placeholder](https://via.placeholder.com/1200x700?text=Property+Listings)

### Property Details

![Property Details Placeholder](https://via.placeholder.com/1200x700?text=Property+Details)

### Add Property

![Add Property Placeholder](https://via.placeholder.com/1200x700?text=Add+Property)

### Login

![Login Placeholder](https://via.placeholder.com/1200x700?text=Login)

### Register

![Register Placeholder](https://via.placeholder.com/1200x700?text=Register)

### Compare

![Compare Placeholder](https://via.placeholder.com/1200x700?text=Compare+Properties)

### Agent

![Agent Placeholder](https://via.placeholder.com/1200x700?text=Agent+Profile)

---

## API Overview

The application exposes backend APIs for authentication, property management, agents, and inquiries.

### Authentication
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive JWT
- `GET /api/auth/me` — fetch the authenticated user

### Properties
- `GET /api/properties` — fetch all properties with optional filters
- `GET /api/properties/compare` — compare selected properties
- `GET /api/properties/:id` — fetch a single property
- `POST /api/properties` — create a property (authenticated owner)
- `PUT /api/properties/:id` — update a property (owner only)
- `DELETE /api/properties/:id` — delete a property (owner only)

### Agents
- `GET /api/agents` — list agents
- `POST /api/agents` — create an agent
- `GET /api/agents/:id` — get agent details with associated listings

### Inquiries
- `POST /api/inquiries` — submit a property inquiry
- `GET /api/inquiries` — list inquiries for the logged-in user's properties

---

## Future Improvements

- Add role-based admin dashboards and moderation tools
- Add property editing UI for owners
- Add advanced analytics for listings and inquiries
- Improve image management with album editing and delete support
- Add search suggestions and map-based property browsing
- Expand user profile and saved property functionality

---

## Author

Developed by Hridyansh Joshi

A portfolio-ready full-stack project built with the MERN stack, focused on real-world real estate workflows, secure access, and responsive user experience.

---

<p align="center">
  <sub>HomeScape © 2026</sub>
</p>
