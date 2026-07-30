# Portfolio ISSA D.

Portfolio personnel moderne construit avec **React 19 + FastAPI + SQLite**.
Design inspiré du terminal, avec thème dark/light, animations fluides et expérience interactive.

## 🏗️ Architecture

```
Portfolio-debug/
├── frontend/          # React 19 + Vite + Tailwind CSS v4 (JavaScript)
├── backend/           # FastAPI + SQLAlchemy + SQLite (avec seed data)
├── backup-assets/     # Fichiers originaux (HTML, images, PDF)
│   ├── images/
│   └── pdf/
├── Maquette/          # Maquettes UI
└── README.md
```

## 🚀 Technologies

### Frontend
- **React 19** — UI Framework
- **Vite** — Build tool
- **Tailwind CSS v4** — Styling (Utility-first)
- **React Router DOM** — Routing (/ , /login, /dashboard, *)
- **Axios** — HTTP client (services modulaires par ressource)

### Backend
- **FastAPI** — API Framework (Python)
- **SQLAlchemy 2.0** — ORM (avec relations Many-to-Many)
- **Alembic** — Migrations
- **SQLite** — Database (développement) / PostgreSQL (production)
- **JWT** — Authentication (PyJWT + passlib + bcrypt)
- **Pydantic v2** — Validation (pydantic-settings)

### Déploiement
- **Frontend** → Vercel
- **Backend** → Render
- **Database** → Neon (PostgreSQL)

## ✨ Fonctionnalités

### Hero Section
- Titre impactant avec effet typographique
- Terminal interactif avec 22 commandes disponibles
- Raccourci clavier `/` pour focus terminal
- Animations d'entrée fluides
- Changement de thème et langue depuis le terminal
- Design responsive optimisé (320px à 1536px)

### About Overlay
- Photo de profil avec effet glassmorphism
- Données chargées depuis l'API (GET /api/profile/)
- Compétences chargées depuis l'API (GET /api/skills/)
- Fallback vers données statiques si API indisponible
- Cartes d'information non-cliquables (Email, Téléphone, Localisation, Langues)
- LinkedIn cliquable
- 3 actions principales : Télécharger CV, Lire mon histoire, Me contacter

### Mon Histoire (Histoire)
- Timeline chronologique avec marqueurs visuels
- Contenu chargé depuis l'API ou fallback local
- Traductions FR/EN

### Projets
- Grille responsive 1/2/3 colonnes
- Filtres par type (Tous, Académique, Personnel)
- Tags technologiques
- Données chargées depuis l'API (GET /api/projects/)

### Contact
- Formulaire de contact avec validation
- Envoi via API (POST /api/contact/)
- Cartes d'information non-cliquables (sauf LinkedIn)
- Statut de disponibilité dynamique

### Terminal
- 22 commandes interactives
- Changement de thème dark/light
- Changement de langue FR/EN
- Téléchargement du CV
- Ouverture des réseaux sociaux

### Dashboard (Admin)
- Page de login avec JWT
- Gestion des messages reçus
- Gestion des projets, compétences
- Routes protégées par authentification

### Design System
- Espacements cohérents (section, card, content, button, grid)
- Palette de couleurs terminal (bg, accent, muted, green, red, yellow)
- Animations fluides (fadeUp, fadeIn, photoReveal)
- Responsive optimisé : 320px, 375px, 390px, 430px, 640px, 768px, 1024px, 1280px, 1536px
- Breakpoints : mobile, tablet, laptop, desktop

## 📁 Structure détaillée

### Frontend (`frontend/`)
```
frontend/
├── public/
│   ├── ISSAD.pdf              # CV téléchargeable
│   ├── issaphoto.JPG          # Photo de profil
│   ├── favicon.svg            # Favicon
│   └── icons.svg              # Icônes SVG
├── src/
│   ├── assets/                # Images statiques (hero.png, react.svg, vite.svg)
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, Projects, About, Contact, Histoire
│   │   └── ui/                # Button, Modal, Card, Loader
│   ├── pages/                 # Home, Login, Dashboard, NotFound
│   ├── hooks/                 # Custom hooks
│   ├── context/               # ThemeContext (dark/light), LanguageContext (FR/EN)
│   ├── services/
│   │   ├── api.js             # Instance Axios centralisée (baseURL: /api)
│   │   └── api/               # Services par ressource (auth, profile, project, skill, contact, histoire)
│   ├── constants/             # Traductions FR/EN
│   ├── App.jsx                # React Router (root)
│   └── main.jsx               # Point d'entrée
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

### Backend (`backend/`)
```
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.py           # Authentication (login, init, JWT, /me)
│   │   │   ├── profile.py        # Profile GET/PUT
│   │   │   ├── skills.py         # Skills CRUD
│   │   │   ├── projects.py       # Projects CRUD + filtre par type
│   │   │   ├── contact.py        # Contact messages (POST public, GET/PUT/DELETE auth)
│   │   │   └── histoire.py       # Histoire chapters CRUD
│   │   └── router.py             # Main router (inclut toutes les routes)
│   ├── core/
│   │   ├── config.py             # Settings (pydantic-settings)
│   │   └── security.py           # JWT, password hashing (passlib+bcrypt)
│   ├── database/
│   │   └── session.py            # SQLAlchemy engine & session
│   ├── models/                   # SQLAlchemy models (7 modèles)
│   │   ├── user.py               # User (admin auth)
│   │   ├── profile.py            # Profile (nom, titre, bio, email, etc.)
│   │   ├── skill.py              # Skill (nom, catégorie, ordre)
│   │   ├── project.py            # Project (titre, description, type, tags, URLs)
│   │   ├── technology.py         # Technology
│   │   ├── project_technology.py # Association table (Project <-> Technology)
│   │   ├── contact_message.py    # Contact messages (nom, email, message, lu/non lu)
│   │   └── histoire_chapter.py   # Histoire chapters (année, titre, description, ordre)
│   ├── schemas/                  # Pydantic schemas (7 schémas)
│   ├── constants/                # (réservé) roles.py, status.py, permissions.py
│   ├── uploads/                  # profile/, projects/, cv/
│   └── main.py                   # FastAPI app entry point
├── alembic/                      # Database migrations
│   └── versions/
│       └── 7d9418e99f45_initial_migration.py
├── seed.py                       # Script d'amorçage des données
├── requirements.txt
├── portfolio.db                  # Base SQLite (développement)
├── .env.example
├── alembic.ini
└── README.md
```

## 🔧 Installation

### Prérequis
- Node.js >= 18
- Python >= 3.10
- pip

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python seed.py                    # Amorcer les données initiales
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev                       # http://localhost:5173
```

## 🔐 Authentification Admin

```bash
# Initialiser l'admin (première fois)
curl -X POST http://localhost:8000/api/auth/init

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"i.dembele@hestim.ma","password":"admin123"}'
```

## 🌐 Variables d'environnement

### Backend (`.env`)
```
DATABASE_URL=sqlite:///./portfolio.db
SECRET_KEY=super-secret-key-change-in-production
ADMIN_EMAIL=i.dembele@hestim.ma
ADMIN_PASSWORD=admin123
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=ISSA D. Portfolio
```

## 📡 API Endpoints

### Public (no auth required)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/profile/` | Profil portfolio |
| GET | `/api/skills/` | Liste des compétences |
| GET | `/api/projects/` | Liste des projets (filtre: ?project_type=academic) |
| GET | `/api/histoire/` | Chapitres Histoire |
| POST | `/api/contact/` | Envoyer un message |
| POST | `/api/auth/init` | Initialiser admin |
| POST | `/api/auth/login` | Connexion (JWT) |

### Authentifié (Bearer Token required)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/auth/me` | Infos utilisateur |
| PUT | `/api/profile/` | Mettre à jour le profil |
| POST | `/api/skills/` | Créer une compétence |
| PUT | `/api/skills/{id}` | Modifier une compétence |
| DELETE | `/api/skills/{id}` | Supprimer une compétence |
| GET | `/api/projects/{id}` | Détail d'un projet |
| POST | `/api/projects/` | Créer un projet |
| PUT | `/api/projects/{id}` | Modifier un projet |
| DELETE | `/api/projects/{id}` | Supprimer un projet |
| GET | `/api/contact/` | Messages reçus |
| PUT | `/api/contact/{id}/read` | Marquer comme lu |
| DELETE | `/api/contact/{id}` | Supprimer un message |
| POST | `/api/histoire/` | Créer un chapitre |
| PUT | `/api/histoire/{id}` | Modifier un chapitre |
| DELETE | `/api/histoire/{id}` | Supprimer un chapitre |

### Autres
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Infos API |
| GET | `/health` | Health check |
| GET | `/docs` | Swagger UI |
| GET | `/redoc` | ReDoc UI |
| GET | `/uploads/*` | Fichiers statiques (CV, photos) |

## 🎮 Commandes Terminal Disponibles

| Commande | Description |
|----------|-------------|
| `help` | Affiche l'aide |
| `clear` | Nettoie le terminal |
| `whoami` / `about` | À propos |
| `history` | Mon histoire |
| `projects` | Mes projets |
| `skills` | Mes compétences |
| `contact` | Me contacter |
| `social` | Réseaux sociaux |
| `github` | Mon GitHub |
| `linkedin` | Mon LinkedIn |
| `cv` | Télécharger mon CV |
| `email` | Mon email |
| `theme` | Changer le thème |
| `language` / `langage` | Changer la langue |
| `time` / `date` | Date et heure |
| `experience` | Expérience |
| `education` | Éducation |
| `ls` | Lister les dossiers |
| `pwd` | Répertoire courant |
| `echo` | Écho |

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
4. Ajouter les variables d'environnement (DATABASE_URL PostgreSQL, SECRET_KEY)

### Database → Neon
1. Créer un projet PostgreSQL sur Neon
2. Copier la connection string dans les variables d'environnement Render
3. Exécuter `python seed.py` une fois le backend déployé

## 🧪 Scripts Utiles

```bash
# Amorcer la base de données
cd backend && python seed.py

# Lancer le backend
uvicorn app.main:app --reload --port 8000

# Lancer le frontend
cd frontend && npm run dev

# Build frontend
cd frontend && npm run build

# Vérifier les endpoints
curl http://localhost:8000/api/profile/
curl http://localhost:8000/api/skills/
curl http://localhost:8000/api/projects/
curl http://localhost:8000/health
```

## 📋 Roadmap

- [x] Architecture terminal interactive
- [x] Thème dark/light
- [x] Traductions FR/EN
- [x] Backend FastAPI complet (CRUD)
- [x] Authentification JWT
- [x] Dashboard admin
- [x] Seed data
- [ ] Tests unitaires et d'intégration
- [ ] Upload de fichiers (CV, photos)
- [ ] Mode hors-ligne / PWA
- [ ] CI/CD pipeline

## 🤝 Contribution

Projet personnel - Les suggestions et issues sont les bienvenues.