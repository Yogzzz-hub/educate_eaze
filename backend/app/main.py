from fastapi import FastAPI
<<<<<<< HEAD
from app.api import academic, health
=======
<<<<<<< HEAD
>>>>>>> b678ab5c948f19140e8750dd84f6f91131b690dc

from app.api import academics, admin, audit, auth, health, notifications

app = FastAPI(title="University Academic Workflow Platform", docs_url="/docs", redoc_url="/redoc")

app.include_router(health.router)
<<<<<<< HEAD
app.include_router(academic.router)
=======
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(academics.router)
app.include_router(notifications.router)
app.include_router(audit.router)
=======
from app.api import academic, health
from app.seed.seed_data import build_demo_payload
from app.seed.seed_accounts import seed_demo_accounts

app = FastAPI(title="EduEase API", version="1.0.0")

app.include_router(health.router)
app.include_router(academic.router)


@app.get("/demo")
def get_demo_payload() -> dict[str, object]:
    return build_demo_payload()


@app.on_event("startup")
def startup_event() -> None:
    seed_demo_accounts()
>>>>>>> ab957b8 (yoga-1)
>>>>>>> b678ab5c948f19140e8750dd84f6f91131b690dc
