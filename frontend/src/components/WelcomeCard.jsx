import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CalendarDays } from 'lucide-react'
import styles from './WelcomeCard.module.css'

export default function WelcomeCard({ greeting, taskCount = 0 }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
    >
      <div className={`${styles.orb} ${styles.orbOne}`} />
      <div className={`${styles.orb} ${styles.orbTwo}`} />

      <div className={styles.content}>
        <div>
          <div className={styles.badge}>
            <span>Overview</span>
            <Sparkles size={14} style={{ color: '#fcd34d' }} />
          </div>
          <h2 className={styles.title}>{greeting}</h2>
          <p className={styles.subtitle}>
            <CalendarDays size={16} />
            You have {taskCount} task{taskCount !== 1 ? 's' : ''} scheduled for today.
          </p>
        </div>

        <div className={styles.metric}>
          <div className={styles.metricValue}>{taskCount}</div>
          <div className={styles.metricLabel}>Today</div>
        </div>
      </div>
    </motion.div>
  )
}
