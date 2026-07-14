import React from 'react'

const items = [
  { text: '2M+ Tasks Completed',       sep: '✦' },
  { text: 'Real-Time Collaboration',   sep: '✦' },
  { text: '99.9% Uptime',              sep: '✦' },
  { text: 'Zero Learning Curve',       sep: '✦' },
  { text: '50K+ Teams Worldwide',      sep: '✦' },
  { text: 'Smart Deadline Alerts',     sep: '✦' },
  { text: 'Enterprise-Grade Security', sep: '✦' },
  { text: 'Instant Task Actions',      sep: '✦' },
  { text: 'Assignment Analytics',      sep: '✦' },
  { text: 'Dynamic Calendar View',     sep: '✦' },
]

// Duplicate for seamless loop
const ticker = [...items, ...items]

export default function TextTicker() {
  return (
    <div style={styles.section}>
      {/* Top separator line */}
      <div style={styles.line} />

      <div style={styles.outer}>
        {/* Edge fades */}
        <div style={styles.fadeLeft} />
        <div style={styles.fadeRight} />

        {/* Inject keyframes */}
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>

        {/* Scrolling track */}
        <div style={styles.track}>
          {ticker.map((item, i) => (
            <span key={i} style={styles.item}>
              <span style={styles.sep}>{item.sep}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom separator line */}
      <div style={styles.line} />
    </div>
  )
}

const styles = {
  section: {
    background: '#05050f',
    overflow: 'hidden',
  },
  line: {
    height: 1,
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent 100%)',
  },
  outer: {
    position: 'relative',
    overflow: 'hidden',
    padding: '22px 0',
  },
  fadeLeft: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 160,
    background: 'linear-gradient(to right, #05050f 0%, transparent 100%)',
    zIndex: 2, pointerEvents: 'none',
  },
  fadeRight: {
    position: 'absolute', right: 0, top: 0, bottom: 0, width: 160,
    background: 'linear-gradient(to left, #05050f 0%, transparent 100%)',
    zIndex: 2, pointerEvents: 'none',
  },
  track: {
    display: 'inline-flex',
    whiteSpace: 'nowrap',
    animation: 'marquee 32s linear infinite',
    willChange: 'transform',
  },
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: 'rgba(255, 255, 255, 0.45)',
    textTransform: 'uppercase',
    paddingRight: 40,
  },
  sep: {
    color: '#22d3ee',
    fontSize: 10,
    marginRight: 40,
    opacity: 0.7,
  },
}
