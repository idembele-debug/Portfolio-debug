# Portfolio — Frontend

React frontend for the ISSA D. Portfolio application.

## 🚀 Tech Stack

- **Framework**: React 19 (JavaScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **HTTP Client**: Axios (modular services)
- **Forms**: React Hook Form
- **Validation**: Zod

## 📂 Project Structure

```
frontend/
├── public/
│   ├── images/
│   └── pdf/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer (each with index.jsx)
│   │   ├── sections/        # Hero, Projects, About, Contact, Histoire, DeployLog, TechStack
│   │   └── ui/              # Button, Modal, Card, Loader (to be added)
│   ├── pages/
│   │   ├── Home.jsx         # Main landing page (Hero + Projects + DeployLog + overlays)
│   │   ├── Login.jsx        # Admin login
│   │   ├── Dashboard.jsx    # Admin dashboard (protected)
│   │   └── NotFound.jsx     # 404 page
│   ├── context/
│   │   └── ThemeContext.jsx  # Dark/light theme
│   ├── services/
│   │   ├── api.js           # Centralized Axios instance (base URL, auth interceptor)
│   │   └── api/             # Modular API services per resource
│   │       ├── index.js     # Re-exports all services
│   │       ├── auth.js      # login, initAdmin, getMe
│   │       ├── profile.js   # getProfile, updateProfile
│   │       ├── project.js   # CRUD projects
│   │       ├── skill.js     # CRUD skills
│   │       ├── contact.js   # sendMessage, getMessages, etc.
│   │       ├── deployLog.js # CRUD deploy logs
│   │       └── histoire.js  # CRUD histoire chapters
│   ├── utils/               # helpers, validators, formatters (to be added)
│   ├── constants/           # Constants (to be added)
│   ├── config/              # Configuration (to be added)
│   ├── hooks/               # Custom hooks (to be added)
│   ├── styles/              # Additional styles (to be added)
│   ├── App.jsx              # React Router setup (/, /login, /dashboard, *)
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles + Tailwind + CSS variables
├── index.html
├── vite.config.js
├── package.json
└── .env.example
```

## 🛠️ Installation

```bash
cd frontend
npm install
```

## ⚙️ Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

**Variables:**
- `VITE_API_URL`: Backend API URL (default: `http://localhost:8000/api`)
- `VITE_APP_NAME`: Application name

## 🚀 Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable `VITE_API_URL`
5. Deploy 🚀

## 🗺️ Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Main portfolio page |
| `/login` | Login | Admin authentication |
| `/dashboard` | Dashboard | Admin panel (protected) |
| `*` | NotFound | 404 page |

## 🎨 Features

- **Dark/Light theme** with CSS variables
- **Interactive terminal** in hero section
- **Project filtering** by type
- **Contact form** with validation
- **Responsive design** (mobile, tablet, desktop)
- **CSS animations** (fadeIn, fadeUp, photoReveal)
- **API integration** with modular Axios services
- **React Router** for client-side navigation
- **100% JavaScript** (no TypeScript)