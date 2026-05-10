'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TYPES = [
  { id: 'behavioral', icon: 'ph-chats', label: 'Behavioral', desc: 'STAR method & soft skills' },
  { id: 'technical',  icon: 'ph-code',  label: 'Technical',  desc: 'DSA & coding problems' },
  { id: 'system_design', icon: 'ph-circles-three-plus', label: 'System Design', desc: 'Architecture & scalability' },
  { id: 'hr',         icon: 'ph-handshake', label: 'HR / Culture', desc: 'Culture fit & motivation' },
]

const DURATIONS = [10, 20, 30, 45]

const PAST_SESSIONS = [
  { type: 'Behavioral', role: 'SWE Intern @ Google', date: 'Jan 28, 2025', score: 82, scoreClass: 'sc-green' },
  { type: 'Technical',  role: 'SWE Intern @ Stripe', date: 'Jan 25, 2025', score: 68, scoreClass: 'sc-yellow' },
  { type: 'System Design', role: 'SWE Intern @ Meta', date: 'Jan 20, 2025', score: 74, scoreClass: 'sc-yellow' },
]

export default function InterviewPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState('behavioral')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [duration, setDuration] = useState(20)

  function startSession() {
    router.push(`/interview/session?type=${selectedType}&role=${encodeURIComponent(role)}&company=${encodeURIComponent(company)}&duration=${duration}`)
  }

  return (
    <>
      <div className="page-header">
        <h1>Mock Interview</h1>
      </div>

      {/* Interview Type */}
      <div className="interview-type-grid">
        {TYPES.map(t => (
          <div
            key={t.id}
            className={`type-card${selectedType === t.id ? ' selected' : ''}`}
            onClick={() => setSelectedType(t.id)}
          >
            <i className={`ph ${t.icon}`}></i>
            <h4>{t.label}</h4>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Config */}
      <div className="card config-card">
        <h3>Session Setup</h3>
        <div className="form-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Target Role</label>
            <input className="form-control" placeholder="e.g. Software Engineering Intern" value={role} onChange={e => setRole(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Company (optional)</label>
            <input className="form-control" placeholder="e.g. Google" value={company} onChange={e => setCompany(e.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <label className="form-label">Session Duration</label>
          <div className="duration-options">
            {DURATIONS.map(d => (
              <button key={d} className={`dur-btn${duration === d ? ' active' : ''}`} onClick={() => setDuration(d)}>
                {d} min
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn btn-primary btn-lg" onClick={startSession}>
            <i className="ph ph-play"></i> Start Interview Session
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '1.5rem', alignItems: 'start' }}>
        {/* Past Sessions */}
        <div className="card">
          <div className="card-header"><h3>Past Sessions</h3></div>
          {PAST_SESSIONS.map((s, i) => (
            <div key={i} className="session-row">
              <div className="session-info">
                <h4>{s.type} Interview</h4>
                <p>{s.role} · {s.date}</p>
              </div>
              <div className="session-right">
                <span className={`session-score ${s.scoreClass}`}>{s.score}/100</span>
                <button className="btn btn-outline btn-sm"><i className="ph ph-eye"></i> Review</button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="card">
          <div className="card-header"><h3>Interview Tips</h3></div>
          <div className="tips-grid">
            {[
              ['ph-star','Use STAR Method','Structure answers: Situation, Task, Action, Result.'],
              ['ph-timer','Time Your Answers','Aim for 1–2 minutes per behavioral answer.'],
              ['ph-detective','Research the Company','Know their mission, products, and recent news.'],
              ['ph-question','Ask Good Questions','Prepare 2–3 thoughtful questions for your interviewer.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="tip-item">
                <i className={`ph ${icon}`}></i>
                <div className="tip-body"><h4>{title}</h4><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
