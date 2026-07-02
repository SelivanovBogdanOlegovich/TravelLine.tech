import type { CSSProperties } from "react";
import type { ContentData } from "../api/contentApi";
import { container, page, primaryButton } from "./publicStyles";

type HeaderProps = {
  header: ContentData["header"];
};

const links = [
  { id: "directions", label: "Направления" },
  { id: "benefits", label: "Плюшки" },
  { id: "gallery", label: "О нас" },
];

export default function Header({ header }: HeaderProps) {
  return (
    <>
      <header style={styles.header}>
        <div style={styles.inner}>
          <a href="#" style={styles.logo}>
            {header?.logo ?? "TravelLine"}
          </a>

          <nav style={styles.nav} aria-label="Основная навигация">
            {links.map((link) => (
              <a key={link.id} href={"#" + link.id} style={styles.link}>
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#contact" style={styles.button}>
            Свяжитесь с нами!
          </a>
        </div>
      </header>
      <div aria-hidden="true" style={styles.spacer} />
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    minHeight: "76px",
    display: "flex",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.9)",
    color: page.lightText,
    borderBottom: `1px solid ${page.lightBorder}`,
    backdropFilter: "blur(18px)",
    zIndex: 3000,
  },

  spacer: {
    height: "76px",
    width: "100%",
    flexShrink: 0,
  },

  inner: {
    ...container,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    minHeight: "76px",
  },

  logo: {
    color: page.lightText,
    fontSize: "18px",
    fontWeight: 800,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    flex: "1 1 auto",
    flexWrap: "wrap",
  },

  link: {
    color: page.lightSoftText,
    fontSize: "15px",
    fontWeight: 600,
    textDecoration: "none",
  },

  button: {
    ...primaryButton,
    minHeight: "40px",
    padding: "10px 18px",
    whiteSpace: "nowrap",
  },
};
