import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './TaskItem.module.css'
import { Edit2, Trash2, CheckCircle2, Play, Flag } from 'lucide-react'

export default function TaskItem({ title, dueDate, status, categoryName, taskId, description, onEdit, onDelete, onStatusChange }) {
  const [busy, setBusy] = useState(false)

  const handleStatus = async (nextStatus) => {
    if (!onStatusChange || !nextStatus) return
    setBusy(true)
    try {
      await onStatusChange(taskId, nextStatus)
    } catch (error) {
      alert('Failed to update status')
    } finally {
      setBusy(false)
    }
  }

  const formatDisplayDate = (dateTimeStr) => {
    if (!dateTimeStr) return '—'
    try {
      const date = new Date(dateTimeStr)
      if (isNaN(date.getTime())) {
        return dateTimeStr
      }
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateTimeStr
    }
  }

  const getStatusPillClass = () => {
    switch (status) {
      case 'completed': return styles.completedPill
      case 'in_progress': return styles.progressPill
      default: return styles.pendingPill
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 18px 35px rgba(15, 23, 42, 0.12)' }}
      className={`${styles.item} ${status === 'completed' ? styles.itemCompleted : ''}`}
    >
      <div className={styles.headerRow}>
        <div className={styles.contentColumn}>
          <div className={styles.titleRow}>
            <h3 className={`${styles.title} ${status === 'completed' ? styles.completedTitle : ''}`}>{title}</h3>
            {status === 'completed' && <CheckCircle2 size={16} color="#10b981" />}
          </div>

          {description && <p className={styles.description}>{description}</p>}

          <div className={styles.metaRow}>
            {categoryName && <span className={styles.categoryChip}>{categoryName}</span>}
            <span className={styles.metaText}>Due: {formatDisplayDate(dueDate)}</span>
            <span className={`${styles.statusPill} ${getStatusPillClass()}`}>{status.replace('_', ' ')}</span>
          </div>
        </div>

        <div className={styles.actions}>
          {onEdit && status !== 'completed' && (
            <button className={styles.actionButton} onClick={() => onEdit(taskId)} title="Edit">
              <Edit2 size={16} />
            </button>
          )}
          {status === 'pending' && (
            <button className={`${styles.actionButton} ${styles.actionButtonPrimary}`} onClick={() => handleStatus('in_progress')} disabled={busy} title="Start Progress">
              <Play size={16} />
            </button>
          )}
          {status === 'in_progress' && (
            <button className={`${styles.actionButton} ${styles.actionButtonSuccess}`} onClick={() => handleStatus('completed')} disabled={busy} title="Mark Completed">
              <Flag size={16} />
            </button>
          )}
          {onDelete && (
            <button className={`${styles.actionButton} ${styles.actionButtonDanger}`} onClick={() => onDelete(taskId)} disabled={busy} title="Delete">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
