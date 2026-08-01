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
