# Portfolio ISSA D.

Portfolio personnel moderne construit avec **React 19 + FastAPI + PostgreSQL**.
Design inspiré du terminal, avec thème dark/light, animations fluides et expérience interactive.

## 🏗️ Architecture

```
Portfolio-debug/
├── frontend/          # React 19 + Vite + Tailwind CSS v4 (JavaScript)
├── backend/           # FastAPI + SQLAlchemy + PostgreSQL
├── backup-assets/     # Fichiers originaux (HTML, images, PDF)
│   ├── portfolio-issad.html   # Portfolio HTML original (NE PAS MODIFIER)
│   ├── images/
│   └── pdf/
└── README.md
```

## 🚀 Technologies

### Frontend
- **React 19** — UI Framework
- **Vite** — Build tool
- **Tailwind CSS v4** — Styling
- **React Router DOM** — Routing (/ , /login, /dashboard, *)
- **Axios** — HTTP client (services modulaires par ressource)
- **React Hook Form** — Form management
- **Zod** — Validation

### Backend
- **FastAPI** — API Framework
- **SQLAlchemy 2.0** — ORM (avec relations Many-to-Many)
- **Alembic** — Migrations
- **PostgreSQL** — Database
- **JWT** — Authentication
- **Pydantic v2** — Validation

### Déploiement
- **Frontend** → Vercel
- **Backend** → Render
- **Database** → Neon

## ✨ Fonctionnalités

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

## 📁 Structure détaillée

### Frontend (`frontend/`)
```
frontend/
├── public/
│   ├── ISSAD.pdf              # CV téléchargeable
│   └── issaphoto.JPG          # Photo de profil
├── src/
│   ├── assets/                # Images statiques
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, Projects, About, Contact, Histoire, DeployLog
│   │   └── ui/                # Button, Modal, Card, Loader
│   ├── pages/                 # Home, Login, Dashboard, NotFound
│   ├── hooks/                 # Custom hooks
│   ├── context/               # ThemeContext (dark/light), LanguageContext
│   ├── services/
│   │   ├── api.js             # Instance Axios centralisée
│   │   └── api/               # Services par ressource (auth, profile, project, skill, contact, deployLog, histoire)
│   ├── utils/                 # helpers, validators, formatters
│   ├── constants/             # Traductions FR/EN
│   ├── config/                # Configuration
│   ├── styles/                # Styles additionnels
│   ├── App.jsx                # React Router (root)
│   └── main.jsx               # Point d'entrée
├── index.html
├── vite.config.js
└── package.json
```

### Backend (`backend/`)
```
backend/
├── app/
│   ├── api/routes/            # Routes CRUD (auth, profile, skills, projects, contact, histoire, deploy-logs)
│   ├── core/                  # Configuration, sécurité JWT
│   ├── database/              # SQLAlchemy session
│   ├── models/                # Modèles (User, Profile, Skill, Project, Technology, ContactMessage, etc.)
│   ├── schemas/               # Schémas Pydantic
│   ├── constants/             # roles.py, status.py, permissions.py
│   ├── uploads/               # profile/, projects/, cv/
│   └── main.py                # Point d'entrée FastAPI
├── alembic/                   # Migrations
└── requirements.txt
```

## 🔐 Admin Initialization

```bash
curl -X POST http://localhost:8000/api/auth/init
```

## 🌐 Variables d'environnement

### Backend (`.env`)
```
DATABASE_URL=postgresql://user:pass@host:5432/portfolio_db
SECRET_KEY=your-secret-key
ADMIN_EMAIL=i.dembele@hestim.ma
ADMIN_PASSWORD=admin123
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=ISSA D. Portfolio
```

## 🚢 Déploiement

### Frontend → Vercel
1. Connecter le repo GitHub
2. Framework: Vite
3. Build: `npm run build`
4. Output: `dist`
5. Ajouter `VITE_API_URL`

### Backend → Render
1. Web Service depuis le repo
2. Build: `pip install -r requirements.txt`
3. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Ajouter les variables d'environnement

### Database → Neon
1. Créer un projet PostgreSQL sur Neon
2. Copier la connection string dans les variables d'environnement Render