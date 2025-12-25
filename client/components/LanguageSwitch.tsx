'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface LanguageSwitchProps {
  isScrolled?: boolean
}

export default function LanguageSwitch({ isScrolled = false }: LanguageSwitchProps) {
  const { language, setLanguage, isRTL } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const isEN = language === 'en'

  // Dark Blue Background Logic
  const trackStyles = isScrolled
    ? 'bg-slate-900/80 backdrop-blur-md border border-white/10'
    : 'bg-slate-950 border border-white/5 hover:border-white/20'

  return (
    <button
      onClick={toggleLanguage}
      className={`
        group relative inline-flex h-9 w-20 items-center rounded-full 
        ${trackStyles} 
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-cyan-500/50
        cursor-pointer overflow-hidden shadow-inner
      `}
      aria-label="Toggle language"
      role="switch"
      aria-checked={language === 'ar'}
    >
      {/* The Sliding Indicator (Cyan/Blue Glow) */}
      <span
        className={`
          absolute top-1 bottom-1 w-[44%] rounded-full
          bg-gradient-to-br from-cyan-400 to-blue-500
          transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
          shadow-[0_0_12px_rgba(34,211,238,0.4)]
        `}
        style={{
          left: isEN ? '4px' : 'calc(100% - 44% - 4px)',
        }}
      />
      
      {/* Language Labels */}
      <div className="relative z-10 flex w-full items-center justify-between px-2.5 text-[11px] font-bold tracking-wider">
        <span 
          className={`flex-1 transition-all duration-300 text-center
          ${isEN ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}
        >
          EN
        </span>
        <span 
          className={`flex-1 transition-all duration-300 text-center
          ${!isEN ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}
        >
          AR
        </span>
      </div>
    </button>
  )
}