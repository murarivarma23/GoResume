import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer'; // <-- you reference multer in error handler; import it
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resumes.js';
import analyzerRoutes from './routes/analyzer.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Security / CORS ---
const allowedOrigins = [
  process.env.FRONTEND_URL,       // e.g. http://localhost:8080
  'http://localhost:8080',
  'http://localhost:5173'
].filter(Boolean);

app.use(helmet());

// CORS with dynamic origin check
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // curl, mobile, etc.
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true
}));

// Make sure preflights succeed before limiter/parsers
app.options('*', cors());

// --- Parsers ---
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// --- Rate limiter for API only ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// --- Health ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/analyzer', analyzerRoutes);

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds 10MB limit' });
    }
    return res.status(400).json({ error: err.message });
  }

  // CORS errors come here too
  if (err?.message?.startsWith('Not allowed by CORS')) {
    return res.status(403).json({ error: err.message });
  }

  return res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// --- 404 ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`GoResume backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend allowed: ${allowedOrigins.join(', ')}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
