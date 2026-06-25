import content from "../data/content";

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        {content.header.logo}
      </div>

      <nav style={styles.nav}>
        {content.header.links.map((link, i) => (
          <a key={i} href={"#" + link.id} style={styles.link}>
            {link.label}
          </a>
        ))}
      </nav>

      <button style={styles.button}>
        {content.header.buttonText}
      </button>
    </header>
  );
}

const styles: any = {
  header: {
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#0b0d12",
    color: "white",
    borderBottom: "1px solid #222",
    zIndex: 100
  },

  logo: {
    fontWeight: "bold"
  },

  nav: {
    display: "flex",
    gap: "20px"
  },

  link: {
    color: "white",
    opacity: 0.7,
    textDecoration: "none"
  },

  button: {
    padding: "6px 12px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer"
  }
};