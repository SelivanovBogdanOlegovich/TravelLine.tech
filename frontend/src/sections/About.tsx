import content from "../data/content";

export default function About() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>{content.about.title}</h2>

        <p style={styles.text}>
          {content.about.text}
        </p>
      </div>
    </section>
  );
}

const styles: any = {
  section: {
    padding: "80px 40px",
    color: "white",
    background: "#0d0f14",
    display: "flex",
    justifyContent: "center"
  },

  container: {
    maxWidth: "900px",
    width: "100%",
    textAlign: "center"
  },

  title: {
    fontSize: "32px",
    fontWeight: "600",
    margin: "0 0 20px"
  },

  text: {
    margin: "0 auto",
    maxWidth: "650px",
    color: "#c9cdd6",
    fontSize: "18px",
    lineHeight: "1.7"
  }
};