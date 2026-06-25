import content from "../data/content";

export default function Stats() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{content.statsBlock.title}</h2>

      <div style={styles.grid}>
        {content.statsBlock.items.map((item, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.value}>{item.value}</div>
            <div style={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: any = {
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