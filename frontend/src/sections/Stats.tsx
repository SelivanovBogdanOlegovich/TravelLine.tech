import type { ContentData, StatItem } from "../api/contentApi";
import type { CSSProperties } from "react";

type StatsProps = {
  stats: ContentData["stats"];
  statsBlock: ContentData["statsBlock"];
};

export default function Stats({ stats, statsBlock }: StatsProps) {
  const title = statsBlock?.title ?? "Company in numbers";
  const items: StatItem[] = statsBlock?.items ?? stats ?? [];

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{title}</h2>

      <div style={styles.grid}>
        {items.map((item, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.value}>{item.value}</div>
            <div style={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "100px 40px",
    background: "#0b0d12",
    color: "white",
    textAlign: "center"
  },

  title: {
    fontSize: "32px",
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px"
  },

  card: {
    padding: "20px",
    border: "1px solid #2a2a2a",
    borderRadius: "12px"
  },

  value: {
    fontSize: "28px",
    fontWeight: "bold"
  },

  label: {
    opacity: 0.6,
    marginTop: "5px"
  }
};
