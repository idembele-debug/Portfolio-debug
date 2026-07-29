"""Seed script to populate the database with initial data."""
from app.database.session import SessionLocal, engine, Base
from app.models.profile import Profile
from app.models.skill import Skill
from app.models.project import Project
from app.models.user import User
from app.models.histoire_chapter import HistoireChapter
from app.core.security import get_password_hash
from app.core.config import settings


PROFILE_DATA = {
    "full_name": "Issa D. DEMBELE",
    "title": "Étudiant en Ingénierie · Casablanca",
    "headline": "Cycle Ingénieur d'État Informatique & Intelligence Artificielle à HESTIM",
    "bio": (
        "Étudiant en cycle ingénieur à HESTIM Casablanca, originaire du Mali 🇲🇱, "
        "passionné par le développement logiciel et l'intelligence artificielle. "
        "Membre actif du club Rotaract HESTIM, je combine curiosité, rigueur et "
        "motivation pour construire des solutions concrètes.\n\n"
        "Chaque projet est pour moi une opportunité d'apprendre, de collaborer et "
        "de repousser mes limites — du code au déploiement, de l'idée à l'impact."
    ),
    "email": "i.dembele@hestim.ma",
    "phone": "+212-690-611-402",
    "location": "Casablanca, Maroc",
    "linkedin_url": "https://www.linkedin.com/in/issa-d-dembele-a46a34356/",
    "github_url": "https://github.com/idembele-debug",
    "photo_url": "/issaphoto.JPG",
    "resume_url": "/ISSAD.pdf",
    "available_for_work": 1,
}

SKILLS_DATA = [
    # Languages & Frameworks
    {"name": "Python", "category": "langage_framework", "order": 1},
    {"name": "Flask", "category": "langage_framework", "order": 2},
    {"name": "PHP", "category": "langage_framework", "order": 3},
    {"name": "Laravel", "category": "langage_framework", "order": 4},
    {"name": "JavaScript", "category": "langage_framework", "order": 5},
    {"name": "React", "category": "langage_framework", "order": 6},
    {"name": "Langage C", "category": "langage_framework", "order": 7},
    {"name": "Java", "category": "langage_framework", "order": 8},
    {"name": "HTML", "category": "langage_framework", "order": 9},
    {"name": "CSS", "category": "langage_framework", "order": 10},
    {"name": "FastAPI", "category": "langage_framework", "order": 11},
    {"name": "Tailwind CSS", "category": "langage_framework", "order": 12},
    # Tools
    {"name": "VS Code", "category": "outil", "order": 1},
    {"name": "Postman", "category": "outil", "order": 2},
    {"name": "MySQL", "category": "outil", "order": 3},
    {"name": "Word", "category": "outil", "order": 4},
    {"name": "Excel", "category": "outil", "order": 5},
    {"name": "GitHub", "category": "outil", "order": 6},
    {"name": "Git", "category": "outil", "order": 7},
    {"name": "Docker", "category": "outil", "order": 8},
    # Soft skills
    {"name": "Communication efficace", "category": "soft_skill", "order": 1},
    {"name": "Capacité d'adaptation", "category": "soft_skill", "order": 2},
    {"name": "Sens du détail", "category": "soft_skill", "order": 3},
    {"name": "Curiosité", "category": "soft_skill", "order": 4},
    # Footer marquee stack
    {"name": "Python", "category": "stack", "order": 1},
    {"name": "PHP", "category": "stack", "order": 2},
    {"name": "JavaScript", "category": "stack", "order": 3},
    {"name": "React JS", "category": "stack", "order": 4},
    {"name": "Flask", "category": "stack", "order": 5},
    {"name": "HTML", "category": "stack", "order": 6},
    {"name": "CSS", "category": "stack", "order": 7},
    {"name": "C Language", "category": "stack", "order": 8},
    {"name": "MySQL", "category": "stack", "order": 9},
    {"name": "Laravel", "category": "stack", "order": 10},
    {"name": "VS Code", "category": "stack", "order": 11},
]

PROJECTS_DATA = [
    {
        "title": "Analyse du marché automobile",
        "description": (
            "Analyse exploratoire du marché automobile avec Python, Pandas et Numpy. "
            "Visualisation des tendances et extraction d'insights à partir de jeux de données réels."
        ),
        "project_type": "academic",
        "preview_code": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('marche_auto.csv')\ndf.describe()\ndf.plot(kind='bar')",
        "preview_color": "blue",
        "tags": "Python,Pandas,Numpy",
        "order": 1,
    },
    {
        "title": "HESTIM Game",
        "description": (
            "Jeu interactif développé en Python avec interface graphique Tkinter. "
            "Projet académique combinant logique de jeu et expérience utilisateur."
        ),
        "project_type": "academic",
        "preview_code": "JEU HESTIM\n\nGUI: Tkinter\nLang: Python\n\n→ Game loop\n→ Score system",
        "preview_color": "purple",
        "tags": "Python,Tkinter",
        "order": 2,
    },
    {
        "title": "Jardinage App",
        "description": (
            "Application web de gestion de jardinage avec Flask, HTML et CSS. "
            "Suivi des plantes, planning d'arrosage et interface responsive."
        ),
        "project_type": "academic",
        "preview_code": "Jardinage App\n\nFLASK + HTML/CSS\n\n→ CRUD plantes\n→ Planning arrosage",
        "preview_color": "green",
        "tags": "Python,Flask,HTML,CSS",
        "order": 3,
    },
    {
        "title": "HESTYBot",
        "description": (
            "Bot conversationnel avec API Flask et JSON. "
            "Endpoint REST pour questions/réponses et intégration dans des applications web."
        ),
        "project_type": "academic",
        "preview_code": 'POST /api/ask\nContent-Type: application/json\n\n{"question": "..."}\n→ "Quel est votre problème?"',
        "preview_color": "teal",
        "tags": "Python,Flask,JSON API",
        "order": 4,
    },
    {
        "title": "AidFinder",
        "description": (
            "Plateforme intelligente pour trouver des aides, bourses et opportunités "
            "adaptées au profil utilisateur grâce à un moteur de recherche et recommandations."
        ),
        "project_type": "academic",
        "preview_code": "AidFinder\n\nReact · FastAPI\nPostgreSQL · JWT\n\n→ Matching engine\n→ Personalized results",
        "preview_color": "purple",
        "tags": "React,FastAPI,Python,PostgreSQL",
        "order": 5,
    },
    {
        "title": "Portfolio",
        "description": (
            "Portfolio interactif inspiré d'un terminal Linux. Animations modernes, "
            "mode clair/sombre, multilingue, téléchargement CV et design responsive."
        ),
        "project_type": "personal",
        "preview_code": "Portfolio Terminal\n\nReact · Tailwind CSS\nFastAPI · Vite\n\n$ npm run dev\n✓ Build successful",
        "preview_color": "blue",
        "tags": "React,Tailwind CSS,FastAPI,Vite",
        "order": 6,
    },
]

HISTOIRE_CHAPTERS = [
    {
        "title": "Mon Enfance : Les Premiers Pas",
        "content": (
            "Je suis né en septembre 2004 dans la famille Dembélé, aîné des garçons au sein d'un patrimoine "
            "familial riche de traditions. Je m'appelle ISSA D., originaire du Mali, le pays de la prospérité "
            "et de la fidélité. Tel est le fil conducteur de mon histoire, mêlant épreuves, passions et espoirs.\n\n"
            "Comme tout homme ou toute femme avant de devenir qui il est aujourd'hui, chacun passe par une "
            "enfance où tout est petit, innocent et pur. C'est là que mon histoire a commencé. J'ai grandi "
            "entouré de ma famille – Al hamdulillah, qu'Allah m'ait béni de ce bonheur simple. Ma mère me raconte "
            "souvent que j'étais un enfant potelé, si gros que j'avais du mal à marcher. Avec un sourire complice, "
            "elle ajoute que j'étais le seul parmi ses enfants à avoir un jour décidé d'arrêter de téter son lait "
            "maternel. J'avais découvert mon péché mignon : la nourriture."
        ),
        "chapter_order": 1,
    },
    {
        "title": "Mes Débuts Scolaires et Ma Première Passion",
        "content": (
            "Lors d'un TEDx, j'avais défendu un thème qui résonne encore aujourd'hui : « Le talent m'a ignoré, "
            "mais j'ai choisi l'effort ». Je n'avais pas menti. Le dessin me passionnait depuis l'enfance. Au début, "
            "rien n'était facile. Mes parents désapprouvaient cette vocation, et mes croquis incessants se soldaient "
            "par de mauvaises notes à la maison. Ils me sermonnaient, mais cette flamme restait vive, inébranlable.\n\n"
            "En grandissant, j'ai dû affronter la réalité d'un monde complexe et impitoyable. Je me suis débrouillé seul, "
            "tandis que mes parents continuaient de me soutenir sans faiblir. Avec le temps, j'ai rangé mes crayons pour "
            "embrasser une nouvelle passion : le football."
        ),
        "chapter_order": 2,
    },
    {
        "title": "Le Football, la Blessure et le Renoncement",
        "content": (
            "Jusqu'à mes années de lycée, je croyais que c'était la bonne voie. Ma famille approuvait et, fidèle à son "
            "habitude, ne m'a jamais abandonné. Mais un jour funeste, une blessure grave au genou a tout changé. "
            "Elle m'a freiné à jamais. Je l'avoue : durant cette année de calvaire, le joueur en moi s'éteignait peu "
            "à peu. Voir mon jeune frère sur le terrain, tentant d'imiter mes gestes, me déchirait le cœur.\n\n"
            "Quand les médecins m'ont autorisé à reprendre, le doute m'habitait ; j'ai essayé, puis abandonné, malgré le "
            "soutien familial qui me poussait à y croire. En observant mon frère s'épanouir, j'ai décidé de lâcher prise. "
            "Le foot ne serait plus qu'un divertissement occasionnel. J'ai cédé ma place et me suis promis : « J'emprunterai "
            "un autre chemin. Être joueur n'est pas ma destinée. »"
        ),
        "chapter_order": 3,
    },
    {
        "title": "Le Baccalauréat et l'Arrivée au Maroc",
        "content": (
            "Tout cela s'est déroulé durant mes années de lycée, jusqu'à l'obtention de mon baccalauréat en août 2021. "
            "Je me sentais fier, mais inquiet pour la suite. Puis vint mon arrivée au Maroc en 2023. Ces trois années ont "
            "bouleversé mon existence – une saga si dense que je pourrais y consacrer des jours entiers.\n\n"
            "Grâce à ces expériences, j'ai gravé en moi deux leçons fondamentales : « Qui était là quand tu étais dans le "
            "besoin ? » et « Qui t'a aidé à t'en sortir ? ». Vous connaissez l'essentiel de mon passé, même s'il comporte "
            "quelques silences. L'essentiel est dit."
        ),
        "chapter_order": 4,
    },
    {
        "title": "Mon Présent en 2026",
        "content": (
            "Aujourd'hui, en 2026, à Casablanca, je poursuis mon chemin avec détermination en étant étudiant en filière "
            "informatique."
        ),
        "chapter_order": 5,
    },
    {
        "title": "Mon Futur",
        "content": (
            "Dans deux ans, insh'Allah si Allah le veut, car l'homme propose et Dieu dispose, je me vois décrocher mon "
            "diplôme d'ingénieur. J'acquerrai ensuite de nouvelles expériences avant de viser un bon emploi stable. "
            "Le futur étant incertain, je refuse de me contenter de penser ou de rêver ; je veux agir comme un vrai "
            "bâtisseur d'avenir.\n\n"
            "J'espère que cette histoire vous touchera et vous inspirera. Nous nous reverrons un autre jour."
        ),
        "chapter_order": 6,
    },
]


def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # --- Profile (upsert) ---
        profile = db.query(Profile).first()
        if profile:
            for key, value in PROFILE_DATA.items():
                setattr(profile, key, value)
            print("✓ Profile updated")
        else:
            db.add(Profile(**PROFILE_DATA))
            print("✓ Profile created")

        # --- Skills (replace) ---
        db.query(Skill).delete()
        for skill_data in SKILLS_DATA:
            db.add(Skill(**skill_data))
        print(f"✓ Skills seeded ({len(SKILLS_DATA)})")

        # --- Projects (replace) ---
        db.query(Project).delete()
        for project_data in PROJECTS_DATA:
            db.add(Project(**project_data))
        print(f"✓ Projects seeded ({len(PROJECTS_DATA)})")

        # --- Histoire (replace) ---
        db.query(HistoireChapter).delete()
        for chapter_data in HISTOIRE_CHAPTERS:
            db.add(HistoireChapter(**chapter_data))
        print(f"✓ Histoire chapters seeded ({len(HISTOIRE_CHAPTERS)})")

        # --- Admin user ---
        admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin:
            db.add(User(
                email=settings.ADMIN_EMAIL,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                is_admin=True,
            ))
            print("✓ Admin user created")

        db.commit()
        print("\n✅ Seed completed successfully!")
        print(f"  - Profile:  {db.query(Profile).count()}")
        print(f"  - Skills:   {db.query(Skill).count()}")
        print(f"  - Projects: {db.query(Project).count()}")
        print(f"  - Histoire: {db.query(HistoireChapter).count()}")
        print(f"  - Users:    {db.query(User).count()}")

    except Exception as e:
        db.rollback()
        print(f"❌ Error during seeding: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
