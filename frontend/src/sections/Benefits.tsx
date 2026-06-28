import type { Benefit, ContentData } from "../api/contentApi";
import type { CSSProperties } from "react";

type BenefitsProps = {
  benefits: ContentData["benefits"];
};

export default function Benefits({ benefits }: BenefitsProps) {
  const items: Benefit[] = benefits?.items ?? [];

  if (!benefits || items.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{benefits.title}</h2>
      {benefits.subtitle && <p style={styles.subtitle}>{benefits.subtitle}</p>}

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <h3>{item.title}</h3>
            <p style={{ opacity: 0.7 }}>{item.text ?? item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "80px 40px",
    background: "#111217",
    color: "white"
  },

  title: {
    fontSize: "32px",
    margin: "0 0 14px",
    textAlign: "center"
  },

  subtitle: {
    maxWidth: "680px",
    margin: "0 auto 40px",
    color: "#c9cdd6",
    fontSize: "17px",
    lineHeight: 1.6,
    textAlign: "center"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    padding: "20px",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    background: "#0d0f14"
  }
};
