'use client'

import { useState, useEffect, useCallback, useRef, RefObject } from 'react'
import { MotionValue, useScroll, useTransform, useSpring } from 'framer-motion'

interface ScrollConfig {
  // Number of "screens" the animation should span (e.g., 3 means 300vh of scrollable area)
  screens: number
  // Minimum screens for mobile
  mobileScreens?: number
  // Minimum screens for tablet
  tabletScreens?: number
  // Whether to use spring physics
  useSpring?: boolean
  // Spring stiffness
  springStiffness?: number
  // Spring damping
  springDamping?: number
}

interface ResponsiveScrollReturn {
  // The scroll progress (0-1)
  scrollYProgress: MotionValue<number>
  // Smoothed scroll progress (if useSpring is true)
  smoothProgress: MotionValue<number>
  // Current breakpoint
  breakpoint: 'mobile' | 'tablet' | 'desktop'
  // Whether we're on a touch device
  isTouch: boolean
  // Dynamic container height in vh units
  containerHeight: string
  // Container height in pixels (for calculations)
  containerHeightPx: number
  // Trigger a manual refresh of scroll calculations
  refresh: () => void
  // Whether the component is ready (has measured viewport)
  isReady: boolean
}

// Breakpoint thresholds
const MOBILE_MAX = 768
const TABLET_MAX = 1024

/**
 * Custom hook for responsive scroll-triggered animations.
 * Handles:
 * - Dynamic viewport-based scroll distances
 * - Resize/orientation change refresh
 * - Mobile URL bar toggle handling
 * - Touch device detection
 */
export function useResponsiveScroll(
  containerRef: RefObject<HTMLElement>,
  config: ScrollConfig
): ResponsiveScrollReturn {
  const {
    screens = 4,
    mobileScreens = 2.5,
    tabletScreens = 3,
    useSpring: enableSpring = true,
    springStiffness = 100,
    springDamping = 30,
  } = config

  // State
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isTouch, setIsTouch] = useState(false)
  const [containerHeight, setContainerHeight] = useState('400vh')
  const [containerHeightPx, setContainerHeightPx] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  
  // Track previous window height to detect URL bar toggle
  const prevWindowHeight = useRef<number>(0)
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null)
  const orientationTimeout = useRef<NodeJS.Timeout | null>(null)

  // Calculate breakpoint and dimensions
  const calculateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return

    const width = window.innerWidth
    const height = window.innerHeight
    
    // Determine breakpoint
    let newBreakpoint: 'mobile' | 'tablet' | 'desktop'
    let activeScreens: number
    
    if (width < MOBILE_MAX) {
      newBreakpoint = 'mobile'
      activeScreens = mobileScreens
    } else if (width < TABLET_MAX) {
      newBreakpoint = 'tablet'
      activeScreens = tabletScreens
    } else {
      newBreakpoint = 'desktop'
      activeScreens = screens
    }
    
    setBreakpoint(newBreakpoint)
    
    // Calculate container height
    // Add extra height buffer for mobile to account for URL bar
    const urlBarBuffer = newBreakpoint === 'mobile' ? 50 : 0
    const totalHeight = (height * activeScreens) + urlBarBuffer
    
    setContainerHeightPx(totalHeight)
    setContainerHeight(`${activeScreens * 100}vh`)
    
    // Store height for URL bar detection
    prevWindowHeight.current = height
    
    setIsReady(true)
  }, [screens, mobileScreens, tabletScreens])

  // Detect touch device
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - msMaxTouchPoints exists on older IE
        navigator.msMaxTouchPoints > 0
      )
    }
    
    checkTouch()
  }, [])

  // Handle resize with debounce
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      // Clear existing timeout
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      
      // Debounce resize to prevent excessive recalculations
      resizeTimeout.current = setTimeout(() => {
        const currentHeight = window.innerHeight
        const heightDiff = Math.abs(currentHeight - prevWindowHeight.current)
        
        // Only recalculate if:
        // 1. Width changed (true resize)
        // 2. Height changed by more than 100px (not just URL bar toggle on mobile)
        // This prevents jank from mobile URL bar appearing/disappearing
        if (heightDiff > 100 || window.innerWidth !== prevWindowHeight.current) {
          calculateDimensions()
          setRefreshKey(k => k + 1)
        }
      }, 150)
    }

    // Handle orientation change
    const handleOrientationChange = () => {
      if (orientationTimeout.current) {
        clearTimeout(orientationTimeout.current)
      }
      
      // Wait for orientation change to complete
      orientationTimeout.current = setTimeout(() => {
        calculateDimensions()
        setRefreshKey(k => k + 1)
      }, 300)
    }

    // Initial calculation
    calculateDimensions()

    // Add listeners
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleOrientationChange)
    
    // Also listen for visual viewport changes (better mobile support)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      }
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current)
      if (orientationTimeout.current) clearTimeout(orientationTimeout.current)
    }
  }, [calculateDimensions])

  // Framer Motion scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Spring-smoothed progress
  const springProgress = useSpring(scrollYProgress, {
    stiffness: springStiffness,
    damping: springDamping,
    restDelta: 0.001,
  })

  // Manual refresh function
  const refresh = useCallback(() => {
    calculateDimensions()
    setRefreshKey(k => k + 1)
  }, [calculateDimensions])

  return {
    scrollYProgress,
    smoothProgress: enableSpring ? springProgress : scrollYProgress,
    breakpoint,
    isTouch,
    containerHeight,
    containerHeightPx,
    refresh,
    isReady,
  }
}

/**
 * Helper hook to create responsive transform values
 * Automatically scales transform ranges based on breakpoint
 */
export function useResponsiveTransform<T>(
  scrollProgress: MotionValue<number>,
  inputRange: number[],
  outputRange: T[],
  breakpoint: 'mobile' | 'tablet' | 'desktop',
  options?: {
    mobileOutputRange?: T[]
    tabletOutputRange?: T[]
  }
): MotionValue<T> {
  const activeOutputRange = 
    breakpoint === 'mobile' && options?.mobileOutputRange
      ? options.mobileOutputRange
      : breakpoint === 'tablet' && options?.tabletOutputRange
        ? options.tabletOutputRange
        : outputRange

  return useTransform(scrollProgress, inputRange, activeOutputRange)
}

/**
 * Utility to scale numeric values based on breakpoint
 */
export function scaleForBreakpoint(
  value: number,
  breakpoint: 'mobile' | 'tablet' | 'desktop',
  mobileScale = 0.6,
  tabletScale = 0.8
): number {
  switch (breakpoint) {
    case 'mobile':
      return value * mobileScale
    case 'tablet':
      return value * tabletScale
    default:
      return value
  }
}

export default useResponsiveScroll

