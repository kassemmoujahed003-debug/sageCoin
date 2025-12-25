'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isEntering, setIsEntering] = useState(false)

  useEffect(() => {
    // Start exit animation
    setIsTransitioning(true)
    setIsEntering(false)

    // After exit animation, swap content and start entrance
    const exitTimer = setTimeout(() => {
      setDisplayChildren(children)
      setIsEntering(true)
      
      // Start entrance animation
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 600) // Match exit duration

    return () => clearTimeout(exitTimer)
  }, [pathname, children])

  return (
    <div
      className={`page-transition-wrapper ${
        isTransitioning
          ? isEntering
            ? 'page-entering'
            : 'page-exiting'
          : 'page-visible'
      }`}
    >
      {displayChildren}
    </div>
  )
}

