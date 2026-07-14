import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#05050f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      {/* Spinner */}
      <div style={{ position: 'relative', width: 48, height: 48 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.06)',
            borderTopColor: '#22d3ee',
            borderRightColor: '#c084fc',
            position: 'absolute',
            inset: 0,
          }}
        />
      </div>
      {/* Brand */}
      <div style={{
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(90deg, #22d3ee 0%, #c084fc 100%)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}>
        EZTasks
      </div>
    </motion.div>
  )
}

export default function PageTransition({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loader briefly on mount, then reveal content
    const t = setTimeout(() => setLoading(false), 380)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingOverlay key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  )
}
