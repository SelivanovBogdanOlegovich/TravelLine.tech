import type { CSSProperties } from "react";
import type { ContentData } from "../api/contentApi";
import { container, page, primaryButton, secondaryButton } from "./publicStyles";

type HeroProps = {
  hero: ContentData["hero"];
};

export default function Hero({ hero }: HeroProps) {
  const stats = hero?.stats ?? [];

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.copy}>
          <h1 style={styles.title}>{hero?.title}</h1>

          <p style={styles.subtitle}>{hero?.subtitle}</p>

          <div style={styles.actions}>
            <a href="#vacancies" style={styles.primaryButton}>
              Вакансии
            </a>
            <a href="#team" style={styles.secondaryButton}>
              Узнать о команде
            </a>
          </div>
        </div>

        <div style={styles.logoCard}>
          <img
            src="/travelline-logo.png"
            alt="TravelLine"
            style={styles.logoImage}
          />
        </div>

        {stats.length > 0 && (
          <div style={styles.stats}>
            {stats.map((stat, i) => {
              const isTextStat = stat.value.length > 18;
              const hasLabel = stat.label.trim().length > 0;

              return (
                <div
                  key={i}
                  style={{
                    ...styles.statItem,
                    ...(!hasLabel ? styles.statItemCentered : {}),
                  }}
                >
                  {isTextStat ? (
                    <>
                      {hasLabel && <div style={styles.statBadge}>{stat.label}</div>}
                      <div style={styles.statTextValue}>{stat.value}</div>
                    </>
                  ) : (
                    <>
                      <div style={styles.statNumberValue}>{stat.value}</div>
                      {hasLabel && <div style={styles.statLabel}>{stat.label}</div>}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    width: "100%",
    minHeight: "calc(100vh - 76px)",
    display: "flex",
    alignItems: "center",
    padding: "64px 0 96px",
    background:
      "linear-gradient(180deg, #ffffff 0%, #eaf4ff 100%)",
    color: page.lightText,
  },

  inner: {
    ...container,
    display: "grid",
    gridTemplateColumns: "minmax(min(100%, 360px), 0.95fr) minmax(min(100%, 460px), 1.05fr)",
    gap: "40px",
    alignItems: "center",
  },

  copy: {
    maxWidth: "720px",
    textAlign: "left",
  },

  eyebrow: {
    marginBottom: "18px",
    color: page.accent,
    fontSize: "13px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    color: page.lightText,
    fontSize: "clamp(72px, 9vw, 132px)",
    lineHeight: 0.92,
    fontWeight: 900,
  },

  subtitle: {
    marginTop: "22px",
    maxWidth: "680px",
    color: page.lightSoftText,
    fontSize: "20px",
    lineHeight: 1.65,
  },

  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    marginTop: "34px",
  },

  primaryButton: primaryButton,

  secondaryButton: secondaryButton,

  logoCard: {
    justifySelf: "end",
    width: "min(100%, 760px)",
    aspectRatio: "1 / 1",
    display: "grid",
    placeItems: "center",
    padding: "0",
    transform: "translateX(28px)",
  },

  logoImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  stats: {
    gridColumn: "1 / -1",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "18px",
    alignItems: "stretch",
  },

  statItem: {
    flex: "1 1 260px",
    maxWidth: "318px",
    minWidth: 0,
    minHeight: "136px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "14px",
    padding: "22px",
    border: `1px solid ${page.lightBorder}`,
    borderRadius: "0 0 28px 28px",
    background: "rgba(255, 255, 255, 0.86)",
    textAlign: "left",
    boxShadow: "0 16px 42px rgba(10, 124, 255, 0.08)",
  },

  statItemCentered: {
    justifyContent: "center",
  },

  statNumberValue: {
    color: page.lightText,
    fontSize: "clamp(28px, 3vw, 38px)",
    lineHeight: 1,
    fontWeight: 900,
  },

  statTextValue: {
    color: page.lightText,
    fontSize: "clamp(18px, 1.6vw, 22px)",
    lineHeight: 1.25,
    fontWeight: 850,
    overflowWrap: "anywhere",
    wordBreak: "normal",
    hyphens: "auto",
  },

  statBadge: {
    alignSelf: "flex-start",
    maxWidth: "100%",
    padding: "7px 10px",
    border: `1px solid ${page.lightBorder}`,
    borderRadius: "999px",
    background: page.softBlue,
    color: page.accent,
    fontSize: "12px",
    lineHeight: 1.25,
    fontWeight: 800,
    overflowWrap: "anywhere",
  },

  statLabel: {
    marginTop: "5px",
    color: page.lightSoftText,
    fontSize: "14px",
    lineHeight: 1.4,
    overflowWrap: "anywhere",
  },
};
