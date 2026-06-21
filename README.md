# FreelanceHQ — Freelancer Management Platform

> Django 4.2 · React 18 · PostgreSQL · Tailwind CSS 3

Full-stack platform for agencies to manage remote freelancers — task assignment, daily reports, attendance tracking, file uploads, and Google Meet integration.

---

## ⚡ One-Command Setup

```bash
bash setup.sh
```

That's it. The script handles everything: creates the database, runs migrations, seeds demo data, and installs all packages.

Then start both servers:

```bash
# Terminal 1 — Backend
cd backend && source venv/bin/activate && python manage.py runserver

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Open **http://localhost:5173**

---

## Demo Credentials

| Role     | Email              | Password       |
|----------|--------------------|----------------|
| Admin    | admin@fmp.com      | Admin@1234     |
| Employee | jane@fmp.com       | Employee@1234  |

---

## Manual Setup (Step-by-Step)

### Prerequisites

| Tool       | Min Version | Install |
|------------|-------------|---------|
| Python     | 3.11+       | https://python.org |
| Node.js    | 18+         | https://nodejs.org |
| PostgreSQL | 14+         | `brew install postgresql@16` |

Make sure PostgreSQL is running:
```bash
brew services start postgresql@16   # macOS/Homebrew
# OR
sudo service postgresql start       # Ubuntu/Debian
```

---

### Step 1 — Create the Database

```bash
# macOS (Homebrew, no password)
psql -h 127.0.0.1 -U $USER -d postgres -c "CREATE DATABASE freelancer_platform;"

# Linux / password-protected
psql -h 127.0.0.1 -U postgres -d postgres -c "CREATE DATABASE freelancer_platform;"
```

---

### Step 2 — Configure Backend Environment

```bash
cd backend
cp .env .env.backup   # optional — keep original for reference
```

Edit `backend/.env` — the only values you **must** change for local dev:

```ini
DB_USER=<your_system_username>   # result of: whoami
DB_HOST=127.0.0.1                # use 127.0.0.1, not localhost
DB_PASSWORD=                     # leave blank if trust auth (Homebrew default)
```

Full `.env` reference:
```ini
# Django
SECRET_KEY=fmp-super-secret-key-change-in-production-long-random-string
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Database
DB_NAME=freelancer_platform
DB_USER=your_username
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_PORT=5432

# JWT
JWT_ACCESS_TOKEN_LIFETIME_MINUTES=60
JWT_REFRESH_TOKEN_LIFETIME_DAYS=7

# Email — optional for dev (password reset uses email)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=noreply@yourplatform.com

# S3 File Storage — set USE_S3=True to enable
USE_S3=False

# Google Meet — optional (platform works without it, uses placeholder links)
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
GOOGLE_CALENDAR_ID=admin@yourplatform.com
```

---

### Step 3 — Install Python Packages & Run Migrations

```bash
cd backend
python3 -m venv venv
source venv/bin/activate           # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
```

Expected output — all 38 migrations applied:
```
Applying users.0001_initial... OK
Applying projects.0001_initial... OK
Applying tasks.0001_initial... OK
Applying reports.0001_initial... OK
Applying meetings.0001_initial... OK
Applying notifications.0001_initial... OK
...
```

---

### Step 4 — Create Admin & Seed Demo Data

```bash
# Create superuser
python manage.py createsuperuser
# → Prompts for email, full_name, password

# OR create non-interactively
python manage.py shell -c "
from apps.users.models import User
User.objects.create_superuser(
    email='admin@fmp.com',
    full_name='Platform Admin',
    password='Admin@1234',
)
print('Admin created')
"
```

Optional — seed demo employee + project + tasks:
```bash
python manage.py shell -c "
from apps.users.models import User
from apps.projects.models import Project
from apps.tasks.models import Task

admin = User.objects.get(email='admin@fmp.com')

emp = User.objects.create_user(
    email='jane@fmp.com', full_name='Jane Cooper',
    password='Employee@1234', role='employee', must_change_password=False
)
proj = Project.objects.create(
    name='Brand Identity Redesign', client_name='Acme Corp',
    status='active', created_by=admin
)
proj.members.add(emp)
Task.objects.create(title='Logo Sketches', assigned_to=emp,
    assigned_by=admin, project=proj, status='todo', priority='high')
print('Demo data seeded')
"
```

---

### Step 5 — Start the Backend

```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

Backend running at **http://localhost:8000**

Quick API test:
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fmp.com","password":"Admin@1234"}'
# → returns { "access": "...", "role": "admin", "user": {...} }
```

---

### Step 6 — Frontend

```bash
cd frontend
npm install

# Verify .env
cat .env
# → VITE_API_BASE_URL=http://localhost:8000/api

npm run dev
```

Frontend running at **http://localhost:5173**

---

## Useful URLs

| URL | Description |
|-----|-------------|
| http://localhost:5173 | React frontend |
| http://localhost:8000/api/docs/ | Swagger API documentation |
| http://localhost:8000/admin/ | Django admin panel |
| http://localhost:8000/api/auth/login/ | JWT login endpoint |

---

## Project Structure

```
abc/
├── setup.sh                  ← one-command setup
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env                  ← never commit
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   └── apps/
│       ├── users/            # Custom User, JWT auth, OTP reset
│       ├── projects/         # Projects, ProgressUpdates, Files
│       ├── tasks/            # Tasks with role-scoped access
│       ├── reports/          # DailyReports + attendance logic
│       ├── meetings/         # MeetingLog + Google Meet API
│       └── notifications/    # In-app notification system
│
└── frontend/
    ├── .env                  ← never commit
    └── src/
        ├── api/              # axios + per-resource modules
        ├── components/       # Shared UI (Modal, Avatar, StatCard…)
        ├── pages/
        │   ├── auth/         # Login, ForgotPassword, ForceChangePassword
        │   ├── admin/        # Dashboard, Employees, Projects, Tasks,
        │   │                 # Reports, Attendance, Files, Meetings
        │   └── employee/     # Dashboard, MyTasks, MyProjects,
        │                     # MyReports, MyAttendance, ProjectWorkspace
        ├── store/            # Zustand auth store
        ├── router.jsx        # Role-based route guards
        └── utils/            # Date helpers, status colors
```

---

## Troubleshooting

**`connection refused` on migrate**
→ PostgreSQL isn't running. Run: `brew services start postgresql@16`

**`FATAL: database does not exist`**
→ Create it first: `psql -h 127.0.0.1 -U $USER -d postgres -c "CREATE DATABASE freelancer_platform;"`

**`role "postgres" does not exist`**
→ On macOS/Homebrew the superuser is your system username, not `postgres`. Use `DB_USER=$(whoami)` in `.env`.

**`password authentication failed`**
→ Set `DB_HOST=127.0.0.1` (not `localhost`). Homebrew pg_hba uses `trust` for TCP connections to 127.0.0.1.

**CORS errors in browser**
→ Make sure `CORS_ALLOWED_ORIGINS=http://localhost:5173` in `backend/.env` and Django is running on port 8000.

**`ModuleNotFoundError: No module named 'decouple'`**
→ Virtual env not activated. Run `source venv/bin/activate` first.

---

## Production Checklist

- [ ] `DEBUG=False`
- [ ] `SECRET_KEY` is 50+ chars, fully random, not the dev key
- [ ] `.env` is in `.gitignore` — never committed
- [ ] `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` point to your real domain
- [ ] `USE_S3=True` with a **private** bucket; files served via pre-signed URLs
- [ ] Run behind `gunicorn` + `nginx`, TLS enforced
- [ ] `npm run build` → serve `dist/` as static from nginx or S3/CloudFront

---

## Tech Stack

**Backend** — Django 4.2, DRF, SimpleJWT, django-filter, drf-spectacular, django-storages, Pillow, python-decouple

**Frontend** — React 18, Vite 5, TailwindCSS 3, TanStack Query, Zustand, React Hook Form, Headless UI, Heroicons, Recharts, react-dropzone, date-fns, axios

**Database** — PostgreSQL 14+

**Auth** — JWT (60 min access token + 7 day refresh via httpOnly cookie)
