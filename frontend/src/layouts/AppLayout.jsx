import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, User as UserIcon } from 'lucide-react'

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
  
  const s = {
    shell: { 
      display: 'grid', 
      gridTemplateColumns: mobile ? '200px 1fr' : '260px 1fr', 
      minHeight: '100vh',
      height: '100vh',
      background: '#f8fafc' 
    },
    content: { 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      height: '100vh',
      overflow: 'hidden'
    },
    header: { 
      borderBottom: '1px solid #e2e8f0', 
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      height: 72,
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)'
    },
    headerWrap: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 24px',
      width: '100%'
    },
    greeting: { 
      fontWeight: 500, 
      color: '#475569',
      fontSize: 15,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    },
    actions: { 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 12 
    },
    profileLink: { 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 8, 
      padding: '8px 16px', 
      background: '#f1f5f9', 
      border: '1px solid #e2e8f0',
      borderRadius: 999, 
      color: '#334155',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all 0.2s',
    },
    avatar: { 
      width: 22, 
      height: 22, 
      borderRadius: 999, 
      background: '#3f5d2a', 
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 11
    },
    logoutBtn: { 
      background: 'transparent', 
      color: '#64748b', 
      padding: '8px 16px', 
      border: '1px solid #e2e8f0', 
      borderRadius: 10,
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'all 0.2s'
    },
    main: { 
      flex: 1, 
      padding: mobile ? 16 : 24,
      overflowY: 'auto'
    }
  }
  
  return (
    <div style={s.shell}>
      <Sidebar />
      <div style={s.content}>
        <header style={s.header}>
          <div style={s.headerWrap}>
            <div style={s.greeting}>
              Welcome, <span style={{ fontWeight: 700, color: '#0f172a' }}>{userName}</span> 👋
            </div>
            <div style={s.actions}>
              <button 
                onClick={() => navigate('/profile')} 
                style={s.profileLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span style={s.avatar}>{userName?.[0]?.toUpperCase() || 'U'}</span>
                <span>Profile</span>
              </button>
              <button
                style={s.logoutBtn}
                onClick={logout}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fef2f2'
                  e.currentTarget.style.borderColor = '#fecaca'
                  e.currentTarget.style.color = '#ef4444'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.color = '#64748b'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <LogOut size={15} />
                LOGOUT
              </button>
            </div>
          </div>
        </header>
        <main style={s.main}>{children}</main>
      </div>
    </div>
  )
}
