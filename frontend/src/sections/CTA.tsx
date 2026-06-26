import type { ContentData } from "../api/contentApi";
import type { CSSProperties } from "react";

type CTAProps = {
  cta: ContentData["cta"];
};

export default function CTA({ cta }: CTAProps) {
  return (
    <section style={styles.section}>
      <h2>{cta?.title}</h2>
      {cta?.text && <p style={{ opacity: 0.7 }}>{cta.text}</p>}

      <button style={styles.button}>
        {cta?.buttonText}
      </button>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
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
