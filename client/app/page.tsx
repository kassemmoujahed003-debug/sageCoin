'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import UserDashboard from '@/components/UserDashboard'
import CoursesSection from '@/components/CoursesSection'
import VipTradingSection from '@/components/VipTradingSection'
import PublicCTASection from '@/components/PublicCTASection'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function Home() {
  // Placeholder user state - replace with actual authentication logic
  const [isLoggedIn] = useState(false) // Set to true to test logged-in state
  const [subscribedToCourses] = useState(false) // Set to true to test course access
  const [joinedVip] = useState(false) // Set to true to test VIP access
  
  // Placeholder user settings - replace with actual user data
  const currentLeverage = 100 // Example: 100x leverage
  const currentLotSize = 0.1 // Example: 0.1 lot size

  return (
    <main className="min-h-screen bg-primary-dark">
      <Navbar />
      
      {/* 1. Hero Section - "Who We Are" */}
      <Hero />
      
      {/* 2. User Dashboard (Conditional - Only if Logged In) */}
      {isLoggedIn && (
        <UserDashboard 
          currentLeverage={currentLeverage}
          currentLotSize={currentLotSize}
        />
      )}
          
            <VipTradingSection joinedVip={joinedVip} />
            
      <CoursesSection subscribedToCourses={subscribedToCourses} />
      
      {/* 4. VIP Trading Section (Conditional based on joined_vip) */}

      
      {/* 5. Public CTA Section */}
      <PublicCTASection />
      
      {/* 6. Footer */}
      <Footer />
    </main>
  )
}

