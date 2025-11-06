import express from 'express';
import multer from 'multer';
import supabase from '../config/supabase.js';
import { authenticateUser } from '../middleware/auth.js';
import { analyzeResume, optimizeResumeSection } from '../services/gemini.js';
import { extractTextFromPDF, removePersonalInfo } from '../utils/pdfParser.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
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

    let resumeText = '';

    if (req.file.mimetype === 'application/pdf') {
      resumeText = await extractTextFromPDF(req.file.buffer);
    } else {
      return res.status(400).json({ error: 'Only PDF files are currently supported' });
    }

    const cleanedText = removePersonalInfo(resumeText);

    const analysisResult = await analyzeResume(cleanedText, jobDescription || '');

    const { data, error } = await supabase
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

    res.status(200).json({
      message: 'Resume analyzed successfully',
      analysis: analysisResult,
      analysisId: data.id
    });
  } catch (error) {
    console.error('Analyze resume error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.post('/optimize', async (req, res) => {
  try {
    const { text, context } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text to optimize is required' });
    }

    const optimizedText = await optimizeResumeSection(text, context || '');

    res.status(200).json({
      original: text,
      optimized: optimizedText
    });
  } catch (error) {
    console.error('Optimize text error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ analyses: data });
  } catch (error) {
    console.error('Get analysis history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.status(200).json({ analysis: data });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
