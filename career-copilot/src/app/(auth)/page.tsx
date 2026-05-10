'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage() {
  const router = useRouter()
  const [view, setView] = useState<'login' | 'signup' | 'check-email'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [signupEmail, setSignupEmail] = useState('')

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setError('')
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    router.push('/dashboard')
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setError('')
    const fd = new FormData(e.currentTarget)
    const email = fd.get('email') as string
    setSignupEmail(email)
    const res = await fetch('/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, password: fd.get('password'),
        first_name: fd.get('first_name'), last_name: fd.get('last_name'),
        university: fd.get('university'), grad_year: fd.get('grad_year'),
      }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); return }
    if (data.requiresConfirmation) {
      setView('check-email')
    } else {
      router.push('/onboarding')
    }
  }

  return (
    <div className="auth-page">
      {/* LEFT HERO */}
      <div className="auth-hero">
        <div className="auth-hero-logo">
          <i className="ph-fill ph-compass-tool"></i>
          Career Copilot
        </div>
        <h2>Your AI-powered path to the perfect internship</h2>
        <p>Analyze your resume, match with top roles, and ace every interview — all in one intelligent platform.</p>
        <div className="auth-hero-features">
          {[
            ['ph-file-text', 'AI-powered resume analysis & scoring'],
            ['ph-briefcase', 'Smart internship matching tailored to you'],
            ['ph-microphone-stage', 'Realistic AI mock interviews with feedback'],
            ['ph-chart-line-up', 'Track your skills and career progress'],
          ].map(([icon, text]) => (
            <div key={text} className="auth-hero-feature">
              <span className="feature-icon-wrap"><i className={`ph ${icon}`}></i></span>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-panel">
        <div className="auth-form-wrapper">
          {view === 'check-email' ? (
            <div style={{ textAlign: 'center' }}>
              <div className="success-icon" style={{ margin: '0 auto 1.5rem' }}>
                <i className="ph ph-envelope-simple"></i>
              </div>
              <h1 className="auth-form-title">Check your email</h1>
              <p className="auth-form-sub">We sent a confirmation link to <strong>{signupEmail}</strong></p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Click the link in the email to activate your account, then sign in below.
              </p>
              <button onClick={() => { setView('login'); setError('') }} className="btn btn-primary btn-full">
                Go to Sign In
              </button>
              <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Didn&apos;t receive an email?{' '}
                <button onClick={() => { setView('signup'); setError('') }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem' }}>
                  Try again
                </button>
              </p>
            </div>
          ) : view === 'login' ? (
            <>
              <h1 className="auth-form-title">Welcome back</h1>
              <p className="auth-form-sub">Sign in to continue your career journey</p>
              {error && <div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--r-md)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label">Email address</label>
                  <input className="form-control" name="email" type="email" placeholder="you@university.edu" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Password
                    <Link href="/forgot-password" className="forgot-link">Forgot password?</Link>
                  </label>
                  <input className="form-control" name="password" type="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary btn-full btn-lg">
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>
              </form>
              <p className="auth-switch">
                New to Career Copilot?{' '}
                <button onClick={() => { setView('signup'); setError('') }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem' }}>
                  Create a free account
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="auth-form-title">Join Career Copilot</h1>
              <p className="auth-form-sub">Start your journey to the perfect internship</p>
              {error && <div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--r-md)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
              <form onSubmit={handleSignup}>
                <div className="form-row" style={{ marginBottom: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">First name</label>
                    <input className="form-control" name="first_name" type="text" placeholder="Jane" required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Last name</label>
                    <input className="form-control" name="last_name" type="text" placeholder="Smith" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email address</label>
                  <input className="form-control" name="email" type="email" placeholder="you@university.edu" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input className="form-control" name="password" type="password" placeholder="At least 8 characters" required />
                  <span className="form-hint">Use 8+ characters with a mix of letters and numbers</span>
                </div>
                <div className="form-row" style={{ marginBottom: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">University</label>
                    <input className="form-control" name="university" type="text" placeholder="MIT" required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Grad year</label>
                    <select className="form-control" name="grad_year" required>
                      <option value="">Year</option>
                      {['2025','2026','2027','2028'].map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <p className="terms-note">
                  By clicking Agree &amp; Join, you agree to Career Copilot&apos;s{' '}
                  <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </p>
                <button type="submit" disabled={loading} className="btn btn-primary btn-full btn-lg">
                  {loading ? 'Creating account…' : 'Agree & Join'}
                </button>
              </form>
              <p className="auth-switch">
                Already have an account?{' '}
                <button onClick={() => { setView('login'); setError('') }} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem' }}>
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
