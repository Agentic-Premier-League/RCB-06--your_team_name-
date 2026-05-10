'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        {!sent ? (
          <>
            <div className="forgot-icon">
              <i className="ph ph-lock-key-open"></i>
            </div>
            <h2 style={{ marginBottom: '0.5rem' }}>Forgot your password?</h2>
            <p style={{ marginBottom: '2rem' }}>No worries — enter your email and we&apos;ll send you a reset link.</p>
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label className="form-label">Email address</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary btn-full">
                {loading ? 'Sending…' : <><i className="ph ph-envelope-simple"></i> Send Reset Link</>}
              </button>
            </form>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/" className="btn btn-ghost btn-sm">
                <i className="ph ph-arrow-left"></i> Back to Sign In
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="success-icon">
              <i className="ph ph-envelope-simple"></i>
            </div>
            <h2 style={{ marginBottom: '0.5rem' }}>Check your email</h2>
            <p style={{ marginBottom: '0.5rem' }}>We&apos;ve sent a reset link to</p>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>{email}</p>
            <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-md)', padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              <i className="ph ph-clock"></i> The link expires in <strong>15 minutes</strong>. Check your spam folder if you don&apos;t see it.
            </div>
            <button onClick={() => setSent(false)} className="btn btn-primary btn-full">
              <i className="ph ph-arrow-counter-clockwise"></i> Resend Link
            </button>
            <div style={{ marginTop: '1rem' }}>
              <Link href="/" className="btn btn-ghost btn-sm">
                <i className="ph ph-arrow-left"></i> Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
