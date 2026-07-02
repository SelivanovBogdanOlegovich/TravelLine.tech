import type { CSSProperties } from "react";

export const page = {
  dark: "#0b1f3a",
  darkAlt: "#123154",
  darkCard: "#123154",
  darkCardSoft: "rgba(255, 255, 255, 0.1)",
  darkBorder: "rgba(255, 255, 255, 0.16)",
  text: "#f8fafc",
  textSoft: "#d9eaff",
  textMuted: "#b7cff0",
  light: "#f7faff",
  lightSoft: "#eaf4ff",
  softBlue: "#f0f7ff",
  lightCard: "#ffffff",
  lightText: "#5278d8",
  lightSoftText: "#577196",
  lightMutedText: "#7b91b1",
  lightBorder: "rgba(10, 124, 255, 0.12)",
  strongBorder: "rgba(10, 124, 255, 0.22)",
  accent: "#0a7cff",
  accentHover: "#006be0",
  blue: "#0a7cff",
};

export const container: CSSProperties = {
  width: "min(100% - 40px, 1180px)",
  margin: "0 auto",
};

export const sectionHeader: CSSProperties = {
  maxWidth: "760px",
  margin: "0 auto",
  textAlign: "center",
};

export const eyebrow: CSSProperties = {
  marginBottom: "14px",
  color: page.textMuted,
  fontSize: "12px",
  lineHeight: 1.4,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0,
};

export const title: CSSProperties = {
  color: page.text,
  fontSize: "clamp(32px, 4vw, 44px)",
  lineHeight: 1.12,
  fontWeight: 800,
};

export const subtitle: CSSProperties = {
  margin: "18px auto 0",
  maxWidth: "720px",
  color: page.textSoft,
  fontSize: "17px",
  lineHeight: 1.7,
};

export const lightTitle: CSSProperties = {
  ...title,
  color: page.lightText,
};

export const lightSubtitle: CSSProperties = {
  ...subtitle,
  color: page.lightSoftText,
};

export const darkCard: CSSProperties = {
  border: `1px solid ${page.darkBorder}`,
  borderRadius: "24px",
  background: page.darkCardSoft,
  boxShadow: "0 18px 50px rgba(0, 0, 0, 0.18)",
};

export const lightCard: CSSProperties = {
  border: `1px solid ${page.lightBorder}`,
  borderRadius: "24px",
  background: page.lightCard,
  boxShadow: "0 12px 32px rgba(11, 31, 58, 0.06)",
};

export const primaryButton: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "46px",
  padding: "12px 22px",
  borderRadius: "999px",
  background: page.accent,
  color: "white",
  fontWeight: 700,
  textDecoration: "none",
  cursor: "pointer",
  transition: "transform 0.2s ease, background 0.2s ease",
  boxShadow: "0 14px 34px rgba(10, 124, 255, 0.18)",
};

export const secondaryButton: CSSProperties = {
  ...primaryButton,
  border: `1px solid ${page.lightBorder}`,
  background: "rgba(255, 255, 255, 0.82)",
  color: page.accent,
  boxShadow: "none",
};
