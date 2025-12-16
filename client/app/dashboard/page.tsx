'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import UserList from '@/components/dashboard/UserList'
import RequestList from '@/components/dashboard/RequestList'

export default function DashboardPage() {
  const { t, isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState<'users' | 'requests'>('users')

  return (
    <main className="min-h-screen bg-primary-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-base-white mb-2">
            {t('dashboard.title')}
          </h1>
          <p className="text-accent">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-4 mb-8 border-b border-accent border-opacity-20`}>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-semibold transition-colors duration-200 ${
              activeTab === 'users'
                ? 'text-base-white border-b-2 border-accent'
                : 'text-accent hover:text-base-white'
            }`}
          >
            {t('dashboard.tabs.users')}
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-3 font-semibold transition-colors duration-200 ${
              activeTab === 'requests'
                ? 'text-base-white border-b-2 border-accent'
                : 'text-accent hover:text-base-white'
            }`}
          >
            {t('dashboard.tabs.requests')}
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'users' ? <UserList /> : <RequestList />}
        </div>
      </div>
      <Footer />
    </main>
  )
}

