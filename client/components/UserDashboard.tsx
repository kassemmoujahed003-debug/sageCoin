'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface UserDashboardProps {
  currentLeverage: number
  currentLotSize: number
}

export default function UserDashboard({ currentLeverage, currentLotSize }: UserDashboardProps) {
  const { t, isRTL } = useLanguage()

  const handleChangePassword = () => {
    // TODO: Implement password change functionality
    console.log('Change password clicked')
  }

  const handleChangeLeverage = () => {
    // TODO: Implement leverage change functionality
    console.log('Change leverage clicked')
  }

  const handleChangeLotSize = () => {
    // TODO: Implement lot size change functionality
    console.log('Change lot size clicked')
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Settings Bar */}
      <div className="bg-secondary-surface border border-accent rounded-2xl p-6 mb-12">
        <h2 className="text-2xl font-bold text-base-white mb-6">{t('dashboard.settings')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={handleChangePassword}
            className={`btn-secondary ${isRTL ? 'text-right' : 'text-left'} px-6 py-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between hover:scale-[1.02] transition-transform`}
          >
            <span className="text-base-white font-semibold">{t('dashboard.changePassword')}</span>
            <svg
              className={`w-5 h-5 text-accent ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            onClick={handleChangeLeverage}
            className={`btn-secondary ${isRTL ? 'text-right' : 'text-left'} px-6 py-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between hover:scale-[1.02] transition-transform`}
          >
            <div className="flex flex-col">
              <span className="text-base-white font-semibold">{t('dashboard.changeLeverage')}</span>
              <span className="text-accent text-sm mt-1">{t('dashboard.current')}: {currentLeverage}x</span>
            </div>
            <svg
              className={`w-5 h-5 text-accent ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            onClick={handleChangeLotSize}
            className={`btn-secondary ${isRTL ? 'text-right' : 'text-left'} px-6 py-4 flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between hover:scale-[1.02] transition-transform`}
          >
            <div className="flex flex-col">
              <span className="text-base-white font-semibold">{t('dashboard.changeLotSize')}</span>
              <span className="text-accent text-sm mt-1">{t('dashboard.current')}: {currentLotSize}</span>
            </div>
            <svg
              className={`w-5 h-5 text-accent ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Market Analysis Section */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-base-white mb-8">{t('dashboard.marketAnalysis')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Market Analysis Cards */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-secondary-surface border border-accent rounded-xl p-6 space-y-4"
            >
              {/* Placeholder for market picture */}
              <div className="aspect-video bg-gradient-to-br from-primary-dark to-secondary-surface rounded-lg flex items-center justify-center border border-accent">
                <svg
                  className="w-16 h-16 text-accent opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              {/* Analysis text placeholder */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-base-white">
                  {t('dashboard.marketAnalysisItem')} {item}
                </h3>
                <p className="text-accent text-sm leading-relaxed">
                  {t('dashboard.analysisDescription')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

