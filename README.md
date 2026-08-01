# University Academic Workflow & Process Intelligence Platform

This repository provides a starter monorepo for an academic workflow and process intelligence platform for universities and colleges.

## Included services
- Frontend: React + TypeScript + Tailwind + Vite
- Backend: FastAPI + PostgreSQL + SQLAlchemy + Alembic
- Automation: n8n
- Cache: Redis
- Reverse proxy: Nginx

## Project structure
- frontend/ - React client application
- backend/ - FastAPI service and seed scripts
- n8n/ - automation workflow configuration
- database/ - database initialization scripts
- nginx/ - reverse proxy configuration

## Quick start
1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
2. Start all services:
   ```bash
   docker compose up --build
   ```
3. Open the app:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/docs
   - n8n: http://localhost:5678

## Seeding demo data
Run the backend seed script:
```bash
docker compose exec backend python -m app.seed.seed_data
```

This seeds one university and 30 demo colleges.

## Notes
- Database migrations are wired through Alembic.
- Nginx routes API requests to the backend and frontend traffic to the React app.
- The backend exposes Swagger UI at /docs and OpenAPI at /openapi.json.
- Demo login credentials:
  - Super Admin: super.admin@northbridge.edu / Admin@123
  - University Admin: university.admin@northbridge.edu / Admin@123
