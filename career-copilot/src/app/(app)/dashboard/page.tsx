'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [uploaded, setUploaded] = useState(false)

  return (
    <>
      <div className="welcome-banner">
        <div>
          <h2>Welcome back! 👋</h2>
          <p>You&apos;re 70% of the way to being interview-ready. Keep up the great work!</p>
        </div>
        <div className="welcome-progress">
          <div className="progress-header">
            <span>Profile Readiness</span><span>70%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill pf-white" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* LEFT */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            {!uploaded ? (
              <div className="card-body" style={{ padding: 0 }}>
                <div className="upload-zone" onClick={() => setUploaded(true)}>
                  <i className="ph ph-cloud-arrow-up"></i>
                  <h3>Upload your resume</h3>
                  <p>Drag &amp; drop your file here or <strong>browse to upload</strong></p>
                  <span className="upload-hint">Supported: PDF, DOCX — Max 5 MB</span>
                </div>
              </div>
            ) : (
              <>
                <div className="card-header">
                  <h3>Resume Analysis</h3>
                  <span className="badge badge-success"><i className="ph ph-check-circle"></i> resume.pdf</span>
                </div>
                <div className="resume-score">
                  <div className="score-top">
                    <div className="score-circle">
                      <span className="score-num">78</span>
                      <span className="score-denom">/ 100</span>
                    </div>
                    <div className="score-breakdown">
                      {[['Keywords','68','sbf-warning'],['Skills Match','85','sbf-success'],['Experience','72','sbf-primary'],['Formatting','90','sbf-success']].map(([l,v,c]) => (
                        <div key={l} className="score-row">
                          <span className="score-row-label">{l}</span>
                          <div className="score-bar-track"><div className={`score-bar-fill ${c}`} style={{ width: `${v}%` }}></div></div>
                          <span className="score-pct">{v}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link href="/resume-studio" className="btn btn-primary btn-sm"><i className="ph ph-magic-wand"></i> View Full Analysis</Link>
                    <button onClick={() => setUploaded(false)} className="btn btn-ghost btn-sm"><i className="ph ph-arrow-counter-clockwise"></i> Re-upload</button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="card next-steps">
            <h3>AI Recommended Next Steps</h3>
            <div className="step-item">
              <div className="step-icon"><i className="ph ph-microphone-stage"></i></div>
              <div className="step-body">
                <h4>Practice Behavioral Interview</h4>
                <p>Your technical skills are strong — now work on communicating your impact using STAR method.</p>
              </div>
              <Link href="/interview" className="btn btn-outline btn-sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>Start Mock</Link>
            </div>
            <div className="step-item">
              <div className="step-icon"><i className="ph ph-magnifying-glass-plus"></i></div>
              <div className="step-body">
                <h4>Review 3 New Matched Roles</h4>
                <p>We found Software Engineering Intern roles at Google, Meta, and Stripe that match your profile.</p>
              </div>
              <Link href="/opportunities" className="btn btn-outline btn-sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>View Roles</Link>
            </div>
            <div className="step-item">
              <div className="step-icon"><i className="ph ph-magic-wand"></i></div>
              <div className="step-body">
                <h4>Tailor Resume for Google SWE</h4>
                <p>Add missing keywords like &quot;Kubernetes&quot; and &quot;distributed systems&quot; to boost your match to 91%.</p>
              </div>
              <Link href="/resume-studio" className="btn btn-outline btn-sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>Tailor Now</Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-header"><h3>Application Pipeline</h3></div>
            <div className="pipeline-stats">
              {[['4','Saved'],['2','Applied'],['1','Interview'],['0','Offer']].map(([n,l]) => (
                <div key={l} className="pipe-stat"><span className="pipe-num">{n}</span><span className="pipe-label">{l}</span></div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Top Matches For You</h3>
              <span className="badge badge-primary">12 new</span>
            </div>
            <Link href="/opportunities/1" className="match-list-item">
              <div className="match-company-icon" style={{ color: '#4285f4' }}><i className="ph-fill ph-google-logo"></i></div>
              <div className="match-info"><h4>Software Engineering Intern</h4><p>Google · Mountain View, CA</p></div>
              <span className="match-badge match-high">95%</span>
            </Link>
            <Link href="/opportunities/2" className="match-list-item">
              <div className="match-company-icon" style={{ color: '#0f62fe' }}><i className="ph-fill ph-microsoft-teams-logo"></i></div>
              <div className="match-info"><h4>PM Intern</h4><p>Microsoft · Seattle, WA</p></div>
              <span className="match-badge match-mid">88%</span>
            </Link>
            <Link href="/opportunities/3" className="match-list-item">
              <div className="match-company-icon" style={{ color: '#1877f2' }}><i className="ph-fill ph-meta-logo"></i></div>
              <div className="match-info"><h4>Data Science Intern</h4><p>Meta · Menlo Park, CA</p></div>
              <span className="match-badge match-mid">82%</span>
            </Link>
            <Link href="/opportunities" className="card-view-all">
              View all 12 matches <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
