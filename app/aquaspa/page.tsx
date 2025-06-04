"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Star, Shield, Zap, MapPin, Phone } from "lucide-react"
import Link from "next/link"

const hotTubs = [
  {
    id: "grand-bahama",
    name: "Grand Bahama",
    title: "Island Series Elite Hot Tub",
    price: 18995,
    originalPrice: 21995,
    image: "/images/products/Grand Bahama Gallery.jpg",
    features: [
      "64 Helix Jets (Elite)",
      "6 Person Capacity",
      "Dual Footblasters",
      "Cascade Falls Feature",
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "91\" x 91\" x 36\"",
      waterCapacity: "390 Gallons",
      jets: "44-64 Helix Jets",
    },
  },
  {
    id: "grand-cayman",
    name: "Grand Cayman",
    title: "Island Series Elite Hot Tub",
    price: 19995,
    originalPrice: 22995,
    image: "/images/products/Grand Cayman Gallery.jpg",
    features: [
      "64 Helix Jets (Elite)",
      "7 Person Capacity",
      "Dual Footblasters",
      "Cascade Falls Feature",
    ],
    specs: {
      seating: "7 Adults",
      dimensions: "91\" x 91\" x 36\"",
      waterCapacity: "410 Gallons",
      jets: "44-64 Helix Jets",
    },
  },
  {
    id: "captiva",
    name: "Captiva",
    title: "Island Series Family Hot Tub",
    price: 16995,
    originalPrice: 19995,
    image: "/images/products/Captiva Gallery.jpg",
    features: [
      "54 Helix Jets (Elite)",
      "7 Person Capacity",
      "Dual Footblasters",
      "Cascade Falls Feature",
    ],
    specs: {
      seating: "7 Adults",
      dimensions: "84\" x 84\" x 36\"",
      waterCapacity: "335 Gallons",
      jets: "32-54 Helix Jets",
    },
  },
  {
    id: "antigua",
    name: "Antigua",
    title: "Island Series Compact Hot Tub",
    price: 15995,
    originalPrice: 18995,
    image: "/images/products/Antigua Gallery.jpg",
    features: [
      "54 Helix Jets (Elite)",
      "6 Person Capacity",
      "Dual Footblasters",
      "Cascade Falls Feature",
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "84\" x 84\" x 36\"",
      waterCapacity: "320 Gallons",
      jets: "32-54 Helix Jets",
    },
  },
  {
    id: "wisteria",
    name: "Wisteria",
    title: "Garden Series Plug & Play",
    price: 8995,
    originalPrice: 10995,
    image: "/images/products/Wisteria Gallery.jpg",
    features: [
      "27 Stainless Steel Jets",
      "6 Person Capacity",
      "120V Plug & Play",
      "Digital LCD Control",
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "84\" x 84\" x 36\"",
      waterCapacity: "330 Gallons",
      jets: "27 Stainless Steel",
    },
  },
  {
    id: "plume",
    name: "Plume",
    title: "Garden Series Efficient Spa",
    price: 8495,
    originalPrice: 10495,
    image: "/images/products/Plume Gallery.jpg",
    features: [
      "27 Stainless Steel Jets",
      "6 Person Capacity",
      "120V Plug & Play",
      "Digital LCD Control",
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "84\" x 78\" x 34\"",
      waterCapacity: "295 Gallons",
      jets: "27 Stainless Steel",
    },
  },
  {
    id: "viola",
    name: "Viola",
    title: "Garden Series Intimate Spa",
    price: 6995,
    originalPrice: 8995,
    image: "/images/products/Viola Gallery .jpg",
    features: [
      "21 Stainless Steel Jets",
      "2 Person Capacity",
      "120V Plug & Play",
      "Digital LCD Control",
    ],
    specs: {
      seating: "2 Adults",
      dimensions: "82\" x 65\" x 31\"",
      waterCapacity: "220 Gallons",
      jets: "21 Stainless Steel",
    },
  },
  {
    id: "activeplus-ep-12",
    name: "ActivePlus EP-12",
    title: "TidalFit Exercise Pool",
    price: 28995,
    originalPrice: 32995,
    image: "/images/products/ActivePlus EP-12 Gallery.jpg",
    features: [
      "Swim Jet System",
      "Exercise Pool",
      "Year-Round Use",
      "Optional Hydrotherapy",
    ],
    specs: {
      seating: "Exercise Pool",
      dimensions: "144\" x 91\" x 52\"",
      waterCapacity: "1315 Gallons",
      jets: "Swim Jets + Optional 28 Helix",
    },
  },
  {
    id: "pro-ep-15",
    name: "Pro EP-15",
    title: "TidalFit Professional Exercise Pool",
    price: 36995,
    originalPrice: 42995,
    image: "/images/products/Pro EP-15 Gallery.jpg",
    features: [
      "Variable Speed Swim Jets",
      "Professional Exercise Pool",
      "Enhanced Hydrotherapy",
      "Commercial-Grade Construction",
    ],
    specs: {
      seating: "Professional Pool",
      dimensions: "180\" x 91\" x 60\"",
      waterCapacity: "2075 Gallons",
      jets: "Variable Speed + Optional 34 Helix",
    },
  },
]

export default function HotTubsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)

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
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } opacity-100 ${
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
                lastScrollY > 0 ? "text-gray-900" : "text-gray-900"
              }`}>
                Aqua Advantage
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <Link
                  key={item}
                  href={item === "Shop Spa" ? "/aquaspa" : `/#${item.toLowerCase().replace(" ", "-")}`}
                  className={`hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group ${
                    lastScrollY > 0 ? "text-gray-900" : "text-gray-900"
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
                  lastScrollY > 0 ? "text-gray-900" : "text-gray-900"
                }`}
              >
                <MapPin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm">Burley, ID</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors duration-300 ${
                lastScrollY > 0 ? "text-gray-900" : "text-gray-900"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                } ${lastScrollY > 0 ? 'bg-gray-900' : 'bg-gray-900'}`} />
                <span className={`w-full h-0.5 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                } ${lastScrollY > 0 ? 'bg-gray-900' : 'bg-gray-900'}`} />
                <span className={`w-full h-0.5 transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                } ${lastScrollY > 0 ? 'bg-gray-900' : 'bg-gray-900'}`} />
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
                  href={item === "Shop Spa" ? "/aquaspa" : `/#${item.toLowerCase().replace(" ", "-")}`}
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

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Discover Your Perfect Hot Tub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience luxury, relaxation, and wellness with our premium collection of hot tubs.
              Each model is designed to provide the perfect balance of comfort, features, and value.
            </p>
          </div>
        </div>
      </section>

      {/* Hot Tubs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotTubs.map((tub, index) => (
              <Card
                key={tub.id}
                className={`bg-white border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tub.image}
                    alt={tub.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
                    Best Seller
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">{tub.name}</h3>
                  <p className="text-gray-600 mb-4">{tub.title}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Seating</p>
                      <p className="font-semibold text-gray-900">{tub.specs.seating}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Jets</p>
                      <p className="font-semibold text-gray-900">{tub.specs.jets}</p>
                  </div>
                </div>

                  <ul className="space-y-2 mb-6">
                    {tub.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 text-blue-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  >
                    <a href={`/aquaspa/${tub.id}`}>
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Hot Tubs?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the perfect blend of luxury, innovation, and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Built with the finest materials and backed by industry-leading warranties
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Energy Efficient</h3>
              <p className="text-gray-600">
                Advanced insulation and smart technology keep operating costs low
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Luxury Features</h3>
              <p className="text-gray-600">
                Premium jets, lighting, and controls for the ultimate relaxation experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Ready to Transform Your Backyard?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schedule a consultation with our experts to find your perfect hot tub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              asChild
            >
              <a href="tel:+12087277909">Schedule Consultation</a>
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="tel:+12087277909">Get a Quote</a>
            </Button>
          </div>
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
                  <Link href="/#services" className="hover:text-white transition-colors duration-300">
                    Pool Cleaning
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors duration-300">
                    Chemical Balancing
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors duration-300">
                    Equipment Repair
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors duration-300">
                    Pool Maintenance
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors duration-300">
                    Hot Tub Service
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors duration-300">
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
                  <a href="/#about" className="hover:text-white transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/#testimonials" className="hover:text-white transition-colors duration-300">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="/#faqs" className="hover:text-white transition-colors duration-300">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/aquaspa" className="hover:text-white transition-colors duration-300">
                    Shop Spa
                  </a>
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
                  <span>info@aquaadvantage.com</span>
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
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Terms of Service
              </a>
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
  )
} 