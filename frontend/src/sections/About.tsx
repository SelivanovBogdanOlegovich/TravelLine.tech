import type { ContentData } from "../api/contentApi";
import type { CSSProperties } from "react";

type AboutProps = {
  about: ContentData["about"];
};

export default function About({ about }: AboutProps) {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>{about?.title}</h2>

        <p style={styles.text}>
          {about?.text ?? about?.description}
        </p>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
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
