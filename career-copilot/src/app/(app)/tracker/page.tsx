import Link from 'next/link'

const STATS = [
  { icon: 'ph-paper-plane-tilt', value: '6', label: 'Applications', trend: '+2 this week' },
  { icon: 'ph-microphone-stage', value: '3', label: 'Interviews', trend: '+1 this week' },
  { icon: 'ph-lightning',        value: '8', label: 'Skills Added', trend: '+2 this month' },
  { icon: 'ph-trophy',           value: '74', label: 'Avg Score', trend: '+6 pts this month' },
]

const SKILLS = [
  { name: 'Python', pct: 90, bar: 'sb-success' },
  { name: 'React.js', pct: 75, bar: 'sb-primary' },
  { name: 'System Design', pct: 55, bar: 'sb-warning' },
  { name: 'SQL', pct: 70, bar: 'sb-primary' },
  { name: 'Machine Learning', pct: 45, bar: 'sb-warning' },
]

const GOALS = [
  { done: true,  title: 'Upload Resume',            sub: 'Completed Jan 15' },
  { done: true,  title: 'Complete 3 Mock Interviews', sub: 'Completed Jan 28' },
  { done: false, title: 'Apply to 10 Internships',  sub: 'Due Mar 31 · 6/10 done' },
  { done: false, title: 'Learn System Design',       sub: 'In progress · 55% done' },
  { done: false, title: 'Get a Referral',            sub: 'Not started' },
]

const TIMELINE = [
  { icon: 'ph-paper-plane-tilt', title: 'Applied to Stripe Frontend Intern', time: '2 hours ago' },
  { icon: 'ph-microphone-stage', title: 'Completed Technical Mock Interview', time: 'Yesterday · Score: 68/100' },
  { icon: 'ph-bookmark-simple', title: 'Saved Google SWE Intern',            time: 'Jan 28, 2025' },
  { icon: 'ph-file-text',       title: 'Uploaded Resume',                    time: 'Jan 15, 2025 · Score: 78/100' },
]

export default function TrackerPage() {
  return (
    <>
      <div className="page-header">
        <h1>My Growth</h1>
        <Link href="/tracker/goals/new" className="btn btn-primary btn-sm">
          <i className="ph ph-plus"></i> Add Goal
        </Link>
      </div>

      <div className="stats-grid">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon"><i className={`ph ${s.icon}`}></i></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-trend">↑ {s.trend}</div>
          </div>
        ))}
      </div>

      <div className="tracker-grid">
        {/* LEFT */}
        <div>
          {/* Skills */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-header"><h3>Skills Progress</h3></div>
            <div className="card-body">
              {SKILLS.map(s => (
                <div key={s.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-track">
                    <div className={`skill-bar ${s.bar}`} style={{ width: `${s.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="card">
            <div className="card-header">
              <h3>Career Goals</h3>
              <Link href="/tracker/goals/new" className="btn btn-outline btn-sm"><i className="ph ph-plus"></i> Add Goal</Link>
            </div>
            <div className="card-body">
              {GOALS.map((g, i) => (
                <div key={i} className="goal-item">
                  <div className={`goal-check${g.done ? ' done' : ''}`}>
                    {g.done && <i className="ph ph-check"></i>}
                  </div>
                  <div className={`goal-text${g.done ? ' goal-done' : ''}`}>
                    <h4>{g.title}</h4>
                    <p>{g.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="card">
            <div className="card-header"><h3>Recent Activity</h3></div>
            <div className="timeline">
              {TIMELINE.map((t, i) => (
                <div key={i} className="timeline-item">
                  <div className="tl-dot"><i className={`ph ${t.icon}`}></i></div>
                  <div className="tl-content">
                    <h4>{t.title}</h4>
                    <p>{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
