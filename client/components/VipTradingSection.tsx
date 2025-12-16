'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface VipTradingSectionProps {
  joinedVip: boolean
}

// (Trade interface and activeTrades data placeholder - same as before)
interface Trade {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  status: 'OPEN' | 'CLOSED'
  timestamp: string
}

const activeTrades: Trade[] = [
    { id: '1', symbol: 'EUR/USD', type: 'BUY', entryPrice: 1.0850, currentPrice: 1.0920, pnl: 70, pnlPercent: 0.65, status: 'OPEN', timestamp: '2024-01-15 10:30' },
    { id: '2', symbol: 'GBP/USD', type: 'SELL', entryPrice: 1.2650, currentPrice: 1.2580, pnl: 70, pnlPercent: 0.55, status: 'OPEN', timestamp: '2024-01-15 11:15' },
    { id: '3', symbol: 'USD/JPY', type: 'BUY', entryPrice: 149.50, currentPrice: 150.20, pnl: 70, pnlPercent: 0.47, status: 'OPEN', timestamp: '2024-01-15 14:20' },
]

export default function VipTradingSection({ joinedVip }: VipTradingSectionProps) {
  const { t, isRTL } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  // Track scroll progress for the Scrollytelling section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // --- ANIMATION MAPPING ---
  
  // Opacity for Text Blocks based on scroll position
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.9], [0, 1, 1, 0])
  const opacity4 = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1])

  // Scale/Focus for Diamonds (Highlight the active one)
  // Main Diamond Focus (Step 1 & 4)
  const scaleMain = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1.1, 1, 1, 1.1])
  const glowMain = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.5, 0.5, 1])

  // Left Diamond Focus (Step 2)
  const scaleLeft = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [1, 1.15, 1])
  const glowLeft = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0.5, 1, 0.5])

  // Right Diamond Focus (Step 3)
  const scaleRight = useTransform(scrollYProgress, [0.5, 0.65, 0.8], [1, 1.15, 1])
  const glowRight = useTransform(scrollYProgress, [0.5, 0.65, 0.8], [0.5, 1, 0.5])


  // =========================================
  // VIP LOGGED IN VIEW (Table) - Unchanged
  // =========================================
  if (joinedVip) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 bg-accent rotate-45 shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-base-white">
                {t('vip.activeTrades')}
            </h2>
        </div>
        <div className="bg-secondary-surface border border-accent rounded-2xl overflow-hidden shadow-xl">
           {/* ... Table Code ... */}
           {/* (Keeping table code brief for readability, paste your original table code here) */}
           <div className="p-8 text-center text-accent">Active Trades Table...</div>
        </div>
      </section>
    )
  }

  // =========================================
  // NON-VIP SCROLLYTELLING VIEW
  // =========================================
  return (
    <section ref={containerRef} className="relative h-[600vh]"> {/* 300vh creates the scroll track */}
      
      {/* STICKY CONTAINER: Stays fixed while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[80px]"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <div className={`flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-24 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* ========================================================
                LEFT SIDE: THE 3-DIAMOND CLUSTER (Animated)
               ======================================================== */}
            <div className="flex-1 flex flex-col items-center justify-center scale-75 lg:scale-100 transition-transform duration-500">

              {/* 1. TOP BIG DIAMOND (Main) */}
              <motion.div 
                style={{ scale: scaleMain, opacity: glowMain }}
                className="relative w-[20rem] h-[20rem] z-20 mb-[-5rem]"
              >
                 <div className="absolute inset-0 rotate-45 bg-gradient-to-br from-secondary-surface via-primary-dark to-primary-dark border-2 border-accent rounded-[2.5rem] shadow-[0_0_50px_-10px_rgba(var(--accent-rgb),0.4)] flex items-center justify-center">
                    {/* Content (-45deg) */}
                    <div className="-rotate-45 text-center p-8">
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white animate-text-shine mb-2">
                        {t('vip.vipAccess')}
                        </h2>
                        <button className="btn-primary text-sm px-6 py-2 rounded-lg mt-2 shadow-lg">
                           {t('vip.subscribe')}
                        </button>
                    </div>
                 </div>
              </motion.div>


              {/* 2. BOTTOM ROW (Small Diamonds) */}
              <div className="flex gap-16 z-10">

                {/* Left Diamond (Signals) */}
                <motion.div 
                    style={{ scale: scaleLeft, opacity: glowLeft }}
                    className="relative w-56 h-56"
                >
                    <div className="absolute inset-0 rotate-45 bg-secondary-surface/90 border border-accent/30 rounded-[2rem] shadow-lg backdrop-blur-md flex items-center justify-center">
                        <div className="-rotate-45 text-center p-4">
                            <div className="w-10 h-10 mb-2 mx-auto bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-base-white">{t('vip.liveSignals')}</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Right Diamond (Analysis) */}
                <motion.div 
                    style={{ scale: scaleRight, opacity: glowRight }}
                    className="relative w-56 h-56"
                >
                    <div className="absolute inset-0 rotate-45 bg-secondary-surface/90 border border-accent/30 rounded-[2rem] shadow-lg backdrop-blur-md flex items-center justify-center">
                        <div className="-rotate-45 text-center p-4">
                            <div className="w-10 h-10 mb-2 mx-auto bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-8a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-base-white">{t('vip.expertAnalysis')}</h3>
                        </div>
                    </div>
                </motion.div>

              </div>
            </div>

            {/* ========================================================
                RIGHT SIDE: CHANGING TEXT (Scrollytelling)
               ======================================================== */}
            <div className="flex-1 h-[300px] relative flex items-center justify-center lg:justify-start">
              
              {/* SLIDE 1: INTRO (0% - 25%) */}
              <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex flex-col justify-center space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-accent rotate-45"></div>
                    <span className="text-accent uppercase tracking-widest text-sm font-bold">{t('vip.step1')}</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-base-white leading-tight">
                    {t('vip.title')}
                 </h2>
                 <p className="text-xl text-accent/80 leading-relaxed">
                    {t('vip.unlockDescription')}
                 </p>
              </motion.div>

              {/* SLIDE 2: SIGNALS (25% - 50%) */}
              <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex flex-col justify-center space-y-6 pointer-events-none">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-500 rotate-45"></div>
                    <span className="text-green-500 uppercase tracking-widest text-sm font-bold">{t('vip.step2')}</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-base-white leading-tight">
                    {t('vip.realTimePrecision')}
                 </h2>
                 <p className="text-xl text-accent/80 leading-relaxed">
                    {t('vip.realTimePrecisionDescription')}
                 </p>
              </motion.div>

              {/* SLIDE 3: ANALYSIS (50% - 75%) */}
              <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex flex-col justify-center space-y-6 pointer-events-none">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rotate-45"></div>
                    <span className="text-blue-500 uppercase tracking-widest text-sm font-bold">{t('vip.step3')}</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-base-white leading-tight">
                    {t('vip.expertIntelligence')}
                 </h2>
                 <p className="text-xl text-accent/80 leading-relaxed">
                    {t('vip.expertIntelligenceDescription')}
                 </p>
              </motion.div>

              {/* SLIDE 4: FINAL CTA (75% - 100%) */}
              <motion.div style={{ opacity: opacity4 }} className="absolute inset-0 flex flex-col justify-center space-y-6 pointer-events-none">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-accent rotate-45"></div>
                    <span className="text-accent uppercase tracking-widest text-sm font-bold">{t('vip.ready')}</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-base-white leading-tight">
                    {t('vip.startJourney')}
                 </h2>
                 <p className="text-xl text-accent/80 leading-relaxed">
                    {t('vip.startJourneyDescription')}
                 </p>
                 <div className="pointer-events-auto pt-4">
                    <button className="btn-primary text-lg font-bold px-10 py-4 shadow-xl hover:scale-105 transition-transform rounded-xl">
                        {t('vip.subscribe')}
                    </button>
                 </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}