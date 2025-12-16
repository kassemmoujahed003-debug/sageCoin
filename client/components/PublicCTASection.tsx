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
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PREMIUM CONTAINER
          - Soft, large border radius for a smooth feel.
          - Deep gradient background with subtle inner glow.
          - Luxurious shadow for depth.
          - A fine, polished border.
        */}
        <div className="relative rounded-[3rem] p-[2px] bg-gradient-to-br from-accent/30 via-primary-dark to-accent/10 shadow-[0_20px_100px_-20px_rgba(var(--accent-rgb),0.3)] overflow-hidden">
          
          {/* Glassmorphism Inner Card */}
          <div className="relative h-full w-full bg-primary-dark/90 backdrop-blur-xl rounded-[calc(3rem-2px)] p-12 lg:p-24 text-center overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            <div className="relative z-10 flex flex-col items-center">
              
              {/* Header Area */}
              <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Polished "Badge" */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 backdrop-blur-md shadow-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                  <span className="text-accent text-sm font-semibold tracking-wide uppercase">Premier Access</span>
                </div>

                {/* Typography: Smooth, Bold, Elegant */}
                <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-extrabold leading-tight text-base-white tracking-tight drop-shadow-lg">
                  {t('cta.title')}
                </h2>
                
                <p className="text-xl text-accent/90 leading-relaxed font-medium max-w-2xl mx-auto">
                  {t('cta.description')}
                </p>
              </div>
              
              {/* Action Area */}
              <div className="mt-14 w-full flex flex-col sm:flex-row gap-6 justify-center items-center">
                
                {/* Primary Button: Luxurious Gradient & Shine */}
                <button
                  onClick={handleOpenLiveAccount}
                  className="group relative overflow-hidden rounded-2xl text-xl font-bold px-12 py-6 w-full sm:w-auto min-w-[240px] tracking-wide shadow-[0_10px_40px_-10px_rgba(var(--accent-rgb),0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_-10px_rgba(var(--accent-rgb),0.7)]"
                  aria-label="Open a live trading account"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent"></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-all duration-1000 ease-in-out"></div>

                  <span className="relative z-10 text-white">{t('cta.openAccount')}</span>
                </button>

                {/* Secondary Button: Premium Frosted Glass */}
                <button
                  onClick={handleJoinUs}
                  className="group relative rounded-2xl px-12 py-6 w-full sm:w-auto min-w-[240px] border border-accent/30 bg-accent/5 backdrop-blur-md text-accent text-xl font-semibold overflow-hidden transition-all duration-300 hover:bg-accent/10 hover:border-accent/50"
                >
                   <span className="relative z-10">{t('cta.joinUs')}</span>
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}