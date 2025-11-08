import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export const analyzeResume = async (resumeText, jobDescription = '') => {
  if (!genAI) {
    throw new Error('Gemini API key not configured');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

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
  "overallScore": <number 0-100>,
  "sections": {
    "content": { "score": <number>, "status": "<excellent|good|needs-improvement>" },
    "formatting": { "score": <number>, "status": "<excellent|good|needs-improvement>" },
    "ats": { "score": <number>, "status": "<excellent|good|needs-improvement>" },
    "keywords": { "score": <number>, "status": "<excellent|good|needs-improvement>" }
  },
  "suggestions": [
    {
      "type": "<improvement|warning|success>",
      "category": "<string>",
      "message": "<string>",
      "priority": "<high|medium|low>"
    }
  ],
  "skillAnalysis": {
    "missing": ["<skill1>", "<skill2>"],
    "strong": ["<skill1>", "<skill2>"],
    "recommended": ["<skill1>", "<skill2>"]
  },
  "detailedFeedback": "<string with detailed explanation>"
}

Be specific, actionable, and constructive in your feedback.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysisData = JSON.parse(jsonMatch[0]);
      return analysisData;
    }

    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze resume with AI');
  }
};

export const optimizeResumeSection = async (originalText, context = '') => {
  if (!genAI) {
    throw new Error('Gemini API key not configured');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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
  } catch (error) {
    console.error('Gemini optimization error:', error);
    throw new Error('Failed to optimize resume section');
  }
};
