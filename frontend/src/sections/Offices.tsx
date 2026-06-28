import type { CSSProperties } from "react";
import type { ContentData, OfficeItem } from "../api/contentApi";

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
          <p style={styles.eyebrow}>Offices</p>
          <h2 style={styles.title}>{offices.title}</h2>
          {offices.subtitle && (
            <p style={styles.subtitle}>{offices.subtitle}</p>
          )}
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
    padding: "92px 40px",
    background: "#0f1115",
    color: "white",
  },

  container: {
    maxWidth: "1120px",
    margin: "0 auto",
  },

  header: {
    maxWidth: "760px",
    marginBottom: "42px",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: "#9ba3b4",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    margin: "0 0 14px",
    fontSize: "38px",
    lineHeight: 1.15,
  },

  subtitle: {
    margin: 0,
    color: "#c9cdd6",
    fontSize: "17px",
    lineHeight: 1.6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "22px",
  },

  card: {
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "18px",
    background: "#151922",
  },

  photo: {
    display: "block",
    width: "100%",
    aspectRatio: "16 / 10",
    objectFit: "cover",
  },

  cardBody: {
    padding: "22px",
  },

  city: {
    margin: "0 0 10px",
    fontSize: "22px",
  },

  description: {
    margin: 0,
    color: "#c9cdd6",
    fontSize: "15px",
    lineHeight: 1.6,
  },
};
