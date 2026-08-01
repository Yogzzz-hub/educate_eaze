from sqlalchemy import create_engine
<<<<<<< HEAD
from sqlalchemy.orm import sessionmaker
=======
from sqlalchemy.orm import Session
>>>>>>> ab957b8 (yoga-1)

from app.core.config import settings

engine = create_engine(settings.database_url, future=True)
<<<<<<< HEAD
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, expire_on_commit=False)


def get_db():
    db = SessionLocal()
=======


def get_db():
    db = Session(engine)
>>>>>>> ab957b8 (yoga-1)
    try:
        yield db
    finally:
        db.close()
