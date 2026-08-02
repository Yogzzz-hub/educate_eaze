from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.academic import College, Department, Programme, Subject, User, UserRole
from app.models.base import Base
from app.db import engine
from app.api.academic import pwd_context


def seed_demo_accounts() -> None:
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        if session.query(User).count() > 0:
            return
        college = College(name='Northbridge College', location='San Francisco')
        session.add(college)
        session.flush()

        department = Department(name='Computer Science', college_id=college.id)
        session.add(department)
        session.flush()

        programme = Programme(name='BSc Computer Science', college_id=college.id, department_id=department.id)
        session.add(programme)
        session.flush()

        subject = Subject(name='Algorithms', programme_id=programme.id)
        session.add(subject)
        session.flush()

        users = [
            User(email='university@example.com', password_hash=pwd_context.hash('password123'), full_name='University Admin', role=UserRole.UNIVERSITY_ADMIN.value),
            User(email='college@example.com', password_hash=pwd_context.hash('password123'), full_name='College Admin', role=UserRole.COLLEGE_ADMIN.value, college_id=college.id),
            User(email='faculty@example.com', password_hash=pwd_context.hash('password123'), full_name='Faculty User', role=UserRole.FACULTY.value, college_id=college.id, department_id=department.id),
            User(email='student@example.com', password_hash=pwd_context.hash('password123'), full_name='Student User', role=UserRole.STUDENT.value, college_id=college.id, department_id=department.id, programme_id=programme.id),
        ]
        session.add_all(users)
        session.commit()
        print('Demo accounts created')


if __name__ == '__main__':
    seed_demo_accounts()
