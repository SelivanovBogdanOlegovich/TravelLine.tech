import type { CSSProperties } from "react";
import type { Vacancy } from "../api/contentApi";
import { container, lightCard, lightTitle, page, primaryButton, sectionHeader } from "./publicStyles";

type VacanciesProps = {
  vacancies: Vacancy[];
};

const allVacanciesUrl =
  "https://yoshkar-ola.hh.ru/search/vacancy?from=employerPage&hhtmFrom=employer&professional_role=156&professional_role=160&professional_role=10&professional_role=12&professional_role=150&professional_role=25&professional_role=165&professional_role=34&professional_role=36&professional_role=73&professional_role=155&professional_role=96&professional_role=164&professional_role=104&professional_role=157&professional_role=107&professional_role=112&professional_role=113&professional_role=148&professional_role=114&professional_role=116&professional_role=121&professional_role=124&professional_role=125&professional_role=126&search_field=name&search_field=company_name&search_field=description&enable_snippets=false&employer_id=1136961";

export default function Vacancies({ vacancies }: VacanciesProps) {
  const shouldCenterMoreCard = vacancies.length % 3 === 0;

  return (
    <section id="vacancies" style={styles.section}>
      <style>
        {`
          @media (min-width: 980px) {
            .vacancies-more-card-centered {
              grid-column: 2 / 3;
            }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Ищем прямо сейчас</h2>
        </div>

        <div style={styles.list}>
          {vacancies.map((job) => (
            <article key={job.id} style={styles.card}>
              <div>
                <h3 style={styles.jobTitle}>{job.title}</h3>

                {job.location.trim() && (
                  <div style={styles.metaRow}>
                    <span style={styles.meta}>{job.location}</span>
                  </div>
                )}

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

              <a
                href={job.url.trim() || "#contact"}
                style={styles.button}
                target={job.url.trim() ? "_blank" : undefined}
                rel={job.url.trim() ? "noreferrer" : undefined}
              >
                Откликнуться
              </a>
            </article>
          ))}

          <a
            href={allVacanciesUrl}
            className={
              shouldCenterMoreCard ? "vacancies-more-card-centered" : undefined
            }
            style={{ ...styles.card, ...styles.moreCard }}
            target="_blank"
            rel="noreferrer"
          >
            <span style={styles.moreText}>
              Еще больше вакансий на hh.ru
              <span style={styles.moreArrow}>=&gt;</span>
            </span>
          </a>
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

  title: {
    ...lightTitle,
    fontSize: "clamp(62px, 7vw, 104px)",
    lineHeight: 0.94,
  },

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
    borderRadius: "0 0 28px 28px",
    border: `1px solid ${page.lightBorder}`,
    background: page.lightCard,
    boxShadow: "0 18px 46px rgba(10, 124, 255, 0.08)",
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

  moreCard: {
    alignItems: "flex-start",
    justifyContent: "center",
    background: page.lightText,
    borderColor: "rgba(255, 255, 255, 0.12)",
    color: "#ffffff",
    textDecoration: "none",
    boxShadow: "0 22px 54px rgba(82, 120, 216, 0.28)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  moreText: {
    maxWidth: "320px",
    color: "#ffffff",
    fontSize: "clamp(26px, 3vw, 34px)",
    lineHeight: 1.16,
    fontWeight: 800,
  },

  moreArrow: {
    display: "inline-block",
    marginLeft: "10px",
    color: "#ffffff",
  },
};
