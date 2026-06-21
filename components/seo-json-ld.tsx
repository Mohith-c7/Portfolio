import { siteConfig } from "@/lib/seo"

const projects = [
  {
    name: "FieldForce CRM",
    description: "React Native, FastAPI, and PostgreSQL CRM project for field force workflows.",
    keywords: ["React Native", "FastAPI", "PostgreSQL", "CRM"],
    image: "/abstract-neural-network-visualization-dark-theme.jpg",
  },
  {
    name: "CryoVault Customer Portal",
    description: "Next.js, Node.js, and PostgreSQL customer portal for healthcare product operations.",
    keywords: ["Next.js", "Node.js", "PostgreSQL", "Healthcare"],
    image: "/futuristic-data-dashboard-dark-minimal.jpg",
  },
  {
    name: "SentinelX",
    description: "Python, FastAPI, and Streamlit cybersecurity product project.",
    keywords: ["Python", "FastAPI", "Streamlit", "Cybersecurity"],
    image: "/abstract-memory-storage-visualization.jpg",
  },
  {
    name: "Sensei Faculty Ranker",
    description: "Next.js, Firebase, and analytics project for education ranking workflows.",
    keywords: ["Next.js", "Firebase", "Analytics", "Education"],
    image: "/sound-wave-visualization-dark-theme.jpg",
  },
]

const siteNavigation = [
  ["About", "#about"],
  ["Works", "#works"],
  ["Experience", "#experience"],
  ["GitHub", "#github"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
]

const worksFor = [
  {
    "@type": "Organization",
    name: "BluCypher",
  },
  {
    "@type": "Organization",
    name: "CryoVault Biotech India",
  },
  {
    "@type": "CollegeOrUniversity",
    name: "VIT-AP University",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.displayName,
      alternateName: [siteConfig.shortName, "Mohith Chadalawada", siteConfig.name, "Mohith-c7"],
      url: siteConfig.url,
      email: `mailto:${siteConfig.email}`,
      jobTitle: siteConfig.role,
      description: siteConfig.description,
      image: `${siteConfig.url}/apple-touch-icon.png`,
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.resume],
      mainEntityOfPage: {
        "@id": `${siteConfig.url}/#profile-page`,
      },
      knowsAbout: [
        "Software Engineering",
        "Full-Stack Development",
        "Backend Engineering",
        "Product Engineering",
        "Next.js",
        "React",
        "React Native",
        "FastAPI",
        "Python",
        "Node.js",
        "PostgreSQL",
        "Healthcare Technology",
        "Cybersecurity Products",
      ],
      worksFor,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "VIT-AP University",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      alternateName: [siteConfig.displayName, "Build By Mohith"],
      url: siteConfig.url,
      publisher: {
        "@id": `${siteConfig.url}/#person`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: `${siteConfig.displayName} | Software Engineer Portfolio`,
      description: siteConfig.description,
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        "@id": `${siteConfig.url}/#breadcrumb`,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "#about p", "#works h2", "#experience h2"],
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#profile-page`,
      name: `${siteConfig.displayName} Portfolio`,
      url: siteConfig.url,
      description: siteConfig.description,
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      mainEntity: {
        "@id": `${siteConfig.url}/#person`,
      },
      about: {
        "@id": `${siteConfig.url}/#person`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${siteConfig.displayName} Portfolio`,
          item: siteConfig.url,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/#site-navigation`,
      name: "Portfolio sections",
      itemListElement: siteNavigation.map(([name, href], index) => ({
        "@type": "SiteNavigationElement",
        position: index + 1,
        name,
        url: `${siteConfig.url}/${href}`,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/#portfolio-projects`,
      name: `${siteConfig.displayName} featured software projects`,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.description,
          keywords: project.keywords.join(", "),
          image: `${siteConfig.url}${project.image}`,
          url: `${siteConfig.url}/#works`,
          creator: {
            "@id": `${siteConfig.url}/#person`,
          },
        },
      })),
    },
  ],
}

export function SeoJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
