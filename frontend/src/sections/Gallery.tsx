import type { CSSProperties } from "react";
import type { ContentData, GalleryItem } from "../api/contentApi";

type GalleryProps = {
  gallery: ContentData["gallery"];
};

export default function Gallery({ gallery }: GalleryProps) {
  const items: GalleryItem[] = gallery?.items ?? [];

  if (!gallery || items.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Gallery</p>
        <h2 style={styles.title}>{gallery.title}</h2>
        {gallery.subtitle && <p style={styles.subtitle}>{gallery.subtitle}</p>}
      </div>

      <div style={styles.grid}>
        {items.map((item, index) => (
          <article
            key={item.id}
            style={{
              ...styles.card,
              ...(index === 0 ? styles.featuredCard : {}),
            }}
          >
            {item.type === "video" ? (
              <video
                src={item.media}
                style={styles.media}
                muted
                playsInline
                controls
              />
            ) : (
              <img
                src={item.media}
                alt={item.caption}
                style={styles.media}
                loading="lazy"
              />
            )}
            <p style={styles.caption}>{item.caption}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "92px 40px",
    background: "#f4f7fb",
    color: "#12141a",
  },

  header: {
    maxWidth: "860px",
    margin: "0 auto 42px",
    textAlign: "center",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: "#647084",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    margin: "0 0 14px",
    fontSize: "38px",
    lineHeight: 1.15,
  },

  subtitle: {
    maxWidth: "700px",
    margin: "0 auto",
    color: "#5b6474",
    fontSize: "17px",
    lineHeight: 1.6,
  },

  grid: {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },

  card: {
    minHeight: "260px",
    borderRadius: "18px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 18px 50px rgba(20, 29, 45, 0.12)",
    position: "relative",
  },

  featuredCard: {
    gridColumn: "span 2",
  },

  media: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    aspectRatio: "4 / 3",
  },

  caption: {
    position: "absolute",
    left: "18px",
    right: "18px",
    bottom: "18px",
    margin: 0,
    padding: "12px 14px",
    borderRadius: "12px",
    background: "rgba(15, 17, 21, 0.78)",
    color: "white",
    fontSize: "15px",
    lineHeight: 1.4,
    backdropFilter: "blur(8px)",
  },
};
