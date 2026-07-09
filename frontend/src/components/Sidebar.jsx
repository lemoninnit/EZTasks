import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { LayoutDashboard, ListTodo, CalendarDays, Bell, User } from 'lucide-react'

export default function Sidebar() {
  const css = styles || {}
  const s = {
    aside: { 
      borderRight: '1px solid #e2e8f0', 
      padding: 0, 
      background: '#3f5d2a', 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      height: '100vh',
      position: 'sticky',
      top: 0,
      alignSelf: 'start',
      overflowY: 'auto'
    },
    brandRow: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      height: 72,
      padding: '0 24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      background: '#2d4a1b'
    },
    brandIcon: { 
      width: 36, 
      height: 36, 
      borderRadius: 8, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#fff',
      color: '#3f5d2a', 
      fontWeight: 800,
      fontSize: 18,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    },
    brandText: { 
      fontWeight: 800, 
      color: '#fff', 
      fontSize: 20,
      letterSpacing: '-0.02em'
    },
    nav: { 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 6,
      padding: 20
    },
    link: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      padding: '12px 16px', 
      borderRadius: 10, 
      color: '#fff', 
      textDecoration: 'none',
      transition: 'all 0.2s',
      opacity: 0.8,
      fontSize: 15,
      fontWeight: 500
    },
    active: { 
      background: 'rgba(255, 255, 255, 0.15)', 
      color: '#fff',
      opacity: 1,
      fontWeight: 600
    },
  }
  
  const link = (to, label, Icon) => (
    <NavLink
      to={to}
      className={({ isActive }) => `${css.link || ''} ${isActive ? (css.active || '') : ''}`}
      style={({ isActive }) => ({ ...s.link, ...(isActive ? s.active : {}) })}
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  )

  return (
    <aside className={css.sidebar || ''} style={s.aside}>
      <div className={css.brandRow || ''} style={s.brandRow}>
        <div className={css.brandIcon || ''} style={s.brandIcon}>C</div>
        <div className={css.brandText || ''} style={s.brandText}>ClariTask</div>
      </div>
      <nav className={css.nav || ''} style={s.nav}> 
        {link('/dashboard', 'Dashboard', LayoutDashboard)}
        {link('/tasks', 'Tasks', ListTodo)}
        {link('/calendar', 'Calendar', CalendarDays)}
        {link('/announcements', 'Reminders', Bell)}
        {link('/profile', 'Profile', User)}
      </nav>
    </aside>
  )
}
