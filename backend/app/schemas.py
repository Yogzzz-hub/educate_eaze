from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: str
    role: str
    token_type: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    full_name: str
    role: str
    college_id: Optional[int] = None


class UniversityBase(BaseModel):
    name: str
    address: Optional[str] = None


class UniversityCreate(UniversityBase):
    pass


class UniversityOut(UniversityBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class CollegeBase(BaseModel):
    name: str
    address: Optional[str] = None
    university_id: int


class CollegeCreate(CollegeBase):
    pass


class CollegeOut(CollegeBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class DepartmentBase(BaseModel):
    name: str
    college_id: int


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentOut(DepartmentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class ProgrammeBase(BaseModel):
    name: str
    department_id: int


class ProgrammeCreate(ProgrammeBase):
    pass


class ProgrammeOut(ProgrammeBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class StudentBase(BaseModel):
    full_name: str
    email: EmailStr
    registration_number: str
    college_id: int
    department_id: Optional[int] = None
    programme_id: Optional[int] = None


class StudentCreate(StudentBase):
    pass


class StudentOut(StudentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class FacultyBase(BaseModel):
    full_name: str
    email: EmailStr
    employee_id: str
    college_id: int
    department_id: Optional[int] = None


class FacultyCreate(FacultyBase):
    pass


class FacultyOut(FacultyBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class AttendanceRecordBase(BaseModel):
    student_id: int
    date: str
    status: str


class AttendanceRecordCreate(AttendanceRecordBase):
    pass


class AttendanceRecordOut(AttendanceRecordBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class MarkBase(BaseModel):
    student_id: int
    subject: str
    score: float


class InternalMarkCreate(MarkBase):
    pass


class InternalMarkOut(MarkBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class PracticalMarkCreate(MarkBase):
    pass


class PracticalMarkOut(MarkBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class SubmissionBase(BaseModel):
    student_id: int
    title: str
    status: str = "submitted"


class SubmissionCreate(SubmissionBase):
    pass


class SubmissionOut(SubmissionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class WorkflowBase(BaseModel):
    title: str
    current_stage: str = "review"
    assigned_to: Optional[str] = None


class WorkflowCreate(WorkflowBase):
    pass


class WorkflowOut(WorkflowBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class WorkflowHistoryBase(BaseModel):
    workflow_id: int
    stage: str
    note: Optional[str] = None


class WorkflowHistoryCreate(WorkflowHistoryBase):
    pass


class WorkflowHistoryOut(WorkflowHistoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class GrievanceBase(BaseModel):
    student_id: int
    title: str
    description: str
    status: str = "open"


class GrievanceCreate(GrievanceBase):
    pass


class GrievanceOut(GrievanceBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class NotificationBase(BaseModel):
    recipient: str
    message: str
    is_read: bool = False


class NotificationCreate(NotificationBase):
    pass


class NotificationOut(NotificationBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class AiAlertBase(BaseModel):
    title: str
    message: str
    severity: str = "info"


class AiAlertCreate(AiAlertBase):
    pass


class AiAlertOut(AiAlertBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class AuditLogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    entity: str
    action: str
    actor: Optional[str] = None


class AnalyticsSummary(BaseModel):
    total_universities: int
    total_colleges: int
    total_students: int
    total_faculty: int
    pending_grievances: int


class ReportSummary(BaseModel):
    attendance_rate: float
    average_internal_mark: float
    average_practical_mark: float
    submission_count: int
