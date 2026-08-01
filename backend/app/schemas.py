from __future__ import annotations

from typing import Optional

from pydantic import (
    AliasChoices,
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
)


class SchemaModel(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )


# =========================================================
# Authentication and users
# =========================================================


class AuthRequest(SchemaModel):
    email: EmailStr
    password: str


class LoginRequest(AuthRequest):
    """Compatibility schema for routes using LoginRequest."""

    pass


class Token(SchemaModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenPayload(SchemaModel):
    sub: str
    role: str
    token_type: str


class AuthResponse(SchemaModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: int


class UserCreate(SchemaModel):
    email: EmailStr
    password: str = Field(exclude=True)
    full_name: str
    role: str
    college_id: Optional[int] = None

    # Retained for compatibility with newer APIs.
    department_id: Optional[int] = Field(
        default=None,
        exclude=True,
    )
    programme_id: Optional[int] = Field(
        default=None,
        exclude=True,
    )


class UserOut(SchemaModel):
    id: int
    email: str
    full_name: str
    role: str
    college_id: Optional[int] = None


# =========================================================
# University and college
# =========================================================


class UniversityBase(SchemaModel):
    name: str
    address: Optional[str] = None


class UniversityCreate(UniversityBase):
    pass


class UniversityOut(UniversityBase):
    id: int


class CollegeBase(SchemaModel):
    name: str
    address: Optional[str] = Field(
        default=None,
        validation_alias=AliasChoices(
            "address",
            "location",
        ),
    )
    university_id: Optional[int] = None

    @property
    def location(self) -> Optional[str]:
        """Compatibility property for APIs using location."""

        return self.address


class CollegeCreate(CollegeBase):
    pass


class CollegeOut(CollegeBase):
    id: int


# =========================================================
# Departments, programmes and subjects
# =========================================================


class DepartmentBase(SchemaModel):
    name: str
    college_id: int


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentOut(DepartmentBase):
    id: int


class ProgrammeBase(SchemaModel):
    name: str
    department_id: int


class ProgrammeCreate(ProgrammeBase):
    # Some newer APIs send college_id as additional context.
    # It is excluded from direct ORM model dumps.
    college_id: Optional[int] = Field(
        default=None,
        exclude=True,
    )


class ProgrammeOut(ProgrammeBase):
    id: int


class SubjectCreate(SchemaModel):
    name: str
    programme_id: int


# =========================================================
# Students
# =========================================================


class StudentBase(SchemaModel):
    full_name: str
    email: EmailStr
    registration_number: str
    college_id: int
    department_id: Optional[int] = None
    programme_id: Optional[int] = None


class StudentCreate(StudentBase):
    # Required only by APIs that also create a student login.
    # Excluded when converting the schema into Student ORM data.
    password: Optional[str] = Field(
        default=None,
        exclude=True,
    )


class StudentOut(StudentBase):
    id: int


# =========================================================
# Faculty
# =========================================================


class FacultyBase(SchemaModel):
    full_name: str
    email: EmailStr
    employee_id: Optional[str] = None
    college_id: int
    department_id: Optional[int] = None


class FacultyCreate(FacultyBase):
    password: Optional[str] = Field(
        default=None,
        exclude=True,
    )
    designation: Optional[str] = Field(
        default=None,
        exclude=True,
    )


class FacultyOut(FacultyBase):
    id: int


# =========================================================
# Attendance and marks
# =========================================================


class AttendanceRecordBase(SchemaModel):
    student_id: int
    date: str
    status: str


class AttendanceRecordCreate(AttendanceRecordBase):
    pass


class AttendanceRecordOut(AttendanceRecordBase):
    id: int


class MarkBase(SchemaModel):
    student_id: int
    subject: str
    score: float


class InternalMarkCreate(MarkBase):
    pass


class InternalMarkOut(MarkBase):
    id: int


class PracticalMarkCreate(MarkBase):
    pass


class PracticalMarkOut(MarkBase):
    id: int


class ExaminationCreate(SchemaModel):
    title: str
    subject_id: int
    programme_id: int
    college_id: int
    department_id: int
    max_marks: int = Field(
        default=100,
        ge=1,
    )
    exam_type: str = "MIDTERM"


class MarkCreate(SchemaModel):
    examination_id: int
    student_id: int
    obtained_marks: int = Field(ge=0)
    max_marks: int = Field(ge=1)
    is_present: bool = True
    remarks: Optional[str] = None


# =========================================================
# Submissions
# =========================================================


class SubmissionBase(SchemaModel):
    student_id: int
    title: str
    status: str = "submitted"


class SubmissionCreate(SubmissionBase):
    pass


class SubmissionOut(SubmissionBase):
    id: int


# =========================================================
# Workflows and approvals
# =========================================================


class WorkflowBase(SchemaModel):
    title: str
    current_stage: str = "review"
    assigned_to: Optional[str] = None


class WorkflowCreate(WorkflowBase):
    pass


class WorkflowOut(WorkflowBase):
    id: int


class WorkflowHistoryBase(SchemaModel):
    workflow_id: int
    stage: str
    note: Optional[str] = None


class WorkflowHistoryCreate(WorkflowHistoryBase):
    pass


class WorkflowHistoryOut(WorkflowHistoryBase):
    id: int


class ApprovalCreate(SchemaModel):
    entity_type: str
    entity_id: int
    role: str
    status: str = "PENDING"
    comment: Optional[str] = None


# =========================================================
# Grievances
# =========================================================


class GrievanceBase(SchemaModel):
    student_id: Optional[int] = None
    title: str
    description: str
    status: str = "open"


class GrievanceCreate(GrievanceBase):
    pass


class GrievanceOut(GrievanceBase):
    id: int


# =========================================================
# Notifications and AI alerts
# =========================================================


class NotificationBase(SchemaModel):
    recipient: str
    message: str
    is_read: bool = False


class NotificationCreate(NotificationBase):
    pass


class NotificationOut(NotificationBase):
    id: int


class AiAlertBase(SchemaModel):
    title: str
    message: str
    severity: str = "info"


class AiAlertCreate(AiAlertBase):
    pass


class AiAlertOut(AiAlertBase):
    id: int


# =========================================================
# Audit, analytics and reports
# =========================================================


class AuditLogOut(SchemaModel):
    id: int
    entity: str
    action: str
    actor: Optional[str] = None


class AnalyticsSummary(SchemaModel):
    total_universities: int
    total_colleges: int
    total_students: int
    total_faculty: int
    pending_grievances: int


class ReportSummary(SchemaModel):
    attendance_rate: float
    average_internal_mark: float
    average_practical_mark: float
    submission_count: int