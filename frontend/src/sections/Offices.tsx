import type { CSSProperties } from "react";
import type { ContentData, OfficeItem } from "../api/contentApi";
import { container, lightCard, lightSubtitle, lightTitle, page, sectionHeader } from "./publicStyles";

type OfficesProps = {
  offices: ContentData["offices"];
};

export default function Offices({ offices }: OfficesProps) {
  const items: OfficeItem[] = offices?.items ?? [];

  if (!offices || items.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{offices.title}</h2>
          {offices.subtitle && <p style={styles.subtitle}>{offices.subtitle}</p>}
        </div>

        <div style={styles.grid}>
          {items.map((office) => (
            <article key={office.id} style={styles.card}>
              <img
                src={office.photo}
                alt={office.city}
                style={styles.photo}
                loading="lazy"
              />
              <div style={styles.cardBody}>
                <h3 style={styles.city}>{office.city}</h3>
                <p style={styles.description}>{office.description}</p>
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
    width: "100%",
    padding: "104px 0",
    background: page.lightSoft,
    color: page.lightText,
  },

  container: container,

  header: sectionHeader,

  eyebrow: {
    marginBottom: "14px",
    color: page.blue,
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: lightTitle,

  subtitle: lightSubtitle,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    gap: "24px",
    marginTop: "52px",
  },

  card: {
    ...lightCard,
    overflow: "hidden",
  },

  photo: {
    display: "block",
    width: "100%",
    aspectRatio: "16 / 10",
    objectFit: "cover",
    background: page.light,
  },

  cardBody: {
    padding: "26px",
  },

  city: {
    color: page.lightText,
    fontSize: "24px",
    lineHeight: 1.2,
    fontWeight: 800,
  },

  description: {
    marginTop: "12px",
    color: page.lightSoftText,
    fontSize: "16px",
    lineHeight: 1.65,
  },
};
