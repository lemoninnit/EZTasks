import React, { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import { getAnnouncements } from '../api/announcements'
import { getTasks } from '../api/tasks'
import { useAuth } from '../contexts/AuthContext'
import { Plus, Bell, CheckCircle2, XCircle, AlertCircle, Clock, Trash2, Edit2, FolderPlus, FolderMinus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Announcements() {
  const [notifications, setNotifications] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

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
      
      // Filter out expired notifications
      const now = new Date()
      const validAnnouncements = announcementsData.filter(ann => {
        if (ann.expiresAt) {
          try {
            const expiryDate = new Date(ann.expiresAt)
            if (isNaN(expiryDate.getTime())) {
              return true // Keep if date is invalid
            }
            return expiryDate > now
          } catch {
            return true // Keep if parsing fails
          }
        }
        return true
      })
      
      // Combine and sort by most recent
      const allNotifications = [...validAnnouncements]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      
      setNotifications(allNotifications)
      setTasks(tasksData)
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'task_overdue': return <AlertCircle size={20} color="#ef4444" />
      case 'task_due_day':
      case 'task_due_24h_window':
      case 'task_due_soon': return <Clock size={20} color="#f59e0b" />
      case 'task_due_week': return <Clock size={20} color="#3b82f6" />
      default: return <Bell size={20} color="#6b7280" />
    }
  }

  const getNotificationColor = (type) => {
    switch(type) {
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
        <div style={{ padding: '24px', textAlign: 'center' }}>Loading notifications...</div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #3f5d2a, #2d4a1b)',
            boxShadow: '0 4px 12px rgba(63, 93, 42, 0.25)'
          }}>
            <Bell size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Task Reminders
            </h1>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0, fontWeight: 500 }}>
              Reminders for your upcoming and missed task deadlines
            </p>
          </div>
        </div>

        {notifications.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
              <Bell size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontSize: 16, margin: 0 }}>No task reminders yet.</p>
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((notification) => {
              const colors = getNotificationColor(notification.notificationType)
              return (
                <Card
                  key={notification.announcementId}
                  style={{
                    borderLeft: `4px solid ${colors.border}`,
                    background: colors.bg,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    animation: 'fadeIn 0.3s ease-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}>
                      {getNotificationIcon(notification.notificationType)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: 600, 
                        color: colors.text, 
                        fontSize: 16, 
                        marginBottom: 4 
                      }}>
                        {notification.title}
                      </div>
                      <div style={{ 
                        color: colors.text, 
                        fontSize: 14, 
                        marginBottom: 8,
                        opacity: 0.9
                      }}>
                        {notification.content}
                      </div>
                      {notification.taskTitle && (
                        <div style={{ 
                          fontSize: 12, 
                          color: colors.text, 
                          opacity: 0.7,
                          marginBottom: 4
                        }}>
                          Task: {notification.taskTitle}
                          {notification.taskCategoryName && ` · ${notification.taskCategoryName}`}
                        </div>
                      )}
                      <div style={{ 
                        fontSize: 12, 
                        color: colors.text, 
                        opacity: 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Clock size={12} />
                        {formatTime(notification.createdAt)}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
