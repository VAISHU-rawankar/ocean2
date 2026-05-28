import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
}) {
  const siteTitle = "Covenant Peniel Exim Pvt Ltd - Premium Indian Food Exporters";
  const defaultDescription =
    "Covenant Peniel Exim Pvt Ltd is a leading exporter of premium quality Indian spices, grains, pulses, fruits, and vegetables. We ensure the best quality and timely delivery worldwide.";
  const defaultKeywords =
    "Indian spices exporter, food exporter India, grains export, pulses export, fruits vegetables export, Covenant Peniel Exim Pvt Ltd";
  const siteUrl = "https://impex.omkaragroupestates.com/"; // Replace with actual domain

  const finalTitle = title ? `${title} | Covenant Peniel Exim` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalUrl = url ? `${siteUrl}${url}` : siteUrl;
  const finalImage = image || `${siteUrl}/og-image.jpg`; // Ensure you have a default OG image

  return (
    <Helmet defer={false}>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="Covenant Peniel Exim" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={finalUrl} />
    </Helmet>
  );
}
