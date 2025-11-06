# GoResume

AI-powered resume builder and analyzer platform built with React, Node.js, Express, and Supabase.

## Features

### Core Functionality
1. **Authentication** - Email/Password, Google OAuth, and GitHub OAuth integration
2. **Resume Builder** - User-friendly interface with multiple ATS-friendly templates
3. **AI Analyzer** - Intelligent resume analysis with Gemini AI providing scores and improvement suggestions

### Technical Highlights
- Modern React frontend with TypeScript and Tailwind CSS
- RESTful API backend with Express.js
- Supabase for authentication and database
- Google Gemini AI integration for resume analysis
- PDF parsing and personal information removal
- Secure file uploads and processing

## Project Structure

```
GoResume/
├── frontend/          # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # API client and utilities
│   │   └── ...
│   └── package.json
│
├── backend/           # Node.js + Express backend
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Auth and validation
│   │   ├── config/      # Configuration files
│   │   └── utils/       # Helper functions
│   ├── database/        # SQL schema files
│   └── package.json
│
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google Gemini API key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- Supabase URL and keys
- Gemini API key

3. Set up database:
- Go to your Supabase project
- Open SQL Editor
- Run the schema from `backend/database/schema.sql`

4. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Configure environment variables:
Create `.env` file in frontend directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3001/api
```

3. Start the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
PORT=3001
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:3001/api
```

## API Documentation

See `backend/README.md` for detailed API documentation.

## Resume Templates

The app includes several ATS-friendly resume templates:
- Modern Professional
- Executive Classic
- Academic Scholar
- Creative Portfolio
- Startup Innovator
- Minimalist Pro
- ATS Classic
- Simple ATS
- Tech ATS

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- Supabase Client
- React Query

### Backend
- Node.js
- Express.js
- Supabase (Auth & Database)
- Google Gemini AI
- Multer (File uploads)
- PDF-Parse
- Helmet (Security)
- CORS

## License

ISC
