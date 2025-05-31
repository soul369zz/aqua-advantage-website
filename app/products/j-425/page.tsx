"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Zap, Shield, Smartphone, Clock, ChevronDown } from "lucide-react"
import Image from "next/image"

const productImages = [
  "/placeholder.svg?height=600&width=800&text=J-425+Premium+Hot+Tub",
  "/placeholder.svg?height=600&width=800&text=J-425+Interior+View",
  "/placeholder.svg?height=600&width=800&text=J-425+Jet+System",
  "/placeholder.svg?height=600&width=800&text=J-425+Control+Panel",
]

const colorOptions = [
  { name: "Sterling Gray", color: "#8B9DC3", image: "/placeholder.svg?height=100&width=100" },
  { name: "Midnight Black", color: "#2C2C2C", image: "/placeholder.svg?height=100&width=100" },
  { name: "Desert Sand", color: "#D4B896", image: "/placeholder.svg?height=100&width=100" },
  { name: "Coastal Blue", color: "#4A90A4", image: "/placeholder.svg?height=100&width=100" },
]

const features = [
  {
    title: "Ultimate Therapeutic Experience",
    description:
      "Indulge in the most advanced hydrotherapy with 55 precision jets designed to provide targeted relief and complete muscle relaxation",
    image: "/placeholder.svg?height=300&width=400&text=Premium+Therapy",
  },
  {
    title: "Luxurious Space for Everyone",
    description:
      "Entertain in style with seating for up to 8 adults in a spacious design that combines comfort with sophisticated elegance",
    image: "/placeholder.svg?height=300&width=400&text=Luxury+Seating",
  },
  {
    title: "Maximum Energy Savings",
    description:
      "Enjoy premium luxury while saving up to 60% on energy costs with our most advanced insulation and smart heating technology",
    image: "/placeholder.svg?height=300&width=400&text=Energy+Smart",
  },
  {
    title: "Resort-Style Entertainment",
    description:
      "Transform your backyard into a luxury resort with premium sound systems, dynamic lighting, and smart home integration",
    image: "/placeholder.svg?height=300&width=400&text=Entertainment+Hub",
  },
  {
    title: "Crystal Pure Water System",
    description:
      "Experience the purest water with our advanced quad-filtration system that maintains perfect clarity and balance automatically",
    image: "/placeholder.svg?height=300&width=400&text=Pure+Water",
  },
  {
    title: "Lifetime Investment Quality",
    description:
      "Built with commercial-grade materials and backed by our most comprehensive warranty for decades of worry-free enjoyment",
    image: "/placeholder.svg?height=300&width=400&text=Premium+Quality",
  },
]

const relatedProducts = [
  { name: "J-315", price: "$8,995", image: "/placeholder.svg?height=200&width=300&text=J-315" },
  { name: "J-215", price: "$6,995", image: "/placeholder.svg?height=200&width=300&text=J-215" },
  { name: "J-235", price: "$7,495", image: "/placeholder.svg?height=200&width=300&text=J-235" },
]

export default function J425ProductPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [sectionsInView, setSectionsInView] = useState<{ [key: string]: boolean }>({})
  const heroRef = useRef<HTMLDivElement>(null)
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({})

  const toggleDropdown = (section: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const dropdownSections = [
    {
      id: "features",
      title: "Features",
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Premium Hydrotherapy System</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 55 precision-engineered jets</li>
                <li>• Triple variable speed pumps</li>
                <li>• Advanced massage targeting zones</li>
                <li>• Customizable pressure settings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Entertainment & Ambiance</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Premium surround sound system</li>
                <li>• Dynamic LED lighting with effects</li>
                <li>• Wireless Bluetooth connectivity</li>
                <li>• Waterproof speakers with bass</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Advanced Water Care</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Quad-stage filtration system</li>
                <li>• UV-C, ozone, and mineral sanitization</li>
                <li>• Automated cleaning cycles</li>
                <li>• Smart water chemistry monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Luxury Comfort Features</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Premium captain's chairs</li>
                <li>• Memory foam headrests</li>
                <li>• Slip-resistant surfaces</li>
                <li>• Built-in storage and cup holders</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "specifications",
      title: "Specifications",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Dimensions</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Length:</span>
                  <span>9'2" (279 cm)</span>
                </div>
                <div className="flex justify-between">
                  <span>Width:</span>
                  <span>9'2" (279 cm)</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span>40" (102 cm)</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight (dry):</span>
                  <span>1,200 lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight (filled):</span>
                  <span>6,200 lbs</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Capacity</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Seating:</span>
                  <span>7-8 adults</span>
                </div>
                <div className="flex justify-between">
                  <span>Water capacity:</span>
                  <span>550 gallons</span>
                </div>
                <div className="flex justify-between">
                  <span>Jets:</span>
                  <span>55 hydrotherapy</span>
                </div>
                <div className="flex justify-between">
                  <span>Pumps:</span>
                  <span>3 x 3.5 HP</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Electrical</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Voltage:</span>
                  <span>240V</span>
                </div>
                <div className="flex justify-between">
                  <span>Amperage:</span>
                  <span>80 AMP</span>
                </div>
                <div className="flex justify-between">
                  <span>GFCI:</span>
                  <span>Required</span>
                </div>
                <div className="flex justify-between">
                  <span>Heater:</span>
                  <span>6kW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "warranty",
      title: "Warranty & Repairs",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Premium Warranty Coverage</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h5 className="font-medium text-gray-900">Structure</h5>
                  <p className="text-gray-600">Lifetime warranty on shell structure</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h5 className="font-medium text-gray-900">Surface</h5>
                  <p className="text-gray-600">15 years on premium acrylic surface</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h5 className="font-medium text-gray-900">Components</h5>
                  <p className="text-gray-600">10 years on pumps, heater, and control system</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h5 className="font-medium text-gray-900">Cabinet</h5>
                  <p className="text-gray-600">10 years on cabinet and premium cover</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Premium Service & Support</h4>
              <div className="space-y-3 text-gray-600">
                <p>• 24/7 premium customer support</p>
                <p>• Certified master technician network</p>
                <p>• Genuine OEM replacement parts</p>
                <p>• Priority mobile service</p>
                <p>• Comprehensive maintenance programs</p>
                <p>• Emergency repair services</p>
              </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <h5 className="font-medium text-emerald-800 mb-2">Platinum Extended Warranty</h5>
                <p className="text-emerald-700 text-sm">
                  Extend your coverage up to 20 years with our most comprehensive protection plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "materials",
      title: "Materials & Composition",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Premium Shell Construction</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Ultra-Premium Acrylic</h5>
                  <p className="text-gray-600 text-sm">
                    Top-grade Lucite® acrylic with maximum UV protection and lifetime stain resistance. Non-porous
                    surface with antimicrobial properties.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Commercial-Grade Structure</h5>
                  <p className="text-gray-600 text-sm">
                    Multi-layer fiberglass reinforcement with premium foam backing for maximum durability and superior
                    insulation.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Reinforced Steel Frame</h5>
                  <p className="text-gray-600 text-sm">
                    Heavy-duty galvanized steel frame with premium powder coating for ultimate corrosion resistance.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Maximum Efficiency</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Premium Insulation System</h5>
                  <p className="text-gray-600 text-sm">
                    Advanced foam insulation system maintains temperature and reduces energy costs by up to 60%.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Premium Cabinet</h5>
                  <p className="text-gray-600 text-sm">
                    Weather-resistant polymer panels with enhanced UV stabilizers. Maintenance-free and fade-resistant.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Premium Cover System</h5>
                  <p className="text-gray-600 text-sm">
                    Marine-grade vinyl cover with high-density foam core and enhanced vapor barrier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  useEffect(() => {
    setIsVisible(true)

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSectionsInView((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }))
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Images */}
            <div
              className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
                <Image
                  src={productImages[currentImage] || "/placeholder.svg"}
                  alt="J-425 Hot Tub"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-3 mt-4">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      currentImage === index ? "border-emerald-500 shadow-lg" : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={productImages[index] || "/placeholder.svg"}
                      alt={`View ${index + 1}`}
                      width={80}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4 animate-pulse">
                Premium Model
              </Badge>

              <h1 className="text-5xl font-bold mb-4 text-gray-900">J-425</h1>
              <p className="text-xl text-gray-600 mb-6">Premium Luxury Hot Tub</p>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-emerald-600">$12,995</span>
                <span className="text-lg text-gray-400 line-through">$14,995</span>
                <Badge className="bg-red-100 text-red-700 border-red-200">Save $2,000</Badge>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Premium Financing Available</p>
                <p className="text-2xl font-semibold text-gray-900">$165/month</p>
                <p className="text-sm text-gray-500">for 84 months at 6.9% APR</p>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Choose Your Finish</h3>
                <div className="flex gap-3">
                  {colorOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`relative w-16 h-16 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                        selectedColor === index ? "border-emerald-500 scale-110 shadow-lg" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: option.color }}
                    >
                      {selectedColor === index && (
                        <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">{colorOptions[selectedColor].name}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Schedule Consultation
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                >
                  Request Quote
                </Button>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-sm text-gray-500">Seating Capacity</p>
                  <p className="font-semibold text-gray-900">7-8 Adults</p>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-sm text-gray-500">Dimensions</p>
                  <p className="font-semibold text-gray-900">9'2" x 9'2"</p>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-sm text-gray-500">Water Capacity</p>
                  <p className="font-semibold text-gray-900">550 Gallons</p>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-sm text-gray-500">Jets</p>
                  <p className="font-semibold text-gray-900">55 Hydrotherapy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Dropdowns */}
      <section
        id="product-info"
        data-animate
        className={`py-16 bg-gray-50 transition-all duration-1000 delay-200 ${sectionsInView["product-info"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {dropdownSections.map((section, index) => (
              <div
                key={section.id}
                className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md ${
                  sectionsInView["product-info"] ? `animate-fade-in-up` : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleDropdown(section.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openDropdowns[section.id] ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openDropdowns[section.id] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4">{section.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        data-animate
        className={`py-16 transition-all duration-1000 delay-200 ${sectionsInView.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">About the J-425 Hot Tub</h2>
              <p className="text-lg text-gray-600 mb-6">
                The J-425 represents the pinnacle of luxury and performance. This premium hot tub combines cutting-edge
                technology with sophisticated design to create the ultimate relaxation experience for discerning
                homeowners.
              </p>
              <p className="text-gray-500 mb-8">
                With the most advanced features and premium materials, the J-425 transforms your backyard into a
                world-class spa retreat. Experience unparalleled comfort, therapeutic benefits, and entertainment in one
                exceptional package.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center transform transition-all duration-500 hover:scale-110">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">55</div>
                  <div className="text-sm text-gray-500">Hydrotherapy Jets</div>
                </div>
                <div className="text-center transform transition-all duration-500 hover:scale-110">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">7-8</div>
                  <div className="text-sm text-gray-500">Adult Seating</div>
                </div>
                <div className="text-center transform transition-all duration-500 hover:scale-110">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">550</div>
                  <div className="text-sm text-gray-500">Gallon Capacity</div>
                </div>
                <div className="text-center transform transition-all duration-500 hover:scale-110">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">104°F</div>
                  <div className="text-sm text-gray-500">Max Temperature</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600&text=J-425+Premium+Lifestyle"
                alt="J-425 in luxury backyard setting"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section
        id="benefits"
        data-animate
        className={`py-16 bg-gray-50 transition-all duration-1000 delay-300 ${sectionsInView.benefits ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Benefits</h2>
            <p className="text-xl text-gray-600">Experience the premium benefits of owning a J-425</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-white border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  sectionsInView.benefits ? `animate-fade-in-up` : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Integration */}
      <section
        id="app"
        data-animate
        className={`py-16 bg-gray-50 transition-all duration-1000 delay-500 ${sectionsInView.app ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Control Your J-425 from Anywhere</h2>
              <p className="text-lg text-gray-600 mb-6">
                The Aqua Advantage mobile app puts complete control of your premium hot tub at your fingertips. Adjust
                temperature, control lighting, and monitor system status from anywhere.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2">
                  <Smartphone className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-700">Remote temperature control</span>
                </div>
                <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2">
                  <Zap className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-700">LED lighting customization</span>
                </div>
                <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-700">System diagnostics and alerts</span>
                </div>
                <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-700">Scheduling and automation</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Download App
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=400&text=Premium+Mobile+App"
                alt="Mobile App Interface"
                width={400}
                height={500}
                className="mx-auto hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section
        id="related"
        data-animate
        className={`py-16 transition-all duration-1000 delay-400 ${sectionsInView.related ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Explore Our Collection</h2>
            <p className="text-xl text-gray-600">Discover other premium hot tub models</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((product, index) => (
              <Card
                key={index}
                className={`bg-white border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-2 ${
                  sectionsInView.related ? `animate-fade-in-up` : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-2xl font-bold text-emerald-600 mb-4">{product.price}</p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Transform Your Backyard?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience the luxury and relaxation of the J-425 Premium Hot Tub in your own home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Schedule Your Consultation
            </Button>
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
