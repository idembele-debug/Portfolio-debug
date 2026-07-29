"""Seed script to populate the database with initial data."""
from app.database.session import SessionLocal, engine, Base
from app.models.profile import Profile
from app.models.skill import Skill
from app.models.project import Project
from app.models.user import User
from app.core.security import get_password_hash
from app.core.config import settings


def seed_database():
    # Create all tables first
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # --- Profile ---
        existing_profile = db.query(Profile).first()
        if not existing_profile:
            profile = Profile(
                full_name="ISSA Dembélé",
                title="Développeur Full Stack & Étudiant en Ingénierie Informatique",
                headline="Étudiant en 2ème année à HESTIM · Ingénierie Informatique et Réseaux",
                bio="Étudiant en génie informatique passionné par le développement web, l'IA et la cybersécurité. "
                    "Actuellement en 2ème année à HESTIM, je construis des applications modernes avec React, "
                    "FastAPI et Python. Je crois en l'apprentissage continu et la collaboration open source.",
                email="i.dembele@hestim.ma",
                phone="+212 690611402",
                location="Casablanca, Maroc",
                linkedin_url="https://www.linkedin.com/in/issa-d-dembele-a46a34356/",
                github_url="https://github.com/idembele-debug",
                photo_url="/issaphoto.JPG",
                resume_url="/ISSAD.pdf",
                available_for_work=1,
            )
            db.add(profile)
            print("✓ Profile created")

        # --- Skills ---
        if db.query(Skill).count() == 0:
            skills_data = [
                {"name": "Python", "category": "langage", "order": 1},
                {"name": "JavaScript", "category": "langage", "order": 2},
                {"name": "React", "category": "framework", "order": 3},
                {"name": "FastAPI", "category": "framework", "order": 4},
                {"name": "SQL", "category": "langage", "order": 5},
                {"name": "Tailwind CSS", "category": "framework", "order": 6},
                {"name": "TypeScript", "category": "langage", "order": 7},
                {"name": "Node.js", "category": "framework", "order": 8},
                {"name": "Git", "category": "outil", "order": 9},
                {"name": "Docker", "category": "outil", "order": 10},
                {"name": "Linux", "category": "outil", "order": 11},
                {"name": "PHP", "category": "langage", "order": 12},
                {"name": "C", "category": "langage", "order": 13},
            ]
            for skill_data in skills_data:
                skill = Skill(**skill_data)
                db.add(skill)
            print("✓ Skills created")

        # --- Admin user ---
        admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin:
            admin = User(
                email=settings.ADMIN_EMAIL,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                is_admin=True,
            )
            db.add(admin)
            print("✓ Admin user created")

        db.commit()
        print("\n✅ Seed completed successfully!")
        print(f"  - Profile: {db.query(Profile).count()}")
        print(f"  - Skills:  {db.query(Skill).count()}")
        print(f"  - Users:   {db.query(User).count()}")

    except Exception as e:
        db.rollback()
        print(f"❌ Error during seeding: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()