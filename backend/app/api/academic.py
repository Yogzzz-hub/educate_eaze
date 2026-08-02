<<<<<<< HEAD
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["academic"])


class LoginPayload(BaseModel):
    email: str
    password: str


class CollegePayload(BaseModel):
    name: str
    city: str
    status: str


class StudentPayload(BaseModel):
    name: str
    college: str
    email: str
    status: str
    progress: int


COLLEGES = [
    {"id": 1, "name": "Northbridge University", "city": "Seattle", "status": "Active", "submissions": 14},
    {"id": 2, "name": "Harbor College", "city": "Chicago", "status": "Review", "submissions": 9},
    {"id": 3, "name": "Evergreen Institute", "city": "Austin", "status": "Pending", "submissions": 6},
]

STUDENTS = [
    {"id": 1, "name": "Mina Patel", "college": "Northbridge University", "email": "mina@northbridge.edu", "status": "Enrolled", "progress": 82},
    {"id": 2, "name": "Omar Hassan", "college": "Harbor College", "email": "omar@harbor.edu", "status": "Pending", "progress": 64},
    {"id": 3, "name": "Sara Kim", "college": "Evergreen Institute", "email": "sara@evergreen.edu", "status": "Flagged", "progress": 47},
]

SUBMISSIONS = [
    {"id": 1, "title": "Annual Compliance Pack", "owner": "Riya Singh", "college": "Northbridge University", "status": "Approved", "updatedAt": "2h ago"},
    {"id": 2, "title": "Transfer audit", "owner": "Mason Reed", "college": "Harbor College", "status": "In Review", "updatedAt": "5h ago"},
    {"id": 3, "title": "Faculty onboarding", "owner": "Nia Brooks", "college": "Evergreen Institute", "status": "Needs Action", "updatedAt": "1d ago"},
]

WORKFLOW = [
    {"id": 1, "step": "Admissions review", "owner": "Lina Chen", "state": "On Track", "eta": "Today"},
    {"id": 2, "step": "Curriculum sign-off", "owner": "Alan Cruz", "state": "At Risk", "eta": "Tomorrow"},
    {"id": 3, "step": "Graduation packet", "owner": "Maya Rao", "state": "Completed", "eta": "Done"},
]

INTELLIGENCE = [
    {"id": 1, "label": "Cycle time", "value": "11.2 days", "detail": "Down 18% from last quarter"},
    {"id": 2, "label": "Approval rate", "value": "94%", "detail": "Consistency improved across all colleges"},
    {"id": 3, "label": "Escalations", "value": "12", "detail": "Concentrated in transfer workflows"},
]

INSIGHTS = [
    {"id": 1, "title": "Document turnaround", "impact": "High", "details": "Automated reminders reduce manual follow-up by 26%"},
    {"id": 2, "title": "Student risk signals", "impact": "Medium", "details": "Early interventions improve completion by 14%"},
]

GRIEVANCES = [
    {"id": 1, "student": "Mina Patel", "category": "Fee dispute", "severity": "High", "status": "Open"},
    {"id": 2, "student": "Omar Hassan", "category": "Attendance", "severity": "Medium", "status": "Escalated"},
]

CERTIFICATES = [
    {"id": 1, "student": "Mina Patel", "program": "Systems Engineering", "issuedAt": "2026-07-12", "status": "Issued"},
    {"id": 2, "student": "Sara Kim", "program": "Health Sciences", "issuedAt": "2026-08-01", "status": "Pending"},
]

NOTIFICATIONS = [
    {"id": 1, "title": "New compliance alert", "body": "Three colleges require document review by 4pm", "createdAt": "10 mins ago"},
    {"id": 2, "title": "Workflow update", "body": "Curriculum approvals have moved to the next queue", "createdAt": "1 hour ago"},
]

REPORTS = [
    {"id": 1, "name": "Quarterly Operations Report", "owner": "Finance Desk", "updatedAt": "Today"},
    {"id": 2, "name": "Student Retention Summary", "owner": "Enrollment Office", "updatedAt": "Yesterday"},
]


@router.post("/auth/login")
def login(payload: LoginPayload) -> dict:
    role = "super_admin" if "super" in payload.email.lower() else "university_admin" if "admin" in payload.email.lower() else "college_staff" if "staff" in payload.email.lower() else "student"
    return {
        "id": "demo-user",
        "name": "Demo User",
        "email": payload.email,
        "role": role,
    }


@router.get("/dashboard/{role}")
def dashboard(role: str) -> dict:
    if role not in {"super_admin", "university_admin", "college_staff", "student"}:
        raise HTTPException(status_code=404, detail="Role not found")
    return {
        "role": role,
        "summary": [
            {"title": "Active institutions", "value": "24", "change": "+4%", "tone": "positive"},
            {"title": "Pending approvals", "value": "18", "change": "2 urgent", "tone": "warning"},
            {"title": "Student throughput", "value": "91%", "change": "+6%", "tone": "positive"},
        ],
        "trend": [{"month": "Jan", "value": 42}, {"month": "Feb", "value": 56}, {"month": "Mar", "value": 64}, {"month": "Apr", "value": 71}, {"month": "May", "value": 88}],
        "queue": [{"label": "Signed off", "value": 72}, {"label": "In review", "value": 19}, {"label": "Blocked", "value": 9}],
    }


@router.get("/colleges")
def list_colleges(page: int = 1, size: int = 6) -> dict:
    start = (page - 1) * size
    end = start + size
    return {"items": COLLEGES[start:end], "total": len(COLLEGES)}


@router.post("/colleges", status_code=201)
def create_college(payload: CollegePayload) -> dict:
    college = {"id": len(COLLEGES) + 1, "name": payload.name, "city": payload.city, "status": payload.status, "submissions": 0}
    COLLEGES.append(college)
    return college


@router.get("/students")
def list_students(page: int = 1, size: int = 6) -> dict:
    start = (page - 1) * size
    end = start + size
    return {"items": STUDENTS[start:end], "total": len(STUDENTS)}


@router.post("/students", status_code=201)
def create_student(payload: StudentPayload) -> dict:
    student = {"id": len(STUDENTS) + 1, **payload.model_dump()}
    STUDENTS.append(student)
    return student


@router.get("/submissions")
def list_submissions() -> list[dict]:
    return SUBMISSIONS


@router.get("/workflow")
def list_workflow() -> list[dict]:
    return WORKFLOW


@router.get("/intelligence")
def list_intelligence() -> list[dict]:
    return INTELLIGENCE


@router.get("/insights")
def list_insights() -> list[dict]:
    return INSIGHTS


@router.get("/grievances")
def list_grievances() -> list[dict]:
    return GRIEVANCES


@router.get("/certificates")
def list_certificates() -> list[dict]:
    return CERTIFICATES


@router.get("/notifications")
def list_notifications() -> list[dict]:
    return NOTIFICATIONS


@router.get("/reports")
def list_reports() -> list[dict]:
    return REPORTS
=======
from __future__ import annotations

from datetime import datetime, timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.academic import (
    Approval,
    AuditLog,
    College,
    Department,
    Examination,
    Faculty,
    FacultyAssignment,
    Grievance,
    Mark,
    Notification,
    Programme,
    Result,
    Student,
    Subject,
    User,
    UserRole,
)
from app.models.base import Base
from app.schemas import (
    ApprovalCreate,
    AuthRequest,
    AuthResponse,
    CollegeCreate,
    DepartmentCreate,
    ExaminationCreate,
    FacultyCreate,
    GrievanceCreate,
    MarkCreate,
    ProgrammeCreate,
    StudentCreate,
    SubjectCreate,
    UserCreate,
)
from app.db import get_db

router = APIRouter(prefix="/api", tags=["academic"])
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(subject: str) -> str:
    now = datetime.utcnow()
    payload = {"sub": subject, "exp": now + timedelta(minutes=60)}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def verify_token(token: str) -> dict[str, Any]:
    try:
        return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    db: Session = Depends(get_db),
) -> User:
    payload = verify_token(credentials.credentials)
    user = db.scalar(select(User).where(User.id == int(payload["sub"])))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def require_roles(*roles: str):
    def _dependency(user: User = Depends(get_current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(status_code=403, detail="Forbidden")
        return user

    return _dependency


def log_audit(db: Session, actor_id: int | None, action: str, entity_type: str, entity_id: int, details: str | None = None) -> None:
    db.add(AuditLog(actor_id=actor_id, action=action, entity_type=entity_type, entity_id=entity_id, details=details))
    db.commit()


@router.post("/auth/login", response_model=AuthResponse)
def login(payload: AuthRequest, db: Session = Depends(get_db)) -> AuthResponse:
    user = db.scalar(select(User).where(User.email == payload.email))
    if not user or not pwd_context.verify(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(str(user.id))
    return AuthResponse(access_token=token, role=user.role, user_id=user.id)


@router.post("/users", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value))])
def create_user(payload: UserCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    if db.scalar(select(User).where(User.email == payload.email)):
        raise HTTPException(status_code=400, detail="User already exists")
    user = User(
        email=str(payload.email),
        password_hash=pwd_context.hash(payload.password),
        full_name=payload.full_name,
        role=payload.role,
        college_id=payload.college_id,
        department_id=payload.department_id,
        programme_id=payload.programme_id,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "email": user.email, "role": user.role}


@router.post("/colleges", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value))])
def create_college(payload: CollegeCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    college = College(name=payload.name, location=payload.location)
    db.add(college)
    db.commit()
    db.refresh(college)
    return {"id": college.id, "name": college.name}


@router.post("/departments", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value))])
def create_department(payload: DepartmentCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    dept = Department(name=payload.name, college_id=payload.college_id)
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return {"id": dept.id, "name": dept.name}


@router.post("/programmes", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value))])
def create_programme(payload: ProgrammeCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    programme = Programme(name=payload.name, college_id=payload.college_id, department_id=payload.department_id)
    db.add(programme)
    db.commit()
    db.refresh(programme)
    return {"id": programme.id, "name": programme.name}


@router.post("/subjects", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value))])
def create_subject(payload: SubjectCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    subject = Subject(name=payload.name, programme_id=payload.programme_id)
    db.add(subject)
    db.commit()
    db.refresh(subject)
    return {"id": subject.id, "name": subject.name}


@router.post("/students", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value))])
def create_student(payload: StudentCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    if db.scalar(select(User).where(User.email == payload.email)):
        raise HTTPException(status_code=400, detail="Email already exists")
    user = User(
        email=str(payload.email),
        password_hash=pwd_context.hash(payload.password),
        full_name=payload.full_name,
        role=UserRole.STUDENT.value,
        college_id=payload.college_id,
        department_id=payload.department_id,
        programme_id=payload.programme_id,
    )
    db.add(user)
    db.flush()
    student = Student(
        user_id=user.id,
        college_id=payload.college_id,
        department_id=payload.department_id,
        programme_id=payload.programme_id,
        registration_number=payload.registration_number,
    )
    db.add(student)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "email": user.email, "role": user.role}


@router.post("/faculty", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value))])
def create_faculty(payload: FacultyCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    if db.scalar(select(User).where(User.email == payload.email)):
        raise HTTPException(status_code=400, detail="Email already exists")
    user = User(
        email=str(payload.email),
        password_hash=pwd_context.hash(payload.password),
        full_name=payload.full_name,
        role=UserRole.FACULTY.value,
        college_id=payload.college_id,
        department_id=payload.department_id,
    )
    db.add(user)
    db.flush()
    faculty = Faculty(
        user_id=user.id,
        college_id=payload.college_id,
        department_id=payload.department_id,
        designation=payload.designation,
    )
    db.add(faculty)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "email": user.email, "role": user.role}


@router.post("/examinations", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value, UserRole.FACULTY.value))])
def create_examination(payload: ExaminationCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    examination = Examination(
        title=payload.title,
        subject_id=payload.subject_id,
        programme_id=payload.programme_id,
        college_id=payload.college_id,
        department_id=payload.department_id,
        created_by=user.id,
        max_marks=payload.max_marks,
        exam_type=payload.exam_type,
        status="DRAFT",
    )
    db.add(examination)
    db.commit()
    db.refresh(examination)
    log_audit(db, user.id, "CREATE_EXAMINATION", "examination", examination.id, payload.title)
    return {"id": examination.id, "title": examination.title, "status": examination.status}


@router.post("/marks", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.FACULTY.value))])
def submit_marks(payload: MarkCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    examination = db.get(Examination, payload.examination_id)
    if examination is None:
        raise HTTPException(status_code=404, detail="Examination not found")
    if payload.obtained_marks < 0:
        raise HTTPException(status_code=400, detail="Negative marks are not allowed")
    if payload.obtained_marks > payload.max_marks:
        raise HTTPException(status_code=400, detail="Obtained marks cannot exceed max marks")
    if payload.obtained_marks > examination.max_marks:
        raise HTTPException(status_code=400, detail="Obtained marks cannot exceed examination max marks")
    existing = db.scalar(select(Mark).where(Mark.examination_id == payload.examination_id, Mark.student_id == payload.student_id))
    if existing:
        raise HTTPException(status_code=400, detail="Marks already exist for this student and examination")
    if not payload.is_present:
        payload.obtained_marks = 0
    mark = Mark(
        examination_id=payload.examination_id,
        student_id=payload.student_id,
        obtained_marks=payload.obtained_marks,
        max_marks=payload.max_marks,
        is_present=payload.is_present,
        remarks=payload.remarks,
    )
    db.add(mark)
    db.commit()
    db.refresh(mark)
    log_audit(db, user.id, "SUBMIT_MARKS", "mark", mark.id, f"student={payload.student_id}")
    return {"id": mark.id, "status": "SUBMITTED"}


@router.post("/approvals", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value))])
def create_approval(payload: ApprovalCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    approval = Approval(entity_type=payload.entity_type, entity_id=payload.entity_id, role=payload.role, status=payload.status, approved_by=user.id, comment=payload.comment)
    db.add(approval)
    db.commit()
    db.refresh(approval)
    log_audit(db, user.id, "CREATE_APPROVAL", "approval", approval.id, payload.comment)
    return {"id": approval.id, "status": approval.status}


@router.post("/results/publish", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value))])
def publish_results(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    examinations = db.scalars(select(Examination).where(Examination.status == "APPROVED")).all()
    for exam in examinations:
        marks = db.scalars(select(Mark).where(Mark.examination_id == exam.id)).all()
        for mark in marks:
            grade = "A" if mark.obtained_marks >= 90 else "B" if mark.obtained_marks >= 75 else "C" if mark.obtained_marks >= 60 else "D"
            result = Result(examination_id=exam.id, student_id=mark.student_id, total_marks=mark.obtained_marks, grade=grade, status="PUBLISHED", published_at=datetime.utcnow())
            db.add(result)
    db.commit()
    log_audit(db, user.id, "PUBLISH_RESULTS", "result", 0, "Published exam results")
    return {"status": "published", "count": len(examinations)}


@router.get("/results/{student_id}", response_model=list[dict[str, Any]], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value, UserRole.STUDENT.value))])
def get_student_results(student_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    if user.role == UserRole.STUDENT.value and user.student and user.student.id != student_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    results = db.scalars(select(Result).where(Result.student_id == student_id)).all()
    return [{"id": item.id, "grade": item.grade, "total_marks": item.total_marks, "status": item.status} for item in results]


@router.post("/grievances", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.STUDENT.value))])
def submit_grievance(payload: GrievanceCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    if user.student is None:
        raise HTTPException(status_code=400, detail="Student profile not found")
    grievance = Grievance(student_id=user.student.id, title=payload.title, description=payload.description)
    db.add(grievance)
    db.commit()
    db.refresh(grievance)
    log_audit(db, user.id, "SUBMIT_GRIEVANCE", "grievance", grievance.id, payload.title)
    return {"id": grievance.id, "status": grievance.status}


@router.put("/grievances/{grievance_id}/route", response_model=dict[str, Any], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value))])
def route_grievance(grievance_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> dict[str, Any]:
    grievance = db.get(Grievance, grievance_id)
    if grievance is None:
        raise HTTPException(status_code=404, detail="Grievance not found")
    grievance.status = "ROUTED"
    grievance.routed_to = user.role
    db.commit()
    log_audit(db, user.id, "ROUTE_GRIEVANCE", "grievance", grievance.id, user.role)
    return {"id": grievance.id, "status": grievance.status, "routed_to": grievance.routed_to}


@router.get("/notifications", response_model=list[dict[str, Any]], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value, UserRole.COLLEGE_ADMIN.value, UserRole.FACULTY.value, UserRole.STUDENT.value))])
def list_notifications(user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    notifications = db.scalars(select(Notification).where(Notification.user_id == user.id).order_by(Notification.created_at.desc())).all()
    return [{"id": item.id, "title": item.title, "message": item.message, "is_read": item.is_read} for item in notifications]


@router.get("/audit-logs", response_model=list[dict[str, Any]], dependencies=[Depends(require_roles(UserRole.UNIVERSITY_ADMIN.value))])
def list_audit_logs(db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    logs = db.scalars(select(AuditLog).order_by(AuditLog.created_at.desc())).all()
    return [{"id": item.id, "action": item.action, "entity_type": item.entity_type, "entity_id": item.entity_id, "details": item.details} for item in logs]
>>>>>>> b678ab5c948f19140e8750dd84f6f91131b690dc
