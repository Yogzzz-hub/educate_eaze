from __future__ import annotations

from datetime import datetime
<<<<<<< HEAD
from typing import Optional

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
=======
from enum import Enum as PyEnum

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import relationship
>>>>>>> ab957b8 (yoga-1)

from app.models.base import Base


<<<<<<< HEAD
class University(Base):
    __tablename__ = "universities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    colleges: Mapped[list["College"]] = relationship(back_populates="university", cascade="all, delete-orphan")
    users: Mapped[list["User"]] = relationship(back_populates="university")
=======
class UserRole(str, PyEnum):
    UNIVERSITY_ADMIN = "UNIVERSITY_ADMIN"
    COLLEGE_ADMIN = "COLLEGE_ADMIN"
    FACULTY = "FACULTY"
    STUDENT = "STUDENT"
>>>>>>> ab957b8 (yoga-1)


class College(Base):
    __tablename__ = "colleges"

<<<<<<< HEAD
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    university_id: Mapped[int] = mapped_column(ForeignKey("universities.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    university: Mapped[University] = relationship(back_populates="colleges")
    departments: Mapped[list["Department"]] = relationship(back_populates="college", cascade="all, delete-orphan")
    students: Mapped[list["Student"]] = relationship(back_populates="college")
    faculty: Mapped[list["Faculty"]] = relationship(back_populates="college")
    users: Mapped[list["User"]] = relationship(back_populates="college")
=======
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    location = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    departments = relationship("Department", back_populates="college")
    programmes = relationship("Programme", back_populates="college")
    users = relationship("User", back_populates="college")
    faculty = relationship("Faculty", back_populates="college")
    students = relationship("Student", back_populates="college")
>>>>>>> ab957b8 (yoga-1)


class Department(Base):
    __tablename__ = "departments"

<<<<<<< HEAD
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    college_id: Mapped[int] = mapped_column(ForeignKey("colleges.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    college: Mapped[College] = relationship(back_populates="departments")
    programmes: Mapped[list["Programme"]] = relationship(back_populates="department", cascade="all, delete-orphan")
    students: Mapped[list["Student"]] = relationship(back_populates="department")
    faculty: Mapped[list["Faculty"]] = relationship(back_populates="department")
=======
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    college_id = Column(Integer, ForeignKey("colleges.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    college = relationship("College", back_populates="departments")
    programmes = relationship("Programme", back_populates="department")
    users = relationship("User", back_populates="department")
    faculty = relationship("Faculty", back_populates="department")
    students = relationship("Student", back_populates="department")
>>>>>>> ab957b8 (yoga-1)


class Programme(Base):
    __tablename__ = "programmes"

<<<<<<< HEAD
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    department: Mapped[Department] = relationship(back_populates="programmes")
    students: Mapped[list["Student"]] = relationship(back_populates="programme")
=======
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    college_id = Column(Integer, ForeignKey("colleges.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    college = relationship("College", back_populates="programmes")
    department = relationship("Department", back_populates="programmes")
    students = relationship("Student", back_populates="programme")
    subjects = relationship("Subject", back_populates="programme")
    examinations = relationship("Examination", back_populates="programme")
    faculty_assignments = relationship("FacultyAssignment", back_populates="programme")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    programme_id = Column(Integer, ForeignKey("programmes.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    programme = relationship("Programme", back_populates="subjects")
    examinations = relationship("Examination", back_populates="subject")
    assignments = relationship("FacultyAssignment", back_populates="subject")
>>>>>>> ab957b8 (yoga-1)


class User(Base):
    __tablename__ = "users"

<<<<<<< HEAD
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), nullable=False)
    college_id: Mapped[Optional[int]] = mapped_column(ForeignKey("colleges.id"), nullable=True)
    university_id: Mapped[Optional[int]] = mapped_column(ForeignKey("universities.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    college: Mapped[Optional[College]] = relationship(back_populates="users")
    university: Mapped[Optional[University]] = relationship(back_populates="users")


class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    registration_number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    college_id: Mapped[int] = mapped_column(ForeignKey("colleges.id"), nullable=False)
    department_id: Mapped[Optional[int]] = mapped_column(ForeignKey("departments.id"), nullable=True)
    programme_id: Mapped[Optional[int]] = mapped_column(ForeignKey("programmes.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    college: Mapped[College] = relationship(back_populates="students")
    department: Mapped[Optional[Department]] = relationship(back_populates="students")
    programme: Mapped[Optional[Programme]] = relationship(back_populates="students")
    attendance: Mapped[list["AttendanceRecord"]] = relationship(back_populates="student", cascade="all, delete-orphan")
    internal_marks: Mapped[list["InternalMark"]] = relationship(back_populates="student", cascade="all, delete-orphan")
    practical_marks: Mapped[list["PracticalMark"]] = relationship(back_populates="student", cascade="all, delete-orphan")
    submissions: Mapped[list["Submission"]] = relationship(back_populates="student", cascade="all, delete-orphan")
    grievances: Mapped[list["Grievance"]] = relationship(back_populates="student", cascade="all, delete-orphan")
=======
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    college_id = Column(Integer, ForeignKey("colleges.id"), nullable=True)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    programme_id = Column(Integer, ForeignKey("programmes.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    college = relationship("College", back_populates="users")
    department = relationship("Department", back_populates="users")
    faculty = relationship("Faculty", back_populates="user", uselist=False)
    student = relationship("Student", back_populates="user", uselist=False)
    audit_logs = relationship("AuditLog", back_populates="actor")
>>>>>>> ab957b8 (yoga-1)


class Faculty(Base):
    __tablename__ = "faculty"

<<<<<<< HEAD
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    employee_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    college_id: Mapped[int] = mapped_column(ForeignKey("colleges.id"), nullable=False)
    college_id: Mapped[Optional[int]] = mapped_column(ForeignKey("departments.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    college: Mapped[College] = relationship(back_populates="faculty")
    department: Mapped[Optional[Department]] = relationship(back_populates="faculty")


class AttendanceRecord(Base):
    __tablename__ = "attendance_records"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), nullable=False)
    date: Mapped[str] = mapped_column(String(20), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    student: Mapped[Student] = relationship(back_populates="attendance")


class InternalMark(Base):
    __tablename__ = "internal_marks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), nullable=False)
    subject: Mapped[str] = mapped_column(String(255), nullable=False)
    score: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    student: Mapped[Student] = relationship(back_populates="internal_marks")


class PracticalMark(Base):
    __tablename__ = "practical_marks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), nullable=False)
    subject: Mapped[str] = mapped_column(String(255), nullable=False)
    score: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    student: Mapped[Student] = relationship(back_populates="practical_marks")


class Submission(Base):
    __tablename__ = "submissions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    student: Mapped[Student] = relationship(back_populates="submissions")


class Workflow(Base):
    __tablename__ = "workflows"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    current_stage: Mapped[str] = mapped_column(String(50), nullable=False)
    assigned_to: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    history: Mapped[list["WorkflowHistory"]] = relationship(back_populates="workflow", cascade="all, delete-orphan")


class WorkflowHistory(Base):
    __tablename__ = "workflow_history"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    workflow_id: Mapped[int] = mapped_column(ForeignKey("workflows.id"), nullable=False)
    stage: Mapped[str] = mapped_column(String(50), nullable=False)
    note: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    workflow: Mapped[Workflow] = relationship(back_populates="history")
=======
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    college_id = Column(Integer, ForeignKey("colleges.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    designation = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="faculty")
    college = relationship("College", back_populates="faculty")
    department = relationship("Department", back_populates="faculty")
    assignments = relationship("FacultyAssignment", back_populates="faculty")


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)
    college_id = Column(Integer, ForeignKey("colleges.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    programme_id = Column(Integer, ForeignKey("programmes.id"), nullable=False)
    registration_number = Column(String(100), nullable=False, unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="student")
    college = relationship("College", back_populates="students")
    department = relationship("Department", back_populates="students")
    programme = relationship("Programme", back_populates="students")
    marks = relationship("Mark", back_populates="student")
    results = relationship("Result", back_populates="student")
    grievances = relationship("Grievance", back_populates="student")


class FacultyAssignment(Base):
    __tablename__ = "faculty_assignments"

    id = Column(Integer, primary_key=True, index=True)
    faculty_id = Column(Integer, ForeignKey("faculty.id"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    programme_id = Column(Integer, ForeignKey("programmes.id"), nullable=False)
    semester = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    faculty = relationship("Faculty", back_populates="assignments")
    subject = relationship("Subject", back_populates="assignments")
    programme = relationship("Programme", back_populates="faculty_assignments")


class Examination(Base):
    __tablename__ = "examinations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    programme_id = Column(Integer, ForeignKey("programmes.id"), nullable=False)
    college_id = Column(Integer, ForeignKey("colleges.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    max_marks = Column(Integer, nullable=False, default=100)
    exam_type = Column(String(50), nullable=False, default="MIDTERM")
    status = Column(String(50), nullable=False, default="DRAFT")
    created_at = Column(DateTime, default=datetime.utcnow)

    subject = relationship("Subject", back_populates="examinations")
    programme = relationship("Programme", back_populates="examinations")
    marks = relationship("Mark", back_populates="examination")
    results = relationship("Result", back_populates="examination")


class Mark(Base):
    __tablename__ = "marks"

    id = Column(Integer, primary_key=True, index=True)
    examination_id = Column(Integer, ForeignKey("examinations.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    obtained_marks = Column(Integer, nullable=False)
    max_marks = Column(Integer, nullable=False)
    is_present = Column(Boolean, nullable=False, default=True)
    remarks = Column(Text, nullable=True)
    status = Column(String(50), nullable=False, default="PENDING")
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (UniqueConstraint("examination_id", "student_id", name="uix_marks_student_exam"),)

    examination = relationship("Examination", back_populates="marks")
    student = relationship("Student", back_populates="marks")


class Approval(Base):
    __tablename__ = "approvals"

    id = Column(Integer, primary_key=True, index=True)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(Integer, nullable=False)
    role = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False, default="PENDING")
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Result(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    examination_id = Column(Integer, ForeignKey("examinations.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    total_marks = Column(Integer, nullable=False)
    grade = Column(String(10), nullable=False)
    status = Column(String(50), nullable=False, default="DRAFT")
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    examination = relationship("Examination", back_populates="results")
    student = relationship("Student", back_populates="results")
>>>>>>> ab957b8 (yoga-1)


class Grievance(Base):
    __tablename__ = "grievances"

<<<<<<< HEAD
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="open")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    student: Mapped[Student] = relationship(back_populates="grievances")
=======
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(50), nullable=False, default="SUBMITTED")
    routed_to = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="grievances")
>>>>>>> ab957b8 (yoga-1)


class Notification(Base):
    __tablename__ = "notifications"

<<<<<<< HEAD
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    recipient: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class AiAlert(Base):
    __tablename__ = "ai_alerts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[str] = mapped_column(String(30), nullable=False, default="info")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
=======
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
>>>>>>> ab957b8 (yoga-1)


class AuditLog(Base):
    __tablename__ = "audit_logs"

<<<<<<< HEAD
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    entity: Mapped[str] = mapped_column(String(100), nullable=False)
    action: Mapped[str] = mapped_column(String(100), nullable=False)
    actor: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
=======
    id = Column(Integer, primary_key=True, index=True)
    actor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(Integer, nullable=False)
    details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    actor = relationship("User", back_populates="audit_logs")
>>>>>>> ab957b8 (yoga-1)
