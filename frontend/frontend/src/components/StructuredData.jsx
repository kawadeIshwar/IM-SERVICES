import { Helmet } from 'react-helmet-async'

const StructuredData = ({ type = 'organization' }) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://imservices.netlify.app/#organization",
    "name": "IM Services",
    "alternateName": "Injection Moulding Machine Services",
    "url": "https://imservices.netlify.app",
    "logo": "https://imservices.netlify.app/logo.png",
    "image": "https://imservices.netlify.app/og-image.jpg",
    "description": "Professional injection moulding machine maintenance, repair, and performance testing services in Pune, Maharashtra. 24/7 emergency support with 15+ years of experience.",
    "telephone": "+91-9730992561",
    "email": "imservices4444@gmail.com",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "IM Services, Vishal Vishwa Rd",
      "addressLocality": "Shikrapur",
      "addressRegion": "Maharashtra",
      "postalCode": "412208",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.5204",
      "longitude": "73.8567"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/imservices",
      "https://twitter.com/imservices",
      "https://www.linkedin.com/company/imservices"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Machine Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Machine Performance Testing",
            "description": "7-Factor comprehensive analysis of injection moulding machines"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Machine Health Checkup",
            "description": "Complete diagnostic evaluation of all machine components"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Preventive Maintenance",
            "description": "Scheduled maintenance programs to prevent breakdowns"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Breakdown Service",
            "description": "24/7 emergency repair services for machine breakdowns"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Retrofitting & Reconditioning",
            "description": "Upgrade and modernization of old injection moulding machines"
          }
        }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://imservices.netlify.app/#website",
    "url": "https://imservices.netlify.app",
    "name": "IM Services",
    "description": "Expert Injection Moulding Machine Services",
    "publisher": {
      "@id": "https://imservices.netlify.app/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://imservices.netlify.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://imservices.netlify.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://imservices.netlify.app/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "About",
        "item": "https://imservices.netlify.app/about"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": "https://imservices.netlify.app/contact"
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide injection moulding machine services across Maharashtra, with our base in Pune. We offer on-site services and 24/7 emergency support."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide emergency breakdown services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer 24/7 emergency breakdown services for injection moulding machines. Our technicians can reach you quickly to minimize downtime."
        }
      },
      {
        "@type": "Question",
        "name": "What types of machines do you service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We service all types and brands of injection moulding machines including hydraulic, electric, and hybrid systems. We have expertise in various tonnages and configurations."
        }
      },
      {
        "@type": "Question",
        "name": "How experienced is your team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our team has over 15 years of experience in injection moulding machine maintenance and repair. We have successfully serviced 500+ machines with a 98% client satisfaction rate."
        }
      }
    ]
  }

  const schemas = [organizationSchema, websiteSchema, breadcrumbSchema]
  
  if (type === 'faq') {
    schemas.push(faqSchema)
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  )
}

export default StructuredData
