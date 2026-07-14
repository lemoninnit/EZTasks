import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { LayoutDashboard, ListTodo, CalendarDays, Bell, User } from 'lucide-react'

export default function Sidebar() {
  const link = (to, label, Icon) => (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`.trim()}
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  )

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandRow}>
        <div className={styles.brandIcon}>C</div>
        <div className={styles.brandText}>EzTasks</div>
      </div>
      <nav className={styles.nav}>
        {link('/dashboard', 'Dashboard', LayoutDashboard)}
        {link('/tasks', 'Tasks', ListTodo)}
        {link('/calendar', 'Calendar', CalendarDays)}
        {link('/announcements', 'Reminders', Bell)}
        {link('/profile', 'Profile', User)}
      </nav>
    </aside>
  )
}
