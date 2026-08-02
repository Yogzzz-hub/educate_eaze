# EduEase

EduEase is a full-stack academic operations platform designed for universities and affiliated colleges.

The platform digitizes student management, faculty management, examinations, assessments, evaluations, results, certificates, grievances, notifications, and academic reporting within one unified system.

## Technology stack

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- Responsive dashboard interface

### Backend

- FastAPI
- SQLAlchemy
- Alembic
- JWT authentication
- Uvicorn

### Data and infrastructure

- PostgreSQL
- Redis
- Docker and Docker Compose
- Nginx reverse proxy
- n8n automation support
- Optional Supabase-ready configuration for storage or additional services

Supabase is optional unless the required Supabase environment variables and integrations are configured.

## Project structure

```text
educate_eaze/
├── backend/               FastAPI application
│   ├── app/
│   │   ├── api/           API routes
│   │   ├── core/          Configuration and security
│   │   ├── models/        SQLAlchemy database models
│   │   ├── seed/          Demo data and account seed scripts
│   │   ├── db.py          Database configuration
│   │   ├── main.py        FastAPI application entry point
│   │   └── schemas.py     Pydantic request and response schemas
│   ├── tests/
│   └── requirements.txt
│
├── frontend/              Next.js App Router application
│   ├── src/
│   │   ├── app/           Application routes and pages
│   │   ├── components/    Reusable UI components
│   │   ├── lib/           API client and utility functions
│   │   ├── types/         TypeScript types
│   │   └── data/          Temporary demo data
│   ├── package.json
│   └── next.config.js
│
├── database/              Database initialization files
├── nginx/                 Reverse proxy configuration
├── n8n/                   Automation workflow configuration
├── docker-compose.yml
├── .env.example
└── README.md