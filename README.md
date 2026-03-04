# AI Literacy Training Platform

Enterprise-grade AI literacy training game that simulates a desktop workplace environment with realistic AI misuse scenarios, LLM-driven NPC dialogue, and EU AI Act compliance tracking.

## 🎯 Overview

This platform provides interactive training scenarios where employees learn to identify and handle AI misuse situations through a simulated desktop interface. Key features include:

- **Desktop Workplace Simulation** - Email, chat, and AI assistant apps in a realistic OS environment
- **LLM-Powered NPCs** - Dynamic conversations with contextual AI-generated responses
- **Real-time Compliance Scoring** - Track risk levels and compliance readiness
- **EU AI Act Alignment** - Training aligned with regulatory requirements
- **Multi-tenant Architecture** - Enterprise SaaS-ready with role-based access

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js 14)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │  Login   │ │Dashboard │ │ Training │ │ Scenario         │   │
│  │  Page    │ │  Page    │ │  List    │ │ Simulation       │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Desktop Simulation Layer                     │   │
│  │   EmailApp │ ChatApp │ AIAssistant │ ComplianceMonitor   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │          Zustand Stores (Auth, Training, Simulation)      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                               │ REST API + WebSocket
┌─────────────────────────────────────────────────────────────────┐
│                     Backend (Express.js + TypeScript)            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         Controllers: Auth, Training, Analytics, Admin     │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │    Services: AI (OpenAI), Training, Analytics, Audit      │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Prisma ORM + PostgreSQL + Redis              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- OpenAI API Key (for LLM features)

### Development Setup

1. **Clone and navigate to project:**
```bash
cd ai-literacy-platform
```

2. **Start infrastructure services:**
```bash
docker-compose up postgres redis -d
```

3. **Setup backend:**
```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npx prisma migrate dev
npx prisma db seed
npm run dev
```

4. **Setup frontend (in new terminal):**
```bash
cd frontend
npm install
npm run dev
```

5. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health: http://localhost:5000/api/health

### Docker Deployment

```bash
# Development mode (with hot reload)
docker-compose up --build

# Production mode
NODE_ENV=production BUILD_TARGET=runner docker-compose up --build -d

# With PgAdmin for database management
docker-compose --profile admin up -d
```

## 🔐 Default Credentials

After running seed data:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | super.admin@globaltech.example | password123 |
| Compliance Admin | compliance.officer@globaltech.example | password123 |
| Manager | dept.manager@globaltech.example | password123 |
| Employee | john.doe@globaltech.example | password123 |

## 📁 Project Structure

```
ai-literacy-platform/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Database models
│   │   └── seed.ts            # Demo data seeder
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic
│   │   ├── templates/         # AI prompt templates
│   │   ├── types/             # TypeScript definitions
│   │   ├── utils/             # Helper functions
│   │   └── index.ts           # Server entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/
│   │   │   ├── ui/            # Reusable UI components
│   │   │   ├── simulation/    # Desktop simulation components
│   │   │   └── layout/        # Layout components
│   │   ├── lib/               # API client, utilities
│   │   ├── store/             # Zustand state management
│   │   ├── styles/            # Global styles, design tokens
│   │   └── types/             # TypeScript definitions
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🎨 Design System

### Color Palette

| Usage | Color | Hex |
|-------|-------|-----|
| Background | Dark Navy | `#0F172A` |
| Surface | Dark Slate | `#1E293B` |
| Primary | Blue | `#3B82F6` |
| Compliance | Green | `#22C55E` |
| Risk/Warning | Amber | `#F59E0B` |
| Violation/Error | Red | `#EF4444` |
| AI Accent | Purple | `#8B5CF6` |

### Typography

- **Sans Serif:** Inter (UI text)
- **Monospace:** JetBrains Mono (code, data)

## 📡 API Reference

### Authentication

```
POST   /api/auth/register      # Create new user
POST   /api/auth/login         # Login, get tokens
POST   /api/auth/refresh       # Refresh access token
POST   /api/auth/logout        # Invalidate refresh token
GET    /api/auth/me            # Current user info
```

### Training

```
GET    /api/training/modules              # List all modules
GET    /api/training/modules/:id          # Module details with scenarios
POST   /api/training/sessions/start       # Start scenario session
POST   /api/training/sessions/:id/interact  # NPC interaction
POST   /api/training/sessions/:id/escalate  # Escalate scenario
POST   /api/training/sessions/:id/complete  # Complete session
GET    /api/training/progress             # User progress
```

### Analytics

```
GET    /api/analytics/dashboard           # Dashboard stats
GET    /api/analytics/progress            # Progress over time
GET    /api/analytics/compliance          # Compliance scores
GET    /api/analytics/leaderboard         # Training leaderboard
```

### Admin

```
GET    /api/admin/users                   # List users (admin only)
GET    /api/admin/audit-logs              # Audit logs
POST   /api/admin/modules                 # Create training module
PUT    /api/admin/modules/:id             # Update module
DELETE /api/admin/modules/:id             # Delete module
```

## 🔧 Environment Variables

### Backend (.env)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://ailiteracy:ailiteracy123@localhost:5432/ailiteracy

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## 📊 Database Schema

### Core Models

- **Organization** - Multi-tenant support
- **User** - Employees with roles
- **TrainingModule** - Training content groups
- **Scenario** - Individual training scenarios
- **NPCInteraction** - LLM conversation logs
- **UserProgress** - Training completion tracking
- **SessionAttempt** - Individual session data
- **ComplianceScore** - Compliance metrics
- **RiskIncident** - Risk event tracking
- **AuditLog** - Full audit trail
- **AnalyticsSnapshot** - Aggregated analytics

### Risk Categories (EU AI Act Aligned)

- `UNACCEPTABLE` - Prohibited AI uses
- `HIGH` - High-risk AI systems
- `LIMITED` - Transparency obligations
- `MINIMAL` - No restrictions

## 🚢 Deployment

### Production Checklist

- [ ] Set strong JWT secrets
- [ ] Configure CORS origins
- [ ] Set up SSL/TLS
- [ ] Configure OpenAI API key
- [ ] Run database migrations
- [ ] Seed initial admin user
- [ ] Configure monitoring/logging
- [ ] Set up backup strategy

### Docker Production Build

```bash
# Build production images
docker-compose -f docker-compose.yml \
  -e NODE_ENV=production \
  -e BUILD_TARGET=runner \
  up --build -d
```

## 📝 License

Proprietary - Enterprise Use Only

## 🤝 Support

For enterprise support and custom deployments, contact your account representative.

---

Built with ❤️ for enterprise AI compliance training
