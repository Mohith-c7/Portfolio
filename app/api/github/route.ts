import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Fetch contributions HTML
    const contributionsRes = await fetch("https://github.com/users/Mohith-c7/contributions", {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!contributionsRes.ok) {
      throw new Error(`Failed to fetch contributions: ${contributionsRes.statusText}`);
    }
    
    const text = await contributionsRes.text();
    
    // Parse total contributions
    const countRegex = /([0-9,]+)\s+contributions?\s+in/i;
    const countMatch = countRegex.exec(text);
    const totalContributions = countMatch ? countMatch[1] : "0";
    
    // Parse tds order-independently
    const tdRegex = /<td([^>]*class="ContributionCalendar-day"[^>]*)>/g;
    let match;
    const daysMap: Record<string, { id: string; date: string; level: number; text: string }> = {};
    const daysList: string[] = [];
    
    while ((match = tdRegex.exec(text)) !== null) {
      const idM = /id="([^"]+)"/.exec(match[1]);
      const dateM = /data-date="([^"]+)"/.exec(match[1]);
      const levelM = /data-level="(\d)"/.exec(match[1]);
      
      if (idM && dateM && levelM) {
        const id = idM[1];
        daysMap[id] = {
          id,
          date: dateM[1],
          level: parseInt(levelM[1], 10),
          text: 'No contributions' // fallback
        };
        daysList.push(id);
      }
    }
    
    // Parse tooltips
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
    let tooltipMatch;
    while ((tooltipMatch = tooltipRegex.exec(text)) !== null) {
      const dayId = tooltipMatch[1];
      const tooltipText = tooltipMatch[2].trim();
      if (daysMap[dayId]) {
        daysMap[dayId].text = tooltipText;
      }
    }
    
    // Convert map to list
    const contributions = daysList.map(id => ({
      date: daysMap[id].date,
      level: daysMap[id].level,
      text: daysMap[id].text
    }));

    // Calculate current streak
    const sorted = [...contributions].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    let active = false;
    
    for (let i = 0; i < sorted.length; i++) {
      const day = sorted[i];
      if (day.level > 0) {
        streak++;
        active = true;
      } else {
        if (!active) {
          if (i < 2) {
            continue;
          }
        }
        break;
      }
    }

    // 2. Fetch public repos to calculate top languages
    let languagesStr = "TypeScript, Python, SQL"; // fallback
    try {
      const reposRes = await fetch("https://api.github.com/users/Mohith-c7/repos?per_page=100", {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      
      if (reposRes.ok) {
        const repos = await reposRes.json();
        const langMap: Record<string, number> = {};
        for (const repo of repos) {
          if (repo.language) {
            const lang = repo.language === 'Jupyter Notebook' ? 'Python' : repo.language;
            langMap[lang] = (langMap[lang] || 0) + 1;
          }
        }
        
        // Sort and select top 3
        const sortedLangs = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(entry => entry[0]);
          
        if (sortedLangs.length > 0) {
          languagesStr = sortedLangs.join(", ");
        }
      }
    } catch (e) {
      console.error("Failed to fetch languages:", e);
    }
    
    return NextResponse.json({
      totalContributions,
      streak,
      languages: languagesStr,
      contributions
    });
  } catch (error: any) {
    console.error("Failed to fetch GitHub contributions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}
