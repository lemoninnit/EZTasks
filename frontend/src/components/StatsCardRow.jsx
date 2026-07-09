import React, { useEffect, useState } from 'react'
import { CheckCircle2, Clock, Play, BarChart2 } from 'lucide-react'

const Metric = ({ color, bg, icon: Icon, value, label }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 16, 
        background: '#fff', 
        border: '1px solid #e2e8f0', 
        borderRadius: 16, 
        padding: '20px 24px',
        boxShadow: isHovered ? `0 10px 20px -5px ${color}15, 0 4px 6px -2px rgba(0,0,0,0.02)` : '0 1px 3px 0 rgba(0,0,0,0.05)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default'
      }}
    >
      <div style={{ 
        width: 48, 
        height: 48, 
        borderRadius: 12, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: bg,
        transition: 'all 0.25s'
      }}>
        <Icon size={24} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: 2 }}>
          {value}
        </div>
        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          {label}
        </div>
      </div>
    </div>
  )
}

export default function StatsCardRow({ completed = 0, pending = 0, inProgress = 0, total = 0 }) {
  const [cols, setCols] = useState(4)
  
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth
      setCols(w < 640 ? 1 : w < 1024 ? 2 : 4)
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
      <Metric color="#10b981" bg="#e6f4ea" icon={CheckCircle2} value={completed} label="Completed" />
      <Metric color="#f59e0b" bg="#fef7e0" icon={Clock} value={pending} label="Pending" />
      <Metric color="#3b82f6" bg="#e8f0fe" icon={Play} value={inProgress} label="In Progress" />
      <Metric color="#8b5cf6" bg="#f3e8ff" icon={BarChart2} value={total} label="Total Tasks" />
    </div>
  )
}
