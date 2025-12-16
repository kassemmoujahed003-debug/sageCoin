'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function PublicCTASection() {
  const { t } = useLanguage()

  const handleJoinUs = () => {
    console.log('Join Us clicked')
  }

  const handleOpenLiveAccount = () => {
    console.log('Open Live Account clicked')
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-visible">
      {/* PAZZAZ UPGRADE 1: Container Glow & Depth
         - Replaced border-2 with a thinner border-accent/50 for subtlety.
         - Added a massive colored shadow: shadow-[0_0_60px_-15px_rgba(var(--accent-rgb),0.3)]
           (Replace rgba(...) with your accent hex code if needed, e.g., #3b82f64d).
         - Added group hover lift: 'hover:-translate-y-2' for the whole card.
      */}
      <div className="group relative bg-gradient-to-br from-secondary-surface to-primary-dark border border-accent/50 rounded-[2.5rem] p-12 lg:p-24 text-center overflow-hidden shadow-[0_0_60px_-15px_rgba(var(--accent-rgb),0.3)] transition-all duration-500 hover:shadow-[0_0_80px_-10px_rgba(var(--accent-rgb),0.5)] hover:-translate-y-2">
        
        {/* PAZZAZ UPGRADE 2: Ambient Lighting
           - Increased opacity from 0.03 to 0.2 or 0.3.
           - Added huge blur: 'blur-[100px]' or 'blur-3xl'.
           - This turns shapes into glowing ambient light sources.
        */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/30 rounded-full -mr-[20%] -mt-[20%] blur-[100px] pointer-events-none mix-blend-soft-light"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full -ml-[20%] -mb-[20%] blur-[100px] pointer-events-none mix-blend-soft-light"></div>
        
        {/* Also add a central subtle light source for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="relative z-10 flex flex-col items-center">
          
          <div className="max-w-3xl mx-auto space-y-8">
            {/* PAZZAZ UPGRADE 3: Gradient Typography
               - Added bg-gradient-to-r from-white via-accent/80 to-white.
               - Added bg-clip-text text-transparent.
               - This makes the text look metallic and glowing.
            */}
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold leading-tight bg-gradient-to-br from-white via-white to-accent/60 bg-clip-text text-transparent pb-2">
              {t('cta.title')}
            </h2>
            
            <p className="text-lg md:text-2xl text-accent/90 leading-relaxed font-medium">
              {t('cta.description')}
            </p>
          </div>
          
          <div className="mt-14 w-full flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* PAZZAZ UPGRADE 4: Primary Button Pulse
               - Added custom class 'animate-pulse-subtle' (defined in globals.css).
               - Increased padding and font weight for more presence.
            */}
            <button
              onClick={handleOpenLiveAccount}
              className="btn-primary animate-pulse-subtle relative overflow-hidden text-xl font-bold px-12 py-5 w-full sm:w-auto min-w-[220px] rounded-xl transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="Open a live trading account"
            >
              <span className="relative z-10">{t('cta.openAccount')}</span>
              {/* Optional shiny reflection effect on hover */}
              <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10 pointer-events-none"></div>
            </button>

            <button
              onClick={handleJoinUs}
              // Made secondary button slightly more subtle to let the primary pop
              className="btn-secondary text-xl font-semibold px-12 py-5 w-full sm:w-auto min-w-[220px] rounded-xl border-2 border-accent/50 hover:border-accent hover:bg-accent/10 transition-all duration-300"
            >
              {t('cta.joinUs')}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}