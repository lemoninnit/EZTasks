import React from 'react'
import { motion } from 'framer-motion'
import styles from './Card.module.css'

export default function Card({ title, right, children, style, className, onMouseEnter, onMouseLeave }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={[styles.card, className].filter(Boolean).join(' ')}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {(title || right) && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {right}
        </div>
      )}
      {children}
    </motion.section>
  )
}
