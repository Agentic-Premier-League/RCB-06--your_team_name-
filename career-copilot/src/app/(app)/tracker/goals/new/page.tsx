'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = [
  { id: 'applications', icon: 'ph-paper-plane-tilt', label: 'Applications' },
  { id: 'interviews',   icon: 'ph-microphone-stage', label: 'Interviews' },
  { id: 'skills',       icon: 'ph-lightning',        label: 'Skills' },
  { id: 'networking',   icon: 'ph-users',            label: 'Networking' },
  { id: 'resume',       icon: 'ph-file-text',        label: 'Resume' },
  { id: 'custom',       icon: 'ph-star',             label: 'Custom' },
]

export default function AddGoalPage() {
  const router = useRouter()
  const [category, setCategory] = useState('applications')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    router.push('/tracker')
  }

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/tracker" className="btn btn-ghost btn-sm">
          <i className="ph ph-arrow-left"></i> Back to My Growth
        </Link>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div className="card">
          <div className="card-header">
            <h3>Add New Goal</h3>
          </div>
          <form onSubmit={handleSubmit} className="card-body">
            {/* Category */}
            <div className="form-group">
              <label className="form-label">Goal Category</label>
              <div className="goal-type-grid">
                {CATEGORIES.map(c => (
                  <div
                    key={c.id}
                    className={`goal-type-card${category === c.id ? ' active' : ''}`}
                    onClick={() => setCategory(c.id)}
                  >
                    <i className={`ph ${c.icon}`}></i>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Goal Title <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input className="form-control" name="title" placeholder="e.g. Apply to 10 internships this season" required />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" rows={3} placeholder="What does success look like?" />
            </div>

            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Target Date</label>
                <input className="form-control" name="target_date" type="date" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Priority</label>
                <select className="form-control" name="priority" defaultValue="medium">
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>
            </div>

            <div className="form-row" style={{ marginTop: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Current Progress</label>
                <input className="form-control" name="current_value" type="number" defaultValue={0} min={0} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Target Value</label>
                <input className="form-control" name="target_value" type="number" placeholder="e.g. 10" min={1} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
              <Link href="/tracker" className="btn btn-ghost">Cancel</Link>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving…' : <><i className="ph ph-check"></i> Save Goal</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
