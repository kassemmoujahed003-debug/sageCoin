'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Instagram, Send, Phone, MessageSquare } from 'lucide-react'

export default function Footer() {
  const { t, isRTL, language } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socials = [
    { icon: <Instagram size={18} className="sm:w-5 sm:h-5" />, href: "https://www.instagram.com/sagecoin_community?igsh=azVmZGlrem5meXV0", label: "Instagram" },
    { icon: <Send size={18} className="sm:w-5 sm:h-5" />, href: "https://t.me/sagecoincom", label: "Telegram" },
    { icon: <MessageSquare size={18} className="sm:w-5 sm:h-5" />, href: "https://www.tiktok.com/@sagecoin.comunity?_r=1&_t=ZG-92RGF7RySvo", label: "TikTok" },
  ]

  const supportNumbers = [
    "+961 81 574 142",
    "+961 76 367 139"
  ]

  return (
    <footer className="bg-secondary-surface border-t border-accent/30 mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8 safe-area-inset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          
          {/* Column 1: Brand & Socials */}
          <div className={`flex flex-col ${isRTL ? 'items-end text-right sm:items-start sm:text-left lg:items-end lg:text-right' : 'items-start text-left'}`}>
            <h3 className="text-xl sm:text-2xl font-bold text-base-white mb-3 sm:mb-4 italic tracking-wider">
              SAGECOIN
            </h3>
            <p className="text-accent/70 text-fluid-sm mb-4 sm:mb-6 max-w-xs">
              {language === 'ar' 
                ? 'مجتمعك الموثوق لتداول العملات الرقمية وتحليل السوق.' 
                : 'Your trusted community for crypto trading and market analysis.'}
            </p>
            <div className={`flex gap-3 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {socials.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent/10 p-2 sm:p-2.5 rounded-full text-accent hover:bg-accent hover:text-primary-dark transition-all duration-300 touch:active:scale-95"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Support Contact */}
          <div className={`flex flex-col ${isRTL ? 'items-end text-right sm:items-start sm:text-left lg:items-end lg:text-right' : 'items-start text-left'}`}>
            <h4 className="text-base-white font-semibold mb-3 sm:mb-4 uppercase tracking-widest text-xs sm:text-sm">
              {language === 'ar' ? 'الدعم الفني' : 'Technical Support'}
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {supportNumbers.map((num, idx) => (
                <a 
                  key={idx}
                  href={`tel:${num.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 sm:gap-3 text-accent hover:text-base-white transition-colors group"
                >
                  <Phone size={14} className="sm:w-4 sm:h-4 text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-fluid-sm font-medium" dir="ltr">{num}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className={`flex flex-col ${isRTL ? 'items-end text-right sm:items-start sm:text-left lg:items-end lg:text-right' : 'items-start text-left sm:col-span-2 lg:col-span-1'}`}>
            <h4 className="text-base-white font-semibold mb-3 sm:mb-4 uppercase tracking-widest text-xs sm:text-sm">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 flex-wrap">
              <Link href="/privacy" className="text-accent/80 hover:text-base-white text-fluid-sm transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-accent/80 hover:text-base-white text-fluid-sm transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="/contact" className="text-accent/80 hover:text-base-white text-fluid-sm transition-colors">
                {t('footer.contact')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-accent/50 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} SageCoin Community. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-accent/50 text-xs">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
