from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
def health_check() -> dict[str, str | bool]:
    return {"status": "ok", "supabase_configured": bool(__import__("app.core.config", fromlist=["settings"]).settings.supabase_service_role_key)}
