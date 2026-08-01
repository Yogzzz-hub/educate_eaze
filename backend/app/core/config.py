from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://postgres:postgres@db:5432/academic_platform"
    jwt_secret_key: str = "super-secret-jwt"
    jwt_algorithm: str = "HS256"
    redis_url: str = "redis://redis:6379/0"
    file_storage_path: str = "/app/storage"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
