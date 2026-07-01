import type { CSSProperties } from "react";
import type { Vacancy } from "../api/contentApi";
import { container, lightCard, lightTitle, page, primaryButton, sectionHeader } from "./publicStyles";

type VacanciesProps = {
  vacancies: Vacancy[];
};

export default function Vacancies({ vacancies }: VacanciesProps) {
  return (
    <section id="vacancies" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Ищем прямо сейчас</h2>
        </div>

        <div style={styles.list}>
          {vacancies.map((job) => (
            <article key={job.id} style={styles.card}>
              <div>
                <h3 style={styles.jobTitle}>{job.title}</h3>

                <div style={styles.metaRow}>
                  <span style={styles.meta}>{job.location}</span>
                  <span style={styles.meta}>{job.type}</span>
                </div>

                {(job.stack ?? []).length > 0 && (
                  <div style={styles.stack}>
                    {(job.stack ?? []).map((s) => (
                      <span key={s} style={styles.tag}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <a href="#contact" style={styles.button}>Apply</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    width: "100%",
    padding: "100px 0",
    background: page.lightSoft,
    color: page.lightText,
  },

  container: container,

  header: sectionHeader,

  eyebrow: {
    marginBottom: "14px",
    color: page.accent,
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: lightTitle,

  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    gap: "22px",
    marginTop: "46px",
  },

  card: {
    ...lightCard,
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "30px",
    textAlign: "left",
  },

  jobTitle: {
    color: page.lightText,
    fontSize: "24px",
    lineHeight: 1.2,
    fontWeight: 800,
  },

  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "18px",
  },

  meta: {
    padding: "8px 12px",
    borderRadius: "999px",
    color: page.lightSoftText,
    background: page.lightSoft,
    fontSize: "14px",
    fontWeight: 700,
  },

  stack: {
    marginTop: "18px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  tag: {
    padding: "7px 11px",
    border: `1px solid ${page.lightBorder}`,
    borderRadius: "999px",
    color: page.lightSoftText,
    background: page.softBlue,
    fontSize: "12px",
    fontWeight: 700,
  },

  button: {
    ...primaryButton,
    alignSelf: "flex-start",
    marginTop: "28px",
  },
};
