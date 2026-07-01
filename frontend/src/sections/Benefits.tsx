import type { CSSProperties } from "react";
import type { Benefit, ContentData } from "../api/contentApi";
import { container, lightCard, lightSubtitle, lightTitle, page, sectionHeader } from "./publicStyles";

type BenefitsProps = {
  benefits: ContentData["benefits"];
};

export default function Benefits({ benefits }: BenefitsProps) {
  const items: Benefit[] = benefits?.items ?? [];

  if (!benefits || items.length === 0) {
    return null;
  }

  return (
    <section id="benefits" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{benefits.title}</h2>
          {benefits.subtitle && <p style={styles.subtitle}>{benefits.subtitle}</p>}
        </div>

        <div style={styles.grid}>
          {items.map((item) => (
            <article key={item.id} style={styles.card}>
              <span style={styles.icon}>{item.id}</span>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.description}>{item.text ?? item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    width: "100%",
    padding: "104px 0",
    background: page.lightSoft,
    color: page.lightText,
  },

  container: container,

  header: sectionHeader,

  eyebrow: {
    marginBottom: "14px",
    color: page.accent,
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: lightTitle,

  subtitle: lightSubtitle,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "22px",
    marginTop: "50px",
  },

  card: {
    ...lightCard,
    padding: "30px",
    textAlign: "left",
  },

  icon: {
    display: "grid",
    placeItems: "center",
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    background: page.softBlue,
    color: page.accent,
    fontWeight: 900,
  },

  cardTitle: {
    marginTop: "22px",
    color: page.lightText,
    fontSize: "22px",
    lineHeight: 1.25,
    fontWeight: 800,
  },

  description: {
    marginTop: "12px",
    color: page.lightSoftText,
    fontSize: "16px",
    lineHeight: 1.65,
  },
};
