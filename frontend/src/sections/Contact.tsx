import type { CSSProperties, FormEvent } from "react";
import type { ContentData } from "../api/contentApi";

type ContactProps = {
  contact: ContentData["contact"];
};

export default function Contact({ contact }: ContactProps) {
  if (!contact) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.copy}>
          <p style={styles.eyebrow}>Contact</p>
          <h2 style={styles.title}>{contact.title}</h2>
          {contact.subtitle && (
            <p style={styles.subtitle}>{contact.subtitle}</p>
          )}
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.field}>
            <span style={styles.label}>Name</span>
            <input style={styles.input} name="name" type="text" />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Email</span>
            <input style={styles.input} name="email" type="email" />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Message</span>
            <textarea style={{ ...styles.input, ...styles.textarea }} />
          </label>

          <button type="submit" style={styles.button}>
            {contact.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "96px 40px",
    background: "#f0f5ff",
    color: "#11141b",
  },

  container: {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "48px",
    alignItems: "start",
  },

  copy: {
    position: "sticky",
    top: "32px",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: "#667085",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    margin: "0 0 16px",
    fontSize: "42px",
    lineHeight: 1.1,
  },

  subtitle: {
    margin: 0,
    color: "#536071",
    fontSize: "18px",
    lineHeight: 1.6,
  },

  form: {
    display: "grid",
    gap: "18px",
    padding: "28px",
    borderRadius: "18px",
    background: "white",
    boxShadow: "0 20px 60px rgba(25, 40, 70, 0.12)",
  },

  field: {
    display: "grid",
    gap: "8px",
  },

  label: {
    color: "#536071",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #d7deea",
    borderRadius: "10px",
    background: "#f9fbff",
    color: "#11141b",
    font: "inherit",
  },

  textarea: {
    minHeight: "132px",
    resize: "vertical",
  },

  button: {
    justifySelf: "start",
    padding: "13px 22px",
    border: 0,
    borderRadius: "10px",
    background: "#11141b",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
  },
};
