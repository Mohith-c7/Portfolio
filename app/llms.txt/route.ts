import { siteConfig } from "@/lib/seo"

export const dynamic = "force-static"

export function GET() {
  const body = `# ${siteConfig.name}

Official portfolio: ${siteConfig.url}
Primary person: ${siteConfig.displayName}
Role: ${siteConfig.role}
Email: ${siteConfig.email}
GitHub: ${siteConfig.links.github}
LinkedIn: ${siteConfig.links.linkedin}
Resume: ${siteConfig.links.resume}

## Summary
${siteConfig.description}

## Important sections
- About: ${siteConfig.url}/#about
- Featured software projects: ${siteConfig.url}/#works
- Professional experience: ${siteConfig.url}/#experience
- GitHub activity: ${siteConfig.url}/#github
- Technical stack: ${siteConfig.url}/#skills
- Contact: ${siteConfig.url}/#contact

## Core topics
${siteConfig.keywords.map((keyword) => `- ${keyword}`).join("\n")}
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
