from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.dependencies import require_roles
from app.models.academic import College, Department, Faculty, Programme, Student, University, User
from app.schemas import AnalyticsSummary, CollegeCreate, CollegeOut, DepartmentCreate, DepartmentOut, FacultyCreate, FacultyOut, ProgrammeCreate, ProgrammeOut, StudentCreate, StudentOut, UniversityCreate, UniversityOut

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/universities", response_model=UniversityOut, status_code=201)
def create_university(payload: UniversityCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin"))) -> UniversityOut:
    university = University(name=payload.name, address=payload.address)
    db.add(university)
    db.commit()
    db.refresh(university)
    return university


@router.get("/universities", response_model=list[UniversityOut])
def list_universities(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin"))) -> list[UniversityOut]:
    return db.query(University).all()


@router.post("/colleges", response_model=CollegeOut, status_code=201)
def create_college(payload: CollegeCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin"))) -> CollegeOut:
    college = College(**payload.model_dump())
    db.add(college)
    db.commit()
    db.refresh(college)
    return college


@router.get("/colleges", response_model=list[CollegeOut])
def list_colleges(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> list[CollegeOut]:
    return db.query(College).all()


@router.post("/departments", response_model=DepartmentOut, status_code=201)
def create_department(payload: DepartmentCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> DepartmentOut:
    department = Department(**payload.model_dump())
    db.add(department)
    db.commit()
    db.refresh(department)
    return department


@router.get("/departments", response_model=list[DepartmentOut])
def list_departments(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> list[DepartmentOut]:
    return db.query(Department).all()


@router.post("/programmes", response_model=ProgrammeOut, status_code=201)
def create_programme(payload: ProgrammeCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> ProgrammeOut:
    programme = Programme(**payload.model_dump())
    db.add(programme)
    db.commit()
    db.refresh(programme)
    return programme


@router.get("/programmes", response_model=list[ProgrammeOut])
def list_programmes(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> list[ProgrammeOut]:
    return db.query(Programme).all()


@router.post("/students", response_model=StudentOut, status_code=201)
def create_student(payload: StudentCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> StudentOut:
    student = Student(**payload.model_dump())
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


@router.get("/students", response_model=list[StudentOut])
def list_students(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> list[StudentOut]:
    return db.query(Student).all()


@router.post("/faculty", response_model=FacultyOut, status_code=201)
def create_faculty(payload: FacultyCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> FacultyOut:
    faculty = Faculty(**payload.model_dump())
    db.add(faculty)
    db.commit()
    db.refresh(faculty)
    return faculty


@router.get("/faculty", response_model=list[FacultyOut])
def list_faculty(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> list[FacultyOut]:
    return db.query(Faculty).all()


@router.get("/analytics", response_model=AnalyticsSummary)
def analytics(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> AnalyticsSummary:
    return AnalyticsSummary(
        total_universities=db.query(University).count(),
        total_colleges=db.query(College).count(),
        total_students=db.query(Student).count(),
        total_faculty=db.query(Faculty).count(),
        pending_grievances=db.query(Student).join(Student.grievances).filter(Student.grievances.any()).count(),
    )
