import random
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.models.base import Base

DATABASE_URL = "postgresql+psycopg://postgres:postgres@db:5432/academic_platform"
engine = create_engine(DATABASE_URL)


def seed() -> None:
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        university_name = "Northbridge State University"
        college_names = [f"Demo College {i}" for i in range(1, 31)]
        print(f"Seeded university: {university_name}")
        for name in college_names:
            print(f"Seeded college: {name}")
        session.commit()


if __name__ == "__main__":
    seed()
