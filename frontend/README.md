# Portfolio — Frontend

React frontend for the ISSA D. Portfolio application.
Design inspiré du terminal, avec thème dark/light, animations fluides et expérience interactive.

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
│   ├── ISSAD.pdf              # CV téléchargeable
│   └── issaphoto.JPG          # Photo de profil
├── src/
│   ├── components/
│   │   ├── layout/            # Header, Footer (each with index.jsx)
│   │   ├── sections/          # Hero, Projects, About, Contact, Histoire, DeployLog
│   │   └── ui/                # Button, Modal, Card, Loader
│   ├── pages/
│   │   ├── Home.jsx           # Main landing page (Hero + Projects + DeployLog + overlays)
│   │   ├── Login.jsx          # Admin login
│   │   ├── Dashboard.jsx      # Admin dashboard (protected)
│   │   └── NotFound.jsx       # 404 page
│   ├── context/
│   │   ├── ThemeContext.jsx    # Dark/light theme
│   │   └── LanguageContext.jsx # FR/EN translations
│   ├── services/
│   │   ├── api.js             # Centralized Axios instance (base URL, auth interceptor)
│   │   └── api/               # Modular API services per resource
│   │       ├── index.js       # Re-exports all services
│   │       ├── auth.js        # login, initAdmin, getMe
│   │       ├── profile.js     # getProfile, updateProfile
│   │       ├── project.js     # CRUD projects
│   │       ├── skill.js       # CRUD skills
│   │       ├── contact.js     # sendMessage, getMessages, etc.
│   │       ├── deployLog.js   # CRUD deploy logs
│   │       └── histoire.js    # CRUD histoire chapters
│   ├── constants/
│   │   └── translations.js    # FR/EN translations for all UI text
│   ├── App.jsx                # React Router setup (/, /login, /dashboard, *)
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles + Tailwind + CSS variables + Design System
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

### Hero Section
- Titre impactant "Étudiant en Cycle Ingénieur d'État" avec effet typographique
- Terminal interactif avec 22 commandes disponibles
- Raccourci clavier `/` pour focus terminal
- Animations d'entrée fluides

### About Overlay
- Photo de profil avec effet glassmorphism
- Cartes d'information non-cliquables (Email, Téléphone, Localisation, GitHub, Langues)
- LinkedIn reste cliquable
- 3 actions principales : Télécharger CV, Lire mon histoire, Me contacter
- Grille de compétences avec effets de survol

### Mon Histoire
- Timeline chronologique avec marqueurs visuels
- Contenu chargé depuis l'API ou fallback local
- Traductions FR/EN

### Projets
- Grille responsive 1/2/3 colonnes
- Filtres par type (Tous, Académique, Personnel)
- Aperçus de code avec dégradés de couleurs
- Tags technologiques
- Projets statiques intégrés (Portfolio, AidFinder)

### Contact
- Formulaire de contact avec validation
- Cartes d'information non-cliquables (sauf LinkedIn)
- Statut de disponibilité
- Liens sociaux GitHub/LinkedIn

### Terminal
- 22 commandes interactives
- Changement de thème dark/light
- Changement de langue FR/EN
- Téléchargement du CV
- Ouverture des réseaux sociaux

### Design System
- Espacements cohérents (section, card, content, button, grid)
- Palette de couleurs terminal (bg, accent, muted, green, red, yellow)
- Animations fluides (fadeUp, fadeIn, photoReveal)
- Responsive : Desktop, Laptop, Tablet, Mobile

### Core
- **Dark/Light theme** with CSS variables
- **Interactive terminal** in hero section
- **Project filtering** by type
- **Contact form** with validation
- **Responsive design** (mobile, tablet, desktop)
- **CSS animations** (fadeIn, fadeUp, photoReveal)
- **API integration** with modular Axios services
- **React Router** for client-side navigation
- **100% JavaScript** (no TypeScript)
- **FR/EN translations** for all UI text