'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('profile')
  const [open, setOpen] = useState<Record<string, boolean>>({ personal: true, career: true, password: false, notifications: false })
  const [skills, setSkills] = useState(['Python', 'React', 'TypeScript', 'SQL', 'Git'])
  const [newSkill, setNewSkill] = useState('')

  function toggle(key: string) {
    setOpen(o => ({ ...o, [key]: !o[key] }))
  }

  async function handleSignOut() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <>
      <div className="page-header"><h1>My Profile</h1></div>

      <div className="profile-layout">
        {/* ASIDE */}
        <aside>
          <div className="card profile-aside">
            <div className="profile-avatar-wrap">
              <img
                className="profile-avatar-large"
                src="https://ui-avatars.com/api/?name=JS&background=0a66c2&color=fff&size=96"
                alt="Avatar"
              />
              <button className="avatar-edit-btn"><i className="ph ph-pencil-simple"></i></button>
            </div>
            <h3>My Account</h3>
            <p>Career Copilot Member</p>

            <div className="aside-links">
              <a className={`aside-link${activeSection === 'profile' ? ' active' : ''}`} onClick={() => setActiveSection('profile')}>
                <i className="ph ph-user-circle"></i> My Profile
              </a>
              <a className={`aside-link${activeSection === 'password' ? ' active' : ''}`} onClick={() => setActiveSection('password')}>
                <i className="ph ph-lock-key"></i> Change Password
              </a>
              <a className={`aside-link${activeSection === 'notifications' ? ' active' : ''}`} onClick={() => setActiveSection('notifications')}>
                <i className="ph ph-bell"></i> Notifications
              </a>
              <a className="aside-link danger" style={{ cursor: 'pointer' }} onClick={handleSignOut}>
                <i className="ph ph-sign-out"></i> Sign Out
              </a>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div>
          {/* Personal Info */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className={`section-toggle${open.personal ? ' open' : ''}`} onClick={() => toggle('personal')}>
              <h3>Personal Information</h3>
              <i className="ph ph-caret-down"></i>
            </div>
            {open.personal && (
              <div className="section-body">
                <div className="form-row" style={{ marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">First Name</label>
                    <input className="form-control" defaultValue="Jane" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Last Name</label>
                    <input className="form-control" defaultValue="Smith" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-control" type="email" defaultValue="jane@mit.edu" />
                </div>
                <div className="form-row" style={{ marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">University</label>
                    <input className="form-control" defaultValue="MIT" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Graduation Year</label>
                    <select className="form-control" defaultValue="2026">
                      {['2025','2026','2027','2028'].map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Major</label>
                    <input className="form-control" defaultValue="Computer Science" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">GPA (optional)</label>
                    <input className="form-control" defaultValue="3.9 / 4.0" />
                  </div>
                </div>
                <div style={{ marginTop: '1.25rem' }}>
                  <button className="btn btn-primary btn-sm">Save Changes</button>
                </div>
              </div>
            )}
          </div>

          {/* Career Info */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className={`section-toggle${open.career ? ' open' : ''}`} onClick={() => toggle('career')}>
              <h3>Career Info & Skills</h3>
              <i className="ph ph-caret-down"></i>
            </div>
            {open.career && (
              <div className="section-body">
                <div className="form-group">
                  <label className="form-label">Target Role(s)</label>
                  <input className="form-control" defaultValue="Software Engineering Intern, PM Intern" />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn URL</label>
                  <input className="form-control" placeholder="https://linkedin.com/in/username" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Skills</label>
                  <div className="skill-tags" style={{ marginBottom: '0.75rem' }}>
                    {skills.map(s => (
                      <span key={s} className="skill-tag">
                        {s}
                        <button onClick={() => setSkills(prev => prev.filter(x => x !== s))}>×</button>
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      className="form-control"
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && newSkill.trim()) { setSkills(p => [...p, newSkill.trim()]); setNewSkill('') } }}
                    />
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => { if (newSkill.trim()) { setSkills(p => [...p, newSkill.trim()]); setNewSkill('') } }}
                    >Add</button>
                  </div>
                </div>
                <div style={{ marginTop: '1.25rem' }}>
                  <button className="btn btn-primary btn-sm">Save Changes</button>
                </div>
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className={`section-toggle${open.password ? ' open' : ''}`} onClick={() => toggle('password')}>
              <h3>Change Password</h3>
              <i className="ph ph-caret-down"></i>
            </div>
            {open.password && (
              <div className="section-body">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className="form-control" type="password" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input className="form-control" type="password" placeholder="At least 8 characters" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input className="form-control" type="password" placeholder="Repeat new password" />
                </div>
                <button className="btn btn-primary btn-sm">Update Password</button>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="danger-zone">
            <div className="danger-zone-header">
              <h3>Danger Zone</h3>
            </div>
            <div className="danger-zone-body">
              <button className="btn btn-outline-danger btn-sm">
                <i className="ph ph-download-simple"></i> Export My Data
              </button>
              <button className="btn btn-danger btn-sm">
                <i className="ph ph-trash"></i> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
