import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('GEMINI_API_KEY missing — AI features will throw until set.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Helper: extract first JSON object from freeform LLM text safely
function extractFirstJsonObject(text) {
  const start = text.indexOf('{');
  if (start === -1) return null;

  // naive balance matcher to the first full JSON object
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(text.slice(start, i + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

export const analyzeResume = async (resumeText, jobDescription = '') => {
  if (!genAI) throw new Error('Gemini API key not configured');

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert resume analyst and career counselor. Analyze the following resume and provide detailed feedback.

${jobDescription ? `Job Description:\n${jobDescription}\n\n` : ''}
Resume Content:
${resumeText}

Please analyze this resume and provide:
1. An overall score (0-100)
2. Detailed section scores for:
   - Content Quality (0-100)
   - Formatting & Structure (0-100)
   - ATS Compatibility (0-100)
   - Keywords & Skills (0-100)
3. Specific improvement suggestions with priority levels (high, medium, low)
4. Missing skills compared to the job description (if provided)
5. Strong points that should be maintained
6. Recommended skills to add

Return your analysis in the following JSON format:
{
  "overallScore": 0,
  "sections": {
    "content": { "score": 0, "status": "good" },
    "formatting": { "score": 0, "status": "good" },
    "ats": { "score": 0, "status": "good" },
    "keywords": { "score": 0, "status": "good" }
  },
  "suggestions": [
    { "type": "improvement", "category": "Content", "message": "…", "priority": "high" }
  ],
  "skillAnalysis": {
    "missing": [],
    "strong": [],
    "recommended": []
  },
  "detailedFeedback": "..."
}
Return ONLY the JSON object.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const data = extractFirstJsonObject(text);
    if (!data) throw new Error('Failed to parse AI response JSON');

    return data;
  } catch (err) {
    console.error('Gemini API error:', err);
    throw new Error('Failed to analyze resume with AI');
  }
};

export const optimizeResumeSection = async (originalText, context = '') => {
  if (!genAI) throw new Error('Gemini API key not configured');

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert resume writer. Optimize the following resume section to make it more impactful and ATS-friendly.

Original Text:
${originalText}

${context ? `Context/Job Description:\n${context}\n\n` : ''}

Rewrite this section to:
- Use strong action verbs
- Include quantifiable achievements
- Be concise and impactful
- Be ATS-friendly with relevant keywords
- Maintain professional tone

Return ONLY the optimized text, no explanations.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error('Gemini optimization error:', err);
    throw new Error('Failed to optimize resume section');
  }
};
