import type { CSSProperties } from "react";
import type { ContentData, FooterLink } from "../api/contentApi";
import { container, page } from "./publicStyles";

type FooterProps = {
  footer: ContentData["footer"];
};

const toFooterLink = (link: FooterLink | string): FooterLink =>
  typeof link === "string" ? { label: link, url: "#" } : link;

export default function Footer({ footer }: FooterProps) {
  const links = footer?.links?.map(toFooterLink) ?? [];

  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <p style={styles.copy}>{footer?.text ?? footer?.copyright}</p>

        <div style={styles.links}>
          {links.map((link, i) => (
            <a key={i} href={link.url} style={styles.link}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, CSSProperties> = {
  footer: {
    width: "100%",
    padding: "34px 0",
    background: "#0b1f3a",
    color: "#f4f7fb",
    borderTop: `1px solid ${page.darkBorder}`,
  },

  inner: {
    ...container,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  copy: {
    color: "#f4f7fb",
    fontWeight: 700,
  },

  links: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
  },

  link: {
    color: "#c9d0dc",
    textDecoration: "none",
    fontWeight: 600,
  },
};
