'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const STEPS = ['Personal Info', 'Career Goals', 'Upload Resume', 'First Goal']

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <Link href="/" className="navbar-brand">
          <i className="ph-fill ph-compass-tool"></i> Career Copilot
        </Link>
        <Link href="/dashboard" className="btn btn-ghost btn-sm">Skip setup →</Link>
      </div>

      <div className="onboarding-body">
        {/* Step indicators */}
        <div className="onboarding-steps">
          {STEPS.map((label, i) => {
            const n = i + 1
            const done = n < step
            const active = n === step
            return (
              <div key={label} className="ob-step">
                <div className="ob-step-row">
                  {i > 0 && <div className={`ob-line${done ? ' done' : ''}`}></div>}
                  <div className={`ob-circle${active ? ' active' : done ? ' done' : ''}`}>
                    {done ? <i className="ph ph-check"></i> : n}
                  </div>
                  {i < STEPS.length - 1 && <div className={`ob-line${done ? ' done' : ''}`}></div>}
                </div>
                <div className={`ob-label${active ? ' active' : done ? ' done' : ''}`}>{label}</div>
              </div>
            )
          })}
        </div>

        {/* Card */}
        <div className="onboarding-card">
          {step === 1 && <StepPersonal onNext={() => setStep(2)} />}
          {step === 2 && <StepGoals onBack={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && <StepResume onBack={() => setStep(2)} onNext={() => setStep(4)} />}
          {step === 4 && <StepFirstGoal onBack={() => setStep(3)} onFinish={() => router.push('/dashboard')} />}
        </div>
      </div>
    </div>
  )
}

function StepPersonal({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="ob-card-header">
        <h2>Welcome! Let&apos;s set up your profile</h2>
        <p>This helps us personalise your internship matches and interview prep.</p>
      </div>
      <div className="ob-card-body">
        <div className="form-row" style={{ marginBottom: '1.25rem' }}>
          <div><label className="form-label">First Name <span style={{ color: 'var(--danger)' }}>*</span></label><input className="form-control" placeholder="Jane" /></div>
          <div><label className="form-label">Last Name <span style={{ color: 'var(--danger)' }}>*</span></label><input className="form-control" placeholder="Smith" /></div>
        </div>
        <div className="form-group">
          <label className="form-label">University <span style={{ color: 'var(--danger)' }}>*</span></label>
          <input className="form-control" placeholder="e.g. MIT, Stanford, UC Berkeley" />
        </div>
        <div className="form-row" style={{ marginBottom: '1.25rem' }}>
          <div><label className="form-label">Major <span style={{ color: 'var(--danger)' }}>*</span></label><input className="form-control" placeholder="Computer Science" /></div>
          <div>
            <label className="form-label">Graduation Year <span style={{ color: 'var(--danger)' }}>*</span></label>
            <select className="form-control"><option value="">Select year</option>{['2025','2026','2027','2028'].map(y=><option key={y}>{y}</option>)}</select>
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">GPA <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(optional)</span></label>
          <input className="form-control" placeholder="e.g. 3.8 / 4.0" />
        </div>
      </div>
      <div className="ob-card-footer">
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Step 1 of 4</span>
        <button className="btn btn-primary" onClick={onNext}>Continue <i className="ph ph-arrow-right"></i></button>
      </div>
    </>
  )
}

function StepGoals({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <>
      <div className="ob-card-header">
        <h2>What are you looking for?</h2>
        <p>Tell us your target roles so we can surface the best matches.</p>
      </div>
      <div className="ob-card-body">
        <div className="form-group">
          <label className="form-label">Target Role(s) <span style={{ color: 'var(--danger)' }}>*</span></label>
          <input className="form-control" placeholder="e.g. Software Engineering Intern, PM Intern" />
          <span className="form-hint">Comma-separated if open to multiple roles</span>
        </div>
        <div className="form-group">
          <label className="form-label">Preferred Locations</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Remote','Bay Area','Seattle','New York','Austin','Anywhere'].map(loc=>(
              <label key={loc} style={{ display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.375rem 0.875rem',border:'1.5px solid var(--border)',borderRadius:'var(--r-pill)',cursor:'pointer',fontSize:'0.875rem' }}>
                <input type="checkbox" style={{ width:14,height:14,accentColor:'var(--primary)' }} /> {loc}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Top Skills &amp; Technologies</label>
          <input className="form-control" placeholder="e.g. Python, React, Machine Learning, SQL" />
          <span className="form-hint">Used to calculate your match score with internship roles</span>
        </div>
      </div>
      <div className="ob-card-footer">
        <button className="btn btn-ghost" onClick={onBack}><i className="ph ph-arrow-left"></i> Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue <i className="ph ph-arrow-right"></i></button>
      </div>
    </>
  )
}

function StepResume({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [uploaded, setUploaded] = useState(false)
  return (
    <>
      <div className="ob-card-header">
        <h2>Upload your resume</h2>
        <p>Our AI will analyse your resume to calculate skill scores and find your first internship matches.</p>
      </div>
      <div className="ob-card-body">
        {!uploaded ? (
          <div className="upload-zone" onClick={() => setUploaded(true)}>
            <i className="ph ph-cloud-arrow-up"></i>
            <h3>Drop your resume here</h3>
            <p>or <strong>browse to upload</strong></p>
            <span className="upload-hint">PDF or DOCX · Max 5 MB</span>
          </div>
        ) : (
          <div className="file-uploaded">
            <i className="ph-fill ph-file-pdf"></i>
            <div className="file-uploaded-info">
              <h4>resume.pdf uploaded</h4>
              <p>AI analysis complete — Score: 78/100</p>
            </div>
          </div>
        )}
        <p style={{ textAlign:'center',fontSize:'0.875rem',color:'var(--text-muted)',marginTop:'1rem' }}>
          Don&apos;t have your resume ready?{' '}
          <button onClick={onNext} style={{ background:'none',border:'none',color:'var(--primary)',cursor:'pointer',fontWeight:600,fontSize:'0.875rem' }}>Skip this step</button>
        </p>
      </div>
      <div className="ob-card-footer">
        <button className="btn btn-ghost" onClick={onBack}><i className="ph ph-arrow-left"></i> Back</button>
        <button className="btn btn-primary" onClick={onNext}>Continue <i className="ph ph-arrow-right"></i></button>
      </div>
    </>
  )
}

function StepFirstGoal({ onBack, onFinish }: { onBack: () => void; onFinish: () => void }) {
  const [selected, setSelected] = useState('')
  const goals = [
    { id:'applications', icon:'ph-paper-plane-tilt', label:'Apply to 10 internships this season', sub:'Most popular · Deadline: Mar 31' },
    { id:'interviews',   icon:'ph-microphone-stage', label:'Complete 5 mock interviews', sub:'Build interview confidence' },
    { id:'skills',       icon:'ph-lightning',        label:'Learn 2 new technical skills', sub:'Boost your resume match score' },
  ]
  return (
    <>
      <div className="ob-card-header">
        <h2>Set your first career goal</h2>
        <p>Goals keep you accountable. You can always add more later.</p>
      </div>
      <div className="ob-card-body">
        <div style={{ display:'flex',flexDirection:'column',gap:'0.75rem',marginBottom:'1rem' }}>
          {goals.map(g=>(
            <div key={g.id} onClick={()=>setSelected(g.id)} style={{ display:'flex',alignItems:'center',gap:'1rem',padding:'1rem',border:`2px solid ${selected===g.id?'var(--primary)':'var(--border)'}`,borderRadius:'var(--r-lg)',background:selected===g.id?'var(--primary-light)':'white',cursor:'pointer',transition:'var(--t)' }}>
              <i className={`ph ${g.icon}`} style={{ fontSize:'1.5rem',color:'var(--primary)',flexShrink:0 }}></i>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600,fontSize:'0.9375rem',color:'var(--text)' }}>{g.label}</div>
                <div style={{ fontSize:'0.8125rem',color:'var(--text-muted)',marginTop:'0.125rem' }}>{g.sub}</div>
              </div>
              <input type="radio" name="goal" checked={selected===g.id} onChange={()=>setSelected(g.id)} style={{ accentColor:'var(--primary)',flexShrink:0 }} />
            </div>
          ))}
        </div>
        <p style={{ textAlign:'center',fontSize:'0.875rem',color:'var(--text-muted)' }}>
          <Link href="/tracker/goals/new" style={{ color:'var(--primary)',fontWeight:600 }}>✎ Create a custom goal instead</Link>
        </p>
      </div>
      <div className="ob-card-footer">
        <button className="btn btn-ghost" onClick={onBack}><i className="ph ph-arrow-left"></i> Back</button>
        <button className="btn btn-primary" onClick={onFinish}><i className="ph ph-rocket-launch"></i> Go to Dashboard</button>
      </div>
    </>
  )
}
