'use client'

import { useEffect } from 'react'

interface AnalyticsProps {
  trackingId?: string
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function Analytics({ trackingId }: AnalyticsProps) {
  useEffect(() => {
    // Only load analytics in production with a valid tracking ID
    if (typeof window !== 'undefined' && trackingId) {
      // Google Analytics 4
      const script1 = document.createElement('script')
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
      script1.async = true
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${trackingId}', {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `
      document.head.appendChild(script2)

      // Track Core Web Vitals
      if ('performance' in window) {
        // Performance observer for tracking metrics
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navigation = entry as PerformanceNavigationTiming
              
              // Track page load time using custom events
              if (window.gtag) {
                window.gtag('event', 'page_load_time', {
                  value: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
                  custom_parameter: 'load_time_ms'
                })

                // Track time to first byte
                window.gtag('event', 'ttfb', {
                  value: Math.round(navigation.responseStart - navigation.requestStart),
                  custom_parameter: 'ttfb_ms'
                })
              }
            }
          }
        })

        try {
          observer.observe({ entryTypes: ['navigation'] })
        } catch (e) {
          // Observer not supported in some browsers
          console.log('Performance observer not supported')
        }
      }

      // Clean up on unmount
      return () => {
        const scripts = document.querySelectorAll(`script[src*="${trackingId}"]`)
        scripts.forEach(script => script.remove())
      }
    }
  }, [trackingId])

  // Track page views for SPA navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && trackingId) {
      window.gtag('config', trackingId, {
        page_path: window.location.pathname,
        page_title: document.title,
      })
    }
  })

  return null
} 