import pdf from 'pdf-parse';

export const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

export const removePersonalInfo = (text) => {
  let cleanedText = text;

  cleanedText = cleanedText.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi, '[EMAIL]');
  cleanedText = cleanedText.replace(/\b(\+\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g, '[PHONE]');
  cleanedText = cleanedText.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]');
  cleanedText = cleanedText.replace(/\b\d{1,5}\s\w+\s(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir)\.?\b/gi, '[ADDRESS]');

  const lines = cleanedText.split('\n');
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine.split(' ').length <= 4 && firstLine.length < 50) {
      lines[0] = '[NAME]';
    }
  }

  return lines.join('\n');
};
