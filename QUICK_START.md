# GoResume - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js v16+
- Supabase account
- Gemini API key

### Step 1: Database Setup (2 minutes)
1. Go to https://supabase.com
2. Create new project
3. Go to SQL Editor
4. Copy/paste contents of `backend/database/schema.sql`
5. Click RUN

### Step 2: Get Your Keys (1 minute)
**Supabase Keys** (Settings > API):
- Project URL
- anon/public key
- service_role key

**Gemini Key**: https://ai.google.dev/

### Step 3: Configure Backend (1 minute)
```bash
cd backend
cp .env.example .env
# Edit .env with your keys
```

### Step 4: Configure Frontend (30 seconds)
```bash
cd frontend
# Edit .env file
```

Add:
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_API_URL=http://localhost:3001/api
```

### Step 5: Install & Run (30 seconds)
**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Step 6: Test It! (30 seconds)
1. Open http://localhost:5173
2. Click "Sign Up"
3. Create account
4. Start building resumes!

---

## 📁 Project Structure
```
GoResume/
├── frontend/       # React app (localhost:5173)
├── backend/        # API server (localhost:3001)
└── docs/           # README, guides, etc.
```

## 🔑 Key URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🎯 Core Features
1. **Sign Up/Login** - Email, Google, GitHub
2. **Build Resume** - 9 ATS-friendly templates
3. **AI Analysis** - Upload PDF, get scored & suggestions

## 📝 API Endpoints Quick Reference

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/github` (OAuth)
- `GET /api/auth/user`

### Resumes
- `GET /api/resumes` (list all)
- `POST /api/resumes` (create)
- `PUT /api/resumes/:id` (update)
- `DELETE /api/resumes/:id` (delete)

### AI Analyzer
- `POST /api/analyzer/analyze` (upload PDF)
- `GET /api/analyzer/history`

## ⚙️ Environment Variables

### Backend (.env)
```env
PORT=3001
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
GEMINI_API_KEY=your_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_API_URL=http://localhost:3001/api
```

## 🐛 Troubleshooting

**"Can't connect to database"**
→ Check Supabase keys in .env

**"Gemini API error"**
→ Verify API key is correct

**"Port already in use"**
→ Change PORT in backend/.env

**"Database tables not found"**
→ Run schema.sql in Supabase SQL Editor

## 📚 Full Documentation
- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup
- `PROJECT_SUMMARY.md` - What was built
- `backend/README.md` - API docs

## 🎉 You're Ready!
Visit http://localhost:5173 and start building amazing resumes!

---

Need help? Check `SETUP_GUIDE.md` for detailed instructions.
