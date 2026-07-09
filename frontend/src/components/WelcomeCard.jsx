import React from 'react'
import { Sparkles, CalendarDays } from 'lucide-react'

export default function WelcomeCard({ greeting, taskCount = 0 }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #3f5d2a 0%, #2d4a1b 50%, #1a2e0f 100%)',
      borderRadius: 20,
      padding: '32px',
      marginBottom: 24,
      boxShadow: '0 10px 30px rgba(63, 93, 42, 0.15)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Decorative backdrop shapes */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '300px',
        height: '300px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '20%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(255, 255, 255, 0.2)', padding: '3px 10px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Overview
          </span>
          <Sparkles size={14} style={{ color: '#fcd34d' }} />
        </div>
        <h2 style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#fff',
          margin: '0 0 8px 0',
          lineHeight: 1.2,
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {greeting}
        </h2>
        <p style={{
          color: 'rgba(255, 255, 255, 0.85)',
          margin: 0,
          fontSize: 15,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <CalendarDays size={16} />
          You have {taskCount} task{taskCount !== 1 ? 's' : ''} scheduled for today.
        </p>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        padding: '12px 20px',
        textAlign: 'center',
        minWidth: 100
      }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
          {taskCount}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', marginTop: 4, letterSpacing: '0.05em' }}>
          Today
        </div>
      </div>
    </div>
  )
}
