# Portfolio API — Backend

Backend API for the ISSA D. Portfolio application built with FastAPI.

## 🚀 Tech Stack

- **Framework**: FastAPI
- **ORM**: SQLAlchemy 2.0 (with relationships)
- **Database**: PostgreSQL
- **Migrations**: Alembic
- **Auth**: JWT (python-jose)
- **Validation**: Pydantic v2

## 📂 Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.py           # Authentication (login, JWT)
│   │   │   ├── profile.py        # Profile CRUD
│   │   │   ├── skills.py         # Skills CRUD
│   │   │   ├── projects.py       # Projects CRUD
│   │   │   ├── contact.py        # Contact messages
│   │   │   ├── histoire.py       # Histoire chapters
│   │   │   └── deploy_logs.py    # Deploy logs
│   │   └── router.py             # Main router
│   ├── core/
│   │   ├── config.py             # Settings (pydantic-settings)
│   │   └── security.py           # JWT, password hashing
│   ├── database/
│   │   └── session.py            # SQLAlchemy engine & session
│   ├── models/                   # SQLAlchemy models
│   │   ├── user.py               # User (admin)
│   │   ├── profile.py            # Profile
│   │   ├── skill.py              # Skill
│   │   ├── project.py            # Project (with M2M to Technology)
│   │   ├── technology.py         # Technology
│   │   ├── project_technology.py # Association table (Project <-> Technology)
│   │   ├── contact_message.py    # Contact messages
│   │   ├── histoire_chapter.py   # Histoire chapters
│   │   └── deploy_log.py         # Deploy logs
│   ├── schemas/                  # Pydantic schemas
│   ├── constants/                # roles.py, status.py, permissions.py
│   ├── uploads/                  # profile/, projects/, cv/
│   ├── crud/                     # Generic CRUD base
│   └── main.py                   # FastAPI app entry point
├── alembic/                      # Database migrations
├── requirements.txt
└── .env.example
```

## 🛠️ Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## ⚙️ Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Required variables:**
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT secret key (change in production)

## 📦 Database Setup

```bash
# Create the database
createdb portfolio_db

# Run migrations
alembic upgrade head
```

Tables are also auto-created on first startup via `Base.metadata.create_all()`.

## 🚀 Running

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**API Docs:** http://localhost:8000/docs

## 🔐 Default Admin

After starting the server, initialize the admin:

```bash
curl -X POST http://localhost:8000/api/auth/init
```

Default credentials (from `.env`):
- Email: `i.dembele@hestim.ma`
- Password: `admin123`

## 📡 API Endpoints

### Public
- `GET /api/profile/` — Get profile
- `GET /api/skills/` — List skills
- `GET /api/projects/` — List projects
- `GET /api/histoire/` — List histoire chapters
- `GET /api/deploy-logs/` — List deploy logs
- `POST /api/contact/` — Send contact message

### Auth Required
- `POST /api/auth/login` — Get JWT token
- `PUT /api/profile/` — Update profile
- `POST/PUT/DELETE /api/skills/` — Manage skills
- `POST/PUT/DELETE /api/projects/` — Manage projects
- `GET/PUT/DELETE /api/contact/` — Manage messages
- `POST/PUT/DELETE /api/histoire/` — Manage chapters
- `POST/DELETE /api/deploy-logs/` — Manage logs

## 🗄️ SQLAlchemy Models & Relationships

### Current Models
- **User** — Admin authentication
- **Profile** — Portfolio profile information
- **Skill** — Technical skills with categories
- **Project** — Portfolio projects
- **Technology** — Technologies used in projects
- **ContactMessage** — Contact form submissions
- **HistoireChapter** — Story chapters
- **DeployLog** — Deployment/activity logs

### Key Relationships
- **Project ↔ Technology**: Many-to-Many via `project_technologies` association table
  - A project can use multiple technologies
  - A technology can be used in multiple projects

## 🚢 Deployment (Render)

1. Push to GitHub
2. Create a new **Web Service** on Render
3. Set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables
5. Deploy 🚀