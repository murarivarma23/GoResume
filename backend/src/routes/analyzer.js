import express from 'express';
import multer from 'multer';
import supabase, { supabaseAdmin } from '../config/supabase.js';
import { authenticateUser } from '../middleware/auth.js';
import { analyzeResume, optimizeResumeSection } from '../services/gemini.js';
import { extractTextFromPDF, removePersonalInfo } from '../utils/pdfParser.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Only support PDF right now (your handler only parses PDF)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf']; // keep this in sync with parsing below
    if (allowed.includes(file.mimetype)) return cb(null, true);
    return cb(new Error('Only PDF files are currently supported'));
  }
});

router.use(authenticateUser);

router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobDescription, resumeId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are currently supported' });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);
    const cleanedText = removePersonalInfo(resumeText);

    const analysisResult = await analyzeResume(cleanedText, jobDescription || '');

    const dbClient = supabaseAdmin || supabase;
    const { data, error } = await dbClient
      .from('resume_analyses')
      .insert({
        user_id: userId,
        resume_id: resumeId || null,
        job_description: jobDescription || null,
        overall_score: analysisResult.overallScore,
        analysis_data: analysisResult,
        suggestions: analysisResult.suggestions
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(400).json({ error: 'Failed to save analysis' });
    }

    return res.status(200).json({
      message: 'Resume analyzed successfully',
      analysis: analysisResult,
      analysisId: data.id
    });
  } catch (err) {
    console.error('Analyze resume error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

router.post('/optimize', async (req, res) => {
  try {
    const { text, context } = req.body;
    if (!text) return res.status(400).json({ error: 'Text to optimize is required' });

    const optimizedText = await optimizeResumeSection(text, context || '');
    return res.status(200).json({ original: text, optimized: optimizedText });
  } catch (err) {
    console.error('Optimize text error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const userId = req.user.id;
    const dbClient = supabaseAdmin || supabase;

    const { data, error } = await dbClient
      .from('resume_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ analyses: data });
  } catch (err) {
    console.error('Get analysis history error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const dbClient = supabaseAdmin || supabase;
    const { data, error } = await dbClient
      .from('resume_analyses')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) return res.status(400).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Analysis not found' });

    return res.status(200).json({ analysis: data });
  } catch (err) {
    console.error('Get analysis error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
