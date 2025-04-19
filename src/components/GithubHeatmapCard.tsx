import React from "react";
import GitHubCalendar from "react-github-calendar";

const colorPalette = [
  "#222d22", // background
  "#004d1a", // low
  "#007a33", // medium-low
  "#00e676", // medium
  "#00fff7", // high
  "#00bfff", // very high
  "#39ff14"   // hacker green (glow)
];

const cardStyle: React.CSSProperties = {
  background: "#14191f",
  borderRadius: "1rem",
  boxShadow: "0 4px 32px #00fff755, 0 1.5px 0 #39ff1440 inset",
  padding: "2rem 1.5rem",
  margin: "2rem auto",
  maxWidth: 700,
  color: "#e0ffe0",
  border: "1.5px solid #00fff7",
  position: "relative"
};

const headingStyle: React.CSSProperties = {
  fontSize: "1.6rem",
  fontWeight: 700,
  color: "#39ff14",
  letterSpacing: 1.2,
  marginBottom: 8
};

const sublineStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "#00fff7",
  marginBottom: 20
};

const tooltip = (count: number, date: string) =>
  count > 0
    ? `💻 ${count} commit${count > 1 ? "s" : ""} on ${new Date(date).toLocaleDateString(undefined, { month: "long", day: "numeric" })}`
    : `No commits on ${new Date(date).toLocaleDateString(undefined, { month: "long", day: "numeric" })}`;

export default function GithubHeatmapCard() {
  return (
    <div style={cardStyle}>
      <div style={headingStyle}>Consistency is my secret sauce</div>
      <div style={sublineStyle}>Here’s what my code grind looks like in pixels.</div>
      <GitHubCalendar
        username="biswajit-sarkar-007"
        colorScheme="dark"
        blockSize={16}
        blockMargin={5}
        fontSize={16}
        theme={{
          dark: [
            colorPalette[0], // background
            colorPalette[1], // low
            colorPalette[2], // medium-low
            colorPalette[3], // medium
            colorPalette[6]  // hacker green (glow)
          ]
        }}
        renderBlock={(block, activity) =>
          React.cloneElement(block, {
            style: {
              ...block.props.style,
              filter: activity.count > 0 ? "drop-shadow(0 0 6px #00fff7)" : undefined,
              transition: "filter 0.2s"
            },
            "data-tooltip": tooltip(activity.count, activity.date)
          })
        }
      />
    </div>
  );
}
