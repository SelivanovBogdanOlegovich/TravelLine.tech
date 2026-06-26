import type { ContentData, FooterLink } from "../api/contentApi";
import type { CSSProperties } from "react";

type FooterProps = {
  footer: ContentData["footer"];
};

const toFooterLink = (link: FooterLink | string): FooterLink =>
  typeof link === "string" ? { label: link, url: "#" } : link;

export default function Footer({ footer }: FooterProps) {
  const links = footer?.links?.map(toFooterLink) ?? [];

  return (
    <footer style={styles.footer}>
      <p>{footer?.text ?? footer?.copyright}</p>

      <div style={styles.links}>
        {links.map((l, i) => (
          <a key={i} href={l.url} style={styles.link}>
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

const styles: Record<string, CSSProperties> = {
  footer: {
    padding: "40px",
    background: "#0b0d12",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #222"
  },

  links: {
    display: "flex",
    gap: "15px"
  },

  link: {
    color: "white",
    opacity: 0.7,
    textDecoration: "none"
  }
};
