import React from 'react'

export default function Card({ title, right, children, style }) {
  const base = {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    padding: 24,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
  }
  
  return (
    <section 
      style={{ ...base, ...(style || {}) }}
      onMouseEnter={(e) => {
        if (!style?.onMouseEnter) {
          e.currentTarget.style.boxShadow = '0 12px 20px -8px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.02)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={(e) => {
        if (!style?.onMouseLeave) {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)'
          e.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      {(title || right) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          paddingBottom: 12,
          borderBottom: '1px solid #f1f5f9'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '-0.01em'
          }}>
            {title}
          </h2>
          {right}
        </div>
      )}
      {children}
    </section>
  )
}
