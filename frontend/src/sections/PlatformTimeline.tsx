import type { CSSProperties } from "react";
import type {
  ContentData,
  PlatformTimelineItem,
} from "../api/contentApi";

type PlatformTimelineProps = {
  platformTimeline: ContentData["platformTimeline"];
};

const markerColors: Record<string, string> = {
  launch: "#E56F3A",
  platform: "#2F80ED",
  module: "#7A5CFA",
  market: "#209B6C",
};

export default function PlatformTimeline({
  platformTimeline,
}: PlatformTimelineProps) {
  const items: PlatformTimelineItem[] = platformTimeline?.items ?? [];

  if (!platformTimeline || items.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>Platform</p>
          <h2 style={styles.title}>{platformTimeline.title}</h2>
          {platformTimeline.subtitle && (
            <p style={styles.subtitle}>{platformTimeline.subtitle}</p>
          )}
        </div>

        <div style={styles.timeline}>
          {items.map((item, index) => (
            <article key={item.id} style={styles.item}>
              <div style={styles.yearColumn}>
                <span style={styles.year}>{item.year}</span>
                <span
                  style={{
                    ...styles.marker,
                    background: markerColors[item.markerType] ?? "#C9CDD6",
                  }}
                />
                {index < items.length - 1 && <span style={styles.line} />}
              </div>

              <div style={styles.card}>
                <span style={styles.badge}>{item.markerType}</span>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.description}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "96px 40px",
    background: "#0d0f14",
    color: "white",
  },

  container: {
    maxWidth: "1120px",
    margin: "0 auto",
  },

  header: {
    maxWidth: "760px",
    marginBottom: "48px",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: "#9ba3b4",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    margin: "0 0 16px",
    fontSize: "42px",
    lineHeight: 1.1,
  },

  subtitle: {
    margin: 0,
    color: "#c9cdd6",
    fontSize: "18px",
    lineHeight: 1.6,
  },

  timeline: {
    display: "grid",
    gap: "0",
  },

  item: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    gap: "28px",
    minHeight: "160px",
  },

  yearColumn: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "70px 24px",
    alignItems: "start",
    gap: "18px",
  },

  year: {
    color: "#f4f6fb",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "24px",
  },

  marker: {
    width: "18px",
    height: "18px",
    border: "3px solid #0d0f14",
    borderRadius: "50%",
    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.32)",
  },

  line: {
    position: "absolute",
    top: "26px",
    right: "11px",
    width: "1px",
    height: "calc(100% - 18px)",
    background: "rgba(255, 255, 255, 0.18)",
  },

  card: {
    marginBottom: "28px",
    padding: "24px",
    border: "1px solid #2a2f3a",
    borderRadius: "8px",
    background: "#11141b",
  },

  badge: {
    display: "inline-flex",
    marginBottom: "14px",
    padding: "5px 9px",
    border: "1px solid #3a4050",
    borderRadius: "6px",
    color: "#c9cdd6",
    fontSize: "12px",
    textTransform: "uppercase",
  },

  cardTitle: {
    margin: "0 0 10px",
    fontSize: "24px",
  },

  description: {
    margin: 0,
    color: "#c9cdd6",
    fontSize: "16px",
    lineHeight: 1.65,
  },
};
