'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t, isRTL } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-surface border-t border-accent mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'space-y-reverse' : ''} space-y-4 md:space-y-0`}>
          <div className="text-accent text-sm">
            © {currentYear} SageCoin. {t('footer.rights')}
          </div>
          <div className={`flex ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
            <Link 
              href="/privacy" 
              className="text-accent hover:text-base-white transition-colors duration-200 text-sm"
            >
              {t('footer.privacy')}
            </Link>
            <Link 
              href="/terms" 
              className="text-accent hover:text-base-white transition-colors duration-200 text-sm"
            >
              {t('footer.terms')}
            </Link>
            <Link 
              href="/contact" 
              className="text-accent hover:text-base-white transition-colors duration-200 text-sm"
            >
              {t('footer.contact')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

