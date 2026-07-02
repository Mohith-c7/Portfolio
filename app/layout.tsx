import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mohithux.vercel.app'),
  title: "Mohith Kumar | Software Engineer | Backend Developer",
  description:
    "Passionate Software Engineer & Backend Developer. Specializing in building scalable web architectures, API design, database systems, and AI-powered applications.",
  keywords: "Mohith Kumar Chadalawada, Software Engineer, Backend Engineer, Full Stack Developer, AI Developer, distributed systems, API design, Next.js, FastAPI, Node.js, developer portfolio",
  authors: [{ name: "Mohith Kumar" }],
  creator: "Mohith Kumar",
  publisher: "Mohith Kumar",
  robots: "index, follow",
  manifest: '/manifest.json',
  icons: {
    icon: '/logoM-favicon.png',
    shortcut: '/logoM-favicon.png',
    apple: '/logoM-favicon.png',
  },
  openGraph: {
    title: "Mohith Kumar | Software Engineer | Backend Developer",
    description: "Passionate Software Engineer & Backend Developer. Specializing in building scalable web architectures, API design, database systems, and AI-powered applications.",
    type: "website",
    locale: "en_US",
    url: "https://mohithux.vercel.app",
    siteName: "Mohith Kumar Portfolio",
    images: [
      {
        url: "/profile-photo.png",
        width: 1200,
        height: 630,
        alt: "Mohith Kumar - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohith Kumar | Software Engineer Portfolio",
    description: "Passionate Software Engineer & Backend Developer. Specializing in building scalable web architectures, API design, database systems, and AI-powered applications.",
    creator: "@mohithkumar",
    images: ["/profile-photo.png"],
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logoM-favicon.png" type="image/png" />
        <link rel="alternate icon" href="/logoM-favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#a3e635" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mohith Portfolio" />
        <meta name="msapplication-TileColor" content="#a3e635" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href="https://mohithux.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="YtsttUeRdfAlIuRTxanRPUF_DxmfPZ_weQwuw-z-b_o" />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohith Kumar",
              "url": "https://mohithux.vercel.app",
              "image": "https://mohithux.vercel.app/profile-photo.png",
              "sameAs": [
                "mailto:iammohithkumar@gmail.com"
              ],
              "jobTitle": "Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "description": "Passionate Software Engineer specializing in backend architectures, distributed systems, REST/GraphQL APIs, and AI-powered applications."
            })
          }}
        />
      </head>
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  )
}
