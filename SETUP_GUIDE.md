# GoResume - Complete Setup Guide

## Overview
GoResume is a full-stack AI-powered resume builder and analyzer with authentication, database integration, and AI analysis capabilities.

## Architecture

```
GoResume/
├── frontend/          # React + Vite + TypeScript
├── backend/           # Node.js + Express API
└── database/          # Supabase (PostgreSQL)
```

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js v16+ installed
- [ ] npm or yarn package manager
- [ ] Supabase account (https://supabase.com)
- [ ] Google Gemini API key (https://ai.google.dev/)
- [ ] (Optional) GitHub OAuth app for GitHub login
- [ ] (Optional) Google OAuth credentials for Google login

## Step-by-Step Setup

### 1. Database Setup (Supabase)

1. Go to https://supabase.com and create a new project
2. Wait for the database to be provisioned
3. Go to **SQL Editor** in your Supabase dashboard
4. Copy and paste the contents of `backend/database/schema.sql`
5. Click "Run" to execute the SQL
6. Verify tables are created:
   - profiles
   - resumes
   - resume_analyses

### 2. Get API Keys

#### Supabase Keys
1. In Supabase dashboard, go to **Settings** > **API**
2. Copy these values:
   - Project URL
   - anon/public key
   - service_role key (keep this secret!)

#### Gemini API Key
1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create a new API key or use existing one
4. Copy the API key

#### GitHub OAuth (Optional)
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth app
3. Set callback URL: `http://localhost:5173/auth/callback`
4. Copy Client ID and Client Secret
5. Add to Supabase: Settings > Authentication > Providers > GitHub

#### Google OAuth (Optional)
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Set redirect URI: `http://localhost:5173/auth/callback`
4. Copy Client ID and Client Secret
5. Add to Supabase: Settings > Authentication > Providers > Google

### 3. Backend Setup

1. Navigate to backend:
```bash
cd backend
npm install
```

2. Configure environment:
```bash
cp .env.example .env
```

3. Edit `.env` file:
```env
PORT=3001
NODE_ENV=development

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

GEMINI_API_KEY=your_gemini_api_key_here

FRONTEND_URL=http://localhost:5173
```

4. Start backend:
```bash
npm run dev
```

Backend should now be running on http://localhost:3001

### 4. Frontend Setup

1. Open a new terminal and navigate to frontend:
```bash
cd frontend
npm install
```

2. Configure environment:
```bash
# Create .env file in frontend directory
```

3. Add these values to frontend `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_API_URL=http://localhost:3001/api
```

4. Start frontend:
```bash
npm run dev
```

Frontend should now be running on http://localhost:5173

### 5. Testing the Application

1. **Test Authentication**
   - Go to http://localhost:5173
   - Click "Sign Up" or "Login"
   - Create an account with email/password
   - Try GitHub/Google login if configured

2. **Test Resume Builder**
   - After login, go to "Resume Builder"
   - Fill in your information
   - Select different templates
   - Save your resume

3. **Test AI Analyzer**
   - Go to "AI Analyzer"
   - Upload a PDF resume
   - Optionally add job description
   - Click "Analyze Resume"
   - Review AI-generated scores and suggestions

## Common Issues & Solutions

### Issue: "Failed to connect to Supabase"
- **Solution**: Double-check your Supabase URL and keys in .env files
- Ensure they match exactly from your Supabase dashboard

### Issue: "Gemini API error"
- **Solution**: Verify your Gemini API key is valid
- Check if you have API quota remaining
- Ensure key is correctly set in backend/.env

### Issue: "Port already in use"
- **Solution**:
  - Change PORT in backend/.env to another port (e.g., 3002)
  - Update VITE_API_URL in frontend/.env accordingly

### Issue: "Database tables not found"
- **Solution**:
  - Rerun the schema SQL in Supabase SQL Editor
  - Check RLS policies are enabled
  - Verify you're connected to the correct Supabase project

### Issue: "OAuth not working"
- **Solution**:
  - Verify OAuth apps are configured correctly
  - Check redirect URLs match exactly
  - Ensure OAuth is enabled in Supabase Authentication settings

## Features Implemented

### Authentication
✅ Email/Password signup and login
✅ Google OAuth integration (if configured)
✅ GitHub OAuth integration (if configured)
✅ Secure JWT token authentication
✅ User profile management

### Resume Builder
✅ Multiple ATS-friendly templates:
  - Modern Professional
  - Executive Classic
  - Academic Scholar
  - Creative Portfolio
  - Startup Innovator
  - Minimalist Pro
  - ATS Classic
  - Simple ATS
  - Tech ATS
✅ Live resume preview
✅ Save and update resumes
✅ Multiple resume support per user

### AI Analyzer
✅ PDF resume upload and parsing
✅ Personal information removal for privacy
✅ AI-powered analysis with Gemini
✅ Detailed scoring across multiple categories:
  - Content Quality
  - Formatting & Structure
  - ATS Compatibility
  - Keywords & Skills
✅ Actionable improvement suggestions
✅ Skills analysis (missing, strong, recommended)
✅ Job description comparison
✅ Analysis history tracking

### Database
✅ User profiles storage
✅ Resume content storage (JSONB format)
✅ Analysis history with full results
✅ Row Level Security (RLS) policies
✅ User data isolation

### Security
✅ JWT authentication
✅ Row Level Security on all tables
✅ CORS configuration
✅ Rate limiting
✅ Helmet security headers
✅ Input validation
✅ File upload restrictions

## API Endpoints

### Auth Endpoints
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/github` - GitHub OAuth
- `GET /api/auth/user` - Get current user

### Resume Endpoints
- `GET /api/resumes` - List all user resumes
- `GET /api/resumes/:id` - Get specific resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### Analyzer Endpoints
- `POST /api/analyzer/analyze` - Analyze resume (multipart/form-data)
- `POST /api/analyzer/optimize` - Optimize text section
- `GET /api/analyzer/history` - Get analysis history
- `GET /api/analyzer/:id` - Get specific analysis

## Database Schema

### profiles
- id (uuid, FK to auth.users)
- first_name (text)
- last_name (text)
- avatar_url (text)
- created_at, updated_at (timestamptz)

### resumes
- id (uuid, PK)
- user_id (uuid, FK)
- title (text)
- template_id (text)
- content (jsonb)
- is_public (boolean)
- created_at, updated_at (timestamptz)

### resume_analyses
- id (uuid, PK)
- resume_id (uuid, FK, optional)
- user_id (uuid, FK)
- job_description (text)
- overall_score (integer)
- analysis_data (jsonb)
- suggestions (jsonb)
- created_at (timestamptz)

## Next Steps

### Recommended Enhancements
1. Add password reset functionality
2. Implement email verification
3. Add resume sharing features
4. Create resume templates editor
5. Add export to multiple formats (PDF, DOCX, etc.)
6. Implement drag-and-drop resume builder
7. Add real-time collaboration
8. Create mobile app version

### Production Deployment
1. Set up production Supabase project
2. Deploy backend to cloud platform (Heroku, Railway, etc.)
3. Deploy frontend to Vercel, Netlify, or similar
4. Configure production environment variables
5. Set up custom domain
6. Enable HTTPS
7. Configure proper OAuth redirect URLs
8. Set up monitoring and logging
9. Implement backup strategy
10. Add analytics

## Support

For issues or questions:
1. Check this guide first
2. Review the error logs in console
3. Verify all environment variables are set
4. Check Supabase dashboard for database issues
5. Ensure all dependencies are installed

## Project Structure Details

### Frontend (React + TypeScript)
```
frontend/src/
├── components/       # Reusable UI components
│   ├── ui/          # Shadcn UI components
│   └── resume-templates/  # Resume template components
├── pages/           # Page components (routes)
├── lib/             # Utilities and API client
├── hooks/           # Custom React hooks
└── App.tsx          # Main app component
```

### Backend (Node.js + Express)
```
backend/src/
├── routes/          # API route handlers
│   ├── auth.js     # Authentication routes
│   ├── resumes.js  # Resume CRUD routes
│   └── analyzer.js # AI analysis routes
├── services/        # Business logic
│   └── gemini.js   # Gemini AI integration
├── middleware/      # Express middleware
│   └── auth.js     # Authentication middleware
├── config/          # Configuration
│   └── supabase.js # Supabase client setup
├── utils/           # Helper functions
│   └── pdfParser.js # PDF parsing utilities
└── server.js        # Express server setup
```

## Congratulations!

Your GoResume application is now set up and ready to use. Users can sign up, create professional resumes using multiple templates, and get AI-powered analysis to improve their resumes.
