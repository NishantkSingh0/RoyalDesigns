#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# FreelanceHQ — One-shot Setup Script
# Usage: bash setup.sh
# ─────────────────────────────────────────────────────────────
set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
log()  { echo -e "${CYAN}▶ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }
fail() { echo -e "${RED}✗ $1${NC}"; exit 1; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND="$SCRIPT_DIR/backend"
FRONTEND="$SCRIPT_DIR/frontend"

# ── 1. Check prerequisites ────────────────────────────────────
log "Checking prerequisites…"
command -v python3 >/dev/null 2>&1 || fail "Python 3 is required. Install from https://python.org"
command -v node    >/dev/null 2>&1 || fail "Node.js is required. Install from https://nodejs.org"
command -v npm     >/dev/null 2>&1 || fail "npm is required (comes with Node.js)"
command -v psql    >/dev/null 2>&1 || fail "PostgreSQL client (psql) not found. Install PostgreSQL."
pg_isready -q 2>/dev/null || fail "PostgreSQL server is not running. Start it first:\n  brew services start postgresql@16"
ok "Prerequisites OK"

# ── 2. Detect PostgreSQL user ─────────────────────────────────
log "Detecting PostgreSQL user…"
PG_USER="${USER}"
# Try connecting with current user
if psql -h 127.0.0.1 -U "$PG_USER" -d postgres -c "SELECT 1" >/dev/null 2>&1; then
    ok "PostgreSQL user: $PG_USER"
elif psql -h 127.0.0.1 -U postgres -d postgres -c "SELECT 1" >/dev/null 2>&1; then
    PG_USER="postgres"
    ok "PostgreSQL user: postgres"
else
    fail "Cannot connect to PostgreSQL. Check your pg_hba.conf or set PG_USER manually in this script."
fi

# ── 3. Create database ────────────────────────────────────────
log "Creating database 'freelancer_platform'…"
if psql -h 127.0.0.1 -U "$PG_USER" -d postgres -lqt | cut -d \| -f 1 | grep -qw freelancer_platform; then
    warn "Database 'freelancer_platform' already exists — skipping"
else
    psql -h 127.0.0.1 -U "$PG_USER" -d postgres -c "CREATE DATABASE freelancer_platform;" >/dev/null
    ok "Database created"
fi

# ── 4. Update .env with detected user ────────────────────────
log "Writing backend/.env…"
cat > "$BACKEND/.env" <<EOF
# ── Django Core ─────────────────────────────────
SECRET_KEY=fmp-super-secret-key-change-in-production-make-this-very-long-and-random-xyz
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173

# ── PostgreSQL ──────────────────────────────────
DB_NAME=freelancer_platform
DB_USER=$PG_USER
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_PORT=5432

# ── JWT ─────────────────────────────────────────
JWT_ACCESS_TOKEN_LIFETIME_MINUTES=60
JWT_REFRESH_TOKEN_LIFETIME_DAYS=7

# ── Email (SMTP) ────────────────────────────────
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your@email.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=noreply@yourplatform.com

# ── AWS S3 (set USE_S3=True to enable) ──────────
USE_S3=False
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_STORAGE_BUCKET_NAME=freelancer-platform-files
AWS_S3_REGION_NAME=ap-south-1

# ── Google APIs (optional) ───────────────────────
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"your-project"}
GOOGLE_CALENDAR_ID=admin@yourplatform.com
EOF
ok ".env written with DB_USER=$PG_USER"

# ── 5. Python virtual environment ────────────────────────────
log "Setting up Python virtual environment…"
cd "$BACKEND"
if [ ! -d "venv" ]; then
    python3 -m venv venv
    ok "venv created"
else
    warn "venv already exists — skipping"
fi
source venv/bin/activate

# ── 6. Install Python dependencies ───────────────────────────
log "Installing Python packages…"
pip install -r requirements.txt -q
ok "Python packages installed"

# ── 7. Run Django migrations ──────────────────────────────────
log "Running Django migrations…"
python manage.py migrate --no-input
ok "Migrations complete"

# ── 8. Create superuser ───────────────────────────────────────
log "Creating admin superuser…"
python manage.py shell -c "
from apps.users.models import User
if not User.objects.filter(email='admin@fmp.com').exists():
    User.objects.create_superuser(
        email='admin@fmp.com',
        full_name='Platform Admin',
        password='Admin@1234',
    )
    print('  Created: admin@fmp.com / Admin@1234')
else:
    print('  Already exists: admin@fmp.com')
"

# ── 9. Seed demo data ─────────────────────────────────────────
log "Seeding demo data…"
python manage.py shell -c "
from apps.users.models import User
from apps.projects.models import Project
from apps.tasks.models import Task

admin = User.objects.get(email='admin@fmp.com')

emp, created = User.objects.get_or_create(
    email='jane@fmp.com',
    defaults=dict(full_name='Jane Cooper', role='employee', must_change_password=False)
)
if created:
    emp.set_password('Employee@1234')
    emp.save()
    print('  Employee created: jane@fmp.com / Employee@1234')

proj, _ = Project.objects.get_or_create(
    name='Brand Identity Redesign',
    defaults=dict(
        client_name='Acme Corp',
        description='Complete brand overhaul: logo, typography, color system.',
        status='active',
        created_by=admin,
    )
)
proj.members.add(emp)

for title, status, priority in [
    ('Logo Concept Sketches',  'todo',        'high'),
    ('Color Palette Research', 'in_progress', 'medium'),
    ('Typography Selection',   'done',        'medium'),
]:
    Task.objects.get_or_create(
        title=title,
        defaults=dict(project=proj, assigned_to=emp, assigned_by=admin, status=status, priority=priority)
    )
print('  Demo project + tasks seeded')
"

# ── 10. Install frontend dependencies ────────────────────────
log "Installing frontend packages…"
cd "$FRONTEND"
npm install -q
ok "Frontend packages installed"

# ── 11. Write frontend .env ───────────────────────────────────
if [ ! -f ".env" ]; then
    echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env
    ok "frontend/.env written"
fi

# ── Done ──────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✅  FreelanceHQ setup complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${CYAN}Backend${NC}  →  cd backend && source venv/bin/activate && python manage.py runserver"
echo -e "  ${CYAN}Frontend${NC} →  cd frontend && npm run dev"
echo ""
echo -e "  ${YELLOW}Admin login${NC}    admin@fmp.com     /  Admin@1234"
echo -e "  ${YELLOW}Employee login${NC} jane@fmp.com      /  Employee@1234"
echo ""
echo -e "  ${CYAN}API Docs (Swagger)${NC}  →  http://localhost:8000/api/docs/"
echo -e "  ${CYAN}Django Admin${NC}        →  http://localhost:8000/admin/"
echo -e "  ${CYAN}Frontend${NC}            →  http://localhost:5173/"
echo ""
