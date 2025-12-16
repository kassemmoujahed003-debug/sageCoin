'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import HeroSlider from './HeroSlider'
import DiamondBackground3D from './DiamondBackground3D'
import { Canvas } from '@react-three/fiber'
import DiamondIcon from './DiamondIcon'
import MarketStatusBadge from './MarketStatusBadge'

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
      
      {/* 3D Background with Floating Diamond Crystals */}
      <DiamondBackground3D />
      
      {/* Legacy Background Ambience (as fallback) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className={`grid lg:grid-cols-2 gap-16 lg:gap-8 items-center ${
        isRTL ? 'lg:grid-flow-dense' : ''
      }`}>
        
        {/* ============================================
            LEFT COLUMN: TEXT CONTENT
           ============================================ */}
        <div className={`relative z-20 flex flex-col ${isRTL ? 'lg:col-start-2' : ''}`}>
          
          <div className="space-y-8">
            {/* Institutional Grade Badge with Rotating Diamond */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-6 h-6">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="w-full h-full">
                  <ambientLight intensity={0.5} />
                  <pointLight position={[2, 2, 2]} intensity={0.8} />
                  <DiamondIcon size={0.8} />
                </Canvas>
              </div>
              <span className="text-xs font-bold text-accent/80 tracking-[0.2em] uppercase">
                INSTITUTIONAL GRADE
              </span>
            </div>

            {/* Headline with Metallic Shine Animation */}
            <div className="relative">
               <h1 className="relative text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-base-white leading-tight overflow-hidden">
                 <span className="relative inline-block">
                   <span className="metallic-shine">{t('hero.headline')}</span>
                 </span>
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
                  3. Thick, glowing border with polished metal/glass feel.
              */}
              <div className="absolute inset-0 rotate-45 rounded-[2.5rem] overflow-hidden border-[3px] border-accent/70 shadow-[0_0_80px_-15px_rgba(var(--accent-rgb),0.5),inset_0_0_30px_rgba(var(--accent-rgb),0.1)] z-10 bg-primary-dark diamond-main-glow">
                  
                  {/* Outer glow ring */}
                  <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-accent/10 to-transparent blur-xl pointer-events-none"></div>
                  
                  {/* COUNTER-ROTATION WRAPPER
                      We rotate this -45deg so the slider inside is straight.
                      We scale it up (scale-[1.45]) because a square rotated inside a diamond 
                      needs to be larger to fill the corners ($\sqrt{2} \approx 1.414$).
                  */}
                  <div className="-rotate-45 scale-[1.45] w-full h-full relative z-10">
                      <HeroSlider
                        images={[
                          '/1.png',
                          '/2.png',
                          '/3.png',
                        ]}
                        interval={4000}
                      />
                  </div>
                  
                  {/* Inner Border Ring for depth and polish effect */}
                  <div className="absolute inset-[2px] border-[2px] border-accent/30 rounded-[2.3rem] pointer-events-none z-20"></div>
                  
                  {/* Highlight edge for glass effect */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-[2.5rem] pointer-events-none z-20"></div>
              </div>


              {/* --- DIAMOND 2: TOP SATELLITE (Decorative/Glow) --- */}
              {/* Positioned top-right (negative margins) - Enhanced with pulse animation */}
              <div className="absolute -top-8 -right-8 w-24 h-24 lg:w-32 lg:h-32 rotate-45 z-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-surface to-primary-dark border border-accent/30 rounded-2xl shadow-xl animate-pulse-subtle diamond-float">
                      {/* Inner glow effect */}
                      <div className="absolute inset-2 bg-accent/10 rounded-xl animate-pulse"></div>
                  </div>
              </div>


              {/* --- DIAMOND 3: BOTTOM SATELLITE (Stat/Market Status) --- */}
              {/* Positioned bottom-left to balance the composition - Enhanced with glow */}
              <div className="absolute -bottom-6 -left-6 lg:-left-10 w-32 h-32 lg:w-40 lg:h-40 rotate-45 z-20 diamond-float-slow">
                  <div className="absolute inset-0 bg-secondary-surface/95 border-2 border-accent/60 rounded-2xl shadow-[0_10px_40px_-10px_rgba(var(--accent-rgb),0.4)] backdrop-blur-md flex items-center justify-center diamond-glow">
                      {/* Enhanced border glow */}
                      <div className="absolute inset-0 border border-accent/40 rounded-2xl animate-pulse"></div>
                      
                      {/* Counter-rotate content so text is straight */}
                      <div className="-rotate-45 relative z-10">
                          <MarketStatusBadge market="NYSE" showPercentage={true} />
                      </div>

                  </div>
              </div>

           </div>
        </div>

      </div>
    </section>
  )
}