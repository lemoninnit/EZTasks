import React from 'react'
import { Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'

const footerColumns = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Security'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API', 'Support'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookies'],
  },
]

export default function Footer() {
  const s = {
    footer: { background: '#05050f', color: '#f8fafc', padding: '80px 24px 24px', fontSize: 14, borderTop: '1px solid rgba(255,255,255,0.05)' },
    container: { maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 },
    column: { display: 'grid', gap: 16, alignContent: 'start' },
    colTitle: { fontWeight: 700, color: '#ffffff', fontSize: 15, marginBottom: 4 },
    link: { color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s', fontSize: 14 },
    bottom: { maxWidth: 1000, margin: '64px auto 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: 32, paddingBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, color: 'rgba(255,255,255,0.4)' },
    brandLogo: { textDecoration: 'none', fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em' },
  }

  return (
    <footer style={s.footer}>
      <div style={s.container}>
        {footerColumns.map((column) => (
          <div key={column.title} style={s.column}>
            <div style={s.colTitle}>{column.title}</div>
            {column.links.map((label) => (
              <a key={label} href="#" style={s.link}>{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={s.bottom}>
        <a href="/" style={{ ...s.brandLogo, background: 'linear-gradient(90deg, #22d3ee 0%, #c084fc 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>EZTasks</a>
        <span>© 2025 EZTasks. All rights reserved.</span>
      </div>
    </footer>
  )
}
