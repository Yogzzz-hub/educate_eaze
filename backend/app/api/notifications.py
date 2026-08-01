from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.dependencies import require_roles
from app.models.academic import AiAlert, Notification, User
from app.schemas import AiAlertCreate, AiAlertOut, NotificationCreate, NotificationOut

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.post("", response_model=NotificationOut, status_code=201)
def create_notification(payload: NotificationCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> NotificationOut:
    notification = Notification(**payload.model_dump())
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification


@router.get("", response_model=list[NotificationOut])
def list_notifications(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> list[NotificationOut]:
    return db.query(Notification).all()


@router.post("/alerts", response_model=AiAlertOut, status_code=201)
def create_alert(payload: AiAlertCreate, db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff"))) -> AiAlertOut:
    alert = AiAlert(**payload.model_dump())
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert


@router.get("/alerts", response_model=list[AiAlertOut])
def list_alerts(db: Session = Depends(get_db), _: User = Depends(require_roles("super_admin", "university_admin", "college_staff", "student"))) -> list[AiAlertOut]:
    return db.query(AiAlert).all()
