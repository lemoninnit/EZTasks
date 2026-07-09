import React from 'react'
import SiteLayout from '../layouts/SiteLayout'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Landing() {
  const s = {
    hero: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #3f5d2a 0%, #2d4a1b 50%, #1a2e0f 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '600px'
    },
    floatingShape: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      animation: 'float 6s ease-in-out infinite',
      filter: 'blur(40px)'
    },
    container: { 
      textAlign: 'center', 
      maxWidth: 900, 
      margin: '0 auto',
      position: 'relative',
      zIndex: 1
    },
    title: { 
      fontSize: 56, 
      fontWeight: 800, 
      margin: '0 0 12px', 
      letterSpacing: '-0.02em', 
      color: '#fff',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      animation: 'fadeIn 0.8s ease-out'
    },
    subtitle: { 
      color: 'rgba(255, 255, 255, 0.9)', 
      fontSize: 20, 
      margin: '0 auto 32px', 
      maxWidth: 720,
      animation: 'fadeIn 1s ease-out'
    },
    ctaRow: { 
      display: 'inline-grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: 12, 
      marginTop: 24,
      animation: 'fadeIn 1.2s ease-out'
    },
    cta: { 
      display: 'block',
      transition: 'transform 0.2s'
    },
    features: { 
      padding: '80px 20px',
      background: 'linear-gradient(to bottom, #f8fafc, #fff)'
    },
    grid: { 
      maxWidth: 1100, 
      margin: '0 auto', 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: 24 
    },
    feature: { 
      background: '#fff', 
      border: '1px solid #e5e7eb', 
      borderRadius: 16, 
      padding: 24,
      transition: 'all 0.3s',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      animation: 'fadeIn 0.5s ease-out'
    },
    fTitle: { 
      fontWeight: 700, 
      color: '#0f172a', 
      marginBottom: 8,
      fontSize: 18
    },
    fDesc: { 
      color: '#6b7280',
      lineHeight: 1.6
    },
  }

  const handleFeatureHover = (e) => {
    e.currentTarget.style.transform = 'translateY(-8px)'
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(63, 93, 42, 0.15)'
    e.currentTarget.style.borderColor = '#3f5d2a'
  }

  const handleFeatureLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)'
    e.currentTarget.style.borderColor = '#e5e7eb'
  }

  return (
    <SiteLayout>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
      <section style={s.hero}>
        <div style={{...s.floatingShape, width: '300px', height: '300px', top: '10%', left: '10%', animationDelay: '0s'}}></div>
        <div style={{...s.floatingShape, width: '200px', height: '200px', top: '60%', right: '15%', animationDelay: '2s'}}></div>
        <div style={{...s.floatingShape, width: '150px', height: '150px', bottom: '20%', left: '20%', animationDelay: '4s'}}></div>
        <div style={s.container}>
          <h1 style={s.title}>Organize Tasks Clearly</h1>
          <p style={s.subtitle}>Manage assignments, track deadlines, and stay informed with a simple, fast, and reliable experience.</p>
          <div style={s.ctaRow}>
            <a href="/signup" style={s.cta} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <Button>Get Started</Button>
            </a>
            <a href="/login" style={s.cta} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <Button variant="ghost" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.3)' }}>Sign In</Button>
            </a>
          </div>
        </div>
      </section>
      <section style={s.features}>
        <div style={s.grid}>
          <div style={s.feature} onMouseEnter={handleFeatureHover} onMouseLeave={handleFeatureLeave}>
            <div style={s.fTitle}>Task Management</div>
            <div style={s.fDesc}>Create, edit, and track tasks with status and due dates.</div>
          </div>
          <div style={s.feature} onMouseEnter={handleFeatureHover} onMouseLeave={handleFeatureLeave}>
            <div style={s.fTitle}>Task Reminders</div>
            <div style={s.fDesc}>Get real-time reminders for upcoming and missed task deadlines.</div>
          </div>
          <div style={s.feature} onMouseEnter={handleFeatureHover} onMouseLeave={handleFeatureLeave}>
            <div style={s.fTitle}>Smart Calendar</div>
            <div style={s.fDesc}>Visual calendar view with task deadlines and time tracking.</div>
          </div>
          <div style={s.feature} onMouseEnter={handleFeatureHover} onMouseLeave={handleFeatureLeave}>
            <div style={s.fTitle}>Category System</div>
            <div style={s.fDesc}>Organize tasks with custom categories for better management.</div>
          </div>
          <div style={s.feature} onMouseEnter={handleFeatureHover} onMouseLeave={handleFeatureLeave}>
            <div style={s.fTitle}>Responsive Design</div>
            <div style={s.fDesc}>Beautiful on desktops, tablets, and mobile devices.</div>
          </div>
          <div style={s.feature} onMouseEnter={handleFeatureHover} onMouseLeave={handleFeatureLeave}>
            <div style={s.fTitle}>Secure Storage</div>
            <div style={s.fDesc}>Backed by a reliable database for smooth operations.</div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
