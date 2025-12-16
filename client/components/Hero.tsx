'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import HeroSlider from './HeroSlider'

export default function Hero() {
  const { t, isRTL } = useLanguage()

  const scrollToCourses = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const coursesSection = document.getElementById('courses')
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-visible">
      
      {/* Background Ambience (Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className={`grid lg:grid-cols-2 gap-16 lg:gap-8 items-center ${
        isRTL ? 'lg:grid-flow-dense' : ''
      }`}>
        
        {/* ============================================
            LEFT COLUMN: TEXT CONTENT
           ============================================ */}
        <div className={`relative z-20 flex flex-col ${isRTL ? 'lg:col-start-2' : ''}`}>
          
          <div className="space-y-8">
            {/* Headline with Diamond Bullet */}
            <div className="relative">
               {/* Decorative floating diamond behind text */}
               <div className={`absolute -top-6 ${isRTL ? '-right-6' : '-left-6'} w-12 h-12 border border-accent/20 rotate-45 rounded-lg animate-pulse-subtle`}></div>
               
               <h1 className="relative text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-base-white leading-tight">
                 {t('hero.headline')}
               </h1>
            </div>

            <p className="text-lg md:text-xl text-accent/90 leading-relaxed max-w-lg">
              {t('hero.description')}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#courses"
                onClick={scrollToCourses}
                className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)] transition-all"
              >
                {t('hero.ctaButton')}
              </a>
            </div>
          </div>
        </div>

        {/* ============================================
            RIGHT COLUMN: THE 3-DIAMOND CLUSTER
            (Slider + 2 Satellites)
           ============================================ */}
        <div className={`relative flex items-center justify-center py-10 ${isRTL ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
           
           {/* THE CLUSTER CONTAINER */}
           <div className="relative w-[20rem] h-[20rem] sm:w-[24rem] sm:h-[24rem] lg:w-[28rem] lg:h-[28rem]">

              {/* --- DIAMOND 1: THE SLIDER (The Main Jewel) --- */}
              {/* 1. Rotate 45deg to make the diamond shape.
                  2. Overflow hidden to crop the images.
                  3. Border and Shadow for the "SageCoin" look.
              */}
              <div className="absolute inset-0 rotate-45 rounded-[2.5rem] overflow-hidden border-2 border-accent/50 shadow-[0_0_60px_-10px_rgba(var(--accent-rgb),0.3)] z-10 bg-primary-dark">
                  
                  {/* COUNTER-ROTATION WRAPPER
                      We rotate this -45deg so the slider inside is straight.
                      We scale it up (scale-[1.45]) because a square rotated inside a diamond 
                      needs to be larger to fill the corners ($\sqrt{2} \approx 1.414$).
                  */}
                  <div className="-rotate-45 scale-[1.45] w-full h-full">
                      <HeroSlider
                        images={[
                          '/1.png',
                          '/2.png',
                          '/3.png',
                        ]}
                        interval={4000}
                      />
                  </div>
                  
                  {/* Inner Border Ring for depth */}
                  <div className="absolute inset-0 border-[4px] border-primary-dark/20 rounded-[2.5rem] pointer-events-none z-20"></div>
              </div>


              {/* --- DIAMOND 2: TOP SATELLITE (Decorative/Glow) --- */}
              {/* Positioned top-right (negative margins) */}
              <div className="absolute -top-8 -right-8 w-24 h-24 lg:w-32 lg:h-32 rotate-45 z-0 animate-pulse-subtle">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-surface to-primary-dark border border-accent/30 rounded-2xl shadow-xl"></div>
              </div>


              {/* --- DIAMOND 3: BOTTOM SATELLITE (Stat/Market Status) --- */}
              {/* Positioned bottom-left to balance the composition */}
              <div className="absolute -bottom-6 -left-6 lg:-left-10 w-32 h-32 lg:w-40 lg:h-40 rotate-45 z-20">
                  <div className="absolute inset-0 bg-secondary-surface/95 border border-accent rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center">
                      
                      {/* Counter-rotate content so text is straight */}
                      <div className="-rotate-45 text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                              <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                              </span>
                              <span className="text-xs font-bold text-accent tracking-widest uppercase">Live</span>
                          </div>
                          <p className="text-base-white font-bold text-sm lg:text-base">
                              Market Open
                          </p>
                          <p className="text-green-400 text-xs font-mono mt-1">
                              +1.24% ▲
                          </p>
                      </div>

                  </div>
              </div>

           </div>
        </div>

      </div>
    </section>
  )
}