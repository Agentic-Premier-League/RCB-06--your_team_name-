'use client'
import { useState } from 'react'

export default function ResumeStudioPage() {
  const [tab, setTab] = useState<'analyze' | 'tailor'>('analyze')
  const [uploaded, setUploaded] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [jobDesc, setJobDesc] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  const RESULT = {
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

  async function handleAnalyze() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setAnalyzed(true)
  }

  return (
    <>
      {/* Banner */}
      <div className="studio-banner">
        <div>
          <h2>Resume Studio</h2>
          <p>Upload your resume, get an AI score, and tailor it for any job in seconds.</p>
        </div>
        {uploaded && (
          <span className="studio-badge">
            <i className="ph ph-file-pdf"></i> resume.pdf
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab-btn${tab === 'analyze' ? ' active' : ''}`} onClick={() => setTab('analyze')}>
          <i className="ph ph-magnifying-glass"></i> Resume Analyzer
        </button>
        <button className={`tab-btn${tab === 'tailor' ? ' active' : ''}`} onClick={() => setTab('tailor')}>
          <i className="ph ph-magic-wand"></i> Tailor for Job
        </button>
      </div>

      <div className="studio-layout">
        {/* LEFT: Upload */}
        <div className="card studio-panel">
          <h3>{tab === 'analyze' ? 'Upload Resume' : 'Job Description'}</h3>

          {!uploaded ? (
            <div className="upload-zone" onClick={() => setUploaded(true)}>
              <i className="ph ph-cloud-arrow-up"></i>
              <h3>Drop your resume here</h3>
              <p>or <strong>browse to upload</strong></p>
              <span className="upload-hint">PDF or DOCX · Max 5 MB</span>
            </div>
          ) : (
            <>
              <div className="file-uploaded">
                <i className="ph-fill ph-file-pdf"></i>
                <div className="file-uploaded-info">
                  <h4>resume.pdf</h4>
                  <p>Uploaded successfully</p>
                </div>
              </div>
              <div className="pdf-preview">
                <i className="ph ph-file-pdf"></i>
                <p>resume.pdf · 2 pages</p>
              </div>
              <button onClick={() => { setUploaded(false); setAnalyzed(false) }} className="btn btn-ghost btn-sm">
                <i className="ph ph-arrow-counter-clockwise"></i> Replace file
              </button>
            </>
          )}

          {tab === 'tailor' && (
            <div style={{ marginTop: '1.25rem' }}>
              <div className="form-row" style={{ marginBottom: '0.75rem' }}>
                <div>
                  <label className="form-label">Company</label>
                  <input className="form-control" placeholder="e.g. Google" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Role</label>
                  <input className="form-control" placeholder="e.g. SWE Intern" value={role} onChange={e => setRole(e.target.value)} />
                </div>
              </div>
              <label className="form-label">Job Description</label>
              <textarea className="form-control" rows={6} placeholder="Paste the full job description here..." value={jobDesc} onChange={e => setJobDesc(e.target.value)} />
            </div>
          )}

          {uploaded && (
            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: '1.25rem' }}
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading
                ? <><i className="ph ph-circle-notch"></i> Analyzing…</>
                : tab === 'analyze'
                  ? <><i className="ph ph-magnifying-glass"></i> Analyze Resume</>
                  : <><i className="ph ph-magic-wand"></i> Tailor Resume</>
              }
            </button>
          )}
        </div>

        {/* RIGHT: Results */}
        <div className="card studio-panel">
          <h3>Analysis Results</h3>

          {!analyzed ? (
            <div className="pdf-preview" style={{ minHeight: 300 }}>
              <i className="ph ph-chart-bar"></i>
              <p>Upload your resume and click Analyze to see your score</p>
            </div>
          ) : (
            <div className="results-section">
              <div className="results-header">
                <div className="gauge-wrap">
                  <div className="gauge-circle">
                    <span className="gauge-num">{RESULT.score}</span>
                    <span className="gauge-sub">/ 100</span>
                  </div>
                  <div className="gauge-label">Resume Score</div>
                </div>
                <div style={{ flex: 1 }}>
                  {Object.entries(RESULT.analysis).map(([k, v]) => (
                    <div key={k} className="score-row">
                      <span className="score-row-label" style={{ textTransform: 'capitalize' }}>{k}</span>
                      <div className="score-bar-track"><div className="score-bar-fill sbf-primary" style={{ width: `${v}%` }}></div></div>
                      <span className="score-pct">{v}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="results-grid">
                <div className="result-col">
                  <h4>✅ Keywords Found</h4>
                  <div className="keyword-tags">
                    {RESULT.keywords_found.map(k => <span key={k} className="kw-tag kw-present">{k}</span>)}
                  </div>
                </div>
                <div className="result-col">
                  <h4>❌ Missing Keywords</h4>
                  <div className="keyword-tags">
                    {RESULT.keywords_missing.map(k => <span key={k} className="kw-tag kw-missing">{k}</span>)}
                  </div>
                </div>
                <div className="result-col">
                  <h4>💡 Suggestions</h4>
                  {RESULT.suggestions.map((s, i) => (
                    <div key={i} className="suggestion-item">
                      <i className="ph ph-lightbulb"></i>
                      <p>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
