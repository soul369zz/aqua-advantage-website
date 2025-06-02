"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Zap, Shield, Smartphone, Clock, ChevronDown, Star, MapPin, Phone, Settings, Droplets, Wifi, Volume2, Lightbulb, Waves, Thermometer } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ProductSpecs {
  seating: string;
  dimensions: string;
  waterCapacity: string;
  jets: string;
  electrical: {
    voltage: string;
    amperage: string;
    heater: string;
    pumps: string;
  };
  waterChemistry: {
    ph: string;
    alkalinity: string;
    sanitizer: string;
    calcium: string;
  };
  maintenance: {
    filterChange: string;
    waterChange: string;
    chemicalCheck: string;
    cleaning: string;
  };
}

interface ProductWarranty {
  shell: string;
  surface: string;
  components: string;
  cabinet: string;
  labor: string;
}

interface ProductInstallation {
  spaceRequired: string;
  foundation: string;
  electrical: string;
  drainage: string;
  access: string;
}

interface ProductEnergyEfficiency {
  rating: string;
  monthlyCost: string;
  insulation: string;
  cover: string;
}

interface ProductFeature {
  title: string;
  description: string;
  image: string;
}

interface ProductReview {
  rating: number;
  title: string;
  text: string;
  author: string;
  date: string;
}

interface ProductReviews {
  averageRating: number;
  totalReviews: number;
  highlights: ProductReview[];
}

interface ProductAccessory {
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductFAQ {
  question: string;
  answer: string;
}

interface Product {
  name: string;
  title: string;
  price: number;
  originalPrice: number;
  images: string[];
  colorOptions: { name: string; color: string; image?: string; }[];
  specs: ProductSpecs;
  warranty: ProductWarranty;
  installation: ProductInstallation;
  energyEfficiency: ProductEnergyEfficiency;
  features: ProductFeature[];
  reviews: ProductReviews;
  accessories: ProductAccessory[];
  faqs: ProductFAQ[];
  controlFeatures: {
    title: string;
    description: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    standardFeatures: Array<{
      title: string;
      description: string;
      image: string;
      category: string;
    }>;
    optionalFeatures: Array<{
      title: string;
      description: string;
      image: string;
      category: string;
    }>;
  };
}

// Product data - in a real app, this would come from a database or API
const products: Record<string, Product> = {
  "grand-bahama": {
    name: "Grand Bahama",
    title: "Island Series Elite Hot Tub",
    price: 18995,
    originalPrice: 21995,
    images: [
      "/images/products/GrandBahama_ELITE_900.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Brown", color: "#8B4513", image: "/images/products/Cabinetry Colors/Brown.png" },
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "91\" x 91\" x 36\"",
      waterCapacity: "390 Gallons",
      jets: "44-64 Helix Jets",
      electrical: {
        voltage: "240V",
        amperage: "60 Amp",
        heater: "5.5 kW",
        pumps: "2 Swim + 2 Therapy Pumps",
      },
      waterChemistry: {
        ph: "7.2-7.6",
        alkalinity: "80-120 ppm",
        sanitizer: "1-3 ppm",
        calcium: "150-300 ppm",
      },
      maintenance: {
        filterChange: "Every 3-4 months",
        waterChange: "Every 3-4 months",
        chemicalCheck: "2-3 times per week",
        cleaning: "Weekly skimming, monthly deep clean",
      },
    },
    warranty: {
      shell: "7 Years",
      surface: "5 Years", 
      components: "3 Years",
      cabinet: "2 Years",
      labor: "1 Year",
    },
    installation: {
      spaceRequired: "10' x 10' minimum",
      foundation: "Level concrete pad or reinforced deck",
      electrical: "240V, 60 amp GFCI breaker",
      drainage: "Access to drain or pump",
      access: "36\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "Energy Star Certified",
      monthlyCost: "$25-40",
      insulation: "Full foam insulation",
      cover: "4\" tapered energy-efficient cover",
    },
    features: [
      {
        title: "Helix Jet Technology",
        description: "Advanced Helix jets provide targeted therapeutic massage with customizable intensity and water flow patterns",
        image: "/images/products/Helix Jet Technology.jpg",
      },
      {
        title: "Dual Footblasters",
        description: "Powerful foot and calf massage jets provide relief for tired feet and improve circulation throughout your legs",
        image: "/images/products/Dual Footblasters.jpg",
      },
      {
        title: "Cascade Falls Water Feature",
        description: "Soothing waterfall feature creates a relaxing ambiance while providing gentle neck and shoulder massage",
        image: "/images/products/Cascade Falls Water Feature.jpg",
      },
    ],
    reviews: {
      averageRating: 4.8,
      totalReviews: 127,
      highlights: [
        {
          rating: 5,
          title: "Perfect for our family",
          text: "The Grand Bahama has been amazing for our family of 6. The jets are powerful and the size is perfect.",
          author: "Sarah M.",
          date: "2024-01-15",
        },
        {
          rating: 5,
          title: "Quality construction",
          text: "Very impressed with the build quality and the therapeutic benefits. Worth every penny.",
          author: "Mike R.",
          date: "2024-01-08",
        },
      ],
    },
    accessories: [
      {
        name: "Premium Cover Lifter",
        price: 299,
        description: "Hydraulic cover lifter for easy one-person operation",
        image: "/images/accessories/cover-lifter.jpg",
      },
      {
        name: "LED Lighting Kit",
        price: 199,
        description: "Color-changing LED lighting system with remote control",
        image: "/images/accessories/led-lights.jpg",
      },
    ],
    faqs: [
      {
        question: "What's included with the Grand Bahama?",
        answer: "Includes spa shell, cabinet, pumps, heater, control system, standard insulation, and energy-efficient cover.",
      },
      {
        question: "How long does installation take?",
        answer: "Professional installation typically takes 4-6 hours once electrical and foundation prep is complete.",
      },
    ],
    controlFeatures: {
      title: "Island Series Control Features",
      description: "Professional-grade control systems with trim-specific features for the ultimate spa experience.",
      features: [
        {
          icon: "Settings",
          title: "Digital Control System",
          description: "Intuitive topside control panel for temperature, jets, and lighting management"
        },
        {
          icon: "Droplets", 
          title: "DirectFlow Personal Control®",
          description: "Elite trim includes individual jet control to customize water flow and pressure (trim-specific feature)"
        },
        {
          icon: "Lightbulb",
          title: "Multi-Level LED Lighting",
          description: "Interior underwater lighting, illuminated pillows, and footwell lighting (varies by trim level)"
        },
        {
          icon: "Volume2",
          title: "Audio System Ready",
          description: "Optional Bluetooth audio integration with waterproof speakers"
        },
        {
          icon: "Zap",
          title: "Cascade Falls Control",
          description: "Standard waterfall feature with adjustable flow control, optional Pillowfall upgrade available"
        }
      ],
      standardFeatures: [
        {
          title: "Grab Rails",
          description: "These rails offer extra stability when exercising and stretching.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Accessibility"
        },
        {
          title: "Blue LED Spa Light",
          description: "This 5 in. spa light illuminates your pool during dark hours.",
          image: "/images/products/features/led-spa-light.jpg",
          category: "Lighting"
        },
        {
          title: "Grandwood Cabinets",
          description: "From the realistic wood-like texture to the matte finish, it's no wonder these cabinets are called Grandwood. These cabinets feature a tight grain pattern along with subtly varying shades of color. This subtle variance creates a more realistic look and feel of natural wood.",
          image: "/images/products/Cabinetry Colors/Grandwood Java.png",
          category: "Cabinetry"
        },
        {
          title: "Full Foam With ABS Bottom",
          description: "TidalFit models come standard with full foam insulation and an ABS bottom to protect against environmental elements.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Insulation"
        },
        {
          title: "Heater",
          description: "Every TidalFit comes with a standard heater to warm your pool to the perfect temperature in any climate.",
          image: "/images/products/features/heater-system.jpg",
          category: "Climate Control"
        },
        {
          title: "Hi-Flo Circulation System",
          description: "Advanced circulation system ensures optimal water flow and filtration for crystal clear water.",
          image: "/images/products/features/circulation-system.jpg",
          category: "Water Management"
        }
      ],
      optionalFeatures: [
        {
          title: "Aquatic Training System",
          description: "Maximize your workout in your exercise pool! You can choose between the Stationary Resistant Swim and/or the Rowing Bars and Resistant Cords.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Fitness Equipment"
        },
        {
          title: "Worldwide WiFi App",
          description: "Control your pool temperature, filter cycle, turn on pumps and much more from anywhere in the world.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Water Purification",
          description: "Whether you choose to add Diamond AOP™, Crystal ProPure™, Ozone Mixing Chamber or an Ozonator, TidalFit promotes water purification for a clean pool.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio Systems",
          description: "Complete your pool experience with our audio systems. Advanced technology and high-end speakers. Music Experience and bba™2 Audio.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Hydrotherapy",
          description: "Each model offers the hydrotherapy option to soothe aching muscles and help with relaxation.",
          image: "/images/products/features/hydrotherapy-package.jpg",
          category: "Wellness"
        },
        {
          title: "Swim Jet Systems",
          description: "TidalFit models have their own unique swim jets systems, the Quad Swim Jet System and the Dual Swim Jet System.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise Technology"
        },
        {
          title: "DynaBrite LED Lighting",
          description: "With both standard and optional LED lighting selections in our spas, you can find fun and unique ways to light up your spa for the perfect ambiance.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        }
      ]
    },
  },
  "grand-cayman": {
    name: "Grand Cayman",
    title: "Island Series Premium Hot Tub",
    price: 19995,
    originalPrice: 22995,
    images: [
      "/images/products/Grand Cayman.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Brown", color: "#8B4513", image: "/images/products/Cabinetry Colors/Brown.png" },
    ],
    specs: {
      seating: "7 Adults",
      dimensions: "91\" x 91\" x 36\"",
      waterCapacity: "410 Gallons",
      jets: "44-64 Helix Jets",
      electrical: {
        voltage: "240V",
        amperage: "50 Amp",
        heater: "5.5 kW",
        pumps: "4 Total Pumps",
      },
      waterChemistry: {
        ph: "7.2-7.6",
        alkalinity: "80-120 ppm",
        sanitizer: "1-3 ppm",
        calcium: "150-300 ppm",
      },
      maintenance: {
        filterChange: "Every 3-4 months",
        waterChange: "Every 3-4 months",
        chemicalCheck: "2-3 times per week",
        cleaning: "Weekly skimming, monthly deep clean",
      },
    },
    warranty: {
      shell: "7 Years",
      surface: "5 Years", 
      components: "3 Years",
      cabinet: "2 Years",
      labor: "1 Year",
    },
    installation: {
      spaceRequired: "10' x 10' minimum",
      foundation: "Level concrete pad or reinforced deck",
      electrical: "240V, 50 amp GFCI breaker",
      drainage: "Access to drain or pump",
      access: "36\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "Energy Star Certified",
      monthlyCost: "$28-45",
      insulation: "Full foam insulation",
      cover: "4\" tapered energy-efficient cover",
    },
    features: [
      {
        title: "Helix Jet Technology",
        description: "Advanced Helix jets provide targeted therapeutic massage with customizable intensity and water flow patterns",
        image: "/images/products/Helix Jet Technology.jpg",
      },
      {
        title: "Dual Footblasters", 
        description: "Powerful foot and calf massage jets provide relief for tired feet and improve circulation throughout your legs",
        image: "/images/products/Dual Footblasters.jpg",
      },
      {
        title: "Cascade Falls Water Feature",
        description: "Soothing waterfall feature creates a relaxing ambiance while providing gentle neck and shoulder massage",
        image: "/images/products/Cascade Falls Water Feature.jpg",
      },
    ],
    reviews: {
      averageRating: 4.9,
      totalReviews: 94,
      highlights: [
        {
          rating: 5,
          title: "Spacious and comfortable",
          text: "The Grand Cayman comfortably fits our family of 7 with room to spare. Excellent jet placement.",
          author: "Jennifer L.",
          date: "2024-01-12",
        },
        {
          rating: 5,
          title: "Premium quality",
          text: "Top-notch construction and features. The therapeutic benefits are outstanding.",
          author: "David K.",
          date: "2024-01-05",
        },
      ],
    },
    accessories: [
      {
        name: "Premium Cover Lifter",
        price: 299,
        description: "Hydraulic cover lifter for easy one-person operation",
        image: "/images/accessories/cover-lifter.jpg",
      },
      {
        name: "LED Lighting Kit",
        price: 199,
        description: "Color-changing LED lighting system with remote control",
        image: "/images/accessories/led-lights.jpg",
      },
    ],
    faqs: [
      {
        question: "What makes the Grand Cayman different from Grand Bahama?",
        answer: "The Grand Cayman offers slightly larger seating capacity (7 vs 6) and increased water capacity for enhanced comfort.",
      },
      {
        question: "Is professional installation required?",
        answer: "While not required, professional installation is highly recommended for optimal performance and warranty coverage.",
      },
    ],
    controlFeatures: {
      title: "Island Series Control Features",
      description: "Professional-grade control systems with premium features for enhanced spa experience.",
      features: [
        {
          icon: "Settings",
          title: "Digital Control System",
          description: "Intuitive topside control panel for temperature, jets, and lighting management"
        },
        {
          icon: "Droplets",
          title: "Advanced Pump Control",
          description: "Four total pumps with independent control for customized hydrotherapy experience"
        },
        {
          icon: "Lightbulb",
          title: "Multi-Level LED Lighting",
          description: "Comprehensive lighting system with interior underwater and accent lighting"
        },
        {
          icon: "Volume2",
          title: "Audio System Ready",
          description: "Optional Bluetooth audio integration with waterproof speakers"
        },
        {
          icon: "Zap",
          title: "Cascade Falls Control",
          description: "Standard waterfall feature with adjustable flow control"
        }
      ],
      standardFeatures: [
        {
          title: "Grab Rails",
          description: "These rails offer extra stability when exercising and stretching.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Accessibility"
        },
        {
          title: "Blue LED Spa Light",
          description: "This 5 in. spa light illuminates your pool during dark hours.",
          image: "/images/products/features/led-spa-light.jpg",
          category: "Lighting"
        },
        {
          title: "Grandwood Cabinets",
          description: "From the realistic wood-like texture to the matte finish, it's no wonder these cabinets are called Grandwood. These cabinets feature a tight grain pattern along with subtly varying shades of color. This subtle variance creates a more realistic look and feel of natural wood.",
          image: "/images/products/Cabinetry Colors/Grandwood Java.png",
          category: "Cabinetry"
        },
        {
          title: "Full Foam With ABS Bottom",
          description: "TidalFit models come standard with full foam insulation and an ABS bottom to protect against environmental elements.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Insulation"
        },
        {
          title: "Heater",
          description: "Every TidalFit comes with a standard heater to warm your pool to the perfect temperature in any climate.",
          image: "/images/products/features/heater-system.jpg",
          category: "Climate Control"
        },
        {
          title: "Hi-Flo Circulation System",
          description: "Advanced circulation system ensures optimal water flow and filtration for crystal clear water.",
          image: "/images/products/features/circulation-system.jpg",
          category: "Water Management"
        }
      ],
      optionalFeatures: [
        {
          title: "Aquatic Training System",
          description: "Maximize your workout in your exercise pool! You can choose between the Stationary Resistant Swim and/or the Rowing Bars and Resistant Cords.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Fitness Equipment"
        },
        {
          title: "Worldwide WiFi App",
          description: "Control your pool temperature, filter cycle, turn on pumps and much more from anywhere in the world.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Water Purification",
          description: "Whether you choose to add Diamond AOP™, Crystal ProPure™, Ozone Mixing Chamber or an Ozonator, TidalFit promotes water purification for a clean pool.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio Systems",
          description: "Complete your pool experience with our audio systems. Advanced technology and high-end speakers. Music Experience and bba™2 Audio.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Hydrotherapy",
          description: "Each model offers the hydrotherapy option to soothe aching muscles and help with relaxation.",
          image: "/images/products/features/hydrotherapy-package.jpg",
          category: "Wellness"
        },
        {
          title: "Swim Jet Systems",
          description: "TidalFit models have their own unique swim jets systems, the Quad Swim Jet System and the Dual Swim Jet System.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise Technology"
        },
        {
          title: "DynaBrite LED Lighting",
          description: "With both standard and optional LED lighting selections in our spas, you can find fun and unique ways to light up your spa for the perfect ambiance.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        }
      ]
    },
  },
  "captiva": {
    name: "Captiva",
    title: "Island Series Family Hot Tub",
    price: 16995,
    originalPrice: 19995,
    images: [
      "/images/products/Captiva.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Brown", color: "#8B4513", image: "/images/products/Cabinetry Colors/Brown.png" },
    ],
    specs: {
      seating: "7 Adults",
      dimensions: "84\" x 84\" x 36\"",
      waterCapacity: "335 Gallons",
      jets: "32-54 Helix Jets",
      electrical: {
        voltage: "240V",
        amperage: "40 Amp",
        heater: "5.5 kW",
        pumps: "3 Total Pumps",
      },
      waterChemistry: {
        ph: "7.2-7.6",
        alkalinity: "80-120 ppm",
        sanitizer: "1-3 ppm",
        calcium: "150-300 ppm",
      },
      maintenance: {
        filterChange: "Every 3-4 months",
        waterChange: "Every 3-4 months",
        chemicalCheck: "2-3 times per week",
        cleaning: "Weekly skimming, monthly deep clean",
      },
    },
    warranty: {
      shell: "7 Years",
      surface: "5 Years", 
      components: "3 Years",
      cabinet: "2 Years",
      labor: "1 Year",
    },
    installation: {
      spaceRequired: "9' x 9' minimum",
      foundation: "Level concrete pad or reinforced deck",
      electrical: "240V, 40 amp GFCI breaker",
      drainage: "Access to drain or pump",
      access: "36\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "Energy Star Certified",
      monthlyCost: "$22-35",
      insulation: "Full foam insulation",
      cover: "4\" tapered energy-efficient cover",
    },
    features: [
      {
        title: "Helix Jet Technology",
        description: "Advanced Helix jets provide targeted therapeutic massage with customizable intensity and water flow patterns",
        image: "/images/products/Helix Jet Technology.jpg",
      },
      {
        title: "Dual Footblasters", 
        description: "Powerful foot and calf massage jets provide relief for tired feet and improve circulation throughout your legs",
        image: "/images/products/Dual Footblasters.jpg",
      },
      {
        title: "Cascade Falls Water Feature",
        description: "Soothing waterfall feature creates a relaxing ambiance while providing gentle neck and shoulder massage",
        image: "/images/products/Cascade Falls Water Feature.jpg",
      },
    ],
    reviews: {
      averageRating: 4.7,
      totalReviews: 156,
      highlights: [
        {
          rating: 5,
          title: "Great value for money",
          text: "The Captiva offers premium features at a more accessible price point. Very satisfied with our purchase.",
          author: "Rachel P.",
          date: "2024-01-10",
        },
        {
          rating: 4,
          title: "Perfect family size",
          text: "Compact yet spacious enough for our family. The jets provide excellent massage therapy.",
          author: "Tom B.",
          date: "2024-01-03",
        },
      ],
    },
    accessories: [
      {
        name: "Standard Cover Lifter",
        price: 249,
        description: "Manual cover lifter for easy operation",
        image: "/images/accessories/cover-lifter.jpg",
      },
      {
        name: "Water Care Kit",
        price: 89,
        description: "Complete chemical starter kit with testing supplies",
        image: "/images/accessories/water-care.jpg",
      },
    ],
    faqs: [
      {
        question: "How does the Captiva compare to larger models?",
        answer: "The Captiva offers similar features in a more compact footprint, making it ideal for smaller spaces while still accommodating 7 adults.",
      },
      {
        question: "What's the energy consumption like?",
        answer: "The Captiva is highly energy efficient, typically costing $22-35 per month to operate depending on usage and local utility rates.",
      },
    ],
    controlFeatures: {
      title: "Advanced Control Features",
      description: "Includes intuitive digital control system, direct water flow control, and optional WiFi connectivity.",
      features: [
        {
          icon: "/images/icons/digital-control.svg",
          title: "Intuitive Digital Control",
          description: "Easily control your hot tub's temperature, jets, and lighting from anywhere with our app or remote control.",
        },
        {
          icon: "/images/icons/water-flow.svg",
          title: "DirectFlow Personal Control",
          description: "Customize your water flow and temperature with our Elite trim's DirectFlow system. No electrician needed.",
        },
        {
          icon: "/images/icons/wifi.svg",
          title: "Optional WiFi Connectivity",
          description: "Stay connected with your hot tub via WiFi. Control your settings remotely and receive updates on your phone.",
        },
      ],
      standardFeatures: [
        {
          title: "Grab Rails",
          description: "These rails offer extra stability when exercising and stretching.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Accessibility"
        },
        {
          title: "Blue LED Spa Light",
          description: "This 5 in. spa light illuminates your pool during dark hours.",
          image: "/images/products/features/led-spa-light.jpg",
          category: "Lighting"
        },
        {
          title: "Grandwood Cabinets",
          description: "From the realistic wood-like texture to the matte finish, it's no wonder these cabinets are called Grandwood. These cabinets feature a tight grain pattern along with subtly varying shades of color. This subtle variance creates a more realistic look and feel of natural wood.",
          image: "/images/products/Cabinetry Colors/Grandwood Java.png",
          category: "Cabinetry"
        },
        {
          title: "Full Foam With ABS Bottom",
          description: "TidalFit models come standard with full foam insulation and an ABS bottom to protect against environmental elements.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Insulation"
        },
        {
          title: "Heater",
          description: "Every TidalFit comes with a standard heater to warm your pool to the perfect temperature in any climate.",
          image: "/images/products/features/heater-system.jpg",
          category: "Climate Control"
        },
        {
          title: "Hi-Flo Circulation System",
          description: "Advanced circulation system ensures optimal water flow and filtration for crystal clear water.",
          image: "/images/products/features/circulation-system.jpg",
          category: "Water Management"
        }
      ],
      optionalFeatures: [
        {
          title: "Aquatic Training System",
          description: "Maximize your workout in your exercise pool! You can choose between the Stationary Resistant Swim and/or the Rowing Bars and Resistant Cords.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Fitness Equipment"
        },
        {
          title: "Worldwide WiFi App",
          description: "Control your pool temperature, filter cycle, turn on pumps and much more from anywhere in the world.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Water Purification",
          description: "Whether you choose to add Diamond AOP™, Crystal ProPure™, Ozone Mixing Chamber or an Ozonator, TidalFit promotes water purification for a clean pool.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio Systems",
          description: "Complete your pool experience with our audio systems. Advanced technology and high-end speakers. Music Experience and bba™2 Audio.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Hydrotherapy",
          description: "Each model offers the hydrotherapy option to soothe aching muscles and help with relaxation.",
          image: "/images/products/features/hydrotherapy-package.jpg",
          category: "Wellness"
        },
        {
          title: "Swim Jet Systems",
          description: "TidalFit models have their own unique swim jets systems, the Quad Swim Jet System and the Dual Swim Jet System.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise Technology"
        },
        {
          title: "DynaBrite LED Lighting",
          description: "With both standard and optional LED lighting selections in our spas, you can find fun and unique ways to light up your spa for the perfect ambiance.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        }
      ]
    },
  },
  "antigua": {
    name: "Antigua",
    title: "Island Series Compact Hot Tub",
    price: 15995,
    originalPrice: 18995,
    images: [
      "/images/products/Antigua.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Brown", color: "#8B4513", image: "/images/products/Cabinetry Colors/Brown.png" },
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "84\" x 84\" x 36\"",
      waterCapacity: "320 Gallons",
      jets: "32-54 Helix Jets",
      electrical: {
        voltage: "240V",
        amperage: "40 Amp",
        heater: "5.5 kW",
        pumps: "3 Total Pumps",
      },
      waterChemistry: {
        ph: "7.2-7.6",
        alkalinity: "80-120 ppm",
        sanitizer: "1-3 ppm",
        calcium: "150-300 ppm",
      },
      maintenance: {
        filterChange: "Every 3-4 months",
        waterChange: "Every 3-4 months",
        chemicalCheck: "2-3 times per week",
        cleaning: "Weekly skimming, monthly deep clean",
      },
    },
    warranty: {
      shell: "7 Years",
      surface: "5 Years", 
      components: "3 Years",
      cabinet: "2 Years",
      labor: "1 Year",
    },
    installation: {
      spaceRequired: "9' x 9' minimum",
      foundation: "Level concrete pad or reinforced deck",
      electrical: "240V, 40 amp GFCI breaker",
      drainage: "Access to drain or pump",
      access: "36\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "Energy Star Certified",
      monthlyCost: "$20-32",
      insulation: "Full foam insulation",
      cover: "4\" tapered energy-efficient cover",
    },
    features: [
      {
        title: "Helix Jet Technology",
        description: "Advanced Helix jets provide targeted therapeutic massage with customizable intensity and water flow patterns",
        image: "/images/products/Helix Jet Technology.jpg",
      },
      {
        title: "Dual Footblasters", 
        description: "Powerful foot and calf massage jets provide relief for tired feet and improve circulation throughout your legs",
        image: "/images/products/Dual Footblasters.jpg",
      },
      {
        title: "Cascade Falls Water Feature",
        description: "Soothing waterfall feature creates a relaxing ambiance while providing gentle neck and shoulder massage",
        image: "/images/products/Cascade Falls Water Feature.jpg",
      },
    ],
    reviews: {
      averageRating: 4.6,
      totalReviews: 89,
      highlights: [
        {
          rating: 5,
          title: "Perfect compact solution",
          text: "The Antigua fits perfectly in our smaller backyard while still providing premium features and comfort.",
          author: "Lisa H.",
          date: "2024-01-14",
        },
        {
          rating: 4,
          title: "Quality construction",
          text: "Solid build quality and great jets. Perfect for couples or small families.",
          author: "Mark D.",
          date: "2024-01-07",
        },
      ],
    },
    accessories: [
      {
        name: "Standard Cover Lifter",
        price: 249,
        description: "Manual cover lifter for easy operation",
        image: "/images/accessories/cover-lifter.jpg",
      },
      {
        name: "Steps with Storage",
        price: 179,
        description: "Non-slip steps with built-in storage compartment",
        image: "/images/accessories/steps.jpg",
      },
    ],
    faqs: [
      {
        question: "Is the Antigua suitable for taller people?",
        answer: "Yes, the Antigua features full-depth seating that comfortably accommodates adults up to 6'4\" in height.",
      },
      {
        question: "Can I use this spa year-round?",
        answer: "Absolutely! The Antigua is designed for year-round use with excellent insulation and a powerful heater system.",
      },
    ],
    controlFeatures: {
      title: "Island Series Control Features",
      description: "Professional-grade control systems designed for compact luxury and performance.",
      features: [
        {
          icon: "Settings",
          title: "Digital Control System",
          description: "Intuitive topside control panel for temperature, jets, and lighting management"
        },
        {
          icon: "Droplets",
          title: "Multi-Pump Control",
          description: "Three total pumps with independent operation for customized hydrotherapy"
        },
        {
          icon: "Lightbulb",
          title: "LED Lighting System",
          description: "Energy-efficient LED lighting with underwater illumination"
        },
        {
          icon: "Volume2",
          title: "Audio System Ready",
          description: "Optional Bluetooth audio integration capability"
        },
        {
          icon: "Zap",
          title: "Cascade Falls Control",
          description: "Standard waterfall feature with adjustable flow control"
        }
      ],
      standardFeatures: [
        {
          title: "Grab Rails",
          description: "These rails offer extra stability when exercising and stretching.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Accessibility"
        },
        {
          title: "Blue LED Spa Light",
          description: "This 5 in. spa light illuminates your pool during dark hours.",
          image: "/images/products/features/led-spa-light.jpg",
          category: "Lighting"
        },
        {
          title: "Grandwood Cabinets",
          description: "From the realistic wood-like texture to the matte finish, it's no wonder these cabinets are called Grandwood. These cabinets feature a tight grain pattern along with subtly varying shades of color. This subtle variance creates a more realistic look and feel of natural wood.",
          image: "/images/products/Cabinetry Colors/Grandwood Java.png",
          category: "Cabinetry"
        },
        {
          title: "Full Foam With ABS Bottom",
          description: "TidalFit models come standard with full foam insulation and an ABS bottom to protect against environmental elements.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Insulation"
        },
        {
          title: "Heater",
          description: "Every TidalFit comes with a standard heater to warm your pool to the perfect temperature in any climate.",
          image: "/images/products/features/heater-system.jpg",
          category: "Climate Control"
        },
        {
          title: "Hi-Flo Circulation System",
          description: "Advanced circulation system ensures optimal water flow and filtration for crystal clear water.",
          image: "/images/products/features/circulation-system.jpg",
          category: "Water Management"
        }
      ],
      optionalFeatures: [
        {
          title: "Aquatic Training System",
          description: "Maximize your workout in your exercise pool! You can choose between the Stationary Resistant Swim and/or the Rowing Bars and Resistant Cords.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Fitness Equipment"
        },
        {
          title: "Worldwide WiFi App",
          description: "Control your pool temperature, filter cycle, turn on pumps and much more from anywhere in the world.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Water Purification",
          description: "Whether you choose to add Diamond AOP™, Crystal ProPure™, Ozone Mixing Chamber or an Ozonator, TidalFit promotes water purification for a clean pool.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio Systems",
          description: "Complete your pool experience with our audio systems. Advanced technology and high-end speakers. Music Experience and bba™2 Audio.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Hydrotherapy",
          description: "Each model offers the hydrotherapy option to soothe aching muscles and help with relaxation.",
          image: "/images/products/features/hydrotherapy-package.jpg",
          category: "Wellness"
        },
        {
          title: "Swim Jet Systems",
          description: "TidalFit models have their own unique swim jets systems, the Quad Swim Jet System and the Dual Swim Jet System.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise Technology"
        },
        {
          title: "DynaBrite LED Lighting",
          description: "With both standard and optional LED lighting selections in our spas, you can find fun and unique ways to light up your spa for the perfect ambiance.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        }
      ]
    },
  },
  "wisteria": {
    name: "Wisteria",
    title: "Garden Series Plug & Play",
    price: 8995,
    originalPrice: 10995,
    images: [
      "/images/products/Wisteria.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Java", color: "#8B4513", image: "/images/products/Cabinetry Colors/Grandwood Java.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "84\" x 84\" x 36\"",
      waterCapacity: "330 Gallons",
      jets: "27 Stainless Steel",
      electrical: {
        voltage: "120V",
        amperage: "15 Amp",
        heater: "1.0 kW",
        pumps: "1 Main Pump",
      },
      waterChemistry: {
        ph: "7.2-7.6",
        alkalinity: "80-120 ppm",
        sanitizer: "1-3 ppm",
        calcium: "150-300 ppm",
      },
      maintenance: {
        filterChange: "Every 2-3 months",
        waterChange: "Every 3-4 months",
        chemicalCheck: "2-3 times per week",
        cleaning: "Weekly skimming, monthly deep clean",
      },
    },
    warranty: {
      shell: "5 Years",
      surface: "3 Years", 
      components: "2 Years",
      cabinet: "2 Years",
      labor: "1 Year",
    },
    installation: {
      spaceRequired: "9' x 9' minimum",
      foundation: "Level surface, deck or patio",
      electrical: "Standard 120V outlet with GFCI",
      drainage: "Access to drain or pump",
      access: "24\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "Energy Efficient",
      monthlyCost: "$15-25",
      insulation: "Partial foam insulation",
      cover: "3\" energy-efficient cover",
    },
    features: [
      {
        title: "Plug & Play Convenience",
        description: "Simply plug into any standard 120V outlet - no special electrical work required",
        image: "/images/products/Plug & Play Convenience.jpg",
      },
      {
        title: "Stainless Steel Jets", 
        description: "Durable stainless steel jets provide consistent, powerful massage therapy",
        image: "/images/products/Stainless Steel Jets.jpg",
      },
      {
        title: "Digital Control System",
        description: "Easy-to-use digital controls for temperature, jets, and lighting",
        image: "/images/products/Digital Control System.jpg",
      },
    ],
    reviews: {
      averageRating: 4.4,
      totalReviews: 203,
      highlights: [
        {
          rating: 5,
          title: "Easy setup and great value",
          text: "Loved how easy this was to set up. Just plugged it in and filled it up. Great features for the price.",
          author: "Amanda K.",
          date: "2024-01-11",
        },
        {
          rating: 4,
          title: "Perfect starter spa",
          text: "Great introduction to spa ownership. Compact size fits our patio perfectly.",
          author: "Steve M.",
          date: "2024-01-04",
        },
      ],
    },
    accessories: [
      {
        name: "Spa Steps",
        price: 129,
        description: "Non-slip steps for safe entry and exit",
        image: "/images/accessories/steps.jpg",
      },
      {
        name: "Floating Dispenser",
        price: 39,
        description: "Automatic chemical dispenser for easy maintenance",
        image: "/images/accessories/dispenser.jpg",
      },
    ],
    faqs: [
      {
        question: "Do I need special electrical for the Wisteria?",
        answer: "No! The Wisteria plugs into any standard 120V household outlet with GFCI protection. No electrician needed.",
      },
      {
        question: "How long does it take to heat up?",
        answer: "The Wisteria typically heats at 3-5°F per hour, so it takes about 12-18 hours to reach operating temperature from cold.",
      },
    ],
    controlFeatures: {
      title: "Garden Series Plug & Play Controls", 
      description: "Simple, efficient controls designed for easy operation with standard household power.",
      features: [
        {
          icon: "Settings",
          title: "Digital Control Panel",
          description: "Easy-to-use topside digital controls for temperature and jet operation"
        },
        {
          icon: "Zap",
          title: "120V Plug & Play",
          description: "Simply plug into any standard household GFCI outlet - no electrician required"
        },
        {
          icon: "Lightbulb",
          title: "LED Lighting System",
          description: "Energy-efficient LED lighting with simple on/off control"
        },
        {
          icon: "Settings",
          title: "Single Pump Operation", 
          description: "Efficient single pump system with variable speed control for jets and filtration"
        }
      ],
      standardFeatures: [
        {
          title: "Grab Rails",
          description: "These rails offer extra stability when exercising and stretching.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Accessibility"
        },
        {
          title: "Blue LED Spa Light",
          description: "This 5 in. spa light illuminates your pool during dark hours.",
          image: "/images/products/features/led-spa-light.jpg",
          category: "Lighting"
        },
        {
          title: "Grandwood Cabinets",
          description: "From the realistic wood-like texture to the matte finish, it's no wonder these cabinets are called Grandwood. These cabinets feature a tight grain pattern along with subtly varying shades of color. This subtle variance creates a more realistic look and feel of natural wood.",
          image: "/images/products/Cabinetry Colors/Grandwood Java.png",
          category: "Cabinetry"
        },
        {
          title: "Full Foam With ABS Bottom",
          description: "TidalFit models come standard with full foam insulation and an ABS bottom to protect against environmental elements.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Insulation"
        },
        {
          title: "Heater",
          description: "Every TidalFit comes with a standard heater to warm your pool to the perfect temperature in any climate.",
          image: "/images/products/features/heater-system.jpg",
          category: "Climate Control"
        },
        {
          title: "Hi-Flo Circulation System",
          description: "Advanced circulation system ensures optimal water flow and filtration for crystal clear water.",
          image: "/images/products/features/circulation-system.jpg",
          category: "Water Management"
        }
      ],
      optionalFeatures: [
        {
          title: "Aquatic Training System",
          description: "Maximize your workout in your exercise pool! You can choose between the Stationary Resistant Swim and/or the Rowing Bars and Resistant Cords.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Fitness Equipment"
        },
        {
          title: "Worldwide WiFi App",
          description: "Control your pool temperature, filter cycle, turn on pumps and much more from anywhere in the world.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Water Purification",
          description: "Whether you choose to add Diamond AOP™, Crystal ProPure™, Ozone Mixing Chamber or an Ozonator, TidalFit promotes water purification for a clean pool.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio Systems",
          description: "Complete your pool experience with our audio systems. Advanced technology and high-end speakers. Music Experience and bba™2 Audio.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Hydrotherapy",
          description: "Each model offers the hydrotherapy option to soothe aching muscles and help with relaxation.",
          image: "/images/products/features/hydrotherapy-package.jpg",
          category: "Wellness"
        },
        {
          title: "Swim Jet Systems",
          description: "TidalFit models have their own unique swim jets systems, the Quad Swim Jet System and the Dual Swim Jet System.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise Technology"
        },
        {
          title: "DynaBrite LED Lighting",
          description: "With both standard and optional LED lighting selections in our spas, you can find fun and unique ways to light up your spa for the perfect ambiance.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        }
      ]
    },
  },
  "plume": {
    name: "Plume",
    title: "Garden Series Efficient Spa",
    price: 8495,
    originalPrice: 10495,
    images: [
      "/images/products/Plume.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Java", color: "#8B4513", image: "/images/products/Cabinetry Colors/Grandwood Java.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "84\" x 78\" x 34\"",
      waterCapacity: "295 Gallons",
      jets: "27 Stainless Steel",
      electrical: {
        voltage: "120V",
        amperage: "15 Amp",
        heater: "1.0 kW",
        pumps: "1 Main Pump",
      },
      waterChemistry: {
        ph: "7.2-7.6",
        alkalinity: "80-120 ppm",
        sanitizer: "1-3 ppm",
        calcium: "150-300 ppm",
      },
      maintenance: {
        filterChange: "Every 2-3 months",
        waterChange: "Every 3-4 months",
        chemicalCheck: "2-3 times per week",
        cleaning: "Weekly skimming, monthly deep clean",
      },
    },
    warranty: {
      shell: "5 Years",
      surface: "3 Years", 
      components: "2 Years",
      cabinet: "2 Years",
      labor: "1 Year",
    },
    installation: {
      spaceRequired: "9' x 8.5' minimum",
      foundation: "Level surface, deck or patio",
      electrical: "Standard 120V outlet with GFCI",
      drainage: "Access to drain or pump",
      access: "24\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "High Efficiency",
      monthlyCost: "$12-22",
      insulation: "Partial foam insulation",
      cover: "3\" energy-efficient cover",
    },
    features: [
      {
        title: "Space-Saving Design",
        description: "Rectangular shape maximizes seating while minimizing footprint for smaller spaces",
        image: "/images/products/Space-Saving Design.jpg",
      },
      {
        title: "Efficient Operation", 
        description: "Lower water capacity means faster heating and reduced operating costs",
        image: "/images/products/Efficient Operation.jpg",
      },
      {
        title: "Premium Comfort",
        description: "Ergonomic seating with strategically placed jets for optimal relaxation",
        image: "/images/products/Premium Comfort.jpg",
      },
    ],
    reviews: {
      averageRating: 4.5,
      totalReviews: 167,
      highlights: [
        {
          rating: 5,
          title: "Perfect for our space",
          text: "The rectangular design fits perfectly on our deck. Great jets and very energy efficient.",
          author: "Carol R.",
          date: "2024-01-13",
        },
        {
          rating: 4,
          title: "Low operating costs",
          text: "Impressed with how efficient this spa is. Our electric bill barely went up after installation.",
          author: "Jeff T.",
          date: "2024-01-06",
        },
      ],
    },
    accessories: [
      {
        name: "Spa Steps",
        price: 129,
        description: "Non-slip steps for safe entry and exit",
        image: "/images/accessories/steps.jpg",
      },
      {
        name: "Cover Ease Lifter",
        price: 189,
        description: "Hydraulic assist cover lifter system",
        image: "/images/accessories/cover-lifter.jpg",
      },
    ],
    faqs: [
      {
        question: "How is the Plume different from the Wisteria?",
        answer: "The Plume features a space-saving rectangular design and lower water capacity, making it more efficient to heat and operate.",
      },
      {
        question: "Can this spa be used in winter?",
        answer: "Yes, the Plume is designed for year-round use, though heating times may be longer in very cold climates.",
      },
    ],
    controlFeatures: {
      title: "Garden Series Plug & Play Controls",
      description: "Simple, efficient controls designed for easy operation with standard household power.",
      features: [
        {
          icon: "Settings",
          title: "Digital Control Panel",
          description: "Easy-to-use topside digital controls for temperature and jet operation"
        },
        {
          icon: "Zap",
          title: "120V Plug & Play",
          description: "Simply plug into any standard household GFCI outlet - no electrician required"
        },
        {
          icon: "Lightbulb",
          title: "LED Lighting System",
          description: "Energy-efficient LED lighting with simple on/off control"
        },
        {
          icon: "Settings",
          title: "Single Pump Operation",
          description: "Efficient single pump system with variable speed control for jets and filtration"
        }
      ],
      standardFeatures: [
        {
          title: "Grab Rails",
          description: "These rails offer extra stability when exercising and stretching.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Accessibility"
        },
        {
          title: "Blue LED Spa Light",
          description: "This 5 in. spa light illuminates your pool during dark hours.",
          image: "/images/products/features/led-spa-light.jpg",
          category: "Lighting"
        },
        {
          title: "Grandwood Cabinets",
          description: "From the realistic wood-like texture to the matte finish, it's no wonder these cabinets are called Grandwood. These cabinets feature a tight grain pattern along with subtly varying shades of color. This subtle variance creates a more realistic look and feel of natural wood.",
          image: "/images/products/Cabinetry Colors/Grandwood Java.png",
          category: "Cabinetry"
        },
        {
          title: "Full Foam With ABS Bottom",
          description: "TidalFit models come standard with full foam insulation and an ABS bottom to protect against environmental elements.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Insulation"
        },
        {
          title: "Heater",
          description: "Every TidalFit comes with a standard heater to warm your pool to the perfect temperature in any climate.",
          image: "/images/products/features/heater-system.jpg",
          category: "Climate Control"
        },
        {
          title: "Hi-Flo Circulation System",
          description: "Advanced circulation system ensures optimal water flow and filtration for crystal clear water.",
          image: "/images/products/features/circulation-system.jpg",
          category: "Water Management"
        }
      ],
      optionalFeatures: [
        {
          title: "Aquatic Training System",
          description: "Maximize your workout in your exercise pool! You can choose between the Stationary Resistant Swim and/or the Rowing Bars and Resistant Cords.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Fitness Equipment"
        },
        {
          title: "Worldwide WiFi App",
          description: "Control your pool temperature, filter cycle, turn on pumps and much more from anywhere in the world.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Water Purification",
          description: "Whether you choose to add Diamond AOP™, Crystal ProPure™, Ozone Mixing Chamber or an Ozonator, TidalFit promotes water purification for a clean pool.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio Systems",
          description: "Complete your pool experience with our audio systems. Advanced technology and high-end speakers. Music Experience and bba™2 Audio.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Hydrotherapy",
          description: "Each model offers the hydrotherapy option to soothe aching muscles and help with relaxation.",
          image: "/images/products/features/hydrotherapy-package.jpg",
          category: "Wellness"
        },
        {
          title: "Swim Jet Systems",
          description: "TidalFit models have their own unique swim jets systems, the Quad Swim Jet System and the Dual Swim Jet System.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise Technology"
        },
        {
          title: "DynaBrite LED Lighting",
          description: "With both standard and optional LED lighting selections in our spas, you can find fun and unique ways to light up your spa for the perfect ambiance.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        }
      ]
    },
  },
  "viola": {
    name: "Viola",
    title: "Garden Series Intimate Spa",
    price: 6995,
    originalPrice: 8995,
    images: [
      "/images/products/Viola.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Java", color: "#8B4513", image: "/images/products/Cabinetry Colors/Grandwood Java.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
    ],
    specs: {
      seating: "2 Adults",
      dimensions: "82\" x 65\" x 31\"",
      waterCapacity: "220 Gallons",
      jets: "21 Stainless Steel",
      electrical: {
        voltage: "120V",
        amperage: "15 Amp",
        heater: "1.0 kW",
        pumps: "1 Main Pump",
      },
      waterChemistry: {
        ph: "7.2-7.6",
        alkalinity: "80-120 ppm",
        sanitizer: "1-3 ppm",
        calcium: "150-300 ppm",
      },
      maintenance: {
        filterChange: "Every 2-3 months",
        waterChange: "Every 4-5 months",
        chemicalCheck: "2 times per week",
        cleaning: "Weekly skimming, monthly deep clean",
      },
    },
    warranty: {
      shell: "5 Years",
      surface: "3 Years", 
      components: "2 Years",
      cabinet: "2 Years",
      labor: "1 Year",
    },
    installation: {
      spaceRequired: "8.5' x 7' minimum",
      foundation: "Level surface, deck or patio",
      electrical: "Standard 120V outlet with GFCI",
      drainage: "Access to drain or pump",
      access: "24\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "Ultra Efficient",
      monthlyCost: "$8-18",
      insulation: "Partial foam insulation",
      cover: "3\" energy-efficient cover",
    },
    features: [
      {
        title: "Perfect for Two",
        description: "Designed specifically for couples with intimate seating and targeted jet placement for maximum comfort",
        image: "/images/products/Perfect for Two.jpg",
      },
      {
        title: "Compact Footprint", 
        description: "Smallest Garden Series model fits in tight spaces while providing full spa experience",
        image: "/images/products/Compact Footprint.jpg",
      },
      {
        title: "Efficient Operation",
        description: "Lower water capacity means faster heating, less chemicals, and reduced operating costs",
        image: "/images/products/Efficient Operation.jpg",
      },
    ],
    reviews: {
      averageRating: 4.7,
      totalReviews: 245,
      highlights: [
        {
          rating: 5,
          title: "Perfect couple's retreat",
          text: "The Viola is exactly what we wanted - intimate, efficient, and fits perfectly in our small backyard.",
          author: "Emily & Jake",
          date: "2024-01-09",
        },
        {
          rating: 5,
          title: "Great value and quality",
          text: "Surprised by the quality for the price. The jets are powerful and the size is perfect for two people.",
          author: "Michelle L.",
          date: "2024-01-02",
        },
      ],
    },
    accessories: [
      {
        name: "Romantic Lighting Kit",
        price: 149,
        description: "Soft LED lighting system perfect for intimate evenings",
        image: "/images/accessories/led-lights.jpg",
      },
      {
        name: "Spa Caddy",
        price: 79,
        description: "Floating caddy for drinks and accessories",
        image: "/images/accessories/caddy.jpg",
      },
    ],
    faqs: [
      {
        question: "Is the Viola suitable for daily use?",
        answer: "Absolutely! The Viola is designed for regular use and its efficient operation makes daily enjoyment very affordable.",
      },
      {
        question: "Can taller people fit comfortably?",
        answer: "The Viola comfortably accommodates couples up to 6'2\" with ergonomic seating designed for two adults.",
      },
    ],
    controlFeatures: {
      title: "Garden Series Plug & Play Controls",
      description: "Simple, efficient controls designed for easy operation with standard household power.",
      features: [
        {
          icon: "Settings",
          title: "Digital Control Panel",
          description: "Easy-to-use topside digital controls for temperature and jet operation"
        },
        {
          icon: "Zap",
          title: "120V Plug & Play",
          description: "Simply plug into any standard household GFCI outlet - no electrician required"
        },
        {
          icon: "Lightbulb",
          title: "LED Lighting System",
          description: "Energy-efficient LED lighting with simple on/off control"
        },
        {
          icon: "Settings",
          title: "Single Pump Operation",
          description: "Efficient single pump system with variable speed control for jets and filtration"
        }
      ],
      standardFeatures: [
        {
          title: "Grab Rails",
          description: "These rails offer extra stability when exercising and stretching.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Accessibility"
        },
        {
          title: "Blue LED Spa Light",
          description: "This 5 in. spa light illuminates your pool during dark hours.",
          image: "/images/products/features/led-spa-light.jpg",
          category: "Lighting"
        },
        {
          title: "Grandwood Cabinets",
          description: "From the realistic wood-like texture to the matte finish, it's no wonder these cabinets are called Grandwood. These cabinets feature a tight grain pattern along with subtly varying shades of color. This subtle variance creates a more realistic look and feel of natural wood.",
          image: "/images/products/Cabinetry Colors/Grandwood Java.png",
          category: "Cabinetry"
        },
        {
          title: "Full Foam With ABS Bottom",
          description: "TidalFit models come standard with full foam insulation and an ABS bottom to protect against environmental elements.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Insulation"
        },
        {
          title: "Heater",
          description: "Every TidalFit comes with a standard heater to warm your pool to the perfect temperature in any climate.",
          image: "/images/products/features/heater-system.jpg",
          category: "Climate Control"
        },
        {
          title: "Hi-Flo Circulation System",
          description: "Advanced circulation system ensures optimal water flow and filtration for crystal clear water.",
          image: "/images/products/features/circulation-system.jpg",
          category: "Water Management"
        }
      ],
      optionalFeatures: [
        {
          title: "Aquatic Training System",
          description: "Maximize your workout in your exercise pool! You can choose between the Stationary Resistant Swim and/or the Rowing Bars and Resistant Cords.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Fitness Equipment"
        },
        {
          title: "Worldwide WiFi App",
          description: "Control your pool temperature, filter cycle, turn on pumps and much more from anywhere in the world.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Water Purification",
          description: "Whether you choose to add Diamond AOP™, Crystal ProPure™, Ozone Mixing Chamber or an Ozonator, TidalFit promotes water purification for a clean pool.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio Systems",
          description: "Complete your pool experience with our audio systems. Advanced technology and high-end speakers. Music Experience and bba™2 Audio.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Hydrotherapy",
          description: "Each model offers the hydrotherapy option to soothe aching muscles and help with relaxation.",
          image: "/images/products/features/hydrotherapy-package.jpg",
          category: "Wellness"
        },
        {
          title: "Swim Jet Systems",
          description: "TidalFit models have their own unique swim jets systems, the Quad Swim Jet System and the Dual Swim Jet System.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise Technology"
        },
        {
          title: "DynaBrite LED Lighting",
          description: "With both standard and optional LED lighting selections in our spas, you can find fun and unique ways to light up your spa for the perfect ambiance.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        }
      ]
    },
  },
  "activeplus-ep-12": {
    name: "ActivePlus EP-12",
    title: "TidalFit Exercise Pool",
    price: 28995,
    originalPrice: 32995,
    images: [
      "/images/products/ActivePlus EP-12.jpg",
    ],
    colorOptions: [
      { name: "Charcoal", color: "#374151", image: "/images/products/Cabinetry Colors/Grandwood Charcoal Black.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Java", color: "#8B4513", image: "/images/products/Cabinetry Colors/Grandwood Java.png" },
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
    ],
    specs: {
      seating: "Exercise Pool",
      dimensions: "144\" x 91\" x 52\"",
      waterCapacity: "1315 Gallons",
      jets: "Swim Jets + Optional 28 Helix",
      electrical: {
        voltage: "240V",
        amperage: "60 Amp",
        heater: "5.5 kW",
        pumps: "2 Swim + 2 Therapy Pumps",
      },
      waterChemistry: {
        ph: "7.2-7.6",
        alkalinity: "80-120 ppm",
        sanitizer: "1-3 ppm",
        calcium: "150-300 ppm",
      },
      maintenance: {
        filterChange: "Every 4-6 months",
        waterChange: "Every 6-8 months",
        chemicalCheck: "2-3 times per week",
        cleaning: "Weekly skimming, bi-weekly deep clean",
      },
    },
    warranty: {
      shell: "10 Years",
      surface: "7 Years", 
      components: "5 Years",
      cabinet: "3 Years",
      labor: "2 Years",
    },
    installation: {
      spaceRequired: "16' x 12' minimum",
      foundation: "Reinforced concrete pad or deck",
      electrical: "240V, 60 amp GFCI breaker",
      drainage: "Access to drain or pump",
      access: "48\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "Commercial Grade Efficient",
      monthlyCost: "$45-75",
      insulation: "Full foam insulation with thermal barrier",
      cover: "4\" commercial-grade cover with safety locks",
    },
    features: [
      {
        title: "Swim Jet Technology",
        description: "Powerful swim jets create adjustable current for swimming, aqua jogging, and resistance training",
        image: "/images/products/Swim Jet Technology.jpg",
      },
      {
        title: "Dual-Zone Design", 
        description: "Exercise area with swim jets plus separate hydrotherapy zone with massage jets",
        image: "/images/products/Dual-Zone Design.jpg",
      },
      {
        title: "Year-Round Fitness",
        description: "Heated exercise pool allows for daily fitness routines regardless of weather conditions",
        image: "/images/products/Year-Round Fitness.jpg",
      },
    ],
    reviews: {
      averageRating: 4.9,
      totalReviews: 37,
      highlights: [
        {
          rating: 5,
          title: "Game changer for fitness",
          text: "The ActivePlus has revolutionized my daily workout routine. Swimming against the current is incredible exercise.",
          author: "Dr. Michael Chen",
          date: "2024-01-16",
        },
        {
          rating: 5,
          title: "Best investment we've made",
          text: "Both fitness and relaxation in one unit. The whole family uses it daily for different purposes.",
          author: "Patricia W.",
          date: "2024-01-01",
        },
      ],
    },
    accessories: [
      {
        name: "Aqua Fitness Kit",
        price: 399,
        description: "Complete set of water exercise equipment including resistance bands and weights",
        image: "/images/accessories/fitness-kit.jpg",
      },
      {
        name: "Automatic Cover System",
        price: 899,
        description: "Motorized safety cover system with remote control",
        image: "/images/accessories/auto-cover.jpg",
      },
    ],
    faqs: [
      {
        question: "What's the difference between this and a traditional lap pool?",
        answer: "The ActivePlus provides adjustable current strength in a compact space, plus hydrotherapy features that traditional pools lack.",
      },
      {
        question: "Can multiple people use it simultaneously?",
        answer: "Yes! One person can swim while others enjoy hydrotherapy, or multiple people can exercise together depending on the activity.",
      },
    ],
    controlFeatures: {
      title: "Features Of The ActivePlus EP-12 Exercise Pool",
      description: "Experience the ultimate in luxury aquatic fitness with professional-grade features designed for both exercise and relaxation.",
      features: [
        {
          icon: "Settings",
          title: "SpaTouch Topside Control",
          description: "Color touchscreen panel with WiFi ready capabilities and multi-language interface"
        },
        {
          icon: "Waves", 
          title: "Variable Speed Swim Jets",
          description: "Adjustable current strength for customized swimming and exercise intensity"
        },
        {
          icon: "Thermometer",
          title: "Dual Zone Temperature Control",
          description: "Independent temperature control for exercise and hydrotherapy zones"
        },
        {
          icon: "Smartphone",
          title: "Smart App Integration",
          description: "Optional worldwide WiFi app module for remote control via smartphone or tablet"
        },
        {
          icon: "Lightbulb",
          title: "Advanced LED Lighting",
          description: "Standard blue LED with optional DynaBrite and multicolor lighting upgrades"
        }
      ],
      standardFeatures: [
        {
          title: "Grab Rails",
          description: "These rails offer extra stability when exercising and stretching.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Accessibility"
        },
        {
          title: "Blue LED Spa Light", 
          description: "This 5 in. spa light illuminates your pool during dark hours.",
          image: "/images/products/features/led-spa-light.jpg",
          category: "Lighting"
        },
        {
          title: "Grandwood Cabinets",
          description: "From the realistic wood-like texture to the matte finish, it's no wonder these cabinets are called Grandwood. These cabinets feature a tight grain pattern along with subtly varying shades of color.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Cabinetry"
        },
        {
          title: "Full Foam With ABS Bottom",
          description: "TidalFit models come standard with full foam insulation and an ABS bottom to protect against environmental elements.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Insulation"
        },
        {
          title: "Heater",
          description: "Every TidalFit comes with a standard heater to warm your pool to the perfect temperature in any climate.",
          image: "/images/products/features/heater-system.jpg", 
          category: "Climate Control"
        },
        {
          title: "Hi-Flo Circulation System",
          description: "Advanced circulation system ensures optimal water flow and filtration for crystal clear water.",
          image: "/images/products/features/circulation-system.jpg",
          category: "Water Management"
        }
      ],
      optionalFeatures: [
        {
          title: "Swim Jet Systems",
          description: "Choose between our powerful Quad Swim Jets for the ultimate swimming workout, or our efficient Dual Swim Jets for a more budget-friendly option. Both allow you to adjust the current strength to match your fitness level.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise Technology"
        },
        {
          title: "Hydrotherapy Package",
          description: "Transform your exercise pool into a relaxation oasis with 28 therapeutic massage jets and a beautiful waterfall feature. Perfect for soothing sore muscles after your workout.",
          image: "/images/products/features/hydrotherapy-package.jpg",
          category: "Wellness"
        },
        {
          title: "LED Lighting Systems",
          description: "Create the perfect ambiance for evening workouts or nighttime relaxation with customizable underwater lighting. Choose from single-color or multi-color options to set the mood.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        },
        {
          title: "Smart Controls",
          description: "Control your pool from anywhere with our smartphone app. Pre-heat your pool on the way home, adjust settings remotely, and monitor your pool's status from the comfort of your couch.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Water Treatment Systems",
          description: "Keep your pool water crystal clear with less work and fewer harsh chemicals. Our advanced purification systems mean cleaner, healthier water that's gentler on your skin and easier to maintain.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio Systems",
          description: "Enhance your workout or relaxation time with high-quality sound. Stream your favorite music wirelessly while you swim, exercise, or unwind in your pool.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Aquatic Training System",
          description: "Take your workouts to the next level with professional exercise equipment designed specifically for water fitness. Includes resistance anchors and rowing equipment for a complete gym experience.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Fitness Equipment"
        }
      ]
    },
  },
}

// Gallery image mapping for collections display
// Updated feature images paths - December 2024
const getGalleryImage = (slug: string): string => {
  const galleryImageMap: Record<string, string> = {
    "grand-bahama": "/images/products/Grand Bahama Gallery.jpg",
    "grand-cayman": "/images/products/Grand Cayman Gallery.jpg", 
    "captiva": "/images/products/Captiva Gallery.jpg",
    "antigua": "/images/products/Antigua Gallery.jpg",
    "wisteria": "/images/products/Wisteria Gallery.jpg",
    "plume": "/images/products/Plume Gallery.jpg",
    "viola": "/images/products/Viola Gallery .jpg",
    "activeplus-ep-12": "/images/products/ActivePlus EP-12 Gallery.jpg",
  };
  return galleryImageMap[slug] || "/placeholder.svg";
};

export default function ProductPage() {
  const params = useParams()
  const productSlug = params.slug as string
  const product = products[productSlug]

  // Navigation state management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  if (!product) {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The hot tub model you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/aquaspa">Back to Hot Tubs</a>
          </Button>
          </div>
          </div>
    )
  }

  const [selectedColor, setSelectedColor] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [sectionsInView, setSectionsInView] = useState<{ [key: string]: boolean }>({})
  const heroRef = useRef<HTMLDivElement>(null)

  // Add state for dropdown management
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({})

  const toggleDropdown = (section: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Navigation scroll behavior
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
  ]

  // Define dropdown sections with dynamic content
  const dropdownSections = [
    {
      id: "features",
      title: "Features",
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Assuming 'features' in product data now includes detailed points, otherwise adapt */}
            {product.features && product.features.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Example: If product.features has a list of detailed feature objects */}
                {/* Modify this structure based on your actual product.features data if it's different */}
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Hydrotherapy System</h4>
                   <ul className="space-y-1 text-gray-600">
                     <li>• {product.specs.jets} precision-engineered jets</li>
                     {/* Add more list items based on your product.specs if available */}
                     <li>• Variable speed pumps</li>
                     <li>• Targeted massage zones</li>
                     <li>• Adjustable jet pressure</li>
                   </ul>
          </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 mb-2">Lighting & Entertainment</h4>
                   <ul className="space-y-1 text-gray-600">
                     <li>• Multi-color LED lighting</li>
                     <li>• Underwater illumination</li>
                     <li>• Bluetooth audio system</li>
                     <li>• Waterproof speakers</li>
                   </ul>
          </div>
                 <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Water Care</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Ozone purification system</li>
                    <li>• UV-C sanitization</li>
                    <li>• Advanced filtration</li>
                    <li>• Easy maintenance</li>
                  </ul>
          </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Comfort Features</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Ergonomic seating design</li>
                    <li>• Adjustable headrests</li>
                    <li>• Non-slip surfaces</li>
                    <li>• Cup holders</li>
                  </ul>
        </div>
        </div>
            ) : (
              <p>No detailed feature information available.</p>
            )}
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
                  <span>{product.specs.dimensions.split(' x ')[0]} ({/* Add cm conversion if needed */})</span>
                </div>
                <div className="flex justify-between">
                  <span>Width:</span>
                  <span>{product.specs.dimensions.split(' x ')[1]} ({/* Add cm conversion if needed */})</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  {/* Assuming height is not in current specs, add if needed */}
                  <span>N/A</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight (dry):</span>
                  {/* Assuming weight is not in current specs, add if needed */}
                  <span>N/A</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight (filled):</span>
                  {/* Assuming weight is not in current specs, add if needed */}
                  <span>N/A</span>
                </div>
            </div>
          </div>
          <div>
              <h4 className="font-semibold text-gray-900 mb-3">Capacity</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Seating:</span>
                  <span>{product.specs.seating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Water capacity:</span>
                  <span>{product.specs.waterCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jets:</span>
                  <span>{product.specs.jets}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pumps:</span>
                  <span>{product.specs.electrical.pumps}</span>
                </div>
            </div>
          </div>
          <div>
              <h4 className="font-semibold text-gray-900 mb-3">Electrical</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Voltage:</span>
                  <span>{product.specs.electrical.voltage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amperage:</span>
                  <span>{product.specs.electrical.amperage}</span>
                </div>
                <div className="flex justify-between">
                  <span>GFCI:</span>
                  {/* Assuming GFCI is not in current specs, add if needed */}
                  <span>Required</span>
                </div>
                <div className="flex justify-between">
                  <span>Heater:</span>
                  <span>{product.specs.electrical.heater}</span>
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
              <h4 className="font-semibold text-gray-900 mb-4">Warranty Coverage</h4>
              <div className="space-y-3">
                {Object.entries(product.warranty).map(([key, value]) => (
                  <div key={key} className="border-l-4 border-emerald-500 pl-4">
                    <h5 className="font-medium text-gray-900 capitalize">{key}</h5>
                    <p className="text-gray-600">{value}</p>
                </div>
              ))}
            </div>
          </div>
            {/* Assuming Service & Support and Extended Warranty sections are static or need data */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Service & Support</h4>
              <div className="space-y-3 text-gray-600">
                <p>• 24/7 customer support hotline</p>
                <p>• Certified technician network</p>
                <p>• Genuine replacement parts</p>
                <p>• Mobile service available</p>
                <p>• Preventive maintenance programs</p>
                <p>• Emergency repair services</p>
        </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <h5 className="font-medium text-emerald-800 mb-2">Extended Warranty Available</h5>
                <p className="text-emerald-700 text-sm">
                  Extend your coverage up to 10 years with our comprehensive protection plan.
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
            {/* Assuming Material & Composition details are static or need data */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Shell Construction</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Acrylic Surface</h5>
                  <p className="text-gray-600 text-sm">
                    Premium Lucite® acrylic with UV protection and stain resistance. Non-porous surface prevents
                    bacteria growth.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Structural Support</h5>
                  <p className="text-gray-600 text-sm">
                    High-density polyurethane foam backing with fiberglass reinforcement for maximum durability.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Base Frame</h5>
                  <p className="text-gray-600 text-sm">
                    Galvanized steel frame with powder coating for corrosion resistance.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Insulation & Efficiency</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Full Foam Insulation</h5>
                  <p className="text-gray-600 text-sm">
                    Complete foam insulation system maintains temperature and reduces energy costs by up to 40%.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Cabinet Materials</h5>
                  <p className="text-gray-600 text-sm">
                    Weather-resistant polymer panels with UV stabilizers. Maintenance-free and fade-resistant.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Cover System</h5>
                  <p className="text-gray-600 text-sm">
                    Marine-grade vinyl cover with high-density foam core and vapor barrier.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Assuming Environmental Commitment section is static or needs data */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Environmental Commitment</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <h5 className="font-medium text-gray-900 mb-1">Eco-Friendly Materials</h5>
                <p>All materials are recyclable and sourced from sustainable suppliers.</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">Energy Efficient</h5>
                <p>ENERGY STAR certified components reduce environmental impact.</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">Low Emissions</h5>
                <p>Manufacturing process meets strict environmental standards.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "advanced-options",
      title: "Advanced Options & Accessories",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Swim Jet Configurations</h4>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Quad Swim Jet System</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Four powerful swim jets create the strongest current for serious swimmers and athletes. Perfect for competitive training and high-intensity workouts.
                  </p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Premium Option</span>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Dual Swim Jet System</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    Two swim jets provide excellent current for recreational swimming, water jogging, and moderate exercise routines. Great value for most users.
                  </p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Value Option</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Relaxation Features</h4>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Massage Jets Package</h5>
                  <p className="text-gray-600 text-sm">
                    28 therapeutic jets and a beautiful waterfall to help you unwind after your workout. Perfect for muscle recovery and stress relief.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Extra Seating Bench</h5>
                  <p className="text-gray-600 text-sm">
                    Additional bench seating with 12 more massage jets for family and friends to enjoy the relaxation benefits together.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Water Treatment Options</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-medium text-gray-900">Premium Water Purification</h5>
                  <p className="text-gray-600 text-sm">Advanced technology that keeps your water crystal clear with minimal chemical use. Great for sensitive skin and easier maintenance.</p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h5 className="font-medium text-gray-900">Professional Ozone System</h5>
                  <p className="text-gray-600 text-sm">Hospital-grade water purification that eliminates bacteria and reduces the need for harsh chemicals. Perfect for families with children.</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h5 className="font-medium text-gray-900">Standard Ozone Treatment</h5>
                  <p className="text-gray-600 text-sm">Natural water purification that keeps your pool clean and fresh while reducing chemical costs and maintenance time.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-medium text-gray-900">Smart Chemical System</h5>
                  <p className="text-gray-600 text-sm">Automatic water balancing that maintains perfect water chemistry 24/7. Never worry about testing or adding chemicals again.</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Audio & Lighting Details</h4>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Wireless Audio System</h5>
                  <p className="text-gray-600 text-sm">Stream your favorite workout playlists or relaxing music directly from your phone. Crystal clear sound that works perfectly even with water splashing.</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Premium Sound Package</h5>
                  <p className="text-gray-600 text-sm">Upgrade to our high-end audio system with additional patio speakers so you can enjoy music throughout your entire outdoor space.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Underwater Lighting</h5>
                  <p className="text-gray-600 text-sm">Beautiful underwater lights that illuminate your swim jets and waterfall, creating a stunning visual experience for evening workouts and entertaining.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Color-Changing Lights</h5>
                  <p className="text-gray-600 text-sm">Transform your pool's ambiance with customizable colored lighting. Set the perfect mood for any occasion, from energizing workouts to romantic evenings.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Accessories & Upgrades</h4>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Cover Lifters</h5>
                  <p className="text-gray-600 text-sm">Choose between Hydraulic or Manual cover lifters for easy one-person cover operation and maintenance.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Hi-Flo Circulation with Microfilter</h5>
                  <p className="text-gray-600 text-sm">Enhanced circulation system with microfilter upgrade for superior water flow and filtration performance.</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Important Notes</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Some options may require additional electrical requirements</li>
                  <li>• Hydrotherapy Twin Bench requires main Hydrotherapy System</li>
                  <li>• BellagioFall lighting requires Hydrotherapy System</li>
                  <li>• Professional installation recommended for all upgrades</li>
                  <li>• Consult with our specialists for custom configurations</li>
                </ul>
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } bg-gray-100 shadow-md`}
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
              <span className="font-semibold text-xl transition-colors duration-300 group-hover:text-blue-600 text-gray-900">
                Aqua Advantage
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <Link
                  key={item}
                  href={item === "Shop Spa" ? "/aquaspa" : `/#${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group text-gray-900"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-blue-600"></span>
                </Link>
              ))}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=334+E+Main+St,+Burley,+ID,+83318"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 group cursor-pointer hover:text-blue-600 transition-all duration-300 text-gray-900"
              >
                <MapPin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm">Burley, ID</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
          <button
              className="md:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                } bg-gray-900`} />
                <span className={`w-full h-0.5 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                } bg-gray-900`} />
                <span className={`w-full h-0.5 transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                } bg-gray-900`} />
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
      <section ref={heroRef} className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Images */}
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="relative aspect-[4/3] bg-white">
            <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={`${product.name} Hot Tub`}
                  fill
                  className="object-cover"
            />
          </div>
          </div>

            {/* Product Details */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4 animate-pulse">
                Best Seller
              </Badge>

              <h1 className="text-5xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-6">{product.title}</p>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Choose Your Cabinet</h3>
                <div className="flex gap-3">
                  {product.colorOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`relative w-16 h-16 rounded-lg border-2 transition-all duration-300 hover:scale-110 overflow-hidden ${
                        selectedColor === index ? "border-blue-500 scale-110 shadow-lg" : "border-gray-300"
                      }`}
                    >
                      {option.image ? (
                        <Image
                          src={option.image}
                          alt={option.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full"
                          style={{ backgroundColor: option.color }}
                        />
                      )}
                      {selectedColor === index && (
                        <div className="absolute inset-0 rounded-lg border-2 border-blue-500 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">{product.colorOptions[selectedColor].name}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4">
                {/* Top row buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
                    <Button
                      size="lg"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 w-full"
                      asChild
                    >
                      <a href="tel:+12087277909">View Sale Pricing</a>
                    </Button>
                    <p className="text-sm text-gray-500 mt-2 text-center sm:text-left">This pricing is not available online</p>
          </div>
          <div className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 w-full"
                      asChild
                    >
                      <a href="tel:+12087277909">Financing Available</a>
                    </Button>
          </div>
        </div>
        </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-sm text-gray-500">Seating Capacity</p>
                  <p className="font-semibold text-gray-900">{product.specs.seating}</p>
                </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-sm text-gray-500">Dimensions</p>
                  <p className="font-semibold text-gray-900">{product.specs.dimensions}</p>
            </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-sm text-gray-500">Water Capacity</p>
                  <p className="font-semibold text-gray-900">{product.specs.waterCapacity}</p>
          </div>
                <div className="transform transition-all duration-300 hover:scale-105">
                  <p className="text-sm text-gray-500">Jets</p>
                  <p className="font-semibold text-gray-900">{product.specs.jets}</p>
                </div>
            </div>
          </div>
        </div>
        </div>
        </section>

      {/* Benefits Grid - Added based on provided code structure */}
      <section
        id="benefits"
        data-animate
        className={`py-16 bg-gray-50 transition-all duration-1000 delay-200 ${sectionsInView.benefits ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Benefits</h2>
            <p className="text-xl text-gray-600">Experience the life-changing benefits of owning a {product.name}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Using product.features for the benefits grid */}
            {product.features && product.features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-white border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${sectionsInView.benefits ? `animate-fade-in-up` : "opacity-0"}`}
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

      {/* Enhanced Features Section - Only for ActivePlus EP-12 */}
      {productSlug === "activeplus-ep-12" && (
        <section
          id="enhanced-features"
          data-animate
          className={`py-20 bg-gradient-to-b from-gray-50 to-white transition-all duration-1000 delay-500 ${sectionsInView["enhanced-features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {product.controlFeatures.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {product.controlFeatures.description}
              </p>
            </div>

            {/* Standard Features */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Standard Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.controlFeatures.standardFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${sectionsInView["enhanced-features"] ? `animate-fade-in-up` : "opacity-0"}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {feature.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Features */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Optional Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.controlFeatures.optionalFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-blue-100 ${sectionsInView["enhanced-features"] ? `animate-fade-in-up` : "opacity-0"}`}
                    style={{ animationDelay: `${(index + 6) * 150}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {feature.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          OPTIONAL
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information Dropdowns */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Detailed Specifications</h3>
              <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  {dropdownSections.map((section, index) => (
                    <div
                      key={section.id}
                      className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md ${sectionsInView["enhanced-features"] ? `animate-fade-in-up` : "opacity-0"}`}
                      style={{ animationDelay: `${(index + 12) * 100}ms` }}
                    >
                      <button
                        onClick={() => toggleDropdown(section.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openDropdowns[section.id] ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openDropdowns[section.id] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <div className="pt-4">{section.content}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Experience Ultimate Aquatic Luxury?
                </h3>
                <p className="text-blue-100 text-lg mb-6">
                  Discover how the ActivePlus EP-12 can transform your fitness and wellness routine
                </p>
                <Button
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  asChild
                >
                  <a href="tel:+12087277909">Get Your Custom Quote</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mobile App Integration - Updated for non-ActivePlus products */}
      {productSlug !== "activeplus-ep-12" && (
       <section
         id="app"
         data-animate
         className={`py-16 bg-gray-50 transition-all duration-1000 delay-500 ${sectionsInView.app ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
       >
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">{product.controlFeatures.title}</h2>
               <p className="text-lg text-gray-600 mb-6">
                  {product.controlFeatures.description}
               </p>

               <div className="space-y-4 mb-8">
                  {product.controlFeatures.features.map((feature, index) => {
                    const IconComponent = feature.icon === "Settings" ? Settings :
                                        feature.icon === "Droplets" ? Droplets :
                                        feature.icon === "Wifi" ? Wifi :
                                        feature.icon === "Volume2" ? Volume2 :
                                        feature.icon === "Lightbulb" ? Lightbulb :
                                        feature.icon === "Zap" ? Zap :
                                        Settings; // Default fallback
                    
                    return (
                      <div key={index} className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                        <span className="text-gray-700">{feature.description}</span>
              </div>
                    );
                  })}
            </div>

               <div className="flex gap-4">
                 <Button
                 className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 w-full"
                 asChild
                 >
                   <a href="tel:+12087277909">
                    Unlock Sale Pricing
                   </a>
                 </Button>
              </div>
            </div>

             <div className="relative">
                {/* Control system image - update based on product type */}
               <Image
                 src="/images/products/mobile app.jpg"
                  alt={`${product.controlFeatures.title} Interface`}
                 width={400}
                 height={500}
                 className="mx-auto hover:scale-105 transition-transform duration-500"
               />
             </div>
          </div>
          </div>
        </section>
      )}

      {/* Product Information Dropdowns - Only for non-ActivePlus products */}
      {productSlug !== "activeplus-ep-12" && (
        <section
          id="product-info"
          data-animate
          className={`py-16 bg-white transition-all duration-1000 delay-300 ${sectionsInView["product-info"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {dropdownSections.map((section, index) => (
                <div
                  key={section.id}
                  className={`bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md ${sectionsInView["product-info"] ? `animate-fade-in-up` : "opacity-0"}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    onClick={() => toggleDropdown(section.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openDropdowns[section.id] ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openDropdowns[section.id] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
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
      )}

      {/* Related Products - Added based on provided code structure */}
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
            {/* Using other products from the 'products' object for related products */}
            {Object.entries(products)
              .filter(([slug, _]) => slug !== productSlug) // Exclude the current product
              .map(([slug, relatedProduct], index) => (
                <Card
                  key={slug}
                  className={`bg-white border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-2 ${sectionsInView.related ? `animate-fade-in-up` : "opacity-0"}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getGalleryImage(slug)}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{relatedProduct.name}</h3>
                    <Button
                      variant="outline"
                      className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <a href={`/aquaspa/${slug}`}>View Details</a>
                    </Button>
                  </CardContent>
                </Card>
            ))}
          </div>
          </div>
        </section>

      {/* Simple CTA Section - Matches the one in the provided code */}
       <section className="py-16 bg-blue-50">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-4xl font-bold mb-4 text-gray-900">Unlock Exclusive Pricing</h2>
           <p className="text-xl text-gray-600 mb-8">
             Contact us to learn more about special offers and discounts on the {product.name} Hot Tub.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button
             className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 w-full"
             asChild
             >
               <a href="tel:+12087277909">
                Unlock Exclusive Pricing
               </a>
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
                <span className="text-white font-semibold text-xl transition-colors duration-300 group-hover:text-blue-400">
                  Aqua Advantage
                </span>
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
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Contact
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
            <p className="text-gray-400 text-sm">© 2024 Aqua Advantage. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
      </div>
      </footer>
    </div>
  )
} 