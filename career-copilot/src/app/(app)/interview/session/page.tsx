'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function InterviewSessionContent() {
  const params = useSearchParams()
  const router = useRouter()
  const type = params.get('type') || 'behavioral'
  const role = params.get('role') || 'Software Engineering Intern'
  const company = params.get('company') || ''
  const duration = parseInt(params.get('duration') || '20')

  const [secondsLeft, setSecondsLeft] = useState(duration * 60)
  const [questionNum, setQuestionNum] = useState(1)
  const totalQuestions = Math.floor(duration / 4)
  const [answer, setAnswer] = useState('')
  const [question] = useState(
    type === 'behavioral'
      ? 'Tell me about a time you faced a significant technical challenge in a previous project. How did you approach it?'
      : type === 'technical'
        ? 'Given an array of integers, find the two numbers that add up to a target sum. What is your approach?'
        : type === 'system_design'
          ? 'Design a scalable notification system for a social media platform with 10 million users.'
          : `Why are you interested in this ${role} role specifically?`
  )

  const typeLabel: Record<string, string> = {
    behavioral: 'Behavioral', technical: 'Technical', system_design: 'System Design', hr: 'HR / Culture',
  }

  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [secondsLeft])

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const progress = Math.round((questionNum / totalQuestions) * 100)

  function submitAnswer() {
    if (questionNum >= totalQuestions) {
      router.push('/interview/review/session1')
    } else {
      setQuestionNum(q => q + 1)
      setAnswer('')
    }
  }

  return (
    <>
      {/* Top bar */}
      <div className="session-topbar">
        <div className="session-topbar-left">
          <span className="session-type-label">{typeLabel[type] || type} Interview</span>
          <span className="session-title">{role}{company ? ` @ ${company}` : ''}</span>
        </div>
        <span className={`session-timer${secondsLeft < 120 ? ' warning' : ''}`}>{fmt(secondsLeft)}</span>
        <div className="session-progress">
          <span className="session-q-count">Question {questionNum} of {totalQuestions}</span>
          <div className="session-progress-track">
            <div className="session-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Tip bar */}
      <div className="session-tip-bar">
        <i className="ph ph-lightbulb"></i>
        <p><strong>Tip:</strong> Use the STAR method — Situation, Task, Action, Result. Aim for 1–2 minutes.</p>
      </div>

      {/* Question */}
      <div className="question-card">
        <div className="question-label">
          <span>Question {questionNum}</span>
          <span className="badge badge-primary">{typeLabel[type]}</span>
        </div>
        <div className="question-text">{question}</div>
      </div>

      {/* Answer */}
      <div className="answer-area">
        <label>
          <span className="form-label" style={{ marginBottom: 0 }}>Your Answer</span>
          <span className="word-count">{answer.split(/\s+/).filter(Boolean).length} words</span>
        </label>
        <textarea
          className="form-control"
          rows={8}
          placeholder="Type your answer here... Use the STAR method for behavioral questions."
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="session-actions">
        <button className="btn btn-ghost btn-sm" onClick={() => router.push('/interview')}>
          <i className="ph ph-x"></i> End Session
        </button>
        <button className="btn btn-outline btn-sm">
          <i className="ph ph-skip-forward"></i> Skip Question
        </button>
        <button className="btn btn-primary" onClick={submitAnswer} disabled={!answer.trim()}>
          {questionNum >= totalQuestions ? 'Finish & See Results' : 'Submit & Next Question'}
          <i className="ph ph-arrow-right"></i>
        </button>
      </div>
    </>
  )
}

export default function InterviewSessionPage() {
  return (
    <Suspense>
      <InterviewSessionContent />
    </Suspense>
  )
}
