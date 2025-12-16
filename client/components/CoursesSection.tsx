'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface CoursesSectionProps {
  subscribedToCourses: boolean
}

export default function CoursesSection({ subscribedToCourses }: CoursesSectionProps) {
  const { t, isRTL } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  // Track scroll progress for the Book Animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  })

  // === ANIMATION MAPPING ===
  // 1. Book Cover Rotation
  const coverRotate = useTransform(scrollYProgress, [0.2, 0.8], [0, -160])
  
  // 2. Inner Glow Intensity
  const innerGlow = useTransform(scrollYProgress, [0.2, 0.8], [0, 1])

  // 3. The "Riches" Content (Floating up)
  const richesY = useTransform(scrollYProgress, [0.5, 1], [50, -120])
  const richesOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])

  // --- NEW FIX ---
  // 4. Inside Text Opacity. Ensure it's hidden (0) when closed, and fades in only after opening starts.
  const insideTextOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1])


  // =========================================
  // VIEW 1: SUBSCRIBED (Unchanged)
  // =========================================
  if (subscribedToCourses) {
    return (
       <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-10"><h2 className="text-3xl font-bold text-base-white">{t('courses.title')}</h2></div>
          <div className="relative group w-full max-w-5xl mx-auto border border-white/10 bg-primary-dark p-1">
             <div className="aspect-video bg-black/40 flex items-center justify-center text-accent">
                {t('courses.patreonPlaceholder')}
             </div>
          </div>
       </section>
    )
  }

  // =========================================
  // VIEW 2: LOCKED (The GIANT Book Animation)
  // =========================================
  return (
    <section ref={containerRef} id="courses" className="relative h-[250vh]">
      
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
           
           {/* LEFT COLUMN: The Text */}
           <div className={`space-y-10 ${isRTL ? 'lg:order-2' : ''}`}>
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary-dark border border-accent/20 text-accent text-xs font-semibold uppercase tracking-[0.15em] rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      <span>The Path to Mastery</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                      {t('courses.unlockTitle')}
                  </h3>
                  <p className="text-lg text-accent/80 leading-relaxed font-light border-l-2 border-accent/20 pl-6">
                      {t('courses.unlockDescription')}
                  </p>
              </div>
              
              <button className="btn-primary text-lg px-12 py-5 shadow-[0_0_40px_-10px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_60px_-10px_rgba(var(--accent-rgb),0.5)] transition-shadow">
                  {t('courses.subscribeNow')}
              </button>
           </div>

           {/* RIGHT COLUMN: THE 3D BOOK (MASSIVE VERSION) */}
           <div className={`relative flex justify-center perspective-[1500px] ${isRTL ? 'lg:order-1' : ''}`}>
              
              {/* THE BOOK CONTAINER */}
              <div className="relative w-80 h-[28rem] lg:w-[400px] lg:h-[550px] [transform-style:preserve-3d] transition-all duration-500">
                  
                  {/* --- BACK COVER (Static Base) --- */}
                  <div className="absolute inset-0 bg-[#0f172a] rounded-r-2xl border-l-[16px] border-l-[#1e293b] border border-white/10 shadow-2xl flex items-center justify-center">
                      {/* The "Paper" Pages inside */}
                      <div className="absolute inset-3 left-5 bg-[#f8fafc] opacity-10 rounded-r-xl"></div>
                      
                      {/* GOLDEN RICHES (Hidden Inside) */}
                      <motion.div 
                        style={{ y: richesY, opacity: richesOpacity }}
                        className="absolute z-20 flex flex-col items-center justify-center space-y-4"
                      >
                         {/* Glowing Graph Icon */}
                         <div className="relative group">
                            <div className="absolute inset-0 bg-green-500 blur-2xl opacity-40 animate-pulse"></div>
                            <svg className="w-32 h-32 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                         </div>
                         <div className="bg-primary-dark/90 backdrop-blur-xl px-6 py-3 rounded-lg border border-green-500/30 text-green-400 font-mono text-xl font-bold shadow-[0_0_30px_-5px_rgba(74,222,128,0.3)]">
                             +1,240% ROI
                         </div>
                      </motion.div>

                      {/* Inner Glow */}
                      <motion.div style={{ opacity: innerGlow }} className="absolute inset-0 bg-accent/20 blur-2xl z-10 pointer-events-none"></motion.div>
                  </div>

                  {/* --- FRONT COVER (Rotates Open) --- */}
                  <motion.div 
                    style={{ rotateY: coverRotate }}
                    className="absolute inset-0 bg-gradient-to-br from-secondary-surface to-primary-dark rounded-r-2xl border-l-[16px] border-l-accent/20 border border-white/10 shadow-2xl origin-left [transform-style:preserve-3d] z-30 [backface-visibility:hidden]"
                  >
                      {/* --- FRONT FACE (Closed View) --- */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-10 [backface-visibility:hidden]">
                           {/* Decorative Book Corners */}
                           <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-accent/40 rounded-tr-xl"></div>
                           <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-accent/40 rounded-br-xl"></div>

                           {/* The Emblem with LOGO */}
                           <div className="w-36 h-36 rotate-45 border-2 border-accent/40 flex items-center justify-center shadow-[0_0_40px_rgba(var(--accent-rgb),0.3)] bg-primary-dark p-5">
                               <div className="-rotate-45 w-full h-full flex items-center justify-center">
                                   {/* UPDATED: Using the logo image */}
                                   <img 
                                    src="/light.png" 
                                    alt="SageCoin Logo" 
                                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.6)]"
                                   />
                               </div>
                           </div>
                           <h4 className="mt-10 text-3xl font-serif text-white tracking-[0.2em] uppercase font-bold text-center">The Archive</h4>
                           <p className="text-sm text-accent/60 font-mono mt-3 tracking-widest">CONFIDENTIAL</p>
                      </div>

                      {/* --- INSIDE FACE (Opened View) --- */}
                      <div className="absolute inset-0 bg-[#1e293b] rounded-r-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center overflow-hidden">
                           <div className="absolute inset-4 opacity-20 bg-[url('/noise.png')]"></div>
                           
                           {/* UPDATED: Wrapped text in motion.div to handle opacity */}
                           <motion.div style={{ opacity: insideTextOpacity }} className="p-8 text-center relative z-10">
                               <p className="text-white/60 font-serif text-xl leading-loose italic">
                                   "{t('courses.bookQuote')}"
                               </p>
                           </motion.div>
                      </div>
                  </motion.div>

              </div>
              
              {/* Drop Shadow below book */}
              <div className="absolute bottom-[-50px] w-[350px] h-[30px] bg-black/60 blur-2xl rounded-[100%]"></div>

           </div>
        </div>
      </div>
    </section>
  )
}