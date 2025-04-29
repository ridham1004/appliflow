// backend/controllers/aiController.js
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

// Initialize the GenAI client
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

/**
 * Helper to strip Markdown code fences from a string
 */
function stripCodeFences(text) {
  // Remove triple-backtick fences and any language hints
  return text
    .replace(/```(?:json)?\r?\n?/g, '')   // opening ```
    .replace(/```/g, '')                 // closing ```
    .trim();
}

/**
 * POST /api/ai/ats
 */
exports.atsScore = async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ msg: 'resumeText and jobDescription are required' });
  }
  try {
    const prompt = `
You are an expert resume reviewer.
Job description:
"""
${jobDescription}
"""
Resume:
"""
${resumeText}
"""
1) Provide an ATS optimization score (0–100).
2) Return ONLY a JSON object: { "score": <number>, "suggestions": [<string>, ...] }.
    `;
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt
    });

    // Strip any code fences before parsing
    const clean = stripCodeFences(response.text);
    const payload = JSON.parse(clean);
    return res.json(payload);

  } catch (err) {
    console.error('atsScore error:', err);
    return res.status(500).json({ msg: `AI error: ${err.message}` });
  }
};

/**
 * POST /api/ai/impact
 */
exports.generateImpact = async (req, res) => {
  const { experienceText, bulletsCount } = req.body;
  if (!experienceText || !bulletsCount) {
    return res.status(400).json({ msg: 'experienceText and bulletsCount are required' });
  }
  try {
    const prompt = `
You are a professional resume writer.
Experience:
"""
${experienceText}
"""
Generate ${bulletsCount} concise, quantified, action-oriented bullet points.
Return ONLY a JSON array: [ "...", "..." ].
    `;
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt
    });

    const clean = stripCodeFences(response.text);
    const bullets = JSON.parse(clean);
    return res.json(bullets);

  } catch (err) {
    console.error('generateImpact error:', err);
    return res.status(500).json({ msg: `AI error: ${err.message}` });
  }
};

/**
 * POST /api/ai/coverletter
 */
exports.generateCoverLetter = async (req, res) => {
  const { resumeText, jobDescription, jobType } = req.body;
  if (!resumeText || !jobDescription || !jobType) {
    return res.status(400).json({ msg: 'resumeText, jobDescription and jobType are required' });
  }
  try {
    const prompt = `
You are an expert cover letter writer.
Resume:
"""
${resumeText}
"""
Job description:
"""
${jobDescription}
"""
This is a ${jobType} position. Write a tailored cover letter in a professional tone.
Return ONLY the letter text.
    `;
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt
    });

    // For cover letter, we expect plain text, not JSON
    const letter = stripCodeFences(response.text);
    return res.json({ coverLetter: letter });

  } catch (err) {
    console.error('generateCoverLetter error:', err);
    return res.status(500).json({ msg: `AI error: ${err.message}` });
  }
};
