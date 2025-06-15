"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

interface PhoneButtonProps {
  children: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  variant?: "button" | "text"
}

export function PhoneButton({ children, className = "", size = "default", asChild = false, variant = "button" }: PhoneButtonProps) {
  const [showPhone, setShowPhone] = useState(false)
  const [copied, setCopied] = useState(false)
  const phoneNumber = "208-727-7909"

  const handleClick = (e: React.MouseEvent) => {
    // Check if it's desktop (768px and up)
    if (window.innerWidth >= 768) {
      e.preventDefault()
      setShowPhone(true)
      
      // Auto-copy to clipboard
      navigator.clipboard.writeText(phoneNumber).then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
          setShowPhone(false)
        }, 5000)
      }).catch(() => {
        // Fallback if clipboard API fails
        console.log('Clipboard API failed')
      })
    }
    // On mobile (< 768px), let the tel: link work normally
  }

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    })
  }

  if (variant === "text") {
    return (
      <a href="tel:+12087277909" onClick={handleClick} className={className}>
        {showPhone ? (
          <span className="flex items-center gap-2">
            <span>+1(208) 727-7909</span>
            <button
              onClick={handleCopyClick}
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </span>
        ) : (
          children
        )}
      </a>
    )
  }

  if (asChild) {
    return (
      <div className="relative inline-block">
        <Button size={size} className={className} asChild>
          <a href="tel:+12087277909" onClick={handleClick}>
            {showPhone ? (
              <span className="flex items-center gap-2">
                <span>+1(208) 727-7909</span>
                <button
                  onClick={handleCopyClick}
                  className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </span>
            ) : (
              children
            )}
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative inline-block">
      <Button size={size} className={className} asChild>
        <a href="tel:+12087277909" onClick={handleClick}>
          {showPhone ? (
            <span className="flex items-center gap-2">
              <span>+1(208) 727-7909</span>
              <button
                onClick={handleCopyClick}
                className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </span>
          ) : (
            children
          )}
        </a>
      </Button>
    </div>
  )
} 