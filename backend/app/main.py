from fastapi import FastAPI

from app.api import academics, admin, audit, auth, health, notifications

app = FastAPI(title="University Academic Workflow Platform", docs_url="/docs", redoc_url="/redoc")

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(academics.router)
app.include_router(notifications.router)
app.include_router(audit.router)
