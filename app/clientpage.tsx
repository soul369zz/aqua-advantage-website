"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { PhoneButton } from "@/components/PhoneButton"
import { ContactForm } from "@/components/ContactForm"

// Before/After Slider Component
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && !isHovered) return
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    }
    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging])

  const handleImageLoad = (type: "before" | "after") => {
    setImagesLoaded((prev) => ({ ...prev, [type]: true }))
  }

  const allImagesLoaded = imagesLoaded.before && imagesLoaded.after

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative w-full h-96 overflow-hidden rounded-lg select-none touch-none"
        style={{ touchAction: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/Before1.jpg"
            alt="Before pool installation"
            fill
            className={`object-cover transition-opacity duration-700 ${
              imagesLoaded.before ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => handleImageLoad("before")}
            priority
          />
          <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-700">
            Before
          </div>
        </div>

        {/* After Image with Clip Path */}
        <div
          className="absolute inset-0 transition-all duration-200 ease-out"
          style={{
            clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
          }}
        >
          <Image
            src="/images/After.jpg"
            alt="After pool installation"
            fill
            className={`object-cover transition-opacity duration-700 ${
              imagesLoaded.after ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => handleImageLoad("after")}
            priority
          />
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-600">
            After
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <button
            type="button"
            aria-label="Drag to compare"
            tabIndex={0}
            className={`relative focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-110 transition-transform duration-200
              w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12 rounded-full bg-white shadow-2xl border-2 border-blue-400 flex items-center justify-center
              ${isDragging || isHovered ? "scale-110 ring-2 ring-blue-400" : "scale-100"}
              cursor-grab active:cursor-grabbing`}
            style={{ touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
            </div>
          </button>
        </div>

        {/* Loading Overlay */}
        {!allImagesLoaded && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Loading comparison...</span>
            </div>
          </div>
        )}

        {/* Hover Instructions */}
        {allImagesLoaded && !isDragging && (
          <div
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Drag or slide to compare
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      {allImagesLoaded && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span className={`transition-all duration-300 ${sliderPosition < 50 ? "font-semibold text-gray-900" : ""}`}>
            Before
          </span>
          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gray-800 to-blue-500 transition-all duration-200 ease-out"
              style={{ width: `${sliderPosition}%` }}
            ></div>
          </div>
          <span className={`transition-all duration-300 ${sliderPosition > 50 ? "font-semibold text-blue-600" : ""}`}>
            After
          </span>
        </div>
      )}
    </div>
  )
}

// Custom hook for intersection observer
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView] as const
}

// Animated counter component
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useInView()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(easeOutQuart * target)

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(target)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, hasAnimated, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// Animated text component
function AnimatedText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`${className} transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {text}
    </div>
  )
}

// Fade in component
function FadeInSection({
  children,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}) {
  const [ref, isInView] = useInView()

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translate-y-8"
      case "down":
        return "-translate-y-8"
      case "left":
        return "translate-x-8"
      case "right":
        return "-translate-x-8"
      default:
        return "translate-y-8"
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${getTransform()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Loading component
function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 animate-pulse">
          <Image
            src="/images/logo/logo-128.png"
            alt="Aqua Advantage Logo"
            width={64}
            height={64}
            className="w-full h-full object-contain animate-ping"
          />
        </div>
        <div className="text-2xl font-light text-gray-900 animate-fade-in">Aqua Advantage</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [backgroundScale, setBackgroundScale] = useState(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setHeroLoaded(true)

    const handleScroll = () => {
      const scrolled = window.scrollY
      const rate = scrolled * -0.0005
      setBackgroundScale(1 + rate)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShowHeader(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navigationItems = [
    "About",
    "Services",
    "Shop Spa",
    "Testimonials",
    "FAQs",
    "Contact",
  ]

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Background Image with Parallax */}
          <div
            className="absolute inset-0 z-0 transition-transform duration-1000 ease-out"
            style={{ transform: `scale(${backgroundScale})` }}
          >
            <Image
              src="/images/hero/Hero1.jpg"
              alt="Luxury pool and spa background"
              fill
              className="object-cover transition-opacity duration-2000"
              priority
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-2000" />
          </div>

          {/* Navigation */}
          <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              showHeader ? "translate-y-0" : "-translate-y-full"
            } ${heroLoaded ? "opacity-100" : "opacity-0"} ${
              lastScrollY > 0 ? "bg-gray-100 shadow-md" : "bg-transparent"
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src="/images/logo/logo-64.png"
                      alt="Aqua Advantage Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className={`font-semibold text-xl transition-colors duration-300 group-hover:text-blue-600 ${
                    lastScrollY > 0 ? "text-gray-900" : "text-white"
                  }`}>
                    Aqua Advantage
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={item}
                      href={item === "Shop Spa" ? "/aquaspa" : `#${item.toLowerCase().replace(" ", "-")}`}
                      className={`hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group ${
                        lastScrollY > 0 ? "text-gray-900" : "text-white"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {item}
                      <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        lastScrollY > 0 ? "bg-blue-600" : "bg-blue-400"
                      }`}></span>
                    </Link>
                  ))}
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=334+E+Main+St,+Burley,+ID,+83318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-1 group cursor-pointer hover:text-blue-600 transition-all duration-300 ${
                      lastScrollY > 0 ? "text-gray-900" : "text-white"
                    }`}
                  >
                    <MapPin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm">Burley, ID</span>
                  </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className={`md:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors duration-300 ${
                    lastScrollY > 0 ? "text-gray-900" : "text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                >
                  <div className="w-6 h-5 relative flex flex-col justify-between">
                    <span className={`w-full h-0.5 transform transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    } ${lastScrollY > 0 ? 'bg-gray-900' : 'bg-white'}`} />
                    <span className={`w-full h-0.5 transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    } ${lastScrollY > 0 ? 'bg-gray-900' : 'bg-white'}`} />
                    <span className={`w-full h-0.5 transform transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    } ${lastScrollY > 0 ? 'bg-gray-900' : 'bg-white'}`} />
                  </div>
                </button>
              </div>

              {/* Mobile Menu */}
              <div
                className={`md:hidden fixed inset-0 z-[9999] bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen 
                    ? 'opacity-100 pointer-events-auto' 
                    : 'opacity-0 pointer-events-none'
                }`}
                style={{ minHeight: '100vh' }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-6 right-6 text-3xl text-gray-900 focus:outline-none"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  &times;
                </button>
                <div className="flex flex-col justify-center items-center h-full space-y-8 p-6">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={item}
                      href={item === "Shop Spa" ? "/aquaspa" : `#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-900 text-2xl font-medium hover:text-blue-600 transition-all duration-300 hover:scale-105"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                  <div className="flex items-center space-x-2 mt-8">
                    <MapPin className="w-6 h-6 text-gray-900" />
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=334+E+Main+St,+Burley,+ID,+83318"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-gray-900 font-medium hover:text-blue-600 transition-colors duration-300"
                    >
                      Burley, ID
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="relative z-10 px-6 pt-20 pb-32">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6">
                  <AnimatedText text="Keep your pool " delay={500} />
                  <span className="italic font-serif">
                    <AnimatedText text="perfect" delay={1500} />
                  </span>
                </h1>

                <div
                  className={`transition-all duration-1000 delay-2000 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <div className="text-xl text-white/90 mb-8 leading-relaxed">
                    <AnimatedText
                      text="Expert pool maintenance, equipment repair, and premium hot tub sales. We keep your aquatic investment crystal clear and running smoothly year-round."
                      delay={2500}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <PhoneButton
                      size="lg"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden"
                      asChild
                    >
                      <span className="relative z-10">Book Service</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                      <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </PhoneButton>

                    <div className="flex items-center space-x-2 text-white group cursor-pointer">
                      <Phone className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <PhoneButton variant="text" className="text-lg transition-colors duration-300 group-hover:text-blue-200">
                        or call us
                      </PhoneButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div
            className={`absolute bottom-8 right-8 z-10 transition-all duration-1000 delay-3000 ${heroLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400 transition-transform duration-300 hover:scale-125"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
              <p className="text-sm">Trusted by 200+ clients</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeInSection direction="left">
                <div>
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-300 hover:bg-blue-200">
                    About us
                  </div>
                  <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                    We are pool care <span className="italic font-serif">specialists.</span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Based in Burley, Idaho, Aqua Advantage is your local authority on pool care and spa luxury. We've built our reputation on reliable service, honest pricing, and genuine care for our community. Whether you need expert pool maintenance or dream of installing a premium hot tub, we treat every project like it's in our own backyard.
                  </p>

                  <div className="grid grid-cols-3 gap-8">
                    {[
                      { number: 6, suffix: "+", label: ["Years", "experience"] },
                      { number: 150, suffix: "+", label: ["Service", "calls"] },
                      { number: 200, suffix: "+", label: ["Happy", "customers"] },
                    ].map((stat, index) => (
                      <FadeInSection key={index} delay={index * 200}>
                        <div className="group cursor-pointer">
                          <div className="text-4xl font-light text-gray-900 mb-2 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110">
                            <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                          </div>
                          <div className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                            {stat.label.map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection direction="right" delay={300}>
                <div className="relative">
                  <BeforeAfterSlider />
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-300 hover:bg-blue-200">
                  Services
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  What we <span className="italic font-serif">do</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Find out which one of our services fit the needs of your backyard
                </p>
              </div>
            </FadeInSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Pool Cleaning",
                  description: "Professional pool cleaning services to keep your pool crystal clear and inviting.",
                  image: "/images/services/Service 1-Pool Cleaning .jpg",
                },
                {
                  title: "Chemical Balancing",
                  description: "Expert chemical balancing to maintain perfect water chemistry and swimmer comfort.",
                  image: "/images/services/Service 2- Chemical Balancing.jpg",
                },
                {
                  title: "Equipment Repair",
                  description: "Fast and reliable repair services for all pool and spa equipment.",
                  image: "/images/services/Service 3- Equipment Repair.jpg",
                },
                {
                  title: "Pool Maintenance",
                  description: "Comprehensive maintenance programs to keep your pool in perfect condition year-round.",
                  image: "/images/services/Service 4- Pool Maintenance.jpg",
                },
                {
                  title: "Hot Tub Service",
                  description: "Specialized maintenance and repair services for your hot tub or spa.",
                  image: "/images/services/Service 5- Hot Tub Service.jpg",
                },
                {
                  title: "Pool Opening/Closing",
                  description: "Professional seasonal services to properly open and close your pool.",
                  image: "/images/services/Service 6- Pool Opening:Closing.jpg",
                },
              ].map((service, index) => (
                <FadeInSection key={index} delay={index * 100}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-blue-600">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 transition-colors duration-300 group-hover:text-gray-700">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="pt-8 pb-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeInSection delay={600}>
              <div className="text-center">
                  <PhoneButton
                    size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
                    asChild
                  >
                  Book Service
                  </PhoneButton>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Hot Tubs & Spas Showcase Section - Apple Style */}
        <section id="shop-spa" className="py-32 bg-gradient-to-b from-blue-50 to-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            {/* Main Hero */}
            <FadeInSection>
              <div className="text-center mb-20">
                <h2 className="text-6xl md:text-8xl font-light text-gray-900 mb-6 tracking-tight">Shop Spa</h2>
                <p className="text-2xl md:text-3xl text-gray-600 mb-4 font-light">Luxury redefined.</p>
                <p className="text-xl text-gray-600 mb-12 font-light">
                  Premium therapeutic experience with cutting-edge technology.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                  <Button
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link href="/aquaspa">Learn more</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link href="/aquaspa">Shop Spa</Link>
                  </Button>
                </div>

                {/* Featured Product Image */}
                <div className="relative mb-12">
                  <div className="relative mx-auto w-full max-w-4xl">
                    <Image
                      src="/images/products/Main Product Image.jpg"
                      alt="Premium Shop Spa Hot Tub"
                      width={800}
                      height={600}
                      className="mx-auto rounded-3xl shadow-2xl transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                  </div>
                </div>

                <p className="text-lg text-blue-600 font-medium">Built for ultimate relaxation.</p>
              </div>
            </FadeInSection>

            {/* Technology Showcase */}
            <FadeInSection delay={400}>
              <div className="text-center mb-20">
                <h3 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Quality Features</h3>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                  Every Shop Spa includes proven features designed for comfort, reliability, and performance.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {[
                    {
                      icon: "💧",
                      title: "HydroTherapy System",
                      description:
                        "Precision-engineered jets deliver targeted therapeutic massage for ultimate relaxation.",
                    },
                    {
                      icon: "🌡️",
                      title: "Digital Temperature Control",
                      description:
                        "Precise digital controls maintain your ideal water temperature with reliable heating systems.",
                    },
                    {
                      icon: "💡",
                      title: "Energy Efficient Design",
                      description: "Advanced insulation and energy-saving features keep operating costs low while maximizing performance.",
                    },
                  ].map((tech, index) => (
                    <div key={index} className="group">
                      <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                        {tech.icon}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-blue-600">
                        {tech.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-light mb-3">Need pool service or a new hot tub?</h3>
                  <p className="text-lg mb-6 opacity-90">Schedule a consultation to keep your pool perfect or explore our premium Shop Spa collection.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <PhoneButton
                  size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 hover:scale-105"
                  asChild
                >
                      Schedule Consultation
                </PhoneButton>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-300 hover:bg-blue-200">
                  Our work
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  See our <span className="italic font-serif">expert</span> pool care work
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how we keep pools pristine and enhance backyards with premium hot tub installations.
                </p>
              </div>
            </FadeInSection>

            <div className="space-y-16">
              {[
                {
                  title: "Crystal clear pool restoration",
                  description:
                    "This neglected pool was brought back to life with our comprehensive cleaning, equipment repair, and ongoing maintenance program — now it's the family's favorite gathering spot.",
                  quote:
                    "We thought our pool was beyond saving, but Aqua Advantage worked miracles. Now it's crystal clear and runs perfectly.",
                  category: "Pool Restoration",
                  image: "/images/gallery/Gallery Image 1.jpg",
                  reverse: false,
                },
                {
                  title: "A modern wellness retreat",
                  description:
                    "A compact space transformed with a premium 8-person spa featuring therapeutic jets, LED lighting, and integrated sound system — turning a small patio into a wellness oasis.",
                  quote: "It looks like something out of a magazine. I still can't believe it's the same space!",
                  category: "Hot Tubs",
                  image: "/images/Project 2.jpg",
                  reverse: true,
                },
                {
                  title: "Year-round pool perfection",
                  description:
                    "Our weekly maintenance program keeps this family pool sparkling clean through all seasons, with perfect chemical balance and reliable equipment performance.",
                  quote:
                    "Having Aqua Advantage handle our pool maintenance means we can just enjoy swimming without any of the hassle. They're incredibly reliable.",
                  category: "Maintenance",
                  image: "/images/gallery/Gallery Image 3.jpg",
                  reverse: false,
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${project.reverse ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <FadeInSection direction={project.reverse ? "right" : "left"} delay={index * 200}>
                    <div className={`relative group ${project.reverse ? "lg:col-start-2" : ""}`}>
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="rounded-lg transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-green-700">
                        {project.category}
                      </div>
                    </div>
                  </FadeInSection>

                  <FadeInSection direction={project.reverse ? "left" : "right"} delay={index * 200 + 100}>
                    <div className={project.reverse ? "lg:col-start-1" : ""}>
                      <h3 className="text-3xl font-semibold text-gray-900 mb-4 transition-colors duration-300 hover:text-blue-600">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-700 mb-4 transition-all duration-300 hover:border-blue-600 hover:pl-8">
                        "{project.quote}"
                      </blockquote>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400 transition-transform duration-300 hover:scale-125"
                            style={{ animationDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </FadeInSection>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-300 hover:bg-blue-200">
                  Testimonials
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Hear from our <span className="italic font-serif">clients</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Hear from our happy clients about their experience working with Aqua Advantage and the pools we've
                  brought to life.
                </p>
              </div>
            </FadeInSection>

            {/* Two Row Scrolling Testimonials */}
            <div className="space-y-6">
              {/* First Row - Scrolling Left to Right */}
              <div className="relative">
                <div className="flex animate-scroll-horizontal space-x-6">
                  {/* First set of testimonials */}
                  {[
                    {
                      name: "TIREBUSTER",
                      text: "Bought a used hot tub from my brother in law and have been struggling to get my water cleared up and balanced right. He came out and got it taken care of in no time and basically took me to spa school! Would recommend for sure!!!",
                    },
                    {
                      name: "Kallie Carney",
                      text: "Logan has serviced our spa for a few years now and not only does a fantastic job but he has great service as well. When we decided to upgrade our spa, he was the obvious choice. It was delivered and set up yesterday and we love it.",
                    },
                    {
                      name: "Rachelle",
                      text: "Excellent customer service! I was very pleased with the straightforward bid I received and the prompt response. Logan helped me go over options for repairing my hot tub and quickly fixed a leaking valve. It's rare to find someone in this industry who responds without trying to upsell and I appreciate that so much!",
                    },
                    {
                      name: "Devin Culley",
                      text: "What can I say, they have a 5 star rating for a reason! I feel very fortunate and thankful we have Logan and his top notch customer service here in southern idaho! THANK YOU LOGAN AND CREW!",
                    },
                    {
                      name: "Monte Watson",
                      text: "Totally impressed with Logan at Aqua Advantage! Had a slow leak in my hot tub. Logan came and diagnosed the problem thoroughly. Order the parts and and had me back in the water very quickly. Recommend him for great work and superior service!",
                    },
                    {
                      name: "HeathAndStacey Runyon",
                      text: "OUTSTANDING!!! I stumbled onto Aqua Advantage through a Facebook ad and I couldn't be more pleased with my experience. Logan is reliable, knowledgeable, professional and friendly. It has been such a gift to have help with maintaining our spa.",
                    },
                    {
                      name: "Michael Simcoe",
                      text: "Very professional staff. Logan was able to balance the chemicals for my spa, and has a top notch service program. The price was very reasonable, and the service was same day. I would recommend Aqua Advantage for anyone who enjoys clean and clear water in Southern Idaho.",
                    },
                    {
                      name: "wondercutDeb ruler",
                      text: "Our spa was not an easy fix. Logan was tenacious. What a great guy! He knows his stuff and I am ever so grateful.",
                    },
                  ].map((testimonial, index) => (
                    <Card
                      key={`row1-first-${index}`}
                      className="flex-shrink-0 w-80 p-6 group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-green-500 text-green-500 transition-transform duration-300 group-hover:scale-110"
                            style={{ animationDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                          {testimonial.name}
                        </span>
                      </div>
                    </Card>
                  ))}

                  {/* Duplicate set for seamless loop */}
                  {[
                    {
                      name: "TIREBUSTER",
                      text: "Bought a used hot tub from my brother in law and have been struggling to get my water cleared up and balanced right. He came out and got it taken care of in no time and basically took me to spa school! Would recommend for sure!!!",
                    },
                    {
                      name: "Kallie Carney",
                      text: "Logan has serviced our spa for a few years now and not only does a fantastic job but he has great service as well. When we decided to upgrade our spa, he was the obvious choice. It was delivered and set up yesterday and we love it.",
                    },
                    {
                      name: "Rachelle",
                      text: "Excellent customer service! I was very pleased with the straightforward bid I received and the prompt response. Logan helped me go over options for repairing my hot tub and quickly fixed a leaking valve. It's rare to find someone in this industry who responds without trying to upsell and I appreciate that so much!",
                    },
                    {
                      name: "Devin Culley",
                      text: "What can I say, they have a 5 star rating for a reason! I feel very fortunate and thankful we have Logan and his top notch customer service here in southern idaho! THANK YOU LOGAN AND CREW!",
                    },
                    {
                      name: "Monte Watson",
                      text: "Totally impressed with Logan at Aqua Advantage! Had a slow leak in my hot tub. Logan came and diagnosed the problem thoroughly. Order the parts and and had me back in the water very quickly. Recommend him for great work and superior service!",
                    },
                    {
                      name: "HeathAndStacey Runyon",
                      text: "OUTSTANDING!!! I stumbled onto Aqua Advantage through a Facebook ad and I couldn't be more pleased with my experience. Logan is reliable, knowledgeable, professional and friendly. It has been such a gift to have help with maintaining our spa.",
                    },
                    {
                      name: "Michael Simcoe",
                      text: "Very professional staff. Logan was able to balance the chemicals for my spa, and has a top notch service program. The price was very reasonable, and the service was same day. I would recommend Aqua Advantage for anyone who enjoys clean and clear water in Southern Idaho.",
                    },
                    {
                      name: "wondercutDeb ruler",
                      text: "Our spa was not an easy fix. Logan was tenacious. What a great guy! He knows his stuff and I am ever so grateful.",
                    },
                  ].map((testimonial, index) => (
                    <Card
                      key={`row1-second-${index}`}
                      className="flex-shrink-0 w-80 p-6 group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-green-500 text-green-500 transition-transform duration-300 group-hover:scale-110"
                            style={{ animationDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                          {testimonial.name}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Second Row - Scrolling Right to Left */}
              <div className="relative">
                <div className="flex animate-scroll-horizontal-reverse space-x-6">
                  {/* Second set of testimonials */}
                  {[
                    {
                      name: "Marc Hernandez",
                      text: "Very fast and friendly service. Logan is very professional he went above and beyond to get our hot tub going. There prices are very reasonable and they offer more than just there service they carry an assortment of product as well. I would highly recommend Aqua Advantage!!!!!",
                    },
                    {
                      name: "Brandy Hennefer",
                      text: "Logan responds fast! Works hard!! Knowledgeable! Honest! Great experience and reasonable! Definitely will call him again!!",
                    },
                    {
                      name: "Alex Mitton",
                      text: "Awesome to work with! Called them out because I couldnt get my hot tub to stop tripping the disconnect breaker. Quickly diagnosed the problem and got it working. Super responsive, helpful, answered all my questions!",
                    },
                    {
                      name: "EJ Mercer",
                      text: "Logan was very helpful and helped me diagnose and issue with my hot tub over email.",
                    },
                    {
                      name: "Eli Hansen",
                      text: "Best Spa guy we have ever had. I would absolutely recommend Logan. We use Logan for our Hot Tub. he has been great to work with and come on time and keeps in good communication. knows his stuff",
                    },
                    {
                      name: "Nikki Engkraf",
                      text: "Very prompt, knowledgeable, thorough and fair. Great customer relation skills!",
                    },
                    {
                      name: "Richie Oppe",
                      text: "the best service and helped us understand how to take care of our hot tub brings supplies to me at work and always answer's my call thank you Logan",
                    },
                    {
                      name: "Stacey Runyon",
                      text: "Logan is reliable, knowledgeable, professional and friendly. It has been such a gift to have help with maintaining our spa. He doesn't just test the water, he cleans the filters, adds water as needed, cleans the spa cover and balances the water as appropriate.",
                    },
                    {
                      name: "Jino Castañeda",
                      text: "Logan is incredible. he's very knowledgeable, very reliable, won't quit until the job is done. he is a great guy, and always down to help out or give tips even over the phone",
                    },
                  ].map((testimonial, index) => (
                    <Card
                      key={`row2-first-${index}`}
                      className="flex-shrink-0 w-80 p-6 group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-green-500 text-green-500 transition-transform duration-300 group-hover:scale-110"
                            style={{ animationDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                          {testimonial.name}
                        </span>
                      </div>
                    </Card>
                  ))}

                  {/* Duplicate set for seamless loop */}
                  {[
                    {
                      name: "Marc Hernandez",
                      text: "Very fast and friendly service. Logan is very professional he went above and beyond to get our hot tub going. There prices are very reasonable and they offer more than just there service they carry an assortment of product as well. I would highly recommend Aqua Advantage!!!!!",
                    },
                    {
                      name: "Brandy Hennefer",
                      text: "Logan responds fast! Works hard!! Knowledgeable! Honest! Great experience and reasonable! Definitely will call him again!!",
                    },
                    {
                      name: "Alex Mitton",
                      text: "Awesome to work with! Called them out because I couldnt get my hot tub to stop tripping the disconnect breaker. Quickly diagnosed the problem and got it working. Super responsive, helpful, answered all my questions!",
                    },
                    {
                      name: "EJ Mercer",
                      text: "Logan was very helpful and helped me diagnose and issue with my hot tub over email.",
                    },
                    {
                      name: "Eli Hansen",
                      text: "Best Spa guy we have ever had. I would absolutely recommend Logan. We use Logan for our Hot Tub. he has been great to work with and come on time and keeps in good communication. knows his stuff",
                    },
                    {
                      name: "Nikki Engkraf",
                      text: "Very prompt, knowledgeable, thorough and fair. Great customer relation skills!",
                    },
                    {
                      name: "Richie Oppe",
                      text: "the best service and helped us understand how to take care of our hot tub brings supplies to me at work and always answer's my call thank you Logan",
                    },
                    {
                      name: "Stacey Runyon",
                      text: "Logan is reliable, knowledgeable, professional and friendly. It has been such a gift to have help with maintaining our spa. He doesn't just test the water, he cleans the filters, adds water as needed, cleans the spa cover and balances the water as appropriate.",
                    },
                    {
                      name: "Jino Castañeda",
                      text: "Logan is incredible. he's very knowledgeable, very reliable, won't quit until the job is done. he is a great guy, and always down to help out or give tips even over the phone",
                    },
                  ].map((testimonial, index) => (
                    <Card
                      key={`row2-second-${index}`}
                      className="flex-shrink-0 w-80 p-6 group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-green-500 text-green-500 transition-transform duration-300 group-hover:scale-110"
                            style={{ animationDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                          {testimonial.name}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Book Service CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeInSection>
              <PhoneButton
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
                asChild
              >
                Book Service
              </PhoneButton>
            </FadeInSection>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Our Work Gallery</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore our diverse range of pool and spa projects, showcasing our commitment to quality and design.
                </p>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Large Featured Image */}
              <div className="lg:col-span-2 row-span-2 relative overflow-hidden rounded-lg group hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/gallery/Gallery Image 1.jpg"
                  alt="Large Featured Pool"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Medium Landscape Image */}
              <div className="relative overflow-hidden rounded-lg group hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/gallery/Gallery Image 2.jpg"
                  alt="Medium Landscape Pool"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Medium Portrait Image */}
              <div className="relative overflow-hidden rounded-lg group hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/gallery/Gallery Image 3.jpg"
                  alt="Medium Portrait Spa"
                  width={400}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Small Square Image */}
              <div className="relative overflow-hidden rounded-lg group hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/gallery/Gallery Image 4.jpg"
                  alt="Small Square Hot Tub"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Wide Panoramic Image */}
              <div className="relative overflow-hidden rounded-lg group hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/gallery/Gallery Image 5.jpg"
                  alt="Wide Panoramic Pool"
                  width={800}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Tall Narrow Image */}
              <div className="relative overflow-hidden rounded-lg group hover:shadow-xl transition-all duration-500">
                <Image
                  src="/images/gallery/Gallery Image 6.jpg"
                  alt="Tall Narrow Spa"
                  width={400}
                  height={800}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-300 hover:bg-blue-200">
                  FAQs
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Frequently asked <span className="italic font-serif">questions</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get answers to common questions about our pool and spa services.
                </p>
              </div>
            </FadeInSection>

            <div className="space-y-4">
              {[
                {
                  question: "How long does pool equipment repair typically take?",
                  answer:
                    "Most equipment repairs can be completed within 1-3 days, depending on parts availability and the complexity of the issue. We stock common parts and can often complete repairs the same day.",
                },
                {
                  question: "Do you offer warranties on new equipment installations?",
                  answer:
                    "Yes, all new equipment comes with manufacturer warranties, and we provide additional service warranties on our installation work. Warranty periods vary by equipment type and manufacturer.",
                },
                {
                  question: "What's the difference between new and used spa pricing?",
                  answer:
                    "Used spas typically cost 40-60% less than new models. All our used spas are thoroughly inspected, refurbished as needed, and come with a limited warranty. We'll help you determine the best option for your budget and needs.",
                },
                {
                  question: "Can you automate my existing pool system?",
                  answer:
                    "In most cases, yes! We can retrofit automation systems to existing pools and spas. Our technicians will assess your current setup and recommend the best automation solution for your specific system.",
                },
                {
                  question: "How often should I purchase pool chemicals?",
                  answer:
                    "Chemical usage varies by pool size, usage, and season. On average, residential pools need chemical replenishment every 2-4 weeks. We offer delivery services and can set up automatic delivery schedules.",
                },
                {
                  question: "Do you service all brands of pool and spa equipment?",
                  answer:
                    "Yes, our certified technicians are trained to service all major brands of pool and spa equipment including Pentair, Hayward, Jandy, Balboa, and many others.",
                },
              ].map((faq, index) => (
                <FadeInSection key={index} delay={index * 100}>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all duration-300">
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none group-hover:bg-gray-50 transition-colors duration-300">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors duration-300">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-all duration-300 group-open:rotate-180">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection delay={600}>
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">Still have questions?</p>
                <PhoneButton
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
                  asChild
                >
                  Contact Us
                </PhoneButton>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeInSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Transform your backyard into the aquatic paradise you've always dreamed of. 
                  Contact us today for a free consultation and quote.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <ContactForm />
            </FadeInSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div>
                <Link href="/" className="flex items-center space-x-2 mb-6 group cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src="/images/logo/logo-64.png"
                      alt="Aqua Advantage Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-semibold text-xl transition-colors duration-300 group-hover:text-blue-400">Aqua Advantage</span>
                </Link>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Transforming ordinary backyards into extraordinary aquatic retreats with professional pool and spa
                  services.
                </p>
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Burley, ID</span>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Services</h4>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link href="#services" className="hover:text-white transition-colors duration-300">
                      Pool Cleaning
                    </Link>
                  </li>
                  <li>
                    <Link href="#services" className="hover:text-white transition-colors duration-300">
                      Chemical Balancing
                    </Link>
                  </li>
                  <li>
                    <Link href="#services" className="hover:text-white transition-colors duration-300">
                      Equipment Repair
                    </Link>
                  </li>
                  <li>
                    <Link href="#services" className="hover:text-white transition-colors duration-300">
                      Pool Maintenance
                    </Link>
                  </li>
                  <li>
                    <Link href="#services" className="hover:text-white transition-colors duration-300">
                      Hot Tub Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#services" className="hover:text-white transition-colors duration-300">
                      Pool Opening/Closing
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <Link href="#about" className="hover:text-white transition-colors duration-300">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#portfolio" className="hover:text-white transition-colors duration-300">
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link href="#faqs" className="hover:text-white transition-colors duration-300">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/aquaspa" className="hover:text-white transition-colors duration-300">
                      Shop Spa
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
                <div className="space-y-3 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>(208) 727-7909</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>info@AquaAdvantagePoolandSpa.com</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-white">200+ Happy Customers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm">© 2025 Aqua Advantage. All rights reserved.</p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Terms of Service
                </Link>
                {/* Facebook Logo */}
                <a 
                  href="https://www.facebook.com/aquaadvantageservices" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  aria-label="Visit our Facebook page"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
