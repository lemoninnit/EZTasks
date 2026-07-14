import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isLanding = location.pathname === '/'

  // Navigate to landing then scroll to section
  const goToSection = (id) => {
    if (isLanding) {
      // Already on landing — just smooth-scroll
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Navigate to landing, then scroll after arrival
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 450)
    }
  }

  const goTop = (e) => {
    e.preventDefault()
    if (isLanding) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const s = {
    header: {
      background: '#05050f',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'sticky', top: 0, zIndex: 50,
    },
    wrap: {
      maxWidth: 1180, margin: '0 auto', padding: '20px 24px',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 16,
    },
    brand: {
      display: 'inline-flex', alignItems: 'center', textDecoration: 'none',
      fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em',
      background: 'linear-gradient(90deg, #22d3ee 0%, #c084fc 100%)',
      WebkitBackgroundClip: 'text', color: 'transparent', cursor: 'pointer',
      justifySelf: 'start',
    },
    nav: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32,
    },
    navBtn: {
      color: 'rgba(255,255,255,0.6)', fontWeight: 500, fontSize: 14,
      cursor: 'pointer', background: 'none', border: 'none',
      padding: '4px 0', textAlign: 'center',
      fontFamily: 'inherit', lineHeight: 1,
    },
    actionRow: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
      justifySelf: 'end',
    },
    signIn: {
      color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 500,
      fontSize: 14, padding: '10px 16px', borderRadius: 6,
      border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)',
      display: 'inline-block',
    },
    primary: {
      padding: '10px 20px', borderRadius: 6, background: '#06b6d4',
      color: '#020617', textDecoration: 'none', fontWeight: 600,
      fontSize: 14, display: 'inline-block',
    },
  }

  return (
    <header style={s.header}>
      <div style={s.wrap}>
        <a href="/" style={s.brand} onClick={goTop}>EZTasks</a>

        <nav style={s.nav}>
          <button style={s.navBtn} onClick={() => goToSection('features')}>Features</button>
          <button style={s.navBtn} onClick={() => goToSection('manifesto')}>Manifesto</button>
        </nav>

        <div style={s.actionRow}>
          <Link to="/login" style={s.signIn}>Sign In</Link>
          <Link to="/signup" style={s.primary}>Get Started</Link>
        </div>
      </div>
    </header>
  )
}
