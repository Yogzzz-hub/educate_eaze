import random

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.auth_utils import hash_password
from app.core.config import settings
from app.models.academic import (
    AiAlert,
    AttendanceRecord,
    College,
    Department,
    Faculty,
    Grievance,
    InternalMark,
    Notification,
    PracticalMark,
    Programme,
    Student,
    Submission,
    University,
    User,
    Workflow,
)
from app.models.base import Base


engine = create_engine(str(settings.database_url), future=True)


def build_demo_payload() -> dict[str, object]:
    """Return lightweight demo data used by tests and previews."""

    return {
        "university": {
            "name": "Northbridge State University",
            "location": "San Francisco, CA",
        },
        "colleges": [
            {
                "name": "College of Engineering",
            }
        ],
        "faculty": [
            {
                "name": "Dr. Maya Chen",
                "department": "Computer Science",
            },
            {
                "name": "Prof. Daniel Ortiz",
                "department": "Mathematics",
            },
        ],
        "students": [
            {
                "name": f"Student {index}",
                "email": f"student{index}@northbridge.edu",
            }
            for index in range(1, 11)
        ],
        "subjects": [
            {
                "name": "Algorithms",
            },
            {
                "name": "Discrete Mathematics",
            },
            {
                "name": "Research Methods",
            },
        ],
        "exams": [
            {
                "name": "Midterm Review",
                "subject": "Algorithms",
            }
        ],
    }


def seed() -> None:
    """Reset and seed the EduEase development database."""

    Base.metadata.create_all(engine)

    with Session(engine) as session:
        # Delete dependent records first to avoid foreign-key errors.
        session.query(AiAlert).delete()
        session.query(Notification).delete()
        session.query(Workflow).delete()
        session.query(Grievance).delete()
        session.query(Submission).delete()
        session.query(PracticalMark).delete()
        session.query(InternalMark).delete()
        session.query(AttendanceRecord).delete()
        session.query(Student).delete()
        session.query(Faculty).delete()
        session.query(Programme).delete()
        session.query(Department).delete()
        session.query(College).delete()
        session.query(University).delete()
        session.query(User).delete()
        session.commit()

        university = University(
            name="Northbridge State University",
            address="Bengaluru, India",
        )
        session.add(university)
        session.flush()

        session.add_all(
            [
                User(
                    email="super.admin@northbridge.edu",
                    full_name="Super Admin",
                    password_hash=hash_password("Admin@123"),
                    role="super_admin",
                    university_id=university.id,
                ),
                User(
                    email="university.admin@northbridge.edu",
                    full_name="University Admin",
                    password_hash=hash_password("Admin@123"),
                    role="university_admin",
                    university_id=university.id,
                ),
            ]
        )

        for index in range(1, 31):
            college = College(
                name=f"Demo College {index}",
                address=f"Campus {index}",
                university_id=university.id,
            )
            session.add(college)
            session.flush()

            department = Department(
                name=f"Department {index}",
                college_id=college.id,
            )
            session.add(department)
            session.flush()

            programme = Programme(
                name=f"Programme {index}",
                department_id=department.id,
            )
            session.add(programme)
            session.flush()

            session.add(
                User(
                    email=f"staff{index}@college{index}.edu",
                    full_name=f"College Staff {index}",
                    password_hash=hash_password("Staff@123"),
                    role="college_staff",
                    college_id=college.id,
                )
            )

            faculty = Faculty(
                full_name=f"Faculty {index}",
                email=f"faculty{index}@college{index}.edu",
                employee_id=f"EMP{index:03d}",
                college_id=college.id,
                department_id=department.id,
            )
            session.add(faculty)
            session.flush()

            for student_index in range(1, 6):
                student = Student(
                    full_name=f"Student {index}-{student_index}",
                    email=(
                        f"student{index}-{student_index}"
                        f"@college{index}.edu"
                    ),
                    registration_number=(
                        f"REG{index:03d}{student_index:02d}"
                    ),
                    college_id=college.id,
                    department_id=department.id,
                    programme_id=programme.id,
                )
                session.add(student)
                session.flush()

                session.add(
                    AttendanceRecord(
                        student_id=student.id,
                        date="2026-08-01",
                        status=(
                            "present"
                            if student_index % 2
                            else "absent"
                        ),
                    )
                )

                session.add(
                    InternalMark(
                        student_id=student.id,
                        subject="Maths",
                        score=round(
                            60 + random.random() * 35,
                            2,
                        ),
                    )
                )

                session.add(
                    PracticalMark(
                        student_id=student.id,
                        subject="Lab",
                        score=round(
                            65 + random.random() * 30,
                            2,
                        ),
                    )
                )

                session.add(
                    Submission(
                        student_id=student.id,
                        title=f"Assignment {student_index}",
                        status="submitted",
                    )
                )

                session.add(
                    Grievance(
                        student_id=student.id,
                        title=f"Issue {student_index}",
                        description="Sample grievance",
                        status="open",
                    )
                )

        session.commit()

    print("EduEase demo data seeded successfully")


if __name__ == "__main__":
    seed()