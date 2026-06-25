import content from "../data/content";

export default function Testimonials() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{content.testimonials.title}</h2>

      <div style={styles.grid}>
        {content.testimonials.items.map((t, i) => (
          <div key={i} style={styles.card}>
            <h3>{t.name}</h3>
            <p style={{ opacity: 0.6 }}>{t.role}</p>
            <p>{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: any = {
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