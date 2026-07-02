import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { ContentData, TeamMember } from "../api/contentApi";
import {
  container,
  lightCard,
  lightSubtitle,
  lightTitle,
  page,
  sectionHeader,
} from "./publicStyles";

type TeamProps = {
  team: ContentData["team"];
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function Team({ team }: TeamProps) {
  const members: TeamMember[] = team?.members ?? [];
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselMembers = members.length > 1 ? [...members, ...members] : members;

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller || members.length <= 1) {
      return;
    }

    let frameId = 0;
    const speed = 0.45;

    const tick = () => {
      const loopWidth = scroller.scrollWidth / 2;

      if (!isDraggingRef.current) {
        scroller.scrollLeft += speed;

        if (scroller.scrollLeft >= loopWidth) {
          scroller.scrollLeft -= loopWidth;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [members.length]);

  if (!team || members.length === 0) {
    return null;
  }

  return (
    <section id="team" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{team.title}</h2>
          {team.subtitle && <p style={styles.subtitle}>{team.subtitle}</p>}
        </div>

      </div>

      <div
        ref={scrollerRef}
        style={{
          ...styles.scroller,
          ...(isDragging ? styles.scrollerDragging : {}),
        }}
        onDragStart={(event) => {
          event.preventDefault();
        }}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest("a")) {
            return;
          }

          isDraggingRef.current = true;
          dragDistanceRef.current = 0;
          setIsDragging(true);
          dragStartXRef.current = event.clientX;
          dragStartScrollRef.current = event.currentTarget.scrollLeft;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!isDraggingRef.current) {
            return;
          }

          const deltaX = event.clientX - dragStartXRef.current;
          const loopWidth = event.currentTarget.scrollWidth / 2;
          const nextScrollLeft = dragStartScrollRef.current - deltaX;

          dragDistanceRef.current = Math.max(
            dragDistanceRef.current,
            Math.abs(deltaX),
          );
          event.preventDefault();
          event.currentTarget.scrollLeft = nextScrollLeft;

          if (event.currentTarget.scrollLeft <= 0) {
            event.currentTarget.scrollLeft += loopWidth;
            dragStartScrollRef.current += loopWidth;
          }

          if (event.currentTarget.scrollLeft >= loopWidth) {
            event.currentTarget.scrollLeft -= loopWidth;
            dragStartScrollRef.current -= loopWidth;
          }
        }}
        onPointerUp={(event) => {
          isDraggingRef.current = false;
          setIsDragging(false);

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => {
          isDraggingRef.current = false;
          setIsDragging(false);
        }}
      >
        <div style={styles.track}>
          {carouselMembers.map((member, index) => (
            <article key={`${member.id}-${index}`} style={styles.card}>
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  style={styles.photo}
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <div style={styles.photoFallback}>{getInitials(member.name)}</div>
              )}

              <div style={styles.cardBody}>
                <h3 style={styles.name}>{member.name}</h3>
                <p style={styles.position}>{member.position}</p>

                <div style={styles.socials}>
                  {member.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      style={styles.socialLink}
                      target="_blank"
                      rel="noreferrer"
                      draggable={false}
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
    width: "100%",
    padding: "92px 0",
    background: page.lightText,
    color: "#ffffff",
    overflow: "hidden",
  },

  container: container,

  header: sectionHeader,

  eyebrow: {
    marginBottom: "14px",
    color: page.lightSoftText,
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    ...lightTitle,
    color: "#ffffff",
  },

  subtitle: {
    ...lightSubtitle,
    color: "rgba(255, 255, 255, 0.88)",
  },

  scroller: {
    width: "100vw",
    marginTop: "52px",
    marginLeft: "calc(50% - 50vw)",
    background: page.lightText,
    overflowX: "auto",
    overflowY: "hidden",
    cursor: "grab",
    scrollbarWidth: "none",
    touchAction: "pan-y",
    userSelect: "none",
  },

  scrollerDragging: {
    cursor: "grabbing",
  },

  track: {
    display: "flex",
    gap: "24px",
    width: "max-content",
    background: page.lightText,
    padding: "2px max(24px, calc((100vw - 1180px) / 2)) 8px",
  },

  card: {
    ...lightCard,
    flex: "0 0 320px",
    overflow: "hidden",
    boxShadow: "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  photo: {
    display: "block",
    width: "100%",
    aspectRatio: "4 / 4.35",
    objectFit: "cover",
    objectPosition: "center 18%",
    background: page.lightSoft,
    pointerEvents: "none",
  },

  photoFallback: {
    display: "grid",
    placeItems: "center",
    width: "100%",
    aspectRatio: "4 / 4.35",
    background: "linear-gradient(135deg, #eaf4ff, #f0f7ff)",
    color: page.accent,
    fontSize: "54px",
    fontWeight: 900,
  },

  cardBody: {
    display: "grid",
    gap: "14px",
    padding: "22px",
  },

  name: {
    color: page.lightText,
    fontSize: "22px",
    lineHeight: 1.2,
    fontWeight: 800,
  },

  position: {
    color: page.lightSoftText,
    fontSize: "15px",
    lineHeight: 1.5,
  },

  socials: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "6px",
  },

  socialLink: {
    padding: "8px 12px",
    border: `1px solid ${page.lightBorder}`,
    borderRadius: "999px",
    color: page.lightText,
    background: "#f8fafc",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
  },
};
