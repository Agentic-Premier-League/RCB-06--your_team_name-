import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY
const isConfigured = apiKey && apiKey !== 'your_gemini_api_key'

const genAI = isConfigured ? new GoogleGenerativeAI(apiKey!) : null
const model = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' }) ?? null

// ── Mock responses used when GEMINI_API_KEY is not set ──────────────────────

function mockAnalyzeResume() {
  return {
    score: 78,
    keywords_found: ['Python', 'React', 'SQL', 'Git', 'Agile', 'REST API', 'TypeScript'],
    keywords_missing: ['Kubernetes', 'Spark', 'GraphQL', 'Docker', 'AWS'],
    analysis: { keywords: 68, skills: 85, experience: 72, formatting: 90 },
    suggestions: [
      'Add quantified achievements to each work experience bullet (e.g. "reduced load time by 40%")',
      'Include a skills section with proficiency levels to improve keyword matching',
      'Add a brief professional summary at the top tailored to the target role',
    ],
  }
}

function mockTailorResume() {
  return {
    match_score: 74,
    keywords_found: ['Python', 'React', 'SQL', 'Git', 'REST API'],
    keywords_missing: ['Kubernetes', 'Spark', 'TypeScript', 'Docker', 'CI/CD'],
    suggestions: [
      'Add missing keywords naturally in your project descriptions',
      'Highlight distributed systems experience more prominently',
      'Tailor your professional summary to mention the company\'s core product area',
    ],
  }
}

function mockQuestion(type: string, role: string) {
  const questions: Record<string, string[]> = {
    behavioral: [
      `Tell me about a time you faced a significant technical challenge in a previous project. How did you approach it?`,
      `Describe a situation where you had to work with a difficult teammate. What did you do?`,
      `Give an example of a time you had to learn a new technology quickly. How did you handle it?`,
    ],
    technical: [
      `Given an array of integers, find the two numbers that add up to a target sum. What is your approach?`,
      `Explain the difference between a stack and a queue, and when you'd use each.`,
      `How would you design a URL shortener like bit.ly?`,
    ],
    system_design: [
      `Design a scalable notification system for a social media platform with 10 million users.`,
      `How would you design the backend for a real-time collaborative document editor?`,
      `Walk me through how you'd design a distributed cache system.`,
    ],
    hr: [
      `Why are you interested in this ${role} role specifically?`,
      `Where do you see yourself in 5 years?`,
      `What's your biggest professional strength and how have you applied it?`,
    ],
  }
  const pool = questions[type] || questions.behavioral
  return pool[Math.floor(Math.random() * pool.length)]
}

function mockEvaluate() {
  return {
    score: 75,
    feedback: 'Good use of structure in your answer. You clearly identified the problem and your actions. To improve, focus on quantifying the result — interviewers respond well to measurable outcomes.',
    strengths: ['Clear problem identification', 'Logical action steps described'],
    improvements: ['Add a quantified result (e.g. % improvement, time saved)', 'Be more concise — aim for under 2 minutes'],
  }
}

export async function analyzeResume(resumeText: string) {
  if (!model) return mockAnalyzeResume()

  const prompt = `
You are an expert resume reviewer. Analyze the following resume and return a JSON object with this exact structure:
{
  "score": <overall score 0-100>,
  "keywords_found": [<list of strong keywords present>],
  "keywords_missing": [<list of important missing keywords for tech roles>],
  "analysis": {
    "keywords": <score 0-100>,
    "skills": <score 0-100>,
    "experience": <score 0-100>,
    "formatting": <score 0-100>
  },
  "suggestions": [<3 specific improvement tips>]
}

Resume:
${resumeText}

Return ONLY valid JSON, no markdown, no explanation.`

  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()
  const cleaned = text.replace(/```json\n?|\n?```/g, '')
  return JSON.parse(cleaned)
}

export async function tailorResume(resumeText: string, jobDescription: string, company: string, role: string) {
  if (!model) return mockTailorResume()

  const prompt = `
You are an expert career coach. Compare the resume against the job description and return a JSON object:
{
  "match_score": <0-100>,
  "keywords_found": [<keywords from JD present in resume>],
  "keywords_missing": [<important keywords from JD missing in resume>],
  "suggestions": [
    "<specific suggestion 1>",
    "<specific suggestion 2>",
    "<specific suggestion 3>"
  ]
}

Company: ${company}
Role: ${role}

Job Description:
${jobDescription}

Resume:
${resumeText}

Return ONLY valid JSON, no markdown, no explanation.`

  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()
  const cleaned = text.replace(/```json\n?|\n?```/g, '')
  return JSON.parse(cleaned)
}

export async function generateInterviewQuestion(
  type: string,
  role: string,
  company: string,
  previousQuestions: string[]
) {
  if (!model) return mockQuestion(type, role)

  const typeMap: Record<string, string> = {
    behavioral: 'behavioral STAR-method',
    technical: 'technical DSA/coding',
    system_design: 'system design architecture',
    hr: 'HR culture fit',
  }

  const prompt = `
Generate one ${typeMap[type] || type} interview question for a ${role} role${company ? ` at ${company}` : ''}.
${previousQuestions.length > 0 ? `Do NOT repeat these questions: ${previousQuestions.join('; ')}` : ''}

Return ONLY the question text, nothing else.`

  const result = await model.generateContent(prompt)
  return result.response.text().trim()
}

export async function evaluateAnswer(question: string, answer: string, role: string) {
  if (!model) return mockEvaluate()

  const prompt = `
You are an expert interviewer evaluating a candidate's answer for a ${role} position.

Question: ${question}
Answer: ${answer}

Return a JSON object:
{
  "score": <0-100>,
  "feedback": "<2-3 sentences of specific, constructive feedback>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>"]
}

Return ONLY valid JSON, no markdown, no explanation.`

  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()
  const cleaned = text.replace(/```json\n?|\n?```/g, '')
  return JSON.parse(cleaned)
}
