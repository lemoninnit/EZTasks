import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Play, BarChart2 } from 'lucide-react'
import styles from './StatsCardRow.module.css'

const Metric = ({ color, bg, icon: Icon, value, label, delay }) => {
  return (
    <motion.div
      className={styles.metric}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.24 }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 18px 35px rgba(15, 23, 42, 0.13)' }}
    >
      <div className={styles.iconWrap} style={{ background: bg }}>
        <Icon size={24} color={color} />
      </div>
      <div>
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </motion.div>
  )
}

export default function StatsCardRow({ completed = 0, pending = 0, inProgress = 0, total = 0 }) {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
      <Metric color="#10b981" bg="#e6f4ea" icon={CheckCircle2} value={completed} label="Completed" delay={0.02} />
      <Metric color="#f59e0b" bg="#fef7e0" icon={Clock} value={pending} label="Pending" delay={0.06} />
      <Metric color="#3b82f6" bg="#e8f0fe" icon={Play} value={inProgress} label="In Progress" delay={0.1} />
      <Metric color="#8b5cf6" bg="#f3e8ff" icon={BarChart2} value={total} label="Total Tasks" delay={0.14} />
    </div>
  )
}
