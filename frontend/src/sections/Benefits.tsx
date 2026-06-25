import content from "../data/content";

export default function Benefits() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{content.benefits.title}</h2>

      <div style={styles.grid}>
        {content.benefits.items.map((item, i) => (
          <div key={i} style={styles.card}>
            <h3>{item.title}</h3>
            <p style={{ opacity: 0.7 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: any = {
  section: {
    padding: "80px 40px",
    background: "#111217",
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
    borderRadius: "12px",
    background: "#0d0f14"
  }
};