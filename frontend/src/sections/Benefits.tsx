import type { CSSProperties } from "react";
import type { Benefit, ContentData } from "../api/contentApi";
import { container, lightCard, lightSubtitle, lightTitle, page, sectionHeader } from "./publicStyles";

type BenefitsProps = {
  benefits: ContentData["benefits"];
};

const cardVariants = [
  { basis: "31%", color: "#22c55e" },
  { basis: "42%", color: "#6366f1" },
  { basis: "31%", color: "#0ea5e9" },
  { basis: "42%", color: "#06b6d4" },
  { basis: "31%", color: "#22c55e" },
  { basis: "42%", color: "#6366f1" },
  { basis: "58%", color: "#0ea5e9" },
  { basis: "31%", color: "#06b6d4" },
] as const;

const getCardVariant = (item: Benefit, index: number) => {
  const variant = cardVariants[Math.abs(item.id + index) % cardVariants.length];

  return variant;
};

export default function Benefits({ benefits }: BenefitsProps) {
  const items: Benefit[] = benefits?.items ?? [];

  if (!benefits || items.length === 0) {
    return null;
  }

  return (
    <section id="benefits" style={styles.section}>
      <style>
        {`
          @media (max-width: 900px) {
            .benefit-card {
              flex-basis: 100% !important;
            }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{benefits.title}</h2>
          {benefits.subtitle && <p style={styles.subtitle}>{benefits.subtitle}</p>}
        </div>

        <div style={styles.grid}>
          {items.map((item, index) => {
            const variant = getCardVariant(item, index);

            return (
              <article
                key={item.id}
                className="benefit-card"
                style={{
                  ...styles.card,
                  flexBasis: variant.basis,
                }}
              >
                <h3 style={{ ...styles.cardTitle, color: variant.color }}>
                  {item.title}
                </h3>
                <p style={styles.description}>
                  {item.text ?? item.description}
                </p>
              </article>
            );
          })}
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
    overflow: "hidden",
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

  title: {
    ...lightTitle,
    color: page.lightText,
    fontSize: "clamp(62px, 7vw, 104px)",
    lineHeight: 0.94,
  },

  subtitle: {
    ...lightSubtitle,
    color: page.lightSoftText,
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "18px",
    marginTop: "50px",
    position: "relative",
  },

  card: {
    ...lightCard,
    flexGrow: 1,
    minWidth: "260px",
    minHeight: "156px",
    padding: "28px 30px",
    borderRadius: "0 0 18px 18px",
    borderColor: page.lightBorder,
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 18px 46px rgba(10, 124, 255, 0.08)",
    textAlign: "left",
    overflow: "hidden",
  },

  cardTitle: {
    color: page.lightText,
    fontSize: "clamp(20px, 2vw, 26px)",
    lineHeight: 1.16,
    fontWeight: 700,
  },

  description: {
    marginTop: "12px",
    color: "#102443",
    fontSize: "15px",
    lineHeight: 1.5,
  },
};
