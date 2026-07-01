import type { CSSProperties } from "react";
import type { ContentData, GalleryItem } from "../api/contentApi";
import {
  container,
  lightCard,
  lightSubtitle,
  lightTitle,
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
    <section style={styles.section}>
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
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    width: "100%",
    padding: "104px 0",
    background: page.light,
    color: page.lightText,
  },

  container: container,

  header: sectionHeader,

  eyebrow: {
    marginBottom: "14px",
    color: page.lightSoftText,
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: lightTitle,

  subtitle: lightSubtitle,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginTop: "52px",
  },

  card: {
    ...lightCard,
    overflow: "hidden",
    position: "relative",
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
