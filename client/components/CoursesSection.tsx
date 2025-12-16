'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface CoursesSectionProps {
  subscribedToCourses: boolean
}

export default function CoursesSection({ subscribedToCourses }: CoursesSectionProps) {
  const { t, isRTL } = useLanguage()

  if (subscribedToCourses) {
    return (
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-base-white text-center mb-12">
          {t('courses.title')}
        </h2>
        
        {/* Placeholder for Patreon iframe or course content */}
        <div className="bg-secondary-surface border border-accent rounded-2xl p-8 lg:p-12">
          <div className="aspect-video bg-primary-dark rounded-xl flex items-center justify-center border border-accent">
            <div className="text-center space-y-4">
              <svg
                className="w-20 h-20 text-accent mx-auto opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-accent text-lg">
                {t('courses.patreonPlaceholder')}
              </p>
              <p className="text-accent text-sm opacity-75">
                {t('courses.courseVideos')}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-base-white text-center mb-12">
        {t('courses.title')}
      </h2>
      
      {/* Subscribe Now Card/Banner */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-secondary-surface to-primary-dark border-2 border-accent rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-5 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="inline-block p-4 bg-accent bg-opacity-10 rounded-full">
              <svg
                className="w-12 h-12 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-base-white">
              {t('courses.unlockTitle')}
            </h3>
            
            <p className="text-lg text-accent max-w-2xl mx-auto leading-relaxed">
              {t('courses.unlockDescription')}
            </p>
            
            <div className="pt-4">
              <button className="btn-primary text-lg px-8 py-4">
                {t('courses.subscribeNow')}
              </button>
            </div>
            
            <div className={`pt-4 grid md:grid-cols-3 gap-6 ${isRTL ? 'text-right' : 'text-left'} max-w-3xl mx-auto`}>
              <div className="space-y-2">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base-white font-semibold">{t('courses.expertLessons')}</span>
                </div>
                <p className={`text-accent text-sm ${isRTL ? 'pr-7' : 'pl-7'}`}>
                  {t('courses.learnFromPro')}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base-white font-semibold">{t('courses.regularUpdates')}</span>
                </div>
                <p className={`text-accent text-sm ${isRTL ? 'pr-7' : 'pl-7'}`}>
                  {t('courses.newContentWeekly')}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}>
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base-white font-semibold">{t('courses.lifetimeAccess')}</span>
                </div>
                <p className={`text-accent text-sm ${isRTL ? 'pr-7' : 'pl-7'}`}>
                  {t('courses.accessAnytime')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


