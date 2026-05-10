'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navLinks = [
  { href: '/dashboard',     label: 'Home',          icon: 'ph ph-house',             iconActive: 'ph-fill ph-house' },
  { href: '/opportunities', label: 'Internships',   icon: 'ph ph-briefcase',         iconActive: 'ph-fill ph-briefcase' },
  { href: '/interview',     label: 'Mock Interview', icon: 'ph ph-microphone-stage',  iconActive: 'ph-fill ph-microphone-stage' },
  { href: '/tracker',       label: 'My Growth',     icon: 'ph ph-chart-line-up',     iconActive: 'ph-fill ph-chart-line-up' },
  { href: '/resume-studio', label: 'Resume Studio', icon: 'ph ph-magic-wand',        iconActive: 'ph-fill ph-magic-wand' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/dashboard" className="navbar-brand">
          <i className="ph-fill ph-compass-tool"></i>
          Career Copilot
        </Link>

        <ul className="navbar-nav" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map(link => {
            const active = pathname.startsWith(link.href)
            return (
              <li key={link.href} className="nav-item">
                <Link href={link.href} className={`nav-link${active ? ' active' : ''}`}>
                  <i className={active ? link.iconActive : link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="navbar-right">
          <div className={`profile-menu${open ? ' open' : ''}`}>
            <button className="profile-trigger" onClick={e => { e.stopPropagation(); setOpen(o => !o) }}>
              <img src="https://ui-avatars.com/api/?name=JS&background=0a66c2&color=fff" alt="Me" />
              <span className="trigger-label">Me <i className="ph ph-caret-down"></i></span>
            </button>

            <div className="profile-dropdown">
              <div className="dd-header">
                <img className="dd-avatar" src="https://ui-avatars.com/api/?name=JS&background=0a66c2&color=fff" alt="Me" />
                <div className="dd-info">
                  <h4>My Account</h4>
                  <p>Career Copilot</p>
                </div>
              </div>
              <div className="dd-menu">
                <Link href="/profile" className="dd-item" onClick={() => setOpen(false)}>
                  <i className="ph ph-user-circle"></i> View Profile
                </Link>
                <Link href="/profile#password" className="dd-item" onClick={() => setOpen(false)}>
                  <i className="ph ph-lock-key"></i> Change Password
                </Link>
                <Link href="/profile" className="dd-item" onClick={() => setOpen(false)}>
                  <i className="ph ph-bell"></i> Notifications
                </Link>
                <div className="dd-sep"></div>
                <button
                  className="dd-item danger"
                  style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
                  onClick={handleSignOut}
                >
                  <i className="ph ph-sign-out"></i> Sign Out
                </button>
              </div>
            </div>

            {open && (
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 200 }}
                onClick={() => setOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
