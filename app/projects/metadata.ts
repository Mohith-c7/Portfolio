import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Mohith Kumar - Software Engineer Portfolio",
  description: "Explore software engineering, backend architectures, system designs, and AI projects developed by Mohith Kumar.",
  openGraph: {
    title: "Projects | Mohith Kumar - Software Engineer Portfolio",
    description: "Explore software engineering, backend architectures, system designs, and AI projects developed by Mohith Kumar.",
    url: "https://mohithux.vercel.app/projects",
    siteName: "Mohith Kumar Portfolio",
    images: [
      {
        url: "/profile-photo.png",
        width: 1200,
        height: 630,
        alt: "Mohith Kumar - Software Engineer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Mohith Kumar - Software Engineer Portfolio",
    description: "Explore software engineering, backend architectures, system designs, and AI projects developed by Mohith Kumar.",
    images: ["/profile-photo.png"],
  },
}; 