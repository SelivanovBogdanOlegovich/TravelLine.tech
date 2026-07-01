import type { CSSProperties, FormEvent } from "react";
import type { ContentData } from "../api/contentApi";
import { container, lightCard, page, primaryButton } from "./publicStyles";

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
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.copy}>
          <h2 style={styles.title}>{contact.title}</h2>
          {contact.subtitle && <p style={styles.subtitle}>{contact.subtitle}</p>}
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.field}>
            <span style={styles.label}>Имя</span>
            <input style={styles.input} name="name" type="text" />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Email</span>
            <input style={styles.input} name="email" type="email" />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Сообщение</span>
            <textarea style={{ ...styles.input, ...styles.textarea }} name="message" />
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
    width: "100%",
    padding: "108px 0",
    background: "linear-gradient(135deg, #eaf4ff 0%, #f7faff 100%)",
    color: page.lightText,
  },

  container: {
    ...container,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
    gap: "56px",
    alignItems: "start",
  },

  copy: {
    maxWidth: "520px",
  },

  eyebrow: {
    marginBottom: "14px",
    color: page.accent,
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    color: page.lightText,
    fontSize: "clamp(34px, 5vw, 52px)",
    lineHeight: 1.08,
    fontWeight: 900,
  },

  subtitle: {
    marginTop: "18px",
    color: page.lightSoftText,
    fontSize: "18px",
    lineHeight: 1.7,
  },

  form: {
    ...lightCard,
    display: "grid",
    gap: "18px",
    padding: "32px",
  },

  field: {
    display: "grid",
    gap: "9px",
    textAlign: "left",
  },

  label: {
    color: page.lightSoftText,
    fontSize: "14px",
    fontWeight: 700,
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #d7deea",
    borderRadius: "14px",
    outline: "none",
    background: "#f8fafc",
    color: page.lightText,
    fontSize: "16px",
  },

  textarea: {
    minHeight: "138px",
    resize: "vertical",
  },

  button: {
    ...primaryButton,
    justifySelf: "start",
  },
};
