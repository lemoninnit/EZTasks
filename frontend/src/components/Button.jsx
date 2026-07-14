import React from 'react'
import cls from 'classnames'
import { motion } from 'framer-motion'
import styles from './Button.module.css'

export default function Button({ children, variant = 'primary', type = 'button', onClick, className, disabled, style: customStyle }) {
  const classes = cls(styles.button, variant === 'ghost' ? styles.ghost : styles.primary, className, disabled && styles.disabled)

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2, scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      style={customStyle}
    >
      {children}
    </motion.button>
  )
}
