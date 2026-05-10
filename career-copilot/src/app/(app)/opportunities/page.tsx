'use client'
import { useState } from 'react'
import Link from 'next/link'

const OPPORTUNITIES = [
  { id: '1', title: 'Software Engineering Intern — Summer 2025', company: 'Google', location: 'Mountain View, CA', type: 'Full-time Internship', work_type: 'Remote OK', stipend: '$8,000/mo stipend', tags: ['Python', 'Distributed Systems'], match: 95, deadline: 'Feb 15, 2025', icon: <i className="ph-fill ph-google-logo" style={{ color: '#4285f4', fontSize: '1.75rem' }}></i>, saved: true },
  { id: '2', title: 'Product Manager Intern — Summer 2025', company: 'Microsoft', location: 'Seattle, WA', type: 'Full-time Internship', work_type: 'Hybrid', stipend: '$7,200/mo stipend', tags: ['Product Strategy', 'Agile'], match: 88, deadline: 'Jan 31, 2025', icon: <i className="ph-fill ph-microsoft-teams-logo" style={{ color: '#00a4ef', fontSize: '1.75rem' }}></i>, saved: false },
  { id: '3', title: 'Data Science Intern — Summer 2025', company: 'Meta', location: 'Menlo Park, CA', type: 'Full-time Internship', work_type: 'On-site', stipend: '$9,000/mo stipend', tags: ['Python', 'SQL', 'ML'], match: 82, deadline: 'Feb 28, 2025', icon: <i className="ph-fill ph-meta-logo" style={{ color: '#1877f2', fontSize: '1.75rem' }}></i>, saved: true },
  { id: '4', title: 'Frontend Engineer Intern — Summer 2025', company: 'Stripe', location: 'San Francisco, CA', type: 'Full-time Internship', work_type: 'Remote OK', stipend: '$8,500/mo stipend', tags: ['React', 'TypeScript'], match: 79, deadline: 'Mar 1, 2025', icon: <span style={{ color: '#635bff', fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic' }}>S</span>, saved: false },
  { id: '5', title: 'Mobile Engineering Intern — Summer 2025', company: 'Airbnb', location: 'San Francisco, CA', type: 'Full-time Internship', work_type: 'Hybrid', stipend: '$7,800/mo stipend', tags: ['React Native', 'iOS/Android'], match: 75, deadline: 'Feb 10, 2025', icon: <i className="ph-fill ph-airplay" style={{ color: '#ff5a5f', fontSize: '1.75rem' }}></i>, saved: false },
]

const matchClass = (m: number) => m >= 90 ? 'match-high' : m >= 80 ? 'match-mid' : 'match-low'

export default function OpportunitiesPage() {
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set(OPPORTUNITIES.filter(o => o.saved).map(o => o.id)))
  const [activeTab, setActiveTab] = useState('matches')

  function toggleSave(id: string) {
    setSavedSet(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <>
      <div className="page-header">
        <h1>Internship Opportunities</h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>12 AI matches found</span>
          <button className="btn btn-outline btn-sm"><i className="ph ph-sliders"></i> Sort</button>
        </div>
      </div>

      <div className="opp-layout">
        {/* FILTER SIDEBAR */}
        <aside>
          <div className="card filter-card">
            <h3 style={{ marginBottom: '1.25rem', fontSize: '0.9375rem' }}>Filters</h3>

            <div className="filter-section">
              <h4>Role Type</h4>
              {['Software Engineering','Product Management','Data Science','Design (UX/UI)','Marketing'].map(r => (
                <label key={r} className="filter-option">
                  <input type="checkbox" defaultChecked={r === 'Software Engineering'} /> {r}
                </label>
              ))}
            </div>

            <div className="filter-sep"></div>

            <div className="filter-section">
              <h4>Work Type</h4>
              {['Any','Remote','Hybrid','On-site'].map(w => (
                <label key={w} className="filter-option">
                  <input type="radio" name="work" defaultChecked={w === 'Any'} /> {w}
                </label>
              ))}
            </div>

            <div className="filter-sep"></div>

            <div className="filter-section">
              <h4>Location</h4>
              {['Anywhere','Bay Area','Seattle, WA','New York, NY','Austin, TX'].map(l => (
                <label key={l} className="filter-option">
                  <input type="radio" name="loc" defaultChecked={l === 'Anywhere'} /> {l}
                </label>
              ))}
            </div>

            <div className="filter-sep"></div>

            <div className="filter-section">
              <h4>Duration</h4>
              {['Summer 2025','Fall 2025','Co-op (6 mo)'].map(d => (
                <label key={d} className="filter-option">
                  <input type="checkbox" defaultChecked={d === 'Summer 2025'} /> {d}
                </label>
              ))}
            </div>

            <button className="btn btn-primary btn-full btn-sm" style={{ marginTop: '0.5rem' }}>Apply Filters</button>
            <button className="btn btn-ghost btn-full btn-sm" style={{ marginTop: '0.5rem' }}>Reset</button>
          </div>
        </aside>

        {/* RESULTS */}
        <div>
          <div className="tabs">
            <button className={`tab-btn${activeTab === 'matches' ? ' active' : ''}`} onClick={() => setActiveTab('matches')}>
              AI Matches <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(12)</span>
            </button>
            <button className={`tab-btn${activeTab === 'saved' ? ' active' : ''}`} onClick={() => setActiveTab('saved')}>
              Saved <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>({savedSet.size})</span>
            </button>
            <button className={`tab-btn${activeTab === 'applied' ? ' active' : ''}`} onClick={() => setActiveTab('applied')}>
              Applied <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(2)</span>
            </button>
          </div>

          <div className="card">
            {OPPORTUNITIES.map(opp => (
              <div key={opp.id} className="opp-card">
                <div className="opp-logo">{opp.icon}</div>
                <div className="opp-body">
                  <div className="opp-title-row">
                    <Link href={`/opportunities/${opp.id}`} className="opp-title">{opp.title}</Link>
                    <span className={`match-badge ${matchClass(opp.match)}`}>{opp.match}% match</span>
                  </div>
                  <p className="opp-meta">{opp.company} · {opp.location} · {opp.type}</p>
                  <div className="opp-tags">
                    <span className="opp-tag">{opp.work_type}</span>
                    <span className="opp-tag">{opp.stipend}</span>
                    {opp.tags.map(t => <span key={t} className="opp-tag">{t}</span>)}
                  </div>
                </div>
                <div className="opp-actions">
                  <span className="opp-deadline">Apply by {opp.deadline}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className={`btn-icon${savedSet.has(opp.id) ? ' saved' : ''}`}
                      title={savedSet.has(opp.id) ? 'Saved' : 'Save'}
                      onClick={() => toggleSave(opp.id)}
                    >
                      <i className={savedSet.has(opp.id) ? 'ph-fill ph-bookmark-simple' : 'ph ph-bookmark-simple'}></i>
                    </button>
                    <Link href={`/opportunities/${opp.id}`} className="btn btn-primary btn-sm">Apply</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button className="btn btn-ghost btn-sm" disabled><i className="ph ph-caret-left"></i> Prev</button>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Page 1 of 3</span>
            <button className="btn btn-ghost btn-sm">Next <i className="ph ph-caret-right"></i></button>
          </div>
        </div>
      </div>
    </>
  )
}
