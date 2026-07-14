import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'

const baseInputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  color: '#f1f5f9',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontSize: 13,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.7)',
}

const errTextStyle = {
  marginTop: 5,
  fontSize: 12,
  color: '#f87171',
}

function SuccessModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
    }}>
      <div style={{
        background: 'rgba(10, 15, 30, 0.95)',
        border: '1px solid rgba(34, 211, 238, 0.2)',
        borderRadius: 24,
        padding: '48px 40px',
        maxWidth: 380,
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(34, 211, 238, 0.1)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <CheckCircle size={32} color="#22d3ee" />
        </div>
        <h2 style={{ color: '#ffffff', fontSize: 24, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
          Account Created!
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.6, margin: '0 0 32px' }}>
          Your EZTasks account has been successfully created. Sign in to get started.
        </p>
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '13px', borderRadius: 10,
            background: '#06b6d4', color: '#020617',
            fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
          }}
        >
          Go to Sign In
        </button>
      </div>
    </div>
  )
}

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Per-field errors
  const [errors, setErrors] = useState({})

  const { register } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!name.trim()) {
      e.name = 'Full name is required.'
    } else if (name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters.'
    }

    if (!email.trim()) {
      e.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Enter a valid email address (e.g. user@gmail.com).'
    }

    if (!password) {
      e.password = 'Password is required.'
    } else if (password.length < 8) {
      e.password = 'Password must be at least 8 characters.'
    } else if (!/[A-Z]/.test(password)) {
      e.password = 'Password must contain at least one uppercase letter.'
    } else if (!/[0-9]/.test(password)) {
      e.password = 'Password must contain at least one number.'
    }

    if (!confirmPassword) {
      e.confirmPassword = 'Please confirm your password.'
    } else if (password !== confirmPassword) {
      e.confirmPassword = 'Passwords do not match.'
    }

    if (!agree) {
      e.agree = 'You must agree to the terms & policy.'
    }

    return e
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    try {
      const result = await register(name.trim(), email.trim(), password)
      if (result.success) {
        setShowModal(true)
      } else {
        setErrors({ api: typeof result.error === 'string' ? result.error : 'Registration failed. Try again.' })
      }
    } catch {
      setErrors({ api: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (field) => ({
    ...baseInputStyle,
    borderColor: errors[field] ? '#f87171' : 'rgba(255,255,255,0.1)',
  })

  const pwInputStyle = (field) => ({
    ...inputStyle(field),
    paddingRight: 44,
  })

  return (
    <>
      {showModal && <SuccessModal onClose={() => navigate('/login')} />}
      <AuthLayout
        title="Get Started"
        subtitle="Create your account and turn scattered tasks into an organized workflow."
      >
        <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {errors.api && (
            <div style={{
              color: '#f87171', fontSize: 13, padding: '12px 16px',
              background: 'rgba(239,68,68,0.1)', borderRadius: 10,
              border: '1px solid rgba(239,68,68,0.2)',
            }}>
              {errors.api}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })) }}
              style={inputStyle('name')}
              onFocus={(e) => { if (!errors.name) e.target.style.borderColor = '#22d3ee' }}
              onBlur={(e) => { if (!errors.name) e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
            {errors.name && <p style={errTextStyle}>⚠ {errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email (e.g. user@gmail.com)"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })) }}
              style={inputStyle('email')}
              onFocus={(e) => { if (!errors.email) e.target.style.borderColor = '#22d3ee' }}
              onBlur={(e) => { if (!errors.email) e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
            />
            {errors.email && <p style={errTextStyle}>⚠ {errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })) }}
                style={pwInputStyle('password')}
                onFocus={(e) => { if (!errors.password) e.target.style.borderColor = '#22d3ee' }}
                onBlur={(e) => { if (!errors.password) e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p style={errTextStyle}>⚠ {errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: '' })) }}
                style={pwInputStyle('confirmPassword')}
                onFocus={(e) => { if (!errors.confirmPassword) e.target.style.borderColor = '#22d3ee' }}
                onBlur={(e) => { if (!errors.confirmPassword) e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)' }}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p style={errTextStyle}>⚠ {errors.confirmPassword}</p>}
          </div>

          {/* Terms */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => { setAgree(e.target.checked); setErrors(prev => ({ ...prev, agree: '' })) }}
                style={{ accentColor: '#22d3ee', width: 16, height: 16, flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                I agree to the{' '}
                <a href="#" style={{ color: '#22d3ee', textDecoration: 'none' }}>terms & policy</a>
              </span>
            </label>
            {errors.agree && <p style={{ ...errTextStyle, marginTop: 6 }}>⚠ {errors.agree}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px', borderRadius: 10, background: '#06b6d4',
              color: '#020617', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginTop: 4, opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#22d3ee', fontWeight: 600, textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </AuthLayout>
    </>
  )
}
