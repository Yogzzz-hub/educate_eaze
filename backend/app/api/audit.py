from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.dependencies import require_roles
from app.models.academic import AuditLog, User
from app.schemas import AuditLogOut

router = APIRouter(prefix="/audit", tags=["audit"])


@router.get("", response_model=list[AuditLogOut])
def list_audit_logs(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin"))) -> list[AuditLogOut]:
    return db.query(AuditLog).all()
