import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Direction } from "../api/contentApi";
import {
  container,
  lightTitle,
  page,
  sectionHeader,
} from "./publicStyles";

type DirectionsProps = {
  directions: Direction[];
};

type ButtonRect = {
  top: number;
  bottom: number;
  left: number;
  width: number;
};

type ActiveDirection = {
  id: number;
  description: string;
  buttonRect: ButtonRect;
};

function getButtonRect(element: HTMLElement): ButtonRect {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
  };
}

export default function Directions({ directions }: DirectionsProps) {
  const [activeDirection, setActiveDirection] =
    useState<ActiveDirection | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<CSSProperties>({
    top: -9999,
    left: -9999,
  });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!activeDirection || !tooltipRef.current) {
      return;
    }

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportGap = 18;
    const headerGap = 96;
    const buttonCenter =
      activeDirection.buttonRect.left + activeDirection.buttonRect.width / 2;

    let left = buttonCenter - tooltipRect.width / 2;
    left = Math.max(
      viewportGap,
      Math.min(left, window.innerWidth - tooltipRect.width - viewportGap),
    );

    let top = activeDirection.buttonRect.top - tooltipRect.height - 16;

    if (top < headerGap) {
      top = activeDirection.buttonRect.bottom + 16;
    }

    if (top + tooltipRect.height > window.innerHeight - viewportGap) {
      top = Math.max(
        headerGap,
        window.innerHeight - tooltipRect.height - viewportGap,
      );
    }

    setTooltipPosition({ left, top });
  }, [activeDirection]);

  const showDirection = (
    item: Direction,
    target: HTMLElement,
  ) => {
    setActiveDirection({
      id: item.id,
      description: item.description ?? "",
      buttonRect: getButtonRect(target),
    });
  };

  return (
    <section id="directions" style={styles.section}>
      <style>
        {`
          .direction-details-button:hover {
            background: #006fe8;
            box-shadow: 0 16px 34px rgba(10, 124, 255, 0.22);
            transform: translateY(-1px);
          }

          .direction-details-button:focus-visible {
            outline: 3px solid rgba(10, 124, 255, 0.24);
            outline-offset: 3px;
          }

          @keyframes direction-tooltip-in {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Направления</h2>
        </div>

        <div style={styles.grid}>
          {directions.map((item) => {
            const hasDescription = Boolean(item.description?.trim());
            const isActive = activeDirection?.id === item.id;

            return (
              <article
                key={item.id}
                style={{
                  ...styles.card,
                  zIndex: isActive ? 10 : 1,
                }}
              >
                <h3 style={styles.cardTitle}>{item.title}</h3>

                {(item.tags ?? []).length > 0 && (
                  <div style={styles.tags}>
                    {(item.tags ?? []).map((tag) => (
                      <span key={tag} style={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {hasDescription && (
                  <div style={styles.detailsArea}>
                    <button
                      type="button"
                      className="direction-details-button"
                      style={styles.detailsButton}
                      aria-expanded={isActive}
                      aria-describedby={`direction-description-${item.id}`}
                      onMouseEnter={(event) =>
                        showDirection(item, event.currentTarget)
                      }
                      onMouseLeave={() => setActiveDirection(null)}
                      onFocus={(event) =>
                        showDirection(item, event.currentTarget)
                      }
                      onBlur={() => setActiveDirection(null)}
                      onClick={(event) => {
                        if (isActive) {
                          setActiveDirection(null);
                          return;
                        }

                        showDirection(item, event.currentTarget);
                      }}
                    >
                      Подробнее
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {activeDirection && (
        <div
          ref={tooltipRef}
          id={`direction-description-${activeDirection.id}`}
          role="tooltip"
          style={{
            ...styles.descriptionTooltip,
            ...tooltipPosition,
          }}
        >
          {activeDirection.description}
        </div>
      )}
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

  title: {
    ...lightTitle,
    fontSize: "clamp(62px, 7vw, 104px)",
    lineHeight: 0.94,
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
    marginTop: "46px",
  },

  card: {
    position: "relative",
    flex: "1 1 430px",
    maxWidth: "min(100%, 578px)",
    minHeight: "230px",
    padding: "34px 36px",
    border: `1px solid ${page.lightBorder}`,
    borderRadius: "0 0 28px 28px",
    background: page.lightCard,
    boxShadow: "0 18px 46px rgba(10, 124, 255, 0.08)",
    overflow: "visible",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  cardTitle: {
    maxWidth: "92%",
    color: "#5278d8",
    fontSize: "28px",
    lineHeight: 1.16,
    fontWeight: 700,
  },

  tags: {
    marginTop: "34px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  tag: {
    padding: "6px 10px",
    border: "1px solid rgba(82, 120, 216, 0.14)",
    borderRadius: "999px",
    color: "#577196",
    background: "rgba(255, 255, 255, 0.58)",
    fontSize: "12px",
    fontWeight: 700,
  },

  detailsArea: {
    position: "relative",
    marginTop: "30px",
  },

  detailsButton: {
    border: 0,
    borderRadius: "999px",
    padding: "11px 18px",
    background: page.blue,
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
    transition:
      "background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
  },

  descriptionTooltip: {
    position: "fixed",
    zIndex: 2800,
    width: "min(560px, calc(100vw - 36px))",
    padding: "20px",
    borderRadius: "24px",
    background: page.blue,
    color: "#ffffff",
    boxShadow: "0 26px 60px rgba(10, 124, 255, 0.25)",
    fontSize: "15px",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    pointerEvents: "none",
    animation: "direction-tooltip-in 0.2s ease both",
  },
};
