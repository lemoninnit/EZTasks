import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AuthLayout({ title, subtitle, children }) {
  const s = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #05050f 0%, #0a0a1a 100%)',
      color: '#f8fafc',
    },
    main: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
    },
    glow: {
      position: 'absolute',
      width: '600px',
      height: '500px',
      background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      filter: 'blur(80px)',
      pointerEvents: 'none',
      zIndex: 0,
    },
    card: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      maxWidth: 440,
      background: 'rgba(10, 15, 30, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      borderRadius: 24,
      padding: '48px 40px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
    },
    brand: {
      display: 'inline-block',
      fontWeight: 900,
      fontSize: 20,
      letterSpacing: '-0.03em',
      background: 'linear-gradient(90deg, #22d3ee 0%, #c084fc 100%)',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      textDecoration: 'none',
      marginBottom: 32,
      cursor: 'pointer',
    },
    title: {
      fontSize: 30,
      fontWeight: 800,
      color: '#ffffff',
      margin: '0 0 10px',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    subtitle: {
      color: 'rgba(255,255,255,0.5)',
      margin: '0 0 32px',
      fontSize: 15,
      lineHeight: 1.7,
    },
  }

  return (
    <div style={s.page}>
      <Header />
      <main style={s.main}>
        <div style={s.glow} />
        <div style={s.card}>
          <a href="/" style={s.brand}>EZTasks</a>
          <h1 style={s.title}>{title}</h1>
          {subtitle && <p style={s.subtitle}>{subtitle}</p>}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
