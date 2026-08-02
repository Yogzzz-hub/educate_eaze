from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.dependencies import require_roles
from app.models.academic import AttendanceRecord, Grievance, InternalMark, PracticalMark, Student, Submission, Workflow, WorkflowHistory
from app.schemas import AttendanceRecordCreate, AttendanceRecordOut, GrievanceCreate, GrievanceOut, InternalMarkCreate, InternalMarkOut, PracticalMarkCreate, PracticalMarkOut, ReportSummary, SubmissionCreate, SubmissionOut, WorkflowCreate, WorkflowHistoryCreate, WorkflowHistoryOut, WorkflowOut

router = APIRouter(prefix="/academics", tags=["academics"])


@router.post("/attendance", response_model=AttendanceRecordOut, status_code=201)
def create_attendance(payload: AttendanceRecordCreate, db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> AttendanceRecordOut:
    record = AttendanceRecord(**payload.model_dump())
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/attendance", response_model=list[AttendanceRecordOut])
def list_attendance(db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> list[AttendanceRecordOut]:
    return db.query(AttendanceRecord).all()


@router.post("/internal-marks", response_model=InternalMarkOut, status_code=201)
def create_internal_mark(payload: InternalMarkCreate, db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> InternalMarkOut:
    mark = InternalMark(**payload.model_dump())
    db.add(mark)
    db.commit()
    db.refresh(mark)
    return mark


@router.post("/practical-marks", response_model=PracticalMarkOut, status_code=201)
def create_practical_mark(payload: PracticalMarkCreate, db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> PracticalMarkOut:
    mark = PracticalMark(**payload.model_dump())
    db.add(mark)
    db.commit()
    db.refresh(mark)
    return mark


@router.post("/submissions", response_model=SubmissionOut, status_code=201)
def create_submission(payload: SubmissionCreate, db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> SubmissionOut:
    submission = Submission(**payload.model_dump())
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.get("/submissions", response_model=list[SubmissionOut])
def list_submissions(db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> list[SubmissionOut]:
    return db.query(Submission).all()


@router.post("/workflows", response_model=WorkflowOut, status_code=201)
def create_workflow(payload: WorkflowCreate, db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> WorkflowOut:
    workflow = Workflow(**payload.model_dump())
    db.add(workflow)
    db.commit()
    db.refresh(workflow)
    return workflow


@router.get("/workflows", response_model=list[WorkflowOut])
def list_workflows(db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> list[WorkflowOut]:
    return db.query(Workflow).all()


@router.post("/workflows/{workflow_id}/history", response_model=WorkflowHistoryOut, status_code=201)
def add_workflow_history(workflow_id: int, payload: WorkflowHistoryCreate, db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> WorkflowHistoryOut:
    workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not workflow:
        raise ValueError("Workflow not found")
    history = WorkflowHistory(workflow_id=workflow_id, **payload.model_dump())
    db.add(history)
    db.commit()
    db.refresh(history)
    return history


@router.post("/grievances", response_model=GrievanceOut, status_code=201)
def create_grievance(payload: GrievanceCreate, db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> GrievanceOut:
    grievance = Grievance(**payload.model_dump())
    db.add(grievance)
    db.commit()
    db.refresh(grievance)
    return grievance


@router.get("/grievances", response_model=list[GrievanceOut])
def list_grievances(db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> list[GrievanceOut]:
    return db.query(Grievance).all()


@router.get("/reports", response_model=ReportSummary)
def reports(db: Session = Depends(get_db), _: object = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> ReportSummary:
    attendance_count = db.query(AttendanceRecord).count()
    internal_marks = db.query(InternalMark).all()
    practical_marks = db.query(PracticalMark).all()
    submissions = db.query(Submission).count()
    attendance_rate = round((attendance_count / max(1, db.query(Student).count() * 30)) * 100, 2)
    avg_internal = round(sum(mark.score for mark in internal_marks) / max(1, len(internal_marks)), 2)
    avg_practical = round(sum(mark.score for mark in practical_marks) / max(1, len(practical_marks)), 2)
    return ReportSummary(attendance_rate=attendance_rate, average_internal_mark=avg_internal, average_practical_mark=avg_practical, submission_count=submissions)
