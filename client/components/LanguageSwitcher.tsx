'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'

interface LanguageSwitcherProps {
  isScrolled?: boolean
}

export default function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const { language, setLanguage, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'ar' as const, label: 'العربية', flag: '🇸🇦' },
  ]

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]

  const handleLanguageChange = (langCode: 'en' | 'ar') => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  // When navbar is white (not scrolled), use dark background
  const buttonStyles = isScrolled
    ? 'bg-secondary-surface bg-opacity-50 border border-accent border-opacity-30 text-base-white'
    : 'bg-primary-dark border border-primary-dark text-base-white'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'} px-4 py-2 rounded-lg ${buttonStyles} hover:opacity-80 transition-all duration-200`}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage.label}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 bg-secondary-surface border border-accent rounded-lg shadow-lg z-20 min-w-[150px]`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-4 py-2 flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'} hover:bg-primary-dark transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  language === lang.code ? 'bg-primary-dark bg-opacity-50' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm text-base-white">{lang.label}</span>
                {language === lang.code && (
                  <svg
                    className={`w-4 h-4 text-accent ${isRTL ? 'mr-auto' : 'ml-auto'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

