import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'IM Services - Expert Injection Moulding Machine Services',
  description = 'Professional injection moulding machine maintenance, repair, and performance testing services in Pune, Maharashtra. 24/7 emergency support, 15+ years experience, 500+ machines serviced.',
  keywords = 'injection moulding machine services, machine maintenance pune, injection moulding repair, machine performance testing, preventive maintenance, retrofitting services, hydraulic machine repair, cooling system maintenance, emergency breakdown service, IMM services Maharashtra',
  canonical = '',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}) => {
  const siteUrl = 'https://imservices.netlify.app' // Update with your actual domain
  
  // Safely get current pathname to avoid SSR errors
  const getCurrentPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return '/'
  }
  
  const fullCanonical = canonical || `${siteUrl}${getCurrentPath()}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="IM Services" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="IM Services" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Pune, Maharashtra" />
      <meta name="geo.position" content="18.5204;73.8567" />
      <meta name="ICBM" content="18.5204, 73.8567" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Format Detection */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="address=yes" />
    </Helmet>
  )
}

export default SEO
