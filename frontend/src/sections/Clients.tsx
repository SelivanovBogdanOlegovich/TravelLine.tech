import type { CSSProperties } from "react";
import type { ClientLogo, ContentData } from "../api/contentApi";

type ClientsProps = {
  clients: ContentData["clients"];
};

export default function Clients({ clients }: ClientsProps) {
  const items: ClientLogo[] = clients?.items ?? [];
  const marqueeItems = [...items, ...items];

  if (!clients || items.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      <style>
        {`
          @keyframes clients-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}
      </style>

      <div style={styles.header}>
        <p style={styles.eyebrow}>Clients</p>
        <h2 style={styles.title}>{clients.title}</h2>
        {clients.subtitle && <p style={styles.subtitle}>{clients.subtitle}</p>}
      </div>

      <div style={styles.marquee}>
        <div style={styles.track}>
          {marqueeItems.map((client, index) => (
            <div key={`${client.id}-${index}`} style={styles.logoCard}>
              <img
                src={client.logo}
                alt={client.name}
                style={styles.logo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "88px 0",
    background: "#111318",
    color: "white",
    overflow: "hidden",
  },

  header: {
    maxWidth: "820px",
    margin: "0 auto 40px",
    padding: "0 40px",
    textAlign: "center",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: "#9ba3b4",
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
    margin: "0 auto",
    maxWidth: "680px",
    color: "#c9cdd6",
    fontSize: "17px",
    lineHeight: 1.6,
  },

  marquee: {
    width: "100%",
    overflow: "hidden",
    maskImage:
      "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
  },

  track: {
    display: "flex",
    width: "max-content",
    gap: "22px",
    animation: "clients-marquee 28s linear infinite",
  },

  logoCard: {
    width: "220px",
    height: "96px",
    flex: "0 0 auto",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.04)",
  },

  logo: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
};
