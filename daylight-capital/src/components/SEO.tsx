import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  const currentUrl = canonical || window.location.href;
  const siteName = "Daylight Capital";

  // Base Schema for Organization / LocalBusiness
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "Organization", "LocalBusiness"],
    "name": "Daylight Capital",
    "description": "Investment Banking + Strategic Consulting for high-growth businesses and emerging consumer brands.",
    "url": "https://daylightcapital.com",
    "logo": "https://daylightcapital.com/logo.webp",
    "image": "https://daylightcapital.com/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/company/project-daylight-capital"
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content="https://daylightcapital.com/logo.webp" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://daylightcapital.com/logo.webp" />

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  );
}
