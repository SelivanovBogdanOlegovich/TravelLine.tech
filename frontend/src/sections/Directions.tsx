import type { Direction } from "../api/contentApi";
import type { CSSProperties } from "react";

type DirectionsProps = {
  directions: Direction[];
};

export default function Directions({ directions }: DirectionsProps) {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Directions</h2>

      <div style={styles.grid}>
        {directions.map((item, i) => (
          <div key={i} style={styles.card}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div style={styles.tags}>
              {(item.tags ?? []).map((tag, j) => (
                <span key={j} style={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "80px 40px",
    background: "#111318",
    color: "white"
  },

  title: {
    fontSize: "32px",
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },

  card: {
    padding: "20px",
    border: "1px solid #333",
    borderRadius: "10px"
  },

  tags: {
    marginTop: "10px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },

  tag: {
    fontSize: "12px",
    padding: "4px 8px",
    border: "1px solid #444",
    borderRadius: "6px"
  }
};
