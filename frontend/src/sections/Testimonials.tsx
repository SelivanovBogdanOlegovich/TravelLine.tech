import type { ContentData, Testimonial } from "../api/contentApi";
import type { CSSProperties } from "react";

type TestimonialsProps = {
  testimonials: ContentData["testimonials"];
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const title = Array.isArray(testimonials)
    ? "What employees say"
    : testimonials?.title;
  const items: Testimonial[] = Array.isArray(testimonials)
    ? testimonials
    : testimonials?.items ?? [];

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{title}</h2>

      <div style={styles.grid}>
        {items.map((t, i) => (
          <div key={i} style={styles.card}>
            <h3>{t.name}</h3>
            {t.role && <p style={{ opacity: 0.6 }}>{t.role}</p>}
            <p>{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "80px 40px",
    background: "#0f1115",
    color: "white"
  },

  title: {
    fontSize: "32px",
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    padding: "20px",
    border: "1px solid #2a2a2a",
    borderRadius: "12px"
  }
};
