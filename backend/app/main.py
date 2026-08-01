from fastapi import FastAPI
from app.api import health

app = FastAPI(title="University Academic Workflow Platform")

app.include_router(health.router)
