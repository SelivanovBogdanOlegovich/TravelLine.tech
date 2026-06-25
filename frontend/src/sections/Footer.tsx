import content from "../data/content";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>{content.footer.text}</p>

      <div style={styles.links}>
        {content.footer.links.map((l, i) => (
          <a key={i} href={l.url} style={styles.link}>
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

const styles: any = {
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