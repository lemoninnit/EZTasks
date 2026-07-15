import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import SiteLayout from '../layouts/SiteLayout'
import Button from '../components/Button'
import Card from '../components/Card'
import TextTicker from '../components/TextTicker'
import { ArrowRight, Sparkles, Calendar, Zap, BarChart2 } from 'lucide-react'
import './Landing.css'

const principles = [
  { number: '01', title: 'Speed is Everything', description: 'Tasks move fast. Your tools should move faster. Zero lag, infinite scale.' },
  { number: '02', title: 'Clarity Over Complexity', description: 'Sophisticated doesn’t mean complicated. Power wrapped in simplicity.' },
  { number: '03', title: 'Built for Focus', description: 'Every pixel serves a purpose. Every interaction feels inevitable.' },
  { number: '04', title: 'Team-First Design', description: 'Collaborative by default. Individual when needed. Always in sync.' },
]


export default function Landing() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400, 800], [1, 0.5, 0])

  const principlesContainerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: principlesContainerRef,
    offset: ["start start", "end end"]
  })

  // Smooth scroll progress — slower / more fluid spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 55,
    mass: 0.6
  })

  // Card 0 — entrance: slides up + fades in via whileInView; then scales/blurs as others stack
  const scale0 = useTransform(smoothProgress, [0.10, 0.28, 0.40, 0.52, 0.65, 0.78], [1.0, 0.97, 0.97, 0.93, 0.93, 0.89])
  const blur0  = useTransform(smoothProgress, [0.10, 0.28, 0.40, 0.52, 0.65, 0.78], ['blur(0px)', 'blur(0.8px)', 'blur(0.8px)', 'blur(1.8px)', 'blur(1.8px)', 'blur(2.5px)'])

  // Card 1 — starts 120vh below viewport, slides up slowly, then scales down
  const y1     = useTransform(smoothProgress, [0, 0.12, 0.28], ['120vh', '120vh', '0px'])
  const scale1 = useTransform(smoothProgress, [0.40, 0.52, 0.65, 0.78], [1.0, 0.97, 0.97, 0.93])
  const blur1  = useTransform(smoothProgress, [0.40, 0.52, 0.65, 0.78], ['blur(0px)', 'blur(0.8px)', 'blur(0.8px)', 'blur(1.8px)'])

  // Card 2 — holds until card 1 fully settles, then slides up
  const y2     = useTransform(smoothProgress, [0, 0.35, 0.50], ['120vh', '120vh', '0px'])
  const scale2 = useTransform(smoothProgress, [0.65, 0.78], [1.0, 0.97])
  const blur2  = useTransform(smoothProgress, [0.65, 0.78], ['blur(0px)', 'blur(0.8px)'])

  // Card 3 — slides in last, finishes at 0.78 so from 0.78 to 1.0 it just pauses.
  const y3     = useTransform(smoothProgress, [0, 0.60, 0.78], ['120vh', '120vh', '0px'])


  const s = {
    heroSection: {
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 24px 0px',
      background: 'linear-gradient(180deg, #05050f 0%, #0a0a1a 100%)',
      color: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heroGlow: {
      position: 'absolute',
      width: '800px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      filter: 'blur(80px)',
      pointerEvents: 'none',
      zIndex: 0,
    },
    heroWrap: {
      position: 'relative',
      maxWidth: 900,
      margin: '0 auto',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 14px',
      borderRadius: 999,
      background: 'rgba(6, 182, 212, 0.1)',
      color: '#22d3ee',
      fontWeight: 600,
      fontSize: 12,
      marginBottom: 32,
      border: '1px solid rgba(6, 182, 212, 0.2)',
    },
    heroTitle: {
      fontSize: 'clamp(3.5rem, 8vw, 7rem)',
      lineHeight: 1,
      margin: '0 0 24px',
      fontWeight: 800,
      color: '#ffffff',
      letterSpacing: '-0.04em',
    },
    heroAccent: {
      display: 'block',
      background: 'linear-gradient(90deg, #22d3ee 0%, #c084fc 100%)',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    },
    heroText: {
      maxWidth: 640,
      margin: '0 auto 40px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 'clamp(1rem, 2vw, 1.125rem)',
      lineHeight: 1.6,
    },
    heroActions: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 80,
    },
    visualCard: {
      width: '100%',
      maxWidth: 720,
      borderRadius: 12,
      padding: '20px 24px',
      background: 'rgba(10, 15, 30, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 40px 120px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      backdropFilter: 'blur(20px)',
      overflow: 'hidden',
    },
    visualTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32,
    },
    section: {
      padding: '100px 24px',
      background: '#05050f',
    },
    sectionHeading: {
      textAlign: 'center',
      maxWidth: 820,
      margin: '0 auto 16px',
      fontSize: 'clamp(2.25rem, 3vw, 3.5rem)',
      lineHeight: 1.05,
      fontWeight: 800,
      color: '#ffffff',
    },
    sectionSub: {
      textAlign: 'center',
      maxWidth: 760,
      margin: '0 auto 64px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 18,
      lineHeight: 1.8,
    },
    bentoContainer: {
      maxWidth: 1000,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
    },
    bentoLarge: {
      gridColumn: '1 / -1',
      padding: '48px',
      borderRadius: 24,
      background: 'rgba(10, 15, 30, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative',
      overflow: 'hidden',
    },
    bentoSmall: {
      padding: '40px',
      borderRadius: 24,
      background: 'rgba(10, 15, 30, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative',
      overflow: 'hidden',
    },
    bentoIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      color: '#22d3ee',
    },
    bentoTitle: {
      margin: '0 0 12px',
      fontSize: 28,
      fontWeight: 800,
      color: '#ffffff',
    },
    bentoDesc: {
      margin: '0 0 32px',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 1.6,
      fontSize: 16,
    },
    mockupContainer: {
      background: 'rgba(5, 5, 15, 0.5)',
      borderRadius: 16,
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
    mockupBar: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.03)',
      borderRadius: 12,
    },
    mockupBox: {
      width: 16,
      height: 16,
      borderRadius: 4,
      border: '1px solid rgba(255,255,255,0.1)',
    },
    mockupLine: {
      height: 6,
      background: 'rgba(255,255,255,0.1)',
      borderRadius: 999,
      flex: 1,
    },
    principleNumber: {
      fontSize: 'clamp(3rem, 5vw, 4rem)',
      fontWeight: 800,
      color: 'rgba(6, 182, 212, 0.25)',
      lineHeight: 0.9,
    },
    principleTitle: {
      margin: '0 0 12px',
      fontSize: 24,
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: '-0.02em',
    },
    principleDesc: {
      margin: 0,
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: 1.6,
      fontSize: 16,
    },

    ctaSection: {
      padding: '120px 24px',
      background: '#05050f',
      textAlign: 'center',
    },
    ctaTitle: {
      fontSize: 'clamp(3rem, 5vw, 4.5rem)',
      fontWeight: 800,
      color: '#ffffff',
      marginBottom: 20,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    ctaAccent: {
      background: 'linear-gradient(90deg, #22d3ee 0%, #c084fc 100%)',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    },
    ctaText: {
      maxWidth: 600,
      margin: '0 auto 40px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 18,
      lineHeight: 1.6,
    },
    ctaHint: {
      marginTop: 20,
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: 13,
    },
    principlesSection: {
      position: 'relative',
      height: '200vh',
      background: '#030308',
      width: '100%',
    },
    stickyContainer: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '0 24px',
      boxSizing: 'border-box',
    },
    headerWrap: {
      textAlign: 'center',
      marginBottom: '60px',
    },
    cardDeck: {
      position: 'relative',
      width: '100%',
      maxWidth: '850px',
      height: '420px',
      margin: '0 auto',
    },
    deckCard: {
      position: 'absolute',
      left: 0,
      width: '100%',
      background: '#09091a',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '32px 40px',
      boxShadow: '0 -15px 30px rgba(0, 0, 0, 0.5), 0 20px 40px rgba(0, 0, 0, 0.3)',
      boxSizing: 'border-box',
      display: 'flex',
      gap: '32px',
      alignItems: 'flex-start',
      transformOrigin: 'top center',
    }
  }

  return (
    <SiteLayout>
      <section style={s.heroSection} className="lp-hero-section">
        <div style={s.heroGlow} />
        <motion.div style={{ ...s.heroWrap, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
            <div style={s.badge}>
              <Sparkles size={14} /> Built for Modern Teams
            </div>
            <h1 style={s.heroTitle}>
              Task
              <span style={s.heroAccent}>Management</span>
              Reimagined
            </h1>
            <p style={s.heroText}>
              The only task tracker that moves as fast as your team thinks. Precision-engineered for deadlines that matter.
            </p>
            <div style={s.heroActions} className="lp-hero-actions">
              <a href="/signup" style={{ textDecoration: 'none' }}>
                <Button style={{ padding: '12px 24px', background: '#06b6d4', color: '#020617', fontWeight: 600, border: 'none', borderRadius: 6, fontSize: 15 }}>
                  Start Free Trial <ArrowRight size={16} style={{ marginLeft: 6 }} />
                </Button>
              </a>
              <a href="#features" style={{ textDecoration: 'none' }}>
                <Button
                  variant="ghost"
                  style={{
                    padding: '12px 24px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: 6,
                    fontSize: 15,
                  }}
                >
                  Watch Demo
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 60 }}
            className="lp-visual-card-wrapper"
          >
            <div style={s.visualCard} className="lp-visual-card">
              <div style={s.visualTop}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.05em' }}>Quick Command</div>
                <div style={{ width: 42 }} /> {/* spacer for center alignment */}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '0 8px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 4, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>⌘</span>
                  <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 4, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>K</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginLeft: 8 }}>to open command menu</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 6, height: 6, background: '#06b6d4', borderRadius: '50%' }} />
                    </div>
                    <span style={{ color: '#e2e8f0', fontSize: 14 }}>Create new task...</span>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>↵</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <TextTicker />

      <section id="features" style={s.section} className="lp-features-section">
        <div>
          <h2 style={s.sectionHeading}>
            Built for <span style={s.heroAccent}>Precision</span>
          </h2>
          <p style={s.sectionSub}>Every feature engineered to eliminate friction and amplify productivity.</p>
        </div>
        <div style={s.bentoContainer} className="lp-bento-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={s.bentoLarge} className="lp-bento-large">
            <div style={s.bentoIcon}><Calendar size={24} /></div>
            <h3 style={s.bentoTitle}>Dynamic Timeline</h3>
            <p style={s.bentoDesc}>Visualize every task in motion. Real-time progression tracking with precision.</p>
            <div style={s.mockupContainer}>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }} style={{ ...s.bentoSmall, background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, rgba(10, 15, 30, 0.6) 100%)' }} className="lp-bento-small">
            <div style={{ ...s.bentoIcon, color: '#a855f7' }}><Zap size={24} /></div>
            <h3 style={s.bentoTitle}>Smart Deadlines</h3>
            <p style={s.bentoDesc}>Never miss a beat. AI-powered deadline reminders that adapt to your workflow.</p>
            <div style={s.mockupContainer}>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} style={{ ...s.bentoSmall, background: 'linear-gradient(180deg, rgba(20, 184, 166, 0.05) 0%, rgba(10, 15, 30, 0.6) 100%)' }} className="lp-bento-small">
            <div style={{ ...s.bentoIcon, color: '#14b8a6' }}><BarChart2 size={24} /></div>
            <h3 style={s.bentoTitle}>Assignment Analytics</h3>
            <p style={s.bentoDesc}>Deep insights into team performance. Track, measure, optimize.</p>
            <div style={s.mockupContainer}>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
              <div style={s.mockupBar}><div style={s.mockupBox} /><div style={s.mockupLine} /></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="manifesto" ref={principlesContainerRef} style={s.principlesSection} className="lp-principles-section">
        <div style={s.stickyContainer} className="lp-sticky-container">
          <div style={s.headerWrap}>
            <h2 style={{ ...s.sectionHeading, margin: '0 0 12px' }}>Our Principles</h2>
            <p style={{ ...s.sectionSub, margin: 0 }}>The philosophy behind every decision.</p>
          </div>
          
          <div style={s.cardDeck} className="lp-card-deck">
            {/* Card 0 — entrance: slides up + fades in when section enters viewport */}
            <motion.div
              initial={{ y: 70, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...s.deckCard,
                top: '0px',
                scale: scale0,
                filter: blur0,
                zIndex: 0
              }}
              className="lp-deck-card"
            >
              <div style={s.principleNumber}>{principles[0].number}</div>
              <div>
                <h3 style={s.principleTitle}>{principles[0].title}</h3>
                <p style={s.principleDesc}>{principles[0].description}</p>
              </div>
            </motion.div>

            {/* Card 1 */}
            <motion.div
              style={{
                ...s.deckCard,
                top: '35px',
                y: y1,
                scale: scale1,
                filter: blur1,
                zIndex: 1
              }}
              className="lp-deck-card"
            >
              <div style={s.principleNumber}>{principles[1].number}</div>
              <div>
                <h3 style={s.principleTitle}>{principles[1].title}</h3>
                <p style={s.principleDesc}>{principles[1].description}</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              style={{
                ...s.deckCard,
                top: '70px',
                y: y2,
                scale: scale2,
                filter: blur2,
                zIndex: 2
              }}
              className="lp-deck-card"
            >
              <div style={s.principleNumber}>{principles[2].number}</div>
              <div>
                <h3 style={s.principleTitle}>{principles[2].title}</h3>
                <p style={s.principleDesc}>{principles[2].description}</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              style={{
                ...s.deckCard,
                top: '105px',
                y: y3,
                zIndex: 3
              }}
              className="lp-deck-card"
            >
              <div style={s.principleNumber}>{principles[3].number}</div>
              <div>
                <h3 style={s.principleTitle}>{principles[3].title}</h3>
                <p style={s.principleDesc}>{principles[3].description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={s.ctaSection} className="lp-cta-section">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <h2 style={s.ctaTitle}>
            Ready to <span style={s.ctaAccent}>Transform</span><br />
            Your Workflow?
          </h2>
          <p style={s.ctaText}>Join thousands of teams already moving faster with EZTasks.</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <a href="/signup" style={{ textDecoration: 'none' }}>
              <Button style={{ padding: '14px 32px', fontSize: 16, background: '#06b6d4', color: '#020617', border: 'none', borderRadius: 8, fontWeight: 600 }}>
                Start Your Free Trial
              </Button>
            </a>
            <div style={s.ctaHint}>No credit card required • 14-day free trial</div>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  )
}