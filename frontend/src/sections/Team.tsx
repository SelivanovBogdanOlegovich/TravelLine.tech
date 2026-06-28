import type { CSSProperties } from "react";
import type { ContentData, TeamMember } from "../api/contentApi";

type TeamProps = {
  team: ContentData["team"];
};

export default function Team({ team }: TeamProps) {
  const members: TeamMember[] = team?.members ?? [];

  if (!team || members.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>Team</p>
          <h2 style={styles.title}>{team.title}</h2>
          {team.subtitle && <p style={styles.subtitle}>{team.subtitle}</p>}
        </div>

        <div style={styles.grid}>
          {members.map((member) => (
            <article key={member.id} style={styles.card}>
              <img
                src={member.photo}
                alt={member.name}
                style={styles.photo}
                loading="lazy"
              />

              <div style={styles.cardBody}>
                <div>
                  <h3 style={styles.name}>{member.name}</h3>
                  <p style={styles.position}>{member.position}</p>
                </div>

                <div style={styles.socials}>
                  {member.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      style={styles.socialLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    padding: "96px 40px",
    background: "#f3efe6",
    color: "#111318",
  },

  container: {
    maxWidth: "1120px",
    margin: "0 auto",
  },

  header: {
    maxWidth: "720px",
    marginBottom: "44px",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: "#7a6d5f",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    margin: "0 0 16px",
    fontSize: "42px",
    lineHeight: 1.1,
    fontWeight: 700,
  },

  subtitle: {
    margin: 0,
    color: "#5e6470",
    fontSize: "18px",
    lineHeight: 1.6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
  },

  card: {
    overflow: "hidden",
    border: "1px solid rgba(17, 19, 24, 0.12)",
    borderRadius: "8px",
    background: "#fffaf1",
    boxShadow: "0 20px 45px rgba(17, 19, 24, 0.08)",
  },

  photo: {
    display: "block",
    width: "100%",
    aspectRatio: "4 / 5",
    objectFit: "cover",
    background: "#e7e2d4",
  },

  cardBody: {
    display: "grid",
    gap: "18px",
    padding: "20px",
  },

  name: {
    margin: "0 0 6px",
    fontSize: "21px",
  },

  position: {
    margin: 0,
    color: "#5e6470",
    fontSize: "15px",
  },

  socials: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  socialLink: {
    padding: "6px 10px",
    border: "1px solid rgba(17, 19, 24, 0.16)",
    borderRadius: "6px",
    color: "#111318",
    textDecoration: "none",
    fontSize: "13px",
  },
};
