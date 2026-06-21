import { siteConfig } from "@/lib/seo"

export const dynamic = "force-static"

export function GET() {
  const body = `/* TEAM */
Owner: ${siteConfig.displayName}
Role: ${siteConfig.role}
Site: ${siteConfig.url}
Contact: ${siteConfig.email}
GitHub: ${siteConfig.links.github}
LinkedIn: ${siteConfig.links.linkedin}

/* SITE */
Name: ${siteConfig.name}
Domain: ${siteConfig.domain}
Language: English (India)
Purpose: Official software engineering portfolio for ${siteConfig.displayName}
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
