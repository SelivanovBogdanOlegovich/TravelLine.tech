import content from "../data/content";

export default function Hero() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>

        <h1 style={styles.title}>
          {content.hero.title}
        </h1>

        <p style={styles.subtitle}>
          {content.hero.subtitle}
        </p>

        <button style={styles.button}>
          {content.hero.buttonText}
        </button>

        <div style={styles.stats}>
          {content.hero.stats.map((stat, i) => (
            <div key={i} style={styles.statItem}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const styles: any = {
  section: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background: "#0f0f14",
    color: "white",
    padding: "40px"
  },

  container: {
    maxWidth: "900px"
  },

  title: {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "20px"
  },

  subtitle: {
    fontSize: "18px",
    opacity: 0.7,
    marginBottom: "30px"
  },

  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    marginBottom: "40px"
  },

  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "40px"
  },

  statItem: {
    textAlign: "center"
  },

  statValue: {
    fontSize: "24px",
    fontWeight: "bold"
  },

  statLabel: {
    fontSize: "12px",
    opacity: 0.6
  }
};