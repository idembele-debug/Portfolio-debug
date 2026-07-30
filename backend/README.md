# Portfolio API — Backend

Backend API for the ISSA D. Portfolio application built with **FastAPI + SQLAlchemy + SQLite**.

## 🚀 Tech Stack

- **Framework**: FastAPI
- **ORM**: SQLAlchemy 2.0 (with relationships)
- **Database**: SQLite (development) / PostgreSQL (production)
- **Migrations**: Alembic
- **Auth**: JWT (PyJWT + passlib + bcrypt)
- **Validation**: Pydantic v2 (pydantic-settings)

## 📂 Project Structure

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
│   │   ├── contact_message.py    # Contact messages
│   │   └── histoire_chapter.py   # Histoire chapters
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

## 🛠️ Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## ⚙️ Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Required variables:**
- `DATABASE_URL`: SQLite (default) or PostgreSQL connection string
- `SECRET_KEY`: JWT secret key (change in production)

## 📦 Database Setup

### Option 1: Auto-create (recommended)
Tables are auto-created on first startup via `Base.metadata.create_all()`.

### Option 2: Alembic migrations
```bash
alembic upgrade head
```

### Seed data
```bash
python seed.py
```

This creates:
- 1 Profile (ISSA Dembélé)
- 35 Skills (Python, JavaScript, React, FastAPI, etc. - répartis en catégories)
- 6 Projects (Academic & Personal)
- 6 Histoire chapters
- 1 Admin user (i.dembele@hestim.ma / admin123)

## 🚀 Running

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**API Docs:** http://localhost:8000/docs
**ReDoc:** http://localhost:8000/redoc

## 🔐 Default Admin

After seeding, the admin is already created. To initialize manually:

```bash
curl -X POST http://localhost:8000/api/auth/init
```

Default credentials (from `.env`):
- Email: `i.dembele@hestim.ma`
- Password: `admin123`

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

## 🗄️ SQLAlchemy Models & Relationships

### Current Models
- **User** — Admin authentication (email, hashed_password, is_admin)
- **Profile** — Portfolio profile (full_name, title, headline, bio, email, phone, location, social URLs, photo, resume)
- **Skill** — Technical skills (name, category, icon, order)
- **Project** — Portfolio projects (title, description, project_type, github_url, live_url, image_url, tags, order)
- **Technology** — Technologies used in projects (name, icon)
- **ContactMessage** — Contact form submissions (name, email, message, is_read)
- **HistoireChapter** — Story chapters (year, title, description, chapter_order)

### Key Relationships
- **Project ↔ Technology**: Many-to-Many via `project_technologies` association table
  - A project can use multiple technologies
  - A technology can be used in multiple projects

## 🧪 Scripts Utiles

```bash
# Amorcer la base de données
python seed.py

# Lancer le serveur
uvicorn app.main:app --reload --port 8000

# Vérifier les endpoints
curl http://localhost:8000/api/profile/
curl http://localhost:8000/api/skills/
curl http://localhost:8000/api/projects/
curl http://localhost:8000/health
```

## 🚢 Deployment (Render)

1. Push to GitHub
2. Create a new **Web Service** on Render
3. Set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables (DATABASE_URL PostgreSQL, SECRET_KEY, ADMIN_EMAIL, ADMIN_PASSWORD)
5. Run `python seed.py` after first deploy
6. Deploy 🚀