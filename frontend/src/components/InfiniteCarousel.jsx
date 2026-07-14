import React, { useRef, useEffect, useCallback } from 'react'
import {
  CheckCircle, Zap, Users, BarChart2, Shield, Smartphone,
  Bell, Calendar, Star, Clock, Target, Layers
} from 'lucide-react'

const carouselItems = [
  { id: 1,  icon: CheckCircle, label: 'CORE',        title: 'Smart Task Tracking',      subtitle: 'Never lose context',       description: 'Organize, prioritize, and track every task with precision-engineered workflows built for speed.' },
  { id: 2,  icon: Zap,         label: 'SPEED',       title: 'Instant Actions',           subtitle: 'Zero friction',            description: 'Execute commands instantly with the ⌘K palette. Create, assign, and close tasks in seconds.' },
  { id: 3,  icon: Users,       label: 'TEAM',        title: 'Real-Time Collaboration',   subtitle: 'Always in sync',           description: 'See live updates across your team. No refresh needed. No conflicts. Just seamless teamwork.' },
  { id: 4,  icon: BarChart2,   label: 'INSIGHTS',    title: 'Assignment Analytics',      subtitle: 'Data you can act on',      description: 'Deep-dive into team performance with visual dashboards that reveal what actually matters.' },
  { id: 5,  icon: Bell,        label: 'REMINDERS',   title: 'Deadline Reminders',        subtitle: 'Never miss a beat',        description: 'Smart alerts notify you before deadlines hit — not after. Stay ahead, always.' },
  { id: 6,  icon: Calendar,    label: 'TIMELINE',    title: 'Dynamic Calendar',          subtitle: 'Visual clarity',           description: 'Your entire project timeline laid out visually. Spot conflicts before they become problems.' },
  { id: 7,  icon: Shield,      label: 'SECURITY',    title: 'Enterprise-Grade Security', subtitle: 'Trust by design',          description: 'JWT-secured sessions, encrypted data in transit and at rest. Your tasks stay private.' },
  { id: 8,  icon: Smartphone,  label: 'MOBILE',      title: 'Works Everywhere',          subtitle: 'Any device, any time',     description: 'Fully responsive across all screen sizes. Your workflow follows you, not the other way around.' },
  { id: 9,  icon: Target,      label: 'FOCUS',       title: 'Priority Matrix',           subtitle: 'Do what matters',          description: 'Automatically surface high-impact tasks. Cut through noise and focus on work that ships.' },
  { id: 10, icon: Clock,       label: 'HISTORY',     title: 'Activity Timeline',         subtitle: 'Full audit trail',         description: 'Every action logged. See who changed what and when. Complete transparency, zero surprises.' },
  { id: 11, icon: Layers,      label: 'CATEGORIES',  title: 'Smart Categories',          subtitle: 'Organized by default',     description: 'Tag and categorize tasks automatically. Filter and find anything in under a second.' },
  { id: 12, icon: Star,        label: 'QUALITY',     title: '99.9% Uptime',              subtitle: 'Always available',         description: 'Production-grade infrastructure so your team never waits for the tool to catch up.' },
]

// Accent colors cycling per card
const accents = [
  '#22d3ee', '#c084fc', '#34d399', '#f59e0b',
  '#f472b6', '#818cf8', '#22d3ee', '#c084fc',
  '#34d399', '#f59e0b', '#f472b6', '#818cf8',
]

export default function InfiniteCarousel() {
  const scrollRef   = useRef(null)
  const rafRef      = useRef(null)
  const hoverRef    = useRef(false)
  const dragRef     = useRef(false)
  const dragStartX  = useRef(0)
  const dragScrollL = useRef(0)
  const lastActRef  = useRef(0)
  const resumeTimer = useRef(null)

  const tripled = [...carouselItems, ...carouselItems, ...carouselItems]

  // ── Initialize scroll position to middle copy ──────────────────
  const init = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = el.scrollWidth / 3
  }, [])

  useEffect(() => {
    init()
    const t1 = setTimeout(init, 100)
    const t2 = setTimeout(init, 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [init])

  // ── Infinite loop: jump when near edges ───────────────────────
  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const W = el.scrollWidth / 3
    if (el.scrollLeft >= W * 2) el.scrollLeft -= W
    else if (el.scrollLeft < W) el.scrollLeft += W
  }, [])

  // ── Auto-scroll rAF loop ───────────────────────────────────────
  const tick = useCallback(() => {
    const el = scrollRef.current
    const idle = Date.now() - lastActRef.current > 1500
    if (el && !hoverRef.current && !dragRef.current && idle) {
      el.scrollLeft += 0.8
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  // ── Hover ──────────────────────────────────────────────────────
  const onMouseEnter = () => { hoverRef.current = true }
  const onMouseLeave = () => {
    hoverRef.current = false
    dragRef.current  = false
    lastActRef.current = Date.now()
  }

  // ── Mouse drag ─────────────────────────────────────────────────
  const onMouseDown = (e) => {
    const el = scrollRef.current
    if (!el) return
    dragRef.current  = true
    dragStartX.current  = e.pageX - el.offsetLeft
    dragScrollL.current = el.scrollLeft
    lastActRef.current  = Date.now()
    el.style.cursor = 'grabbing'
  }

  const onMouseMove = (e) => {
    if (!dragRef.current) return
    const el = scrollRef.current
    if (!el) return
    lastActRef.current = Date.now()
    const dx = (e.pageX - el.offsetLeft - dragStartX.current) * 1.5
    el.scrollLeft = dragScrollL.current - dx
  }

  const onMouseUp = () => {
    dragRef.current = false
    const el = scrollRef.current
    if (el) el.style.cursor = 'grab'
    lastActRef.current = Date.now()
  }

  // ── Touch ──────────────────────────────────────────────────────
  const onTouchStart = () => { lastActRef.current = Date.now() }
  const onTouchMove  = () => { lastActRef.current = Date.now() }
  const onTouchEnd   = () => { lastActRef.current = Date.now() }

  // ── Styles ─────────────────────────────────────────────────────
  const s = {
    section: {
      position: 'relative',
      background: '#05050f',
      borderTop:    '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      padding: '64px 0',
      overflow: 'hidden',
    },
    header: {
      textAlign: 'center',
      marginBottom: 40,
      padding: '0 24px',
    },
    overline: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: '#22d3ee',
      marginBottom: 10,
    },
    title: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 800,
      color: '#ffffff',
      letterSpacing: '-0.02em',
      margin: 0,
    },
    outer: {
      position: 'relative',
      overflow: 'hidden',
    },
    fadeLeft: {
      position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
      background: 'linear-gradient(to right, #05050f, transparent)',
      zIndex: 2, pointerEvents: 'none',
    },
    fadeRight: {
      position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
      background: 'linear-gradient(to left, #05050f, transparent)',
      zIndex: 2, pointerEvents: 'none',
    },
    track: {
      display: 'flex',
      gap: 20,
      overflowX: 'auto',
      padding: '12px 60px 20px',
      cursor: 'grab',
      userSelect: 'none',
      scrollbarWidth: 'none',          // Firefox
      msOverflowStyle: 'none',         // IE/Edge
      WebkitOverflowScrolling: 'touch',
    },
  }

  return (
    <section style={s.section}>
      {/* Header */}
      <div style={s.header}>
        <p style={s.overline}>What's inside</p>
        <h2 style={s.title}>Everything your team needs to ship faster</h2>
      </div>

      {/* Carousel */}
      <div style={s.outer}>
        <div style={s.fadeLeft} />
        <div style={s.fadeRight} />

        <div
          ref={scrollRef}
          style={s.track}
          onScroll={handleScroll}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Hide scrollbar in WebKit */}
          <style>{`.eztasks-track::-webkit-scrollbar { display: none; }`}</style>

          {tripled.map((item, i) => (
            <CarouselCard key={`${item.id}-${i}`} item={item} accent={accents[item.id - 1]} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CarouselCard({ item, accent }) {
  const [hovered, setHovered] = React.useState(false)
  const Icon = item.icon

  const card = {
    flexShrink: 0,
    width: 280,
    padding: '28px 24px',
    borderRadius: 20,
    background: hovered
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(255,255,255,0.025)',
    border: `1px solid ${hovered ? `${accent}33` : 'rgba(255,255,255,0.06)'}`,
    boxShadow: hovered ? `0 8px 40px ${accent}22` : 'none',
    transition: 'all 0.4s ease',
    cursor: 'grab',
  }

  const iconBadge = {
    width: 44, height: 44, borderRadius: '50%',
    background: `${accent}18`,
    border: `1px solid ${accent}44`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: accent,
    transform: hovered ? 'scale(1.15)' : 'scale(1)',
    transition: 'transform 0.3s ease',
    marginBottom: 16,
  }

  const pill = {
    display: 'inline-flex', alignItems: 'center',
    padding: '3px 9px', borderRadius: 999,
    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
    color: accent,
    border: `1px solid ${accent}44`,
    background: `${accent}0f`,
    marginBottom: 14,
  }

  const title = {
    fontSize: 17, fontWeight: 800,
    color: hovered ? accent : '#ffffff',
    margin: '0 0 6px',
    letterSpacing: '-0.01em',
    transition: 'color 0.3s ease',
  }

  const subtitle = {
    fontSize: 12, fontWeight: 500,
    color: 'rgba(255,255,255,0.4)',
    margin: '0 0 14px',
    letterSpacing: '0.02em',
  }

  const desc = {
    fontSize: 13, lineHeight: 1.65,
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  }

  return (
    <div
      style={card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={iconBadge}>
        <Icon size={20} />
      </div>
      <div style={pill}>{item.label}</div>
      <h3 style={title}>{item.title}</h3>
      <p style={subtitle}>{item.subtitle}</p>
      <p style={desc}>{item.description}</p>
    </div>
  )
}
