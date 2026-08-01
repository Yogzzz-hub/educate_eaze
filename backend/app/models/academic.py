from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class University(Base):
    __tablename__ = "universities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    colleges: Mapped[list["College"]] = relationship(back_populates="university", cascade="all, delete-orphan")
    users: Mapped[list["User"]] = relationship(back_populates="university")


class College(Base):
    __tablename__ = "colleges"

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


class Department(Base):
    __tablename__ = "departments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    college_id: Mapped[int] = mapped_column(ForeignKey("colleges.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    college: Mapped[College] = relationship(back_populates="departments")
    programmes: Mapped[list["Programme"]] = relationship(back_populates="department", cascade="all, delete-orphan")
    students: Mapped[list["Student"]] = relationship(back_populates="department")
    faculty: Mapped[list["Faculty"]] = relationship(back_populates="department")


class Programme(Base):
    __tablename__ = "programmes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    department: Mapped[Department] = relationship(back_populates="programmes")
    students: Mapped[list["Student"]] = relationship(back_populates="programme")


class User(Base):
    __tablename__ = "users"

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


class Faculty(Base):
    __tablename__ = "faculty"

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


class Grievance(Base):
    __tablename__ = "grievances"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="open")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    student: Mapped[Student] = relationship(back_populates="grievances")


class Notification(Base):
    __tablename__ = "notifications"

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


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    entity: Mapped[str] = mapped_column(String(100), nullable=False)
    action: Mapped[str] = mapped_column(String(100), nullable=False)
    actor: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
