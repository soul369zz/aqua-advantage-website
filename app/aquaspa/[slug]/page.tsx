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
    pumps?: string;
  };
  waterChemistry?: {
    ph: string;
    alkalinity: string;
    sanitizer: string;
    calcium: string;
  };
  maintenance?: {
    filterChange: string;
    waterChange: string;
    chemicalCheck: string;
    cleaning: string;
  };
  dryWeight?: string;
  insulation?: string;
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
  category?: string;
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
  colorOptions: Array<{
    name: string;
    color: string;
    image: string;
  }>;
  specs: ProductSpecs;
  warranty?: {
    shell: string;
    surface: string;
    components: string;
    cabinet: string;
    labor: string;
  };
  installation?: {
    spaceRequired: string;
    foundation: string;
    electrical: string;
    drainage: string;
    access: string;
  };
  energyEfficiency?: {
    rating: string;
    monthlyCost: string;
    insulation: string;
    cover: string;
  };
  features: Array<{
    title: string;
    description: string;
    image: string;
    category?: string;
  }>;
  reviews?: {
    averageRating: number;
    totalReviews: number;
    highlights: Array<{
      rating: number;
      title: string;
      text: string;
      author: string;
      date: string;
    }>;
  };
  accessories?: Array<{
    name: string;
    price: number;
    description: string;
    image: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  controlFeatures: {
    title: string;
    description: string;
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
  detailedSpecs?: {
    title: string;
    description: string;
    sections: Array<{
      title: string;
      items: Array<{
        label: string;
        value: string;
      }>;
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
      jets: "44-64 Helix Jets (varies by trim)",
      electrical: {
        voltage: "240V",
        amperage: "60 Amp",
        heater: "5.5 kW"
      },
      dryWeight: "901 lbs + cover",
      insulation: "Full Foam"
    },
    warranty: {
      shell: "Lifetime Structure",
      surface: "7 Years", 
      components: "5 Years",
      cabinet: "2 Years",
      labor: "5 Years",
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
        description: "Experience therapeutic precision with 44-64 advanced Helix jets (depending on trim level) designed for targeted massage therapy.",
        image: "/images/products/Helix Jet Technology.jpg"
      },
      {
        title: "Dual Footblasters",
        description: "Powerful dual footblasters provide invigorating foot and leg massage, included standard on all trim levels.",
        image: "/images/products/Dual Footblasters.jpg"
      },
      {
        title: "Cascade Falls Water Feature",
        description: "Standard waterfall feature creates relaxing ambiance while providing gentle neck and shoulder massage.",
        image: "/images/products/features/cascade-falls.jpg",
        category: "Water Features"
      }
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
        question: "What trim levels are available for the Grand Bahama?",
        answer: "The Grand Bahama is available in three trim levels: Essential (44 jets), Luxury (52 jets), and Elite (64 jets) with varying features and pump configurations.",
      },
      {
        question: "How long does installation take?",
        answer: "Professional installation typically takes 4-6 hours once electrical and foundation prep is complete.",
      },
    ],
    controlFeatures: {
      title: "Features Of The Grand Bahama Island Series",
      description: "Experience premium Island Series wellness technology with exceptional energy efficiency, customizable jets for targeted massage, and top-tier insulation.",
      standardFeatures: [
        {
          title: "Helix Jet Technology",
          description: "Precision-engineered jets provide targeted massage therapy with customizable intensity. Jet count varies by trim level (44-64 jets).",
          image: "/images/products/features/hydrotherapy.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Dual Footblasters",
          description: "Powerful foot and leg massage jets included standard on all trim levels for invigorating lower body therapy.",
          image: "/images/products/Dual Footblasters.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Cascade Falls Water Feature",
          description: "Standard waterfall feature creates relaxing ambiance while providing gentle neck and shoulder massage.",
          image: "/images/products/features/cascade-falls.jpg",
          category: "Water Features"
        },
        {
          title: "Full Foam Insulation",
          description: "Complete foam insulation system maintains temperature efficiently and reduces energy costs by up to 40%.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Energy Efficiency"
        },
        {
          title: "Hybrid Frame Construction",
          description: "Durable galvanized steel frame with advanced engineering for maximum longevity and structural integrity.",
          image: "/images/products/features/hybrid-frame.jpg",
          category: "Construction"
        },
        {
          title: "Grandwood Cabinets",
          description: "Maintenance-free cabinets with realistic wood-like texture and tight grain pattern. Available in Grey, Black, and Brown.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Cabinetry"
        }
      ],
      optionalFeatures: [
        {
          title: "Trim Level Upgrades",
          description: "Choose from Essential (44 jets), Luxury (52 jets), or Elite (64 jets) trim levels. Higher trims include more jets, pumps, and premium features like enhanced lighting packages.",
          image: "/images/products/features/trim-level.jpg",
          category: "Customization"
        },
        {
          title: "LED Lighting Packages",
          description: "Elite trim includes complete lighting package: Interior Underwater, Illuminated Pillows, Illuminated Footblasters, Illuminated Cascade Falls, and Vertical Corner Cabinet LED. Luxury trim includes partial package with select features optional.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        },
        {
          title: "Audio System",
          description: "Premium sound system with Bluetooth connectivity for streaming your favorite music during relaxation sessions.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Water Purification",
          description: "Cleaner water, less work - Advanced water purification keeps your spa crystal clear with fewer harsh chemicals. Enjoy healthier water that's gentler on your skin.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "WiFi Controls",
          description: "Smart home integration allows remote monitoring and control of your spa from anywhere using smartphone app.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "DirectFlow Personal Control®",
          description: "Individual jet control allows each user to customize their massage experience with precision flow adjustment. Available on Luxury and Elite trim levels.",
          image: "/images/products/features/direct-flow.jpg",
          category: "Controls"
        },
      ]
    },
    detailedSpecs: {
      title: "Detailed Specifications",
      description: "Complete technical specifications for the Grand Bahama Island Series",
      sections: [
        {
          title: "Trim Level Comparison",
          items: [
            { label: "Essential Trim", value: "44 Helix Jets, 2 pumps (5.0 BHP each), Basic lighting package" },
            { label: "Luxury Trim", value: "52 Helix Jets, 3 pumps (2x 6.0 BHP + 1x 3.0 BHP), Enhanced lighting" },
            { label: "Elite Trim", value: "64 Helix Jets, 4 pumps (1x 6.0 BHP + 3x 3.0 BHP), Complete lighting package" }
          ]
        },
        {
          title: "Construction & Materials",
          items: [
            { label: "Shell Material", value: "Premium Acrylic with UV Protection" },
            { label: "Frame", value: "Galvanized Steel Hybrid Frame" },
            { label: "Cabinet", value: "Weather-resistant Polymer" },
            { label: "Insulation", value: "Full Foam Insulation System" }
          ]
        },
        {
          title: "Electrical & Heating",
          items: [
            { label: "Voltage", value: "240V" },
            { label: "Amperage", value: "60 Amp" },
            { label: "Heater", value: "5.5 kW (North America)" },
            { label: "GFCI", value: "Included" }
          ]
        },
        {
          title: "Water Features & Lighting",
          items: [
            { label: "Standard Water Features", value: "Cascade Falls, Dual Footblasters" },
            { label: "Optional Water Features", value: "Pillowfall" },
            { label: "Standard Lighting", value: "Interior Underwater, Illuminated Pillows (Essential)" },
            { label: "Optional/Premium Lighting", value: "Complete LED Package (Luxury/Elite)" }
          ]
        }
      ]
    }
  },
  "grand-cayman": {
    name: "Grand Cayman",
    title: "Island Series Elite Hot Tub",
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
      jets: "44-64 Helix Jets (varies by trim)",
      electrical: {
        voltage: "240V",
        amperage: "60 Amp",
        heater: "5.5 kW"
      },
      dryWeight: "900 lbs + cover",
      insulation: "Full Foam"
    },
    warranty: {
      shell: "Lifetime Structure",
      surface: "7 Years", 
      components: "5 Years",
      cabinet: "2 Years",
      labor: "5 Years",
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
      monthlyCost: "$28-45",
      insulation: "Full foam insulation",
      cover: "4\" tapered energy-efficient cover",
    },
    features: [
      {
        title: "Helix Jet Technology",
        description: "Experience therapeutic precision with 44-64 advanced Helix jets (depending on trim level) designed for targeted massage therapy.",
        image: "/images/products/Helix Jet Technology.jpg"
      },
      {
        title: "Dual Footblasters", 
        description: "Powerful dual footblasters provide invigorating foot and leg massage, included standard on all trim levels.",
        image: "/images/products/Dual Footblasters.jpg"
      },
      {
        title: "Cascade Falls Water Feature",
        description: "Relaxing waterfall feature creates soothing ambiance while providing gentle neck and shoulder massage.",
        image: "/images/products/Cascade Falls Water Feature.jpg"
      }
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
        answer: "The Grand Cayman offers larger seating capacity (7 vs 6 adults) and increased water capacity (410 vs 390 gallons) for enhanced comfort.",
      },
      {
        question: "What trim levels are available?",
        answer: "Available in Essential (44 jets), Luxury (52 jets), and Elite (64 jets) trim levels with varying pump configurations and premium features.",
      },
    ],
    controlFeatures: {
      title: "Features Of The Grand Cayman Island Series",
      description: "Experience premium Island Series wellness technology with exceptional energy efficiency, customizable jets for targeted massage, and top-tier insulation.",
      standardFeatures: [
        {
          title: "Helix Jet Technology",
          description: "Precision-engineered jets provide targeted massage therapy with customizable intensity. Jet count varies by trim level (44-64 jets).",
          image: "/images/products/features/hydrotherapy.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Dual Footblasters",
          description: "Powerful foot and leg massage jets included standard on all trim levels for invigorating lower body therapy.",
          image: "/images/products/Dual Footblasters.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Cascade Falls Water Feature",
          description: "Standard waterfall feature creates relaxing ambiance while providing gentle neck and shoulder massage.",
          image: "/images/products/features/cascade-falls.jpg",
          category: "Water Features"
        },
        {
          title: "Full Foam Insulation",
          description: "Complete foam insulation system maintains temperature efficiently and reduces energy costs by up to 40%.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Energy Efficiency"
        },
        {
          title: "Hybrid Frame Construction",
          description: "Durable galvanized steel frame with advanced engineering for maximum longevity and structural integrity.",
          image: "/images/products/features/hybrid-frame.jpg",
          category: "Construction"
        },
        {
          title: "Grandwood Cabinets",
          description: "Maintenance-free cabinets with realistic wood-like texture and tight grain pattern. Available in Grey, Black, and Brown.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Cabinetry"
        }
      ],
      optionalFeatures: [
        {
          title: "Trim Level Upgrades",
          description: "Choose from Essential (44 jets), Luxury (52 jets), or Elite (64 jets) trim levels. Higher trims include more jets, pumps, and premium features like enhanced lighting packages.",
          image: "/images/products/features/trim-level.jpg",
          category: "Customization"
        },
        {
          title: "LED Lighting Packages",
          description: "Elite trim includes complete lighting package: Interior Underwater, Illuminated Pillows, Illuminated Footblasters, Illuminated Cascade Falls, and Vertical Corner Cabinet LED. Luxury trim includes partial package with select features optional.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        },
        {
          title: "Audio System",
          description: "Premium sound system with Bluetooth connectivity for streaming your favorite music during relaxation sessions.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Water Purification",
          description: "Cleaner water, less work - Advanced water purification keeps your spa crystal clear with fewer harsh chemicals. Enjoy healthier water that's gentler on your skin.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "WiFi Controls",
          description: "Smart home integration allows remote monitoring and control of your spa from anywhere using smartphone app.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        }
      ]
    },
    detailedSpecs: {
      title: "Detailed Specifications",
      description: "Complete technical specifications for the Grand Cayman Island Series",
      sections: [
        {
          title: "Trim Level Comparison",
          items: [
            { label: "Essential Trim", value: "44 Helix Jets, 2 pumps (5.0 BHP each), Basic lighting package" },
            { label: "Luxury Trim", value: "52 Helix Jets, 3 pumps (2x 6.0 BHP + 1x 3.0 BHP), Enhanced lighting" },
            { label: "Elite Trim", value: "64 Helix Jets, 4 pumps (1x 6.0 BHP + 3x 3.0 BHP), Complete lighting package" }
          ]
        },
        {
          title: "Construction & Materials",
          items: [
            { label: "Shell Material", value: "Premium Acrylic with UV Protection" },
            { label: "Frame", value: "Galvanized Steel Hybrid Frame" },
            { label: "Cabinet", value: "Weather-resistant Polymer" },
            { label: "Insulation", value: "Full Foam Insulation System" }
          ]
        },
        {
          title: "Electrical & Heating",
          items: [
            { label: "Voltage", value: "240V" },
            { label: "Amperage", value: "60 Amp" },
            { label: "Heater", value: "5.5 kW (North America)" },
            { label: "GFCI", value: "Included" }
          ]
        },
        {
          title: "Water Features & Lighting",
          items: [
            { label: "Standard Water Features", value: "Cascade Falls, Dual Footblasters" },
            { label: "Optional Water Features", value: "Pillowfall" },
            { label: "Standard Lighting", value: "Interior Underwater, Illuminated Pillows (Essential)" },
            { label: "Optional/Premium Lighting", value: "Complete LED Package (Luxury/Elite)" }
          ]
        }
      ]
    }
  },
  "captiva": {
    name: "Captiva",
    title: "Island Series Mid-Size Hot Tub",
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
      jets: "32-54 Helix Jets (varies by trim)",
      electrical: {
        voltage: "240V",
        amperage: "50 Amp",
        heater: "5.5 kW"
      },
      dryWeight: "835 lbs + cover",
      insulation: "Full Foam"
    },
    warranty: {
      shell: "Lifetime Structure",
      surface: "7 Years", 
      components: "5 Years",
      cabinet: "2 Years",
      labor: "5 Years",
    },
    installation: {
      spaceRequired: "9' x 9' minimum",
      foundation: "Level concrete pad or reinforced deck",
      electrical: "240V, 60 amp GFCI breaker",
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
        description: "Experience therapeutic precision with 32-54 advanced Helix jets (depending on trim level) designed for targeted massage therapy.",
        image: "/images/products/Helix Jet Technology.jpg"
      },
      {
        title: "Dual Footblasters", 
        description: "Powerful dual footblasters provide invigorating foot and leg massage, included standard on all trim levels.",
        image: "/images/products/Dual Footblasters.jpg"
      },
      {
        title: "Cascade Falls Water Feature",
        description: "Relaxing waterfall feature creates soothing ambiance while providing gentle neck and shoulder massage.",
        image: "/images/products/Cascade Falls Water Feature.jpg"
      }
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
        question: "What makes the Captiva special?",
        answer: "The Captiva offers 7-person seating in a compact 84\" x 84\" footprint, making it perfect for families who want premium Island Series features with space efficiency.",
      },
      {
        question: "What trim levels are available?",
        answer: "Available in Essential (32 jets), Luxury (44 jets), and Elite (54 jets) trim levels with varying pump configurations and premium features.",
      },
    ],
    controlFeatures: {
      title: "Features Of The Captiva Island Series",
      description: "Experience premium Island Series technology in a family-friendly compact design with efficient space utilization and exceptional therapeutic benefits.",
      standardFeatures: [
        {
          title: "Helix Jet Technology",
          description: "Precision-engineered jets provide targeted massage therapy with customizable intensity. Jet count varies by trim level (32-54 jets).",
          image: "/images/products/features/Helix Jet Technology.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Dual Footblasters",
          description: "Powerful foot and leg massage jets come standard on all trim levels for improved circulation and relief.",
          image: "/images/products/Dual Footblasters.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Cascade Falls Water Feature",
          description: "Standard waterfall feature creates relaxing ambiance while providing gentle neck and shoulder massage.",
          image: "/images/products/features/cascade-falls.jpg",
          category: "Water Features"
        },
        {
          title: "Full Foam Insulation",
          description: "Complete foam insulation system maintains temperature efficiently and reduces energy costs by up to 40%.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Energy Efficiency"
        },
        {
          title: "Hybrid Frame Construction",
          description: "Durable galvanized steel frame with advanced engineering for maximum longevity and structural integrity.",
          image: "/images/products/features/hybrid-frame.jpg",
          category: "Construction"
        },
        {
          title: "Grandwood Cabinets",
          description: "Maintenance-free cabinets with realistic wood-like texture and tight grain pattern. Available in Grey, Black, and Brown.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Cabinetry"
        }
      ],
      optionalFeatures: [
        {
          title: "Trim Level Upgrades",
          description: "Choose from Essential (32 jets), Luxury (44 jets), or Elite (54 jets) trim levels. Higher trims include more jets, pumps, and premium features like DirectFlow Personal Control®.",
          image: "/images/products/features/trim-level.jpg",
          category: "Customization"
        },
        {
          title: "LED Lighting",
          description: "Upgrade to illuminated pillows, footblasters, and vertical corner cabinet LED lighting. Elite trim includes full lighting package as standard.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        },
        {
          title: "Audio System",
          description: "Stream your favorite music wirelessly with optional waterproof Bluetooth speakers designed for spa environments.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "WiFi Controls",
          description: "Control your spa remotely with optional WiFi module. Pre-heat, adjust settings, and monitor your spa from anywhere.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Advanced Water Purification",
          description: "Choose from multiple water treatment options including Waterlab, Diamond AOP™, or FROG® @ease® systems for cleaner, healthier water.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Pillowfall Water Feature",
          description: "Upgrade your relaxation with an additional gentle waterfall feature for enhanced therapeutic benefits.",
          image: "/images/products/features/pillow-water.jpg",
          category: "Water Features"
        }
      ]
    },
    detailedSpecs: {
      title: "Detailed Specifications",
      description: "Complete technical specifications for the Captiva Island Series",
      sections: [
        {
          title: "Trim Level Comparison",
          items: [
            { label: "Essential Trim", value: "32 Helix Jets, 2 pumps (5.0 BHP each), Basic lighting package" },
            { label: "Luxury Trim", value: "44 Helix Jets, 3 pumps (2x 6.0 BHP + 1x 3.0 BHP), Enhanced lighting" },
            { label: "Elite Trim", value: "54 Helix Jets, 4 pumps (1x 6.0 BHP + 3x 3.0 BHP), Complete lighting package" }
          ]
        },
        {
          title: "Construction & Materials",
          items: [
            { label: "Shell Material", value: "Premium Acrylic with UV Protection" },
            { label: "Frame", value: "Galvanized Steel Hybrid Frame" },
            { label: "Cabinet", value: "Weather-resistant Polymer" },
            { label: "Insulation", value: "Full Foam Insulation System" }
          ]
        },
        {
          title: "Electrical & Heating",
          items: [
            { label: "Voltage", value: "240V" },
            { label: "Amperage", value: "50 Amp" },
            { label: "Heater", value: "5.5 kW (North America)" },
            { label: "GFCI", value: "Included" }
          ]
        },
        {
          title: "Water Features & Lighting",
          items: [
            { label: "Standard Water Features", value: "Cascade Falls, Dual Footblasters" },
            { label: "Optional Water Features", value: "Pillowfall" },
            { label: "Standard Lighting", value: "Interior Underwater, Illuminated Pillows (Essential)" },
            { label: "Optional/Premium Lighting", value: "Complete LED Package (Luxury/Elite)" }
          ]
        }
      ]
    }
  },
  "antigua": {
    name: "Antigua",
    title: "Island Series Compact Hot Tub",
    price: 14995,
    originalPrice: 17995,
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
      dimensions: "78\" x 78\" x 36\"",
      waterCapacity: "320 Gallons",
      jets: "32-54 Helix Jets (varies by trim)",
      electrical: {
        voltage: "240V",
        amperage: "50 Amp",
        heater: "5.5 kW"
      },
      dryWeight: "834 lbs + cover",
      insulation: "Full Foam"
    },
    warranty: {
      shell: "Lifetime Structure",
      surface: "7 Years", 
      components: "5 Years",
      cabinet: "2 Years",
      labor: "5 Years",
    },
    installation: {
      spaceRequired: "9' x 9' minimum",
      foundation: "Level concrete pad or reinforced deck",
      electrical: "240V, 60 amp GFCI breaker",
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
        description: "Experience therapeutic precision with 32-54 advanced Helix jets (depending on trim level) designed for targeted massage therapy.",
        image: "/images/products/Helix Jet Technology.jpg"
      },
      {
        title: "Dual Footblasters", 
        description: "Powerful dual footblasters provide invigorating foot and leg massage, included standard on all trim levels.",
        image: "/images/products/Dual Footblasters.jpg"
      },
      {
        title: "Cascade Falls Water Feature",
        description: "Relaxing waterfall feature creates soothing ambiance while providing gentle neck and shoulder massage.",
        image: "/images/products/Cascade Falls Water Feature.jpg"
      }
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
        question: "What makes the Antigua different from other Island Series models?",
        answer: "The Antigua offers premium Island Series features in a compact 84\" x 84\" footprint with 6-person seating, perfect for smaller spaces without compromising on quality.",
      },
      {
        question: "What trim levels are available?",
        answer: "Available in Essential (32 jets), Luxury (44 jets), and Elite (54 jets) trim levels with varying pump configurations and premium features.",
      },
    ],
    controlFeatures: {
      title: "Features Of The Antigua Island Series",
      description: "Experience premium Island Series technology in a compact design perfect for smaller spaces while maintaining exceptional energy efficiency and customizable jets.",
      standardFeatures: [
        {
          title: "Helix Jet Technology",
          description: "Precision-engineered jets provide targeted massage therapy with customizable intensity. Jet count varies by trim level (32-54 jets).",
          image: "/images/products/features/Helix Jet Technology.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Dual Footblasters",
          description: "Powerful foot and leg massage jets come standard on all trim levels for improved circulation and relief.",
          image: "/images/products/Dual Footblasters.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Cascade Falls Water Feature",
          description: "Standard waterfall feature creates relaxing ambiance while providing gentle neck and shoulder massage.",
          image: "/images/products/features/cascade-falls.jpg",
          category: "Water Features"
        },
        {
          title: "Full Foam Insulation",
          description: "Complete foam insulation system maintains temperature efficiently and reduces energy costs by up to 40%.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Energy Efficiency"
        },
        {
          title: "Hybrid Frame Construction",
          description: "Durable galvanized steel frame with advanced engineering for maximum longevity and structural integrity.",
          image: "/images/products/features/hybrid-frame.jpg",
          category: "Construction"
        },
        {
          title: "Grandwood Cabinets",
          description: "Maintenance-free cabinets with realistic wood-like texture and tight grain pattern. Available in Grey, Black, and Brown.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Cabinetry"
        }
      ],
      optionalFeatures: [
        {
          title: "Trim Level Upgrades",
          description: "Choose from Essential (32 jets), Luxury (44 jets), or Elite (54 jets) trim levels. Higher trims include more jets, pumps, and premium features like DirectFlow Personal Control®.",
          image: "/images/products/features/trim-level.jpg",
          category: "Customization"
        },
        {
          title: "LED Lighting",
          description: "Upgrade to illuminated pillows, footblasters, and vertical corner cabinet LED lighting. Elite trim includes full lighting package as standard.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        },
        {
          title: "Audio System",
          description: "Stream your favorite music wirelessly with optional waterproof Bluetooth speakers designed for spa environments.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "WiFi Controls",
          description: "Control your spa remotely with optional WiFi module. Pre-heat, adjust settings, and monitor your spa from anywhere.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Smart Technology"
        },
        {
          title: "Advanced Water Purification",
          description: "Choose from multiple water treatment options including Waterlab, Diamond AOP™, or FROG® @ease® systems for cleaner, healthier water.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Pillowfall Water Feature",
          description: "Upgrade your relaxation with an additional gentle waterfall feature for enhanced therapeutic benefits.",
          image: "/images/products/features/pillow-water.jpg",
          category: "Water Features"
        }
      ]
    },
    detailedSpecs: {
      title: "Detailed Specifications",
      description: "Complete technical specifications for the Antigua Island Series",
      sections: [
        {
          title: "Trim Level Comparison",
          items: [
            { label: "Essential Trim", value: "32 Helix Jets, 2 pumps (5.0 BHP each), Basic lighting package" },
            { label: "Luxury Trim", value: "44 Helix Jets, 3 pumps (2x 6.0 BHP + 1x 3.0 BHP), Enhanced lighting" },
            { label: "Elite Trim", value: "54 Helix Jets, 4 pumps (1x 6.0 BHP + 3x 3.0 BHP), Complete lighting package" }
          ]
        },
        {
          title: "Construction & Materials",
          items: [
            { label: "Shell Material", value: "Premium Acrylic with UV Protection" },
            { label: "Frame", value: "Galvanized Steel Hybrid Frame" },
            { label: "Cabinet", value: "Weather-resistant Polymer" },
            { label: "Insulation", value: "Full Foam Insulation System" }
          ]
        },
        {
          title: "Electrical & Heating",
          items: [
            { label: "Voltage", value: "240V" },
            { label: "Amperage", value: "50 Amp" },
            { label: "Heater", value: "5.5 kW (North America)" },
            { label: "GFCI", value: "Included" }
          ]
        },
        {
          title: "Water Features & Lighting",
          items: [
            { label: "Standard Water Features", value: "Cascade Falls, Dual Footblasters" },
            { label: "Optional Water Features", value: "Pillowfall" },
            { label: "Standard Lighting", value: "Interior Underwater, Illuminated Pillows (Essential)" },
            { label: "Optional/Premium Lighting", value: "Complete LED Package (Luxury/Elite)" }
          ]
        }
      ]
    }
  },
  "wisteria": {
    name: "Wisteria",
    title: "Garden Series Plug & Play Hot Tub",
    price: 11995,
    originalPrice: 13995,
    images: [
      "/images/products/Wisteria.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Brown", color: "#8B4513", image: "/images/products/Cabinetry Colors/Brown.png" },
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "84\" x 84\" x 36\"",
      waterCapacity: "330 Gallons",
      jets: "27 Stainless Steel Jets",
      electrical: {
        voltage: "120V Standard",
        amperage: "15A GFCI",
        heater: "1.0 kW @ 120V, 4.0 kW @ 240V"
      },
      dryWeight: "730 lbs",
      insulation: "ArcticPac Insulation"
    },
    warranty: {
      shell: "Lifetime Structure",
      surface: "1 Year", 
      components: "1 Year",
      cabinet: "1 Year",
      labor: "1 Year",
    },
    features: [
      {
        title: "ArcticPac Insulation",
        description: "Advanced insulation system keeps your spa energy efficient while maintaining comfortable water temperature year-round.",
        image: "/images/products/ArcticPac Insulation.jpg"
      },
      {
        title: "Stainless Steel Jets", 
        description: "27 precision-engineered stainless steel jets provide consistent, therapeutic massage that won't corrode or fade over time.",
        image: "/images/products/Stainless Steel Jets.jpg"
      },
      {
        title: "Plug-and-Play Convenience",
        description: "No complicated electrical work required - simply plug into a standard outlet and start enjoying your spa immediately.",
        image: "/images/products/Plug-and-Play Convenience.jpg"
      }
    ],
    controlFeatures: {
      title: "Garden Series Convenience Features",
      description: "Experience spa luxury without the complexity. Simple plug-and-play operation gets you relaxing faster with professional-quality massage therapy.",
      standardFeatures: [
        {
          title: "ArcticPac Insulation",
          description: "Advanced insulation system keeps your spa energy efficient while maintaining comfortable water temperature year-round.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Energy Efficiency"
      },
      {
        title: "Stainless Steel Jets", 
          description: "27 precision-engineered stainless steel jets provide consistent, therapeutic massage that won't corrode or fade over time.",
        image: "/images/products/Stainless Steel Jets.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Plug-and-Play Setup",
          description: "110V/220V dual voltage system plugs into standard outlet - no complicated electrical work or permits required for installation.",
          image: "/images/products/Plug & Play Convenience.jpg",
          category: "Convenience"
        },
        {
          title: "Digital Controls",
          description: "User-friendly digital controls with clear temperature display and simple operation - perfect for everyday relaxation.",
          image: "/images/products/Digital Control System.jpg",
          category: "Controls"
        },
        {
          title: "Space-Efficient Design",
          description: "90\" x 90\" footprint maximizes seating for 6 adults while fitting comfortably on most decks and patios.",
          image: "/images/products/Space-Saving Design.jpg",
          category: "Design"
        },
        {
          title: "Weather-Resistant Cabinet",
          description: "Durable polymer cabinet withstands all weather conditions while maintaining attractive appearance year after year.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Construction"
        }
      ],
      optionalFeatures: [
        {
          title: "LED Lighting",
          description: "Add mood lighting with energy-efficient LED systems that create the perfect ambiance for evening relaxation.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        },
        {
          title: "Audio System",
          description: "Waterproof Bluetooth speakers designed specifically for spa environments let you enjoy music during your soak.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Water Purification",
          description: "Cleaner water, less work - Advanced water purification keeps your spa crystal clear with fewer harsh chemicals. Enjoy healthier water that's gentler on your skin.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        }
      ]
    },
    detailedSpecs: {
      title: "Detailed Specifications",
      description: "Complete technical specifications for the Wisteria Garden Series",
      sections: [
        {
          title: "Dimensions & Capacity",
          items: [
            { label: "Overall Dimensions", value: "84\" x 84\" x 36\"" },
            { label: "Seating Capacity", value: "6 Adults" },
            { label: "Water Capacity", value: "330 Gallons" },
            { label: "Dry Weight", value: "730 lbs" }
          ]
        },
        {
          title: "Jet & Hydrotherapy System",
          items: [
            { label: "Total Jets", value: "27 Stainless Steel Jets" },
            { label: "Jet Material", value: "Corrosion-resistant Stainless Steel" },
            { label: "Pump System", value: "Efficient Circulation Pump" },
            { label: "Filtration", value: "Standard Cartridge Filter System" }
          ]
        },
        {
          title: "Electrical & Heating",
          items: [
            { label: "Voltage", value: "120V Standard" },
            { label: "Amperage", value: "15A GFCI" },
            { label: "Heater", value: "1.0 kW @ 120V, 4.0 kW @ 240V" },
            { label: "GFCI", value: "Included" }
          ]
        },
        {
          title: "Construction & Insulation",
          items: [
            { label: "Shell Material", value: "Premium Acrylic" },
            { label: "Cabinet", value: "Weather-resistant Polymer" },
            { label: "Insulation", value: "ArcticPac Insulation System" },
            { label: "Frame", value: "Reinforced Support Structure" }
          ]
        }
      ]
    }
  },
  "plume": {
    name: "Plume",
    title: "Garden Series Plug & Play Hot Tub",
    price: 10995,
    originalPrice: 12995,
    images: [
      "/images/products/Plume.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Brown", color: "#8B4513", image: "/images/products/Cabinetry Colors/Brown.png" },
    ],
    specs: {
      seating: "6 Adults",
      dimensions: "84\" x 78\" x 34\"",
      waterCapacity: "295 Gallons",
      jets: "27 Stainless Steel Jets",
      electrical: {
        voltage: "120V Standard",
        amperage: "15A GFCI",
        heater: "1.0 kW @ 120V, 4.0 kW @ 240V"
      },
      dryWeight: "769 lbs",
      insulation: "ArcticPac Insulation"
    },
    warranty: {
      shell: "Lifetime Structure",
      surface: "1 Year", 
      components: "1 Year",
      cabinet: "1 Year",
      labor: "1 Year",
    },
    features: [
      {
        title: "ArcticPac Insulation",
        description: "Advanced insulation technology maintains temperature efficiently, reducing energy costs and environmental impact.",
        image: "/images/products/ArcticPac Insulation.jpg"
      },
      {
        title: "Stainless Steel Jets", 
        description: "27 precisely positioned stainless steel jets provide therapeutic massage tailored to the rectangular seating arrangement.",
        image: "/images/products/Stainless Steel Jets.jpg"
      },
      {
        title: "Space-Saving Design",
        description: "Rectangular footprint maximizes seating capacity while fitting perfectly on decks, patios, and smaller outdoor spaces.",
        image: "/images/products/Space-Saving Design.jpg"
      }
    ],
    controlFeatures: {
      title: "Garden Series Smart Efficiency",
      description: "Maximize your relaxation while minimizing your footprint and costs. Perfect balance of luxury features and practical efficiency for modern living.",
      standardFeatures: [
        {
          title: "ArcticPac Insulation",
          description: "Advanced insulation technology maintains temperature efficiently, reducing energy costs and environmental impact.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Energy Efficiency"
        },
        {
          title: "Stainless Steel Jets",
          description: "27 precisely positioned stainless steel jets provide therapeutic massage tailored to the rectangular seating arrangement.",
          image: "/images/products/Stainless Steel Jets.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Space-Saving Design",
          description: "Rectangular footprint maximizes seating capacity while fitting perfectly on decks, patios, and smaller outdoor spaces.",
        image: "/images/products/Space-Saving Design.jpg",
          category: "Design"
        },
        {
          title: "Digital Controls",
          description: "Simple digital controls with clear temperature display and easy jet operation - perfect for everyday use.",
          image: "/images/products/Digital Control System.jpg",
          category: "Controls"
        },
        {
          title: "Plug-and-Play Setup",
          description: "110V/220V dual voltage system requires no special electrical work - simply plug in and enjoy your new spa.",
          image: "/images/products/Plug & Play Convenience.jpg",
          category: "Convenience"
        },
        {
          title: "Weather-Resistant Cabinet",
          description: "Durable polymer construction stands up to all weather conditions while maintaining its attractive appearance.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Construction"
        }
      ],
      optionalFeatures: [
        {
          title: "LED Lighting",
          description: "Create the perfect evening atmosphere with optional LED lighting systems designed for energy efficiency.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Lighting"
        },
        {
          title: "Audio System",
          description: "Enjoy your favorite music with waterproof Bluetooth speakers specifically designed for spa environments.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Water Purification",
          description: "Advanced water purification keeps your pool crystal clear with fewer harsh chemicals. Enjoy healthier water while spending less time on maintenance.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        }
      ]
    },
    detailedSpecs: {
      title: "Detailed Specifications",
      description: "Complete technical specifications for the Plume Garden Series",
      sections: [
        {
          title: "Dimensions & Capacity",
          items: [
            { label: "Overall Dimensions", value: "84\" x 78\" x 34\"" },
            { label: "Seating Capacity", value: "6 Adults" },
            { label: "Water Capacity", value: "295 Gallons" },
            { label: "Dry Weight", value: "769 lbs" }
          ]
        },
        {
          title: "Jet & Hydrotherapy System",
          items: [
            { label: "Total Jets", value: "27 Stainless Steel Jets" },
            { label: "Jet Material", value: "Corrosion-resistant Stainless Steel" },
            { label: "Pump System", value: "Efficient Circulation Pump" },
            { label: "Filtration", value: "Standard Cartridge Filter System" }
          ]
        },
        {
          title: "Electrical & Heating",
          items: [
            { label: "Voltage", value: "120V Standard" },
            { label: "Amperage", value: "15A GFCI" },
            { label: "Heater", value: "1.0 kW @ 120V, 4.0 kW @ 240V" },
            { label: "GFCI", value: "Included" }
          ]
        },
        {
          title: "Construction & Insulation",
          items: [
            { label: "Shell Material", value: "Premium Acrylic" },
            { label: "Cabinet", value: "Weather-resistant Polymer" },
            { label: "Insulation", value: "ArcticPac Insulation System" },
            { label: "Frame", value: "Reinforced Support Structure" }
          ]
        }
      ]
    }
  },
  "viola": {
    name: "Viola",
    title: "Garden Series Plug & Play Hot Tub",
    price: 8995,
    originalPrice: 10995,
    images: [
      "/images/products/Viola.jpg",
    ],
    colorOptions: [
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Brown", color: "#8B4513", image: "/images/products/Cabinetry Colors/Brown.png" },
    ],
    specs: {
      seating: "2 Adults",
      dimensions: "82\" x 65\" x 31\"",
      waterCapacity: "220 Gallons",
      jets: "21 Stainless Steel Jets",
      electrical: {
        voltage: "120V Standard",
        amperage: "15A GFCI",
        heater: "1.0 kW @ 120V, 4.0 kW @ 240V"
      },
      dryWeight: "565 lbs",
      insulation: "ArcticPac Insulation"
    },
    warranty: {
      shell: "Lifetime Structure",
      surface: "1 Year", 
      components: "1 Year",
      cabinet: "1 Year",
      labor: "1 Year",
    },
    features: [
      {
        title: "ArcticPac Insulation",
        description: "Advanced insulation maintains perfect temperature efficiently while keeping operating costs incredibly low for daily enjoyment.",
        image: "/images/products/ArcticPac Insulation.jpg"
      },
      {
        title: "Intimate Jet Configuration", 
        description: "21 stainless steel jets positioned specifically for couples' relaxation with targeted massage for two-person comfort.",
        image: "/images/products/Stainless Steel Jets.jpg"
      },
      {
        title: "Perfect for Two",
        description: "Compact intimate design maximizes comfort for two while fitting perfectly in small spaces, balconies, and cozy patios.",
        image: "/images/products/Perfect for Two.jpg"
      }
    ],
    controlFeatures: {
      title: "Garden Series Intimate Luxury",
      description: "Experience spa luxury designed for two. Ultra-efficient operation and intimate design create the perfect romantic retreat for your backyard.",
      standardFeatures: [
        {
          title: "ArcticPac Insulation",
          description: "Advanced insulation maintains perfect temperature efficiently while keeping operating costs incredibly low for daily enjoyment.",
          image: "/images/products/features/full-foam-insulation.jpg",
          category: "Energy Efficiency"
        },
        {
          title: "Intimate Jet Configuration",
          description: "21 stainless steel jets positioned specifically for couples' relaxation with targeted massage for two-person comfort.",
          image: "/images/products/Stainless Steel Jets.jpg",
          category: "Hydrotherapy"
        },
        {
          title: "Couples-Focused Design",
          description: "Compact intimate design maximizes comfort for two while fitting perfectly in small spaces, balconies, and cozy patios.",
        image: "/images/products/Perfect for Two.jpg",
          category: "Design"
        },
        {
          title: "Digital Controls",
          description: "Easy-to-use controls designed for couples with clear displays and simple operation - perfect for romantic evenings.",
          image: "/images/products/Digital Control System.jpg",
          category: "Controls"
        },
        {
          title: "Plug-and-Play Setup",
          description: "110V/220V dual voltage means no electrical complications - perfect for renters or those wanting simple installation.",
          image: "/images/products/Plug & Play Convenience.jpg",
          category: "Convenience"
        },
        {
          title: "Weather-Resistant Cabinet",
          description: "Durable construction designed to withstand the elements while maintaining beauty in intimate outdoor settings.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Construction"
        }
      ],
      optionalFeatures: [
        {
          title: "Romantic Lighting",
          description: "Set the perfect mood with optional LED lighting systems designed to create intimate ambiance for couples.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Romantic Features"
        },
        {
          title: "Audio System",
          description: "Create the perfect romantic atmosphere with waterproof Bluetooth speakers for your favorite music.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Water Purification",
          description: "Cleaner water, less work - Advanced water purification keeps your spa crystal clear with fewer harsh chemicals. Enjoy healthier water that's gentler on your skin.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        }
      ]
    },
    detailedSpecs: {
      title: "Detailed Specifications",
      description: "Complete technical specifications for the Viola Garden Series",
      sections: [
        {
          title: "Dimensions & Capacity",
          items: [
            { label: "Overall Dimensions", value: "82\" x 65\" x 31\"" },
            { label: "Seating Capacity", value: "2 Adults" },
            { label: "Water Capacity", value: "220 Gallons" },
            { label: "Dry Weight", value: "565 lbs" }
          ]
        },
        {
          title: "Jet & Hydrotherapy System",
          items: [
            { label: "Total Jets", value: "21 Stainless Steel Jets" },
            { label: "Jet Material", value: "Corrosion-resistant Stainless Steel" },
            { label: "Pump System", value: "Efficient Circulation Pump" },
            { label: "Filtration", value: "Standard Cartridge Filter System" }
          ]
        },
        {
          title: "Electrical & Heating",
          items: [
            { label: "Voltage", value: "120V Standard" },
            { label: "Amperage", value: "15A GFCI" },
            { label: "Heater", value: "1.0 kW @ 120V, 4.0 kW @ 240V" },
            { label: "GFCI", value: "Included" }
          ]
        },
        {
          title: "Construction & Insulation",
          items: [
            { label: "Shell Material", value: "Premium Acrylic" },
            { label: "Cabinet", value: "Weather-resistant Polymer" },
            { label: "Insulation", value: "ArcticPac Insulation System" },
            { label: "Frame", value: "Reinforced Support Structure" }
          ]
        }
      ]
    }
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
      waterCapacity: "1,315 Gallons",
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
      shell: "Lifetime Structure",
      surface: "7 Years", 
      components: "5 Years",
      cabinet: "2 Years",
      labor: "5 Years",
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
      standardFeatures: [
        {
          title: "Swim Jet Technology",
          description: "Powerful swim jets create the perfect current for swimming, aqua jogging, and resistance training - bringing the gym to your backyard for year-round fitness regardless of weather.",
          image: "/images/products/Swim Jet Technology.jpg",
          category: "Exercise Excellence"
        },
        {
          title: "Dual-Zone Design", 
          description: "Dual-zone design gives you the best of both worlds - a dedicated exercise area with swim jets plus a separate hydrotherapy zone for post-workout recovery and relaxation.",
          image: "/images/products/Dual-Zone Design.jpg",
          category: "Smart Design"
        },
        {
          title: "Year-Round Fitness",
          description: "Never skip another workout due to weather. Your heated exercise pool ensures daily fitness routines are always possible, keeping you healthy and active year-round.",
          image: "/images/products/Year-Round Fitness.jpg",
          category: "Wellness"
        },
        {
          title: "Grab Rails",
          description: "Enhanced safety and stability when exercising, stretching, or transitioning in and out of the pool - perfect for users of all fitness levels.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Confidence"
        },
        {
          title: "Grandwood Cabinets",
          description: "Beautiful Grandwood cabinets with realistic wood-like texture complement any backyard setting while you enjoy your daily fitness routine in luxury.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Beautiful Design"
        },
        {
          title: "Smart Controls",
          description: "Advanced digital touchscreen controls let you adjust temperature and settings effortlessly, ensuring perfect conditions for every workout and recovery session.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Convenience"
        }
      ],
      optionalFeatures: [
        {
          title: "Swim Jet Systems",
          description: "Choose from Dual or Quad swim jet systems with adjustable speed control - find your perfect training intensity whether you're a beginner or athlete.",
          image: "/images/products/features/swim-jet-systems.jpg",
          category: "Exercise"
        },
        {
          title: "Hydrotherapy",
          description: "Add therapeutic massage jets with soothing waterfall features - the perfect way to recover after intense training sessions.",
          image: "/images/products/features/hydrotherapy.jpg",
          category: "Recovery"
        },
        {
          title: "LED Lighting",
          description: "Dynamic LED lighting makes evening workouts magical while clearly illuminating swim jets and water features for safety.",
          image: "/images/products/features/LED-lighting-systems.jpg",
          category: "Premium Lighting"
        },
        {
          title: "WiFi Controls",
          description: "Pre-heat your pool on the way home from work or adjust settings from inside the house - ultimate convenience for busy lifestyles.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Convenience"
        },
        {
          title: "Water Purification",
          description: "Advanced water purification keeps your pool crystal clear with fewer harsh chemicals. Enjoy healthier water while spending less time on maintenance.",
          image: "/images/products/features/water-treatment-systems.jpg",
          category: "Water Treatment"
        },
        {
          title: "Audio System",
          description: "Immerse yourself in your favorite workout music with crystal-clear Bluetooth speakers designed for pool environments.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        },
        {
          title: "Aquatic Training System",
          description: "Transform your pool into a professional training facility with resistance equipment and rowing systems for total-body workouts.",
          image: "/images/products/features/aquatic-training.jpg",
          category: "Professional Training"
        }
      ]
    },
  },
  "pro-ep-15": {
    name: "Pro EP-15",
    title: "TidalFit Professional Exercise Pool",
    price: 36995,
    originalPrice: 42995,
    images: [
      "/images/products/Pro EP-15.jpg",
    ],
    colorOptions: [
      { name: "Charcoal", color: "#374151", image: "/images/products/Cabinetry Colors/Grandwood Charcoal Black.png" },
      { name: "Black", color: "#1F2937", image: "/images/products/Cabinetry Colors/Black.png" },
      { name: "Java", color: "#8B4513", image: "/images/products/Cabinetry Colors/Grandwood Java.png" },
      { name: "Grey", color: "#6B7280", image: "/images/products/Cabinetry Colors/Grey.png" },
    ],
    specs: {
      seating: "Professional Pool",
      dimensions: "180\" x 91\" x 60\"",
      waterCapacity: "2,075 Gallons",
      jets: "Variable Speed + Optional 34 Helix",
      electrical: {
        voltage: "240V",
        amperage: "60 Amp",
        heater: "5.5 kW",
        pumps: "2 Variable Speed + 2 Therapy Pumps",
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
      shell: "Lifetime Structure",
      surface: "7 Years", 
      components: "5 Years",
      cabinet: "2 Years",
      labor: "5 Years",
    },
    installation: {
      spaceRequired: "20' x 12' minimum",
      foundation: "Reinforced concrete pad or deck",
      electrical: "240V, 60 amp GFCI breaker",
      drainage: "Access to drain or pump",
      access: "48\" minimum clearance on all sides",
    },
    energyEfficiency: {
      rating: "Commercial Grade Efficient",
      monthlyCost: "$55-85",
      insulation: "Full foam insulation with thermal barrier",
      cover: "4\" commercial-grade cover with safety locks",
    },
    features: [
      {
        title: "Enhanced Swim Jet Technology",
        description: "Professional-grade variable speed swim jets provide the most advanced current system for serious athletes and fitness enthusiasts",
        image: "/images/products/Enhanced Swim Jet Technology.jpg",
      },
      {
        title: "Commercial-Grade Construction", 
        description: "Built to commercial standards for durability and performance that exceeds residential expectations",
        image: "/images/products/Commercial-Grade Construction.jpg",
      },
      {
        title: "Advanced Temperature Control",
        description: "Precise temperature management system maintains optimal water temperature for extended exercise sessions",
        image: "/images/products/Advanced Temperature Control.jpg",
      },
    ],
    reviews: {
      averageRating: 4.9,
      totalReviews: 23,
      highlights: [
        {
          rating: 5,
          title: "Professional-grade performance",
          text: "The Pro EP-15 delivers everything promised. Variable speed jets are incredibly smooth and the build quality is exceptional.",
          author: "Coach Sarah Martinez",
          date: "2024-01-18",
        },
        {
          rating: 5,
          title: "Worth every penny",
          text: "Upgraded from the EP-12 and the difference is remarkable. The longer pool and variable speed jets make this perfect for serious training.",
          author: "Dr. James Thompson",
          date: "2024-01-05",
        },
      ],
    },
    accessories: [
      {
        name: "Professional Fitness Kit",
        price: 599,
        description: "Complete professional-grade water exercise equipment including resistance bands, weights, and training guides",
        image: "/images/products/professional-fitness-kit.jpg",
      },
      {
        name: "Commercial Auto Cover",
        price: 1299,
        description: "Heavy-duty motorized safety cover system with commercial-grade components",
        image: "/images/products/commercial-auto-cover.jpg",
      },
      {
        name: "Professional Steps",
        price: 899,
        description: "Non-slip professional steps with safety rails for secure entry and exit",
        image: "/images/products/professional-steps.jpg",
      },
    ],
    faqs: [
      {
        question: "What makes this 'professional-grade' compared to the EP-12?",
        answer: "The Pro EP-15 features variable speed swim jets, larger dimensions, commercial-grade construction, and enhanced hydrotherapy options - designed for serious athletes and commercial applications.",
      },
      {
        question: "Can this be used for competitive swim training?",
        answer: "Absolutely! The variable speed jets and 15-foot length make it ideal for competitive swimmers, triathletes, and serious fitness enthusiasts who need professional training capabilities.",
      },
      {
        question: "What's the maintenance difference from residential pools?",
        answer: "Despite its professional capabilities, the Pro EP-15 maintains the same easy maintenance as our residential models - just on a slightly larger scale with commercial-grade components.",
      },
    ],
    controlFeatures: {
      title: "Features Of The Pro EP-15 Professional Exercise Pool",
      description: "Experience the ultimate in luxury aquatic fitness with premium features designed for serious exercise, family enjoyment, and therapeutic relaxation.",
      standardFeatures: [
        {
          title: "Enhanced Swim Jet Technology",
          description: "Variable speed swim jets provide the perfect training environment for all fitness levels - smoothly adjustable from gentle rehabilitation to challenging workouts, bringing professional performance to your backyard.",
          image: "/images/products/features/swim-jets.jpg",
          category: "Exercise Excellence"
        },
        {
          title: "Premium Construction", 
          description: "Built with enhanced materials and engineering for long-lasting durability and reliable daily use. This premium exercise pool is designed to withstand years of family enjoyment and serious training.",
          image: "/images/products/Commercial-Grade Construction.jpg",
          category: "Quality Build"
        },
        {
          title: "Advanced Temperature Control",
          description: "Precise temperature management maintains optimal water temperature for comfortable exercise and relaxation, ensuring perfect conditions whether you're working out or unwinding.",
          image: "/images/products/Advanced Temperature Control.jpg",
          category: "Comfort Technology"
        },
        {
          title: "Grab Rails",
          description: "Enhanced safety and stability when exercising, stretching, or transitioning in and out of the pool - perfect for users of all fitness levels and swimming abilities.",
          image: "/images/products/features/grab-rails.jpg",
          category: "Safety & Confidence"
        },
        {
          title: "Grandwood Cabinets",
          description: "Beautiful Grandwood cabinets with enhanced weather resistance and premium styling that perfectly complements any backyard setting for years of elegant enjoyment.",
          image: "/images/products/features/grandwood-cabinets.jpg",
          category: "Beautiful Design"
        },
        {
          title: "Smart Controls",
          description: "Advanced touchscreen control system with user-friendly features including easy presets, timer functions, and simple jet speed adjustment for optimal comfort and convenience.",
          image: "/images/products/features/smart-controls.jpg",
          category: "Easy Technology"
        }
      ],
      optionalFeatures: [
        {
          title: "Variable Speed Swim Systems",
          description: "Choose WaVS Variable Speed or Quad systems with infinitely adjustable speed control - perfect for everyone from beginners to competitive swimmers, tailored to your fitness goals.",
          image: "/images/products/features/swim-jets.jpg",
          category: "Exercise Options"
        },
        {
          title: "Enhanced Hydrotherapy",
          description: "34 therapeutic massage jets with soothing waterfall features provide excellent recovery and relaxation benefits for the whole family to enjoy after workouts or long days.",
          image: "/images/products/features/hydrotherapy.jpg",
          category: "Recovery & Wellness"
        },
        {
          title: "Water Purification",
          description: "Advanced water purification system reduces chemical usage while maintaining crystal-clear water quality - healthier for your family and easier maintenance for you.",
          image: "/images/products/Commercial Ozonator.jpg",
          category: "Water Quality"
        },
        {
          title: "Dual-Zone Design",
          description: "Optimized layout maximizes both exercise space and relaxation area - perfect for swimming laps while others enjoy hydrotherapy, bringing everyone together.",
          image: "/images/products/Dual-Zone Design.jpg",
          category: "Smart Design"
        },
        {
          title: "Year-Round Fitness",
          description: "Never skip another workout due to weather. Your heated exercise pool ensures daily fitness routines are always possible, keeping your family healthy and active year-round.",
          image: "/images/products/Year-Round Fitness.jpg",
          category: "All-Weather Enjoyment"
        },
        {
          title: "DynaBrite Lighting",
          description: "Enhanced LED lighting with 12 precision lights provides beautiful evening ambiance and clear visibility for safe nighttime swimming and relaxation.",
          image: "/images/products/features/dynabrite-lighting.jpg",
          category: "Premium Lighting"
        },
        {
          title: "WiFi App Controls",
          description: "Easy WiFi app lets you pre-heat your pool on the way home from work or adjust settings from inside the house - ultimate convenience for busy lifestyles.",
          image: "/images/products/features/wifi-app.jpg",
          category: "Convenience"
        },
        {
          title: "Audio Systems",
          description: "Premium Bluetooth and audio system with high-quality speakers creates the perfect environment for workout motivation, relaxation, or family entertainment.",
          image: "/images/products/features/audio-systems.jpg",
          category: "Entertainment"
        }
      ]
    },
    detailedSpecs: {
      title: "Detailed Specifications",
      description: "Complete technical specifications for the Pro EP-15 Professional Exercise Pool",
      sections: [
        {
          title: "Dimensions & Capacity",
          items: [
            { label: "Overall Dimensions", value: "180\" x 91\" x 60\" (457 cm x 231 cm x 152 cm)" },
            { label: "Water Capacity", value: "2,075 gallons (7,855 liters)" },
            { label: "Dry Weight", value: "2,400 lbs (1,088 kg)" },
            { label: "Space Required", value: "20' x 12' minimum clearance" }
          ]
        },
        {
          title: "Electrical Requirements",
          items: [
            { label: "Voltage", value: "240V" },
            { label: "Amperage", value: "60 Amp GFCI" },
            { label: "Heater", value: "5.5 kW North America (60 Hz), 3.0 kW Export (50 Hz)" },
            { label: "Pumps", value: "2 Variable Speed + Optional 2 Therapy Pumps" }
          ]
        },
        {
          title: "Swim Jet Systems",
          items: [
            { label: "WaVS Variable Speed", value: "(4) 6.0\" Swim Jets, (2) 3.0 HP Variable Speed Pumps" },
            { label: "Quad System", value: "(4) 6.0\" Swim Jets, (2) 3.0 HP 1-Spd Pumps with Speed Control" },
            { label: "Jet Adjustment", value: "Infinitely variable speed control" },
            { label: "Flow Rate", value: "Professional-grade current generation" }
          ]
        },
        {
          title: "Hydrotherapy Options",
          items: [
            { label: "Option 1", value: "34 Helix Jets, 6.0 BHP (3.0 HP continuous) 1-Spd Pump" },
            { label: "Option 2", value: "34 Helix Jets, 3.0 HP 1-Spd Pump" },
            { label: "Water Features", value: "BellagioFall Water Feature (optional)" },
            { label: "Therapy Zones", value: "Dedicated hydrotherapy area" }
          ]
        },
        {
          title: "Construction & Materials",
          items: [
            { label: "Shell Material", value: "Commercial-Grade Acrylic" },
            { label: "Cabinet", value: "Maintenance Free Grandwood" },
            { label: "Insulation", value: "Full Foam with ABS Bottom" },
            { label: "Frame", value: "Commercial-Grade Reinforced Structure" }
          ]
        },
        {
          title: "Standard Features",
          items: [
            { label: "Grab Rails", value: "2 Grab Rails" },
            { label: "Lighting", value: "Blue LED 5\" Spa Light" },
            { label: "Controls", value: "SpaTouch Color Touchscreen (WiFi Ready)" },
            { label: "Cover", value: "All Seasons Shield Cover" }
          ]
        },
        {
          title: "Warranty Coverage",
          items: [
            { label: "Structure", value: "Lifetime" },
            { label: "Surface", value: "7 Years" },
            { label: "Components", value: "5 Years" },
            { label: "Cabinet", value: "2 Years" }
          ]
        }
      ]
    }
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
    "pro-ep-15": "/images/products/Pro EP-15 Gallery.jpg",
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
                {product.warranty ? Object.entries(product.warranty).map(([key, value]) => (
                  <div key={key} className="border-l-4 border-emerald-500 pl-4">
                    <h5 className="font-medium text-gray-900 capitalize">{key}</h5>
                    <p className="text-gray-600">{value}</p>
                </div>
                )) : (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Warranty information available upon request. Please contact us for detailed warranty coverage.</p>
                  </div>
                )}
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

      {/* Enhanced Features Section - For All Products */}
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
                Ready to Experience Ultimate Relaxation?
              </h3>
              <p className="text-blue-100 text-lg mb-6">
                Discover how the {product.name} can transform your wellness and relaxation routine
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