'use client'

interface StructuredDataProps {
  type: 'organization' | 'product' | 'website'
  data?: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Aqua Advantage Spas',
          url: 'https://aquaadvantage.com',
          logo: 'https://aquaadvantage.com/images/logo/logo.png',
          description: 'Premium hot tubs, swim spas, and wellness products manufacturer specializing in Island Series, Garden Series, and TidalFit technology.',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-800-XXX-XXXX',
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: 'English'
          },
          sameAs: [
            'https://twitter.com/AquaAdvantage',
            'https://facebook.com/aquaadvantage',
            'https://instagram.com/aquaadvantage'
          ],
          foundingDate: '2000',
          industry: 'Spa and Pool Equipment Manufacturing',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'US'
          }
        }

      case 'product':
        return data ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          description: data.description,
          brand: {
            '@type': 'Brand',
            name: 'Aqua Advantage Spas'
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'Aqua Advantage Spas'
          },
          category: 'Hot Tub',
          image: data.image,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'USD',
            seller: {
              '@type': 'Organization',
              name: 'Aqua Advantage Spas'
            }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
            bestRating: '5',
            worstRating: '1'
          }
        } : null

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Aqua Advantage Spas',
          url: 'https://aquaadvantage.com',
          description: 'Premium hot tubs and swim spas with innovative technology for ultimate relaxation and wellness.',
          publisher: {
            '@type': 'Organization',
            name: 'Aqua Advantage Spas'
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://aquaadvantage.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
} 