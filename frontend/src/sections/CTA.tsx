import content from "../data/content";

export default function CTA() {
  return (
    <section style={styles.section}>
      <h2>{content.cta.title}</h2>
      <p style={{ opacity: 0.7 }}>{content.cta.text}</p>

      <button style={styles.button}>
        {content.cta.buttonText}
      </button>
    </section>
  );
}

const styles: any = {
  section: {
    padding: "100px 40px",
    background: "#111",
    color: "white",
    textAlign: "center"
  },

  button: {
    marginTop: "20px",
    padding: "12px 24px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer"
  }
};