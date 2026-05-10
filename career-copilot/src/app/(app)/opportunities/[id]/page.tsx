import Link from 'next/link'

export default function InternshipDetailPage() {
  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/opportunities" className="btn btn-ghost btn-sm">
          <i className="ph ph-arrow-left"></i> Back to Opportunities
        </Link>
      </div>

      <div className="detail-layout">
        {/* MAIN */}
        <div>
          <div className="card">
            {/* Company Header */}
            <div className="detail-company-header">
              <div className="detail-company-logo" style={{ color: '#4285f4' }}>
                <i className="ph-fill ph-google-logo"></i>
              </div>
              <div className="detail-company-info">
                <h1>Software Engineering Intern — Summer 2025</h1>
                <p>Google · Mountain View, CA · Full-time Internship</p>
                <div className="detail-meta-row">
                  <span className="detail-meta-pill"><i className="ph ph-map-pin"></i> Mountain View, CA</span>
                  <span className="detail-meta-pill"><i className="ph ph-laptop"></i> Remote OK</span>
                  <span className="detail-meta-pill"><i className="ph ph-currency-dollar"></i> $8,000/mo stipend</span>
                  <span className="detail-meta-pill"><i className="ph ph-calendar"></i> Summer 2025</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="detail-section">
              <h3>About the Role</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Join Google&apos;s engineering team for an immersive 12-week internship where you&apos;ll work on real products
                used by billions of people. You&apos;ll be embedded in a team, contribute to production code, and present
                your work to senior engineers.
              </p>
            </div>

            {/* Requirements */}
            <div className="detail-section">
              <h3>Requirements</h3>
              <div className="req-list">
                {[
                  [true, 'Currently pursuing a BS/MS/PhD in Computer Science or related field'],
                  [true, 'Strong programming skills in Python, Java, or C++'],
                  [true, 'Experience with data structures and algorithms'],
                  [false, 'Familiarity with distributed systems concepts'],
                  [false, 'Previous internship or research experience preferred'],
                ].map(([must, text], i) => (
                  <div key={i} className="req-item">
                    <i className={`ph ${must ? 'ph-check-circle must' : 'ph-circle nice'}`}></i>
                    {text as string}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="detail-section">
              <h3>Skills & Technologies</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Python', 'Java', 'C++', 'Distributed Systems', 'Algorithms', 'Git', 'Linux'].map(s => (
                  <span key={s} className="opp-tag">{s}</span>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="detail-section">
              <h3>About Google</h3>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                {[['$2T+','Market Cap'],['180,000+','Employees'],['4.4★','Glassdoor']].map(([val,lbl]) => (
                  <div key={lbl} className="company-stat">
                    <div className="company-stat-num">{val}</div>
                    <div className="company-stat-label">{lbl}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising,
                search engine technology, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics.
              </p>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div className="card apply-card">
            <div className="card-body">
              {/* Match Score */}
              <div className="apply-score-ring">
                <div className="gauge-circle" style={{ width: 68, height: 68, borderColor: 'var(--success)', borderWidth: 5 }}>
                  <span className="gauge-num" style={{ fontSize: '1.5rem', color: 'var(--success)' }}>95%</span>
                </div>
                <div>
                  <h4 style={{ color: 'var(--success)', marginBottom: '0.125rem' }}>Excellent Match</h4>
                  <p style={{ fontSize: '0.8125rem', margin: 0 }}>Your profile matches 95% of requirements</p>
                </div>
              </div>

              <button className="btn btn-primary btn-full" style={{ marginBottom: '0.75rem' }}>
                <i className="ph ph-paper-plane-tilt"></i> Apply Now
              </button>
              <button className="btn btn-outline btn-full" style={{ marginBottom: '1.25rem' }}>
                <i className="ph ph-bookmark-simple"></i> Save Job
              </button>

              {/* Info rows */}
              {[
                ['Deadline', 'February 15, 2025'],
                ['Duration', '12 weeks'],
                ['Start Date', 'June 2025'],
                ['Openings', '~200 positions'],
              ].map(([k, v]) => (
                <div key={k} className="apply-info-row">
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>

            {/* Similar Roles */}
            <div className="card-header"><h3>Similar Roles</h3></div>
            <div className="card-body">
              {[
                { icon: '🔷', color: '#0f62fe', title: 'SWE Intern', company: 'Microsoft · Seattle, WA', match: '88%' },
                { icon: '🔹', color: '#1877f2', title: 'SWE Intern', company: 'Meta · Menlo Park, CA', match: '82%' },
              ].map(r => (
                <Link key={r.title + r.company} href="/opportunities/2" className="similar-card" style={{ display: 'flex' }}>
                  <div className="similar-logo" style={{ color: r.color }}>{r.icon}</div>
                  <div className="similar-info">
                    <h4>{r.title}</h4>
                    <p>{r.company}</p>
                  </div>
                  <span className="match-badge match-mid" style={{ flexShrink: 0, alignSelf: 'center' }}>{r.match}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
