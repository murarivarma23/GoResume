# GoResume - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                    (http://localhost:5173)                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTPS
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Pages: Login, Signup, Resume Builder, AI Analyzer         │ │
│  │ Components: 9 Resume Templates, UI Components             │ │
│  │ State: React Query, Local State                           │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────┬──────────────────────────────────┬──────────────────┘
            │                                  │
            │ API Calls                        │ Auth Calls
            │ (REST)                           │ (Supabase SDK)
            │                                  │
┌───────────▼──────────────────────┐  ┌────────▼─────────────────┐
│   EXPRESS BACKEND API            │  │   SUPABASE AUTH          │
│   (http://localhost:3001)        │  │   (OAuth, JWT)           │
│                                  │  │                          │
│  ┌────────────────────────────┐ │  │  - Email/Password        │
│  │ Routes:                    │ │  │  - Google OAuth          │
│  │  - /api/auth/*            │ │  │  - GitHub OAuth          │
│  │  - /api/resumes/*         │ │  │  - JWT Tokens            │
│  │  - /api/analyzer/*        │ │  └──────────────────────────┘
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ Services:                  │ │
│  │  - Gemini AI Integration  │ │
│  │  - PDF Parser             │ │
│  │  - PII Removal            │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ Middleware:                │ │
│  │  - Authentication         │ │
│  │  - Rate Limiting          │ │
│  │  - CORS                   │ │
│  │  - Security Headers       │ │
│  └────────────────────────────┘ │
└───────────┬──────────────────────┘
            │
            │ Database Queries
            │ (Supabase Client)
            │
┌───────────▼──────────────────────────────────────────────────────┐
│                    SUPABASE (PostgreSQL)                          │
│                                                                   │
│  ┌────────────────────┐  ┌────────────────────┐  ┌────────────┐ │
│  │   profiles         │  │   resumes          │  │  resume    │ │
│  │                    │  │                    │  │  _analyses │ │
│  │  - id              │  │  - id              │  │            │ │
│  │  - first_name      │  │  - user_id (FK)    │  │  - id      │ │
│  │  - last_name       │  │  - title           │  │  - user_id │ │
│  │  - avatar_url      │  │  - template_id     │  │  - score   │ │
│  │  - created_at      │  │  - content (JSONB) │  │  - data    │ │
│  │  - updated_at      │  │  - is_public       │  │  - created │ │
│  │                    │  │  - timestamps      │  │            │ │
│  └────────────────────┘  └────────────────────┘  └────────────┘ │
│                                                                   │
│  🔒 Row Level Security (RLS) Enabled on All Tables               │
│  🔒 Users Can Only Access Their Own Data                         │
└───────────────────────────────────────────────────────────────────┘
            │
            │ External API Call
            │
┌───────────▼──────────────────────┐
│      GOOGLE GEMINI AI             │
│   (AI Resume Analysis)            │
│                                   │
│  - Analyzes resume content        │
│  - Generates scores (0-100)       │
│  - Creates suggestions            │
│  - Identifies missing skills      │
└───────────────────────────────────┘
```

## Request Flow Diagrams

### 1. Authentication Flow

```
User → Frontend → Supabase Auth → Backend → Database
 │        │            │             │          │
 │    Signup Form   OAuth/Email   Create     Store
 │        │            │          Profile   Profile
 │        │            │             │          │
 │    ◄───┴────────────┴─────────────┴──────────┘
 │         JWT Token + Session
```

### 2. Resume Creation Flow

```
User → Frontend → Backend API → Database
 │        │           │            │
 │   Fill Form    POST /api    INSERT
 │   Select       /resumes     resumes
 │   Template        │            │
 │        │          │            │
 │    ◄──┴──────────┴────────────┘
 │      Success + Resume ID
```

### 3. AI Analysis Flow

```
User → Frontend → Backend API → PDF Parser → PII Remover
 │        │           │             │            │
 │   Upload PDF   Receive      Extract Text   Clean Data
 │        │        File            │            │
 │        │           │             │            │
 │        │           └─────────────┴────────────┤
 │        │                                      │
 │        │           ┌──────────────────────────┘
 │        │           │
 │        │           ▼
 │        │      Gemini AI
 │        │           │
 │        │      Analyze &
 │        │       Score
 │        │           │
 │        │           ▼
 │        │      Database (store results)
 │        │           │
 │    ◄──┴───────────┘
 │    Display Results
```

## Technology Stack Layers

```
┌──────────────────────────────────────────┐
│           PRESENTATION LAYER             │
│  React + TypeScript + Tailwind CSS       │
│  Shadcn UI + React Router                │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│          APPLICATION LAYER               │
│  Express.js + Node.js                    │
│  JWT Authentication                      │
│  Rate Limiting + Security                │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│           BUSINESS LOGIC                 │
│  Resume Management                       │
│  AI Analysis Service                     │
│  PDF Processing                          │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│          DATA ACCESS LAYER               │
│  Supabase Client                         │
│  SQL Queries                             │
│  RLS Policies                            │
└──────────────────┬───────────────────────┘
                   │
┌──────────────────▼───────────────────────┐
│           DATA LAYER                     │
│  PostgreSQL (Supabase)                   │
│  JSONB Storage                           │
│  Indexes & Constraints                   │
└──────────────────────────────────────────┘
```

## Security Architecture

```
┌───────────────────────────────────────────────────────┐
│                  SECURITY LAYERS                       │
├───────────────────────────────────────────────────────┤
│  Layer 1: Transport Security                          │
│  - HTTPS/TLS                                          │
│  - Secure Headers (Helmet.js)                         │
│  - CORS Policy                                        │
├───────────────────────────────────────────────────────┤
│  Layer 2: Authentication                              │
│  - JWT Tokens                                         │
│  - OAuth 2.0 (Google, GitHub)                         │
│  - Session Management                                 │
├───────────────────────────────────────────────────────┤
│  Layer 3: Authorization                               │
│  - Row Level Security (RLS)                           │
│  - User-based Access Control                          │
│  - API Route Protection                               │
├───────────────────────────────────────────────────────┤
│  Layer 4: Input Validation                            │
│  - File Type Checking                                 │
│  - File Size Limits                                   │
│  - Request Validation                                 │
├───────────────────────────────────────────────────────┤
│  Layer 5: Data Protection                             │
│  - PII Removal Before AI Processing                   │
│  - Secure Storage                                     │
│  - Data Encryption at Rest                            │
├───────────────────────────────────────────────────────┤
│  Layer 6: Rate Limiting                               │
│  - API Request Limits                                 │
│  - DDoS Protection                                    │
└───────────────────────────────────────────────────────┘
```

## Component Interaction Map

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND COMPONENTS                     │
├──────────────┬──────────────┬──────────────┬────────────────┤
│    Login     │   Signup     │   Builder    │   Analyzer     │
│    Page      │    Page      │    Page      │     Page       │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬───────┘
       │              │              │                │
       │              │              │                │
       └──────────────┴──────────────┴────────────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │   API Client (lib/api) │
          │   - authAPI            │
          │   - resumeAPI          │
          │   - analyzerAPI        │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │  Backend Routes       │
          │  - /api/auth/*        │
          │  - /api/resumes/*     │
          │  - /api/analyzer/*    │
          └───────────┬───────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
    ┌──────────┐          ┌──────────────┐
    │ Database │          │  External    │
    │ (CRUD)   │          │  Services    │
    └──────────┘          │  - Gemini AI │
                          └──────────────┘
```

## Deployment Architecture (Recommended)

```
┌──────────────────────────────────────────────────────────────┐
│                       PRODUCTION                              │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (Vercel/Netlify)                                   │
│  ├── Static hosting                                          │
│  ├── CDN distribution                                        │
│  └── Automatic HTTPS                                         │
│                                                               │
│  Backend (Railway/Heroku/Render)                             │
│  ├── Node.js runtime                                         │
│  ├── Auto-scaling                                            │
│  └── Environment variables                                   │
│                                                               │
│  Database (Supabase)                                         │
│  ├── Managed PostgreSQL                                      │
│  ├── Automatic backups                                       │
│  └── Built-in auth                                           │
│                                                               │
│  AI Service (Google Gemini)                                  │
│  └── API key authentication                                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow Example: Creating and Analyzing a Resume

```
1. User Login
   User → Login Page → Supabase Auth → JWT Token → Store in Browser

2. Create Resume
   User fills form → Click Save
   → POST /api/resumes with JWT
   → Verify JWT in backend
   → Insert into database
   → Return resume ID
   → Redirect to resume list

3. Upload for Analysis
   User uploads PDF → Click Analyze
   → POST /api/analyzer/analyze (multipart/form-data)
   → Extract text from PDF
   → Remove personal information
   → Send to Gemini AI
   → Parse AI response
   → Save to database
   → Return results to frontend
   → Display scores and suggestions
```

## Scalability Considerations

### Current Architecture (Development)
- Single backend instance
- Direct database connections
- In-memory rate limiting

### Production Recommendations
- Load balancer for backend
- Redis for session/cache
- CDN for static assets
- Database connection pooling
- Distributed rate limiting
- Monitoring & logging
- Automated backups

---

This architecture provides:
✅ Separation of concerns
✅ Scalability
✅ Security
✅ Maintainability
✅ Testability
