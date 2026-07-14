import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppLayout from '../layouts/AppLayout'
import Card from '../components/Card'
import { getAnnouncements } from '../api/announcements'
import { getTasks } from '../api/tasks'
import { Bell, AlertCircle, Clock } from 'lucide-react'
import styles from './Announcements.module.css'

export default function Announcements() {
  const [notifications, setNotifications] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllData()
    const interval = setInterval(loadAllData, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadAllData = async () => {
    try {
      const [announcementsData, tasksData] = await Promise.all([
        getAnnouncements(),
        getTasks()
      ])

      const now = new Date()
      const validAnnouncements = announcementsData.filter(ann => {
        if (ann.expiresAt) {
          try {
            const expiryDate = new Date(ann.expiresAt)
            if (isNaN(expiryDate.getTime())) {
              return true
            }
            return expiryDate > now
          } catch {
            return true
          }
        }
        return true
      })

      const allNotifications = [...validAnnouncements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setNotifications(allNotifications)
      setTasks(tasksData)
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task_overdue': return <AlertCircle size={20} color="#ef4444" />
      case 'task_due_day':
      case 'task_due_24h_window':
      case 'task_due_soon': return <Clock size={20} color="#f59e0b" />
      case 'task_due_week': return <Clock size={20} color="#3b82f6" />
      default: return <Bell size={20} color="#6b7280" />
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'task_overdue': return { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' }
      case 'task_due_day':
      case 'task_due_24h_window':
      case 'task_due_soon': return { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' }
      case 'task_due_week': return { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' }
      default: return { bg: '#f3f4f6', border: '#6b7280', text: '#374151' }
    }
  }

  const formatTime = (dateTime) => {
    if (!dateTime) return ''
    try {
      const date = new Date(dateTime)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return ''
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className={styles.page}>
          <div className={styles.empty}>
            <div className="loading-skeleton" style={{ width: '100%', height: 90, borderRadius: 16, marginBottom: 12 }} />
            <div className="loading-skeleton" style={{ width: '70%', height: 16, borderRadius: 999, margin: '0 auto 8px' }} />
            <div className="loading-skeleton" style={{ width: '45%', height: 16, borderRadius: 999, margin: '0 auto' }} />
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <motion.div className={styles.header} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <div className={styles.iconWrap}>
            <Bell size={22} />
          </div>
          <div>
            <h1 className={styles.title}>Task Reminders</h1>
            <p className={styles.subtitle}>Reminders for your upcoming and missed task deadlines</p>
          </div>
        </motion.div>

        {notifications.length === 0 ? (
          <Card>
            <div className={styles.empty}>
              <div className={styles.emptyIcon}><Bell size={26} /></div>
              <p style={{ fontSize: '1rem', margin: 0 }}>No task reminders yet.</p>
            </div>
          </Card>
        ) : (
          <div className={styles.list}>
            <AnimatePresence initial={false}>
              {notifications.map((notification) => {
                const colors = getNotificationColor(notification.notificationType)
                return (
                  <motion.div key={notification.announcementId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <Card className={styles.alertCard} style={{ borderLeft: `4px solid ${colors.border}`, background: colors.bg }}>
                      <div className={styles.alertIconWrap}>{getNotificationIcon(notification.notificationType)}</div>
                      <div style={{ flex: 1 }}>
                        <h3 className={styles.alertTitle}>{notification.title}</h3>
                        <p className={styles.alertContent}>{notification.content}</p>
                        {notification.taskTitle && (
                          <p className={styles.alertContent} style={{ marginBottom: '0.35rem' }}>
                            Task: {notification.taskTitle}
                            {notification.taskCategoryName && ` · ${notification.taskCategoryName}`}
                          </p>
                        )}
                        <div className={styles.meta}><Clock size={12} />{formatTime(notification.createdAt)}</div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
