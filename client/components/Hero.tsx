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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      {/* GOLDEN RATIO GRID: [1fr_1.618fr] */}
      <div className={`grid lg:grid-cols-[1fr_1.618fr] gap-12 items-center ${
        isRTL ? 'lg:grid-cols-[1.618fr_1fr] lg:grid-flow-dense' : ''
      }`}>
        
        {/* Left Column - Text Content */}
        {/* GESTALT CHANGE: Removed generic 'space-y-8' to allow custom grouping */}
        <div className={`flex flex-col ${isRTL ? 'lg:col-start-2' : ''}`}>
          
          {/* GROUP 1: READING CONTENT
             Gestalt Principle: Proximity.
             The Headline and Description are closely related, so we group them 
             with tighter spacing (space-y-6 / 24px).
          */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-[2.91rem] font-bold text-base-white leading-tight">
              {t('hero.headline')}
            </h1>
            <p className="text-lg md:text-xl text-accent leading-relaxed">
              {t('hero.description')}
            </p>
          </div>

          {/* GROUP 2: ACTION
             Gestalt Principle: Isolation.
             We add larger spacing (mt-10 / 40px) before the button.
             This visual break tells the brain: "Reading is done, now make a decision."
          */}
          <div className="mt-10">
            <a 
              href="#courses"
              onClick={scrollToCourses}
              className="btn-primary inline-block"
            >
              {t('hero.ctaButton')}
            </a>
          </div>
          
        </div>

        {/* Right Column - Image Slider */}
        <div className={`relative ${isRTL ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
          <HeroSlider
            images={[
              '/1.png',
              '/2.png',
              '/3.png',
            ]}
            interval={4000} // Change image every 4 seconds
          />
        </div>
      </div>
    </section>
  )
}