import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { SeoJsonLd } from "@/components/seo-json-ld"
import { siteConfig, socialImage } from "@/lib/seo"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.displayName} | Software Engineer Portfolio`,
    template: `%s | ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.displayName, url: siteConfig.url }],
  creator: siteConfig.displayName,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      en: "/",
      "x-default": "/",
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.displayName} | Software Engineer Portfolio`,
    description: siteConfig.description,
    firstName: "Mohith",
    lastName: "Chadalawada",
    username: "Mohith-c7",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.displayName} | Software Engineer Portfolio`,
    description: siteConfig.description,
    images: [socialImage.url],
  },
  other: {
    "profile:first_name": "Mohith",
    "profile:last_name": "Chadalawada",
    "profile:username": "Mohith-c7",
    "og:email": siteConfig.email,
    copyright: siteConfig.displayName,
    rating: "general",
    distribution: "global",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#a3e635",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BuildByMohith" />
        <meta name="msapplication-TileColor" content="#a3e635" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href={siteConfig.url} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="YtsttUeRdfAlIuRTxanRPUF_DxmfPZ_weQwuw-z-b_o" />
      </head>
      <body className={manrope.className}>
        <SeoJsonLd />
        {children}
      </body>
    </html>
  )
}
