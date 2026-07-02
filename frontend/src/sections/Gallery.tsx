import type { CSSProperties } from "react";
import type { ContentData, GalleryItem } from "../api/contentApi";
import {
  container,
  lightCard,
  page,
  sectionHeader,
} from "./publicStyles";

type GalleryProps = {
  gallery: ContentData["gallery"];
};

export default function Gallery({ gallery }: GalleryProps) {
  const items: GalleryItem[] = gallery?.items ?? [];

  if (!gallery || items.length === 0) {
    return null;
  }

  return (
    <section id="gallery" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{gallery.title}</h2>
          {gallery.subtitle && <p style={styles.subtitle}>{gallery.subtitle}</p>}
        </div>

        <div style={styles.grid}>
          {items.map((item) => (
            <article key={item.id} style={styles.card}>
              {item.type === "video" ? (
                <video
                  src={item.media}
                  style={styles.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
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
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    width: "100%",
    padding: "104px 0",
    background: "#12203b",
    color: "#f7fbff",
  },

  container: container,

  header: sectionHeader,

  title: {
    color: "#f7fbff",
    fontSize: "clamp(62px, 7vw, 104px)",
    lineHeight: 0.94,
    fontWeight: 900,
  },

  subtitle: {
    margin: "18px auto 0",
    maxWidth: "720px",
    color: "#c9dcff",
    fontSize: "17px",
    lineHeight: 1.7,
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
    marginTop: "52px",
  },

  card: {
    ...lightCard,
    flex: "1 1 300px",
    maxWidth: "min(100%, 377px)",
    borderRadius: "0 0 28px 28px",
    overflow: "hidden",
    position: "relative",
    borderColor: "rgba(255, 255, 255, 0.14)",
    background: "rgba(255, 255, 255, 0.96)",
    boxShadow: "0 18px 50px rgba(0, 0, 0, 0.18)",
  },

  media: {
    display: "block",
    width: "100%",
    aspectRatio: "16 / 11",
    objectFit: "cover",
    background: page.lightSoft,
  },

  caption: {
    padding: "18px 20px 20px",
    color: page.lightText,
    fontSize: "15px",
    lineHeight: 1.55,
    fontWeight: 700,
  },
};
