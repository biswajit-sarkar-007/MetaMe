import React, { useEffect, useState } from "react";

const GITHUB_USERNAME = "biswajit-sarkar-007";

interface GithubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_commits: number;
  total_prs: number;
  total_issues: number;
}

interface Language {
  name: string;
  value: number;
  color: string;
}

const statsCardStyle: React.CSSProperties = {
  background: "#14191f",
  borderRadius: "1rem",
  boxShadow: "0 4px 32px #00fff755, 0 1.5px 0 #39ff1440 inset",
  padding: "1.5rem 1rem",
  margin: "1.5rem auto",
  maxWidth: 700,
  color: "#e0ffe0",
  border: "1.5px solid #00fff7",
  position: "relative",
  textAlign: "center"
};

const sectionHeading: React.CSSProperties = {
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#39ff14",
  marginBottom: 12
};

const statGrid: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  gap: "1.2rem",
  marginBottom: 20
};

const statItem: React.CSSProperties = {
  minWidth: 110,
  background: "#1b2330",
  borderRadius: 8,
  padding: "0.7rem 0.5rem",
  color: "#00fff7",
  boxShadow: "0 2px 8px #00fff733"
};

const langBarContainer: React.CSSProperties = {
  background: "#24292e",
  borderRadius: 6,
  padding: 10,
  marginTop: 10
};

const langBar: React.CSSProperties = {
  height: 18,
  borderRadius: 4,
  marginBottom: 6
};

const trophyStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 700,
  margin: "1rem auto",
  display: "block"
};

export default function GithubProfileStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    // Fetch basic stats
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(res => res.json())
      .then(user => {
        setStats({
          public_repos: user.public_repos,
          followers: user.followers,
          following: user.following,
          total_commits: 0, // Placeholder
          total_prs: 0,     // Placeholder
          total_issues: 0   // Placeholder
        });
      });

    // Fetch most used languages (using github-readme-stats API)
    fetch(`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide_progress=true`)
      .then(res => res.text())
      .then(svg => {
        // Parse SVG for language names and percentages (basic, not perfect)
        const matches = [...svg.matchAll(/<text.*?>([\w\+\#]+)<\/text>\s*<rect.*?width=\"([\d\.]+)%/g)];
        const colors = ["#00fff7", "#39ff14", "#007a33", "#00e676", "#00bfff", "#004d1a"];
        setLanguages(matches.slice(0, 5).map((m, i) => ({ name: m[1], value: parseFloat(m[2]), color: colors[i % colors.length] })));
      });

    // Fetch PR count using GitHub Search API
    fetch(`https://api.github.com/search/issues?q=type:pr+author:${GITHUB_USERNAME}`)
      .then(res => res.json())
      .then(data => {
        setStats(prev => prev ? { ...prev, total_prs: data.total_count || 0 } : null);
      });

    // Fetch Issue count using GitHub Search API
    fetch(`https://api.github.com/search/issues?q=type:issue+author:${GITHUB_USERNAME}`)
      .then(res => res.json())
      .then(data => {
        setStats(prev => prev ? { ...prev, total_issues: data.total_count || 0 } : null);
      });

    // Fetch commit count for all public repos (public data only)
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`)
      .then(res => res.json())
      .then(async repos => {
        let totalCommits = 0;
        for (const repo of repos) {
          if (!repo.fork) {
            // Get commit count for this repo
            const commitsRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}&per_page=1`);
            const link = commitsRes.headers.get('Link');
            if (link && link.includes('rel="last"')) {
              // Parse last page number from Link header
              const match = link.match(/&page=(\d+)>; rel="last"/);
              if (match) totalCommits += parseInt(match[1]);
            } else {
              // Only one page (1 commit or none)
              const commits = await commitsRes.json();
              totalCommits += Array.isArray(commits) ? commits.length : 0;
            }
          }
        }
        setStats(prev => prev ? { ...prev, total_commits: totalCommits } : null);
      });
  }, []);

  return (
    <div style={statsCardStyle}>
      <div style={sectionHeading}>GitHub Profile Stats</div>
      <div style={statGrid}>
        <div style={statItem}><b>Repos</b><br />{stats ? stats.public_repos : "-"}</div>
        <div style={statItem}><b>Commits</b><br />{stats ? stats.total_commits : "-"}</div>
        <div style={statItem}><b>PRs</b><br />{stats ? stats.total_prs : "-"}</div>
        <div style={statItem}><b>Issues</b><br />{stats ? stats.total_issues : "-"}</div>
        <div style={statItem}><b>Followers</b><br />{stats ? stats.followers : "-"}</div>
      </div>
      <div style={sectionHeading}>Most Used Languages</div>
      <div style={langBarContainer}>
        {languages.map(lang => (
          <div key={lang.name} style={{ ...langBar, background: lang.color, width: `${lang.value}%` }}>
            <span style={{ color: "#14191f", fontWeight: 600, marginLeft: 6 }}>{lang.name} ({lang.value}%)</span>
          </div>
        ))}
      </div>
      <div style={sectionHeading}>GitHub Trophies</div>
      <img
        style={trophyStyle}
        src={`https://github-profile-trophy.vercel.app/?username=${GITHUB_USERNAME}&theme=algolia&margin-w=10&no-frame=true&row=1`}
        alt="GitHub Trophies"
        loading="lazy"
      />
    </div>
  );
}
