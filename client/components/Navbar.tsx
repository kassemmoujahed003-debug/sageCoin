'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import { isMember, isAdmin } from '@/lib/auth-utils'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t, isRTL } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  
  // Use auth hook to check user roles (must be called before any conditional logic)
  const { user, isMember: userIsMember, isAdmin: userIsAdmin, isAuthenticated } = useAuth()
  
  // Check member/VIP access
  const isVipMode = userIsMember || isMember(user) || false
  
  // Check admin access
  const userIsAdminUser = userIsAdmin || isAdmin(user) || false

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        handleCloseMenu()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  const handleCloseMenu = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsClosing(false)
    }, 280)
  }, [])

  const handleOpenMenu = useCallback(() => {
    setIsMenuOpen(true)
  }, [])

  const scrollToCourses = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    handleCloseMenu()
    setTimeout(() => {
      const coursesSection = document.getElementById('courses')
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('supabase_token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
  }

  const navLinkClasses = `transition-colors duration-300 ${
    isScrolled 
      ? 'text-base-white hover:text-accent' 
      : 'text-primary-dark hover:text-secondary-surface'
  }`

  const buttonBaseStyle = isScrolled ? {
    background: 'rgba(207, 226, 243, 0.15)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
    color: '#FFFFFF',
  } : {
    background: '#182231',
    borderColor: '#182231',
    color: '#FFFFFF',
  }

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all duration-300 ${
        isScrolled ? 'bg-transparent backdrop-blur-md' : 'bg-base-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex ${isRTL ? 'flex-row-reverse' : ''} justify-between items-center h-16 sm:h-20`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 sm:space-x-3' : 'space-x-2 sm:space-x-3'}`}>
                <img 
                  src={isScrolled ? '/light.png' : '/dark.png'} 
                  alt="SageCoin Logo" 
                  className="h-12 sm:h-[72.8px] w-auto transition-opacity duration-300"
                />
                <span className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-base-white' : 'text-primary-dark'
                }`}>SageCoin</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
              {isRTL ? (
                <>
                  <LanguageSwitcher isScrolled={isScrolled} />
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className={isScrolled ? "btn-primary" : "btn-primary bg-primary-dark border-primary-dark text-base-white hover:bg-opacity-90"}
                      style={buttonBaseStyle}
                    >
                      {t('nav.logout')}
                    </button>
                  ) : (
                    <Link 
                      href="/login" 
                      className={isScrolled ? "btn-primary" : "btn-primary bg-primary-dark border-primary-dark text-base-white hover:bg-opacity-90"}
                      style={buttonBaseStyle}
                    >
                      {t('nav.login')}
                    </Link>
                  )}
                  {userIsAdminUser && (
                    <Link href="/dashboard" className={navLinkClasses}>
                      {t('nav.dashboard')}
                    </Link>
                  )}
                  <a href="#courses" onClick={scrollToCourses} className={navLinkClasses}>
                    {t('nav.courses')}
                  </a>
                  <Link href="/" className={navLinkClasses}>
                    {t('nav.home')}
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/" className={navLinkClasses}>
                    {t('nav.home')}
                  </Link>
                  <a href="#courses" onClick={scrollToCourses} className={navLinkClasses}>
                    {t('nav.courses')}
                  </a>
                  {userIsAdminUser && (
                    <Link href="/dashboard" className={navLinkClasses}>
                      {t('nav.dashboard')}
                    </Link>
                  )}
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className={isScrolled ? "btn-primary" : "btn-primary bg-primary-dark border-primary-dark text-base-white hover:bg-opacity-90"}
                      style={buttonBaseStyle}
                    >
                      {t('nav.logout')}
                    </button>
                  ) : (
                    <Link 
                      href="/login" 
                      className={isScrolled ? "btn-primary" : "btn-primary bg-primary-dark border-primary-dark text-base-white hover:bg-opacity-90"}
                      style={buttonBaseStyle}
                    >
                      {t('nav.login')}
                    </Link>
                  )}
                  <LanguageSwitcher isScrolled={isScrolled} />
                </>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
                <LanguageSwitcher isScrolled={isScrolled} />
                <button
                  onClick={handleOpenMenu}
                  className={`relative w-10 h-10 flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg ${
                    isScrolled 
                      ? 'text-base-white hover:text-accent' 
                      : 'text-primary-dark hover:text-secondary-surface'
                  }`}
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                >
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                      isScrolled ? 'bg-base-white' : 'bg-primary-dark'
                    }`}></span>
                    <span className={`block h-0.5 w-4 rounded-full transition-all duration-300 ${
                      isScrolled ? 'bg-base-white' : 'bg-primary-dark'
                    }`}></span>
                    <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                      isScrolled ? 'bg-base-white' : 'bg-primary-dark'
                    }`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div 
          className={`fixed inset-0 z-[100] lg:hidden ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
          onClick={handleCloseMenu}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm"></div>
        </div>
      )}

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div 
          className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-[85%] max-w-sm bg-primary-dark z-[101] lg:hidden shadow-2xl ${
            isClosing ? 'animate-slide-out' : 'animate-slide-in'
          }`}
          style={{
            boxShadow: isRTL 
              ? '10px 0 40px rgba(0, 0, 0, 0.5)' 
              : '-10px 0 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-accent/20">
            <Link href="/" className="flex items-center space-x-2" onClick={handleCloseMenu}>
              <img src="/light.png" alt="SageCoin" className="h-10 w-auto" />
              <span className="text-lg font-bold text-base-white">SageCoin</span>
            </Link>
            <button
              onClick={handleCloseMenu}
              className="w-10 h-10 flex items-center justify-center text-accent hover:text-base-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex flex-col h-[calc(100%-5rem)] overflow-y-auto">
            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link 
                href="/" 
                className="menu-item-animate flex items-center gap-3 px-4 py-4 text-base-white hover:bg-accent/10 rounded-xl transition-colors group"
                onClick={handleCloseMenu}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="font-medium">{t('nav.home')}</span>
              </Link>

              <a 
                href="#courses" 
                onClick={scrollToCourses}
                className="menu-item-animate flex items-center gap-3 px-4 py-4 text-base-white hover:bg-accent/10 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-medium">{t('nav.courses')}</span>
              </a>

              {userIsAdminUser && (
                <Link 
                  href="/dashboard" 
                  className="menu-item-animate flex items-center gap-3 px-4 py-4 text-base-white hover:bg-accent/10 rounded-xl transition-colors group"
                  onClick={handleCloseMenu}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <span className="font-medium">{t('nav.dashboard')}</span>
                </Link>
              )}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto px-4 py-6 border-t border-accent/20 space-y-4 safe-area-inset">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout()
                    handleCloseMenu()
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent/10 hover:bg-accent/20 text-base-white font-semibold rounded-xl transition-colors border border-accent/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {t('nav.logout')}
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent text-primary-dark font-semibold rounded-xl transition-colors hover:bg-accent/90"
                  onClick={handleCloseMenu}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  {t('nav.login')}
                </Link>
              )}

              {/* App-like bottom indicator */}
              <div className="flex justify-center pt-2">
                <div className="w-32 h-1 bg-accent/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
