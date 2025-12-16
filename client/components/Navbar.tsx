'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t, isRTL } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // TODO: Replace with actual authentication check
  const isAdmin = false // Set to true to test admin view

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCourses = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const coursesSection = document.getElementById('courses')
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all duration-300 ${
      isScrolled ? 'bg-transparent' : 'bg-base-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between items-center h-20`}>
          {/* Logo - Will be on right in RTL, left in LTR */}
          <div className="flex-shrink-0">
            <Link href="/" className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <img 
                src={isScrolled ? '/light.png' : '/dark.png'} 
                alt="SageCoin Logo" 
                className="h-[72.8px] w-auto transition-opacity duration-300"
              />
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-base-white' : 'text-primary-dark'
              }`}>SageCoin</span>
            </Link>
          </div>

          {/* Desktop Navigation - Will be on left in RTL, right in LTR */}
          <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            {isRTL ? (
              <>
                <LanguageSwitcher isScrolled={isScrolled} />
                <Link 
                  href="/login" 
                  className={isScrolled ? "btn-primary" : "btn-primary bg-primary-dark border-primary-dark text-base-white hover:bg-opacity-90"}
                  style={isScrolled ? {
                    background: 'rgba(207, 226, 243, 0.15) !important',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                  } : {
                    background: '#182231 !important',
                    borderColor: '#182231',
                    color: '#FFFFFF',
                  }}
                >
                  {t('nav.login')}
                </Link>
                {true && (
                  <Link 
                    href="/dashboard" 
                    className={`transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-base-white hover:text-accent' 
                        : 'text-primary-dark hover:text-secondary-surface'
                    }`}
                  >
                    {t('nav.dashboard')}
                  </Link>
                )}
                <a 
                  href="#courses" 
                  onClick={scrollToCourses}
                  className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-base-white hover:text-accent' 
                      : 'text-primary-dark hover:text-secondary-surface'
                  }`}
                >
                  {t('nav.courses')}
                </a>
                <Link 
                  href="/" 
                  className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-base-white hover:text-accent' 
                      : 'text-primary-dark hover:text-secondary-surface'
                  }`}
                >
                  {t('nav.home')}
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-base-white hover:text-accent' 
                      : 'text-primary-dark hover:text-secondary-surface'
                  }`}
                >
                  {t('nav.home')}
                </Link>
                <a 
                  href="#courses" 
                  onClick={scrollToCourses}
                  className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-base-white hover:text-accent' 
                      : 'text-primary-dark hover:text-secondary-surface'
                  }`}
                >
                  {t('nav.courses')}
                </a>
                {true && (
                  <Link 
                    href="/dashboard" 
                    className={`transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-base-white hover:text-accent' 
                        : 'text-primary-dark hover:text-secondary-surface'
                    }`}
                  >
                    {t('nav.dashboard')}
                  </Link>
                )}
                <Link 
                  href="/login" 
                  className={isScrolled ? "btn-primary" : "btn-primary bg-primary-dark border-primary-dark text-base-white hover:bg-opacity-90"}
                  style={isScrolled ? {
                    background: 'rgba(207, 226, 243, 0.15) !important',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                  } : {
                    background: '#182231 !important',
                    borderColor: '#182231',
                    color: '#FFFFFF',
                  }}
                >
                  {t('nav.login')}
                </Link>
                <LanguageSwitcher isScrolled={isScrolled} />
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
              <LanguageSwitcher isScrolled={isScrolled} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-2 ${
                  isScrolled 
                    ? 'text-base-white hover:text-accent' 
                    : 'text-primary-dark hover:text-secondary-surface'
                }`}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link 
              href="/" 
              className={`block transition-colors duration-300 ${
                isScrolled 
                  ? 'text-base-white hover:text-accent' 
                  : 'text-primary-dark hover:text-secondary-surface'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <a 
              href="#courses" 
              onClick={(e) => {
                scrollToCourses(e)
                setIsMenuOpen(false)
              }}
              className={`block transition-colors duration-300 ${
                isScrolled 
                  ? 'text-base-white hover:text-accent' 
                  : 'text-primary-dark hover:text-secondary-surface'
              }`}
            >
              {t('nav.courses')}
            </a>
            {true && (
              <Link 
                href="/dashboard" 
                className={`block transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-base-white hover:text-accent' 
                    : 'text-primary-dark hover:text-secondary-surface'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.dashboard')}
              </Link>
            )}
            <Link 
              href="/login" 
              className={isScrolled ? "block btn-primary text-center" : "block btn-primary text-center bg-primary-dark border-primary-dark text-base-white hover:bg-opacity-90"}
              style={isScrolled ? {
                background: 'rgba(207, 226, 243, 0.15) !important',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
              } : {
                background: '#182231 !important',
                borderColor: '#182231',
                color: '#FFFFFF',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.login')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

