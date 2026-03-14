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
const PORT = process.env.PORT || 4000;
const allowedOrigins = [
  process.env.FRONTEND_URL,       
  'http://localhost:8080',
  'http://localhost:5173'
].filter(Boolean);

app.use(helmet());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); 
    const ok =
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(new URL(origin).hostname); 
    return ok ? cb(null, true) : cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true
}));

app.options('*', cors());

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/analyzer', analyzerRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds 10MB limit' });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err?.message?.startsWith('Not allowed by CORS')) {
    return res.status(403).json({ error: err.message });
  }

  return res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

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
