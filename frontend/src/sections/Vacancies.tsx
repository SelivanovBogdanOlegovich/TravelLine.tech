import type { Vacancy } from "../api/contentApi";
import type { CSSProperties } from "react";

type VacanciesProps = {
  vacancies: Vacancy[];
};

export default function Vacancies({ vacancies }: VacanciesProps) {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Vacancies</h2>

        <div style={styles.list}>
          {vacancies.map((job) => (
            <div key={job.id} style={styles.card}>
              <div>
                <h3 style={styles.jobTitle}>{job.title}</h3>

                <p style={styles.meta}>{job.location}</p>
                <p style={styles.meta}>{job.type}</p>

                <div style={styles.stack}>
                  {(job.stack ?? []).map((s) => (
                    <span key={s} style={styles.tag}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button style={styles.button}>Apply</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "80px 40px",
    background: "#0f1115",
    color: "white",
    display: "flex",
    justifyContent: "center"
  },

  container: {
    maxWidth: "1100px",
    width: "100%"
  },

  title: {
    fontSize: "32px",
    margin: "0 0 40px",
    textAlign: "center"
  },

  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px"
  },

  card: {
    padding: "24px",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    background: "#0b0d12",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "260px",
    textAlign: "left"
  },

  jobTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px"
  },

  meta: {
    margin: "0 0 6px",
    color: "#c9cdd6",
    fontSize: "15px",
    lineHeight: "1.5"
  },

  stack: {
    marginTop: "18px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },

  tag: {
    fontSize: "12px",
    border: "1px solid #444",
    padding: "4px 8px",
    borderRadius: "6px",
    color: "#d7dbe5",
    background: "#11141b"
  },

  button: {
    marginTop: "24px",
    padding: "10px 16px",
    border: "1px solid white",
    borderRadius: "6px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    alignSelf: "flex-start",
    fontSize: "14px"
  }
};
