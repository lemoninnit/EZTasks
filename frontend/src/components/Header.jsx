import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const isLoginPage = location.pathname === '/login'

  // Right-side auth button: show "Sign Up" when already on the login page
  const authLabel = isLoginPage ? 'Sign Up' : 'Sign In'
  const authTo    = isLoginPage ? '/signup' : '/login'

  const goToSection = (id) => {
    if (isLanding) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
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
      position: 'sticky', top: 0, zIndex: 200,
    },
    wrap: {
      maxWidth: 1180, margin: '0 auto', padding: '16px 24px',
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
    <>
      {/* Responsive overrides — hide "Get Started" on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .hdr-wrap {
            padding: 14px 16px !important;
            gap: 8px !important;
          }
          .hdr-brand {
            font-size: 18px !important;
          }
          .hdr-nav {
            gap: 18px !important;
          }
          .hdr-nav button {
            font-size: 13px !important;
          }
          .hdr-get-started {
            display: none !important;
          }
          .hdr-sign-in {
            font-size: 13px !important;
            padding: 8px 12px !important;
          }
        }
      `}</style>

      <header style={s.header}>
        <div style={s.wrap} className="hdr-wrap">
          <a href="/" style={s.brand} className="hdr-brand" onClick={goTop}>EZTasks</a>

          <nav style={s.nav} className="hdr-nav">
            <button style={s.navBtn} onClick={() => goToSection('features')}>Features</button>
            <button style={s.navBtn} onClick={() => goToSection('manifesto')}>Manifesto</button>
          </nav>

          <div style={s.actionRow}>
            <Link to={authTo} style={s.signIn} className="hdr-sign-in">{authLabel}</Link>
            <Link to="/signup" style={s.primary} className="hdr-get-started">Get Started</Link>
          </div>
        </div>
      </header>
    </>
  )
}
