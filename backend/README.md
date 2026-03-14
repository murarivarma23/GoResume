# GoResume Backend

Backend API for GoResume - AI-powered resume builder and analyzer.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file based on `.env.example`:

```env
PORT=4000
NODE_ENV=development

SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

GEMINI_API_KEY=your_gemini_api_key_here

FRONTEND_URL=http://localhost:5173
```

### 3. Setup Database
Run the SQL schema in your Supabase SQL editor:
```bash
See: database/schema.sql
```

### 4. Run the Server
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/github` - GitHub OAuth
- `GET /api/auth/user` - Get current user

### Resumes
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get single resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### AI Analyzer
- `POST /api/analyzer/analyze` - Analyze resume (requires file upload)
- `POST /api/analyzer/optimize` - Optimize resume section
- `GET /api/analyzer/history` - Get analysis history
- `GET /api/analyzer/:id` - Get specific analysis

## Features

- JWT authentication with Supabase
- File upload for resume analysis (PDF support)
- AI-powered resume analysis with Google Gemini
- Personal information removal from resumes before AI analysis
- Rate limiting and security headers
- CORS configuration for frontend integration
