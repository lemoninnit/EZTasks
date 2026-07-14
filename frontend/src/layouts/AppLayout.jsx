import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { LogOut } from 'lucide-react'
import styles from './AppLayout.module.css'

export default function AppLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const apply = () => setMobile(window.innerWidth < 900)
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  const userName = user?.userDto?.name || user?.name || 'User'

  return (
    <div className={styles.shell} style={{ gridTemplateColumns: mobile ? '200px 1fr' : '260px 1fr' }}>
      <Sidebar />
      <div className={styles.content}>
        <motion.header className={styles.header} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
          <div className={styles.headerInner}>
            <div className={styles.greeting}>
              Welcome, <span className={styles.greetingStrong}>{userName}</span> 👋
            </div>
            <div className={styles.actions}>
              <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={styles.profileButton} onClick={() => navigate('/profile')}>
                <span className={styles.avatar}>{userName?.[0]?.toUpperCase() || 'U'}</span>
                <span>Profile</span>
              </motion.button>
              <motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={styles.logoutButton} onClick={logout}>
                <LogOut size={15} />
                LOGOUT
              </motion.button>
            </div>
          </div>
        </motion.header>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
