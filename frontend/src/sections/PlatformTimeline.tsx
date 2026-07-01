import { useState } from "react";
import type { CSSProperties } from "react";
import type {
  ClientLogo,
  ContentData,
  PlatformTimelineItem,
} from "../api/contentApi";
import { container, lightSubtitle, page } from "./publicStyles";

type PlatformTimelineProps = {
  platformTimeline: ContentData["platformTimeline"];
  clients?: ContentData["clients"];
};

type TimelineYearGroup = {
  year: string;
  items: PlatformTimelineItem[];
};

type LogoDisplaySize = {
  width: number;
  height: number;
};

const logoDisplaySizes: Record<string, LogoDisplaySize> = {
  "aquaclub.svg": { width: 136, height: 48 },
  "catherine-art.svg": { width: 132, height: 48 },
  "cosmos.svg": { width: 128, height: 48 },
  "helvetia.svg": { width: 122, height: 48 },
  "ohta-park.svg": { width: 144, height: 46 },
  "premium-park.svg": { width: 144, height: 48 },
  "rus.svg": { width: 136, height: 46 },
  "rzd-health.svg": { width: 142, height: 46 },
  "sochi-park.svg": { width: 142, height: 46 },
};

const markerTones: Record<string, { background: string; shadow: string }> = {
  founding: {
    background: "linear-gradient(135deg, #4d7bd8 0%, #5d8be7 100%)",
    shadow: "0 18px 34px rgba(77, 123, 216, 0.24)",
  },
  launch: {
    background: "linear-gradient(135deg, #0a7cff 0%, #2f9bff 100%)",
    shadow: "0 18px 34px rgba(10, 124, 255, 0.24)",
  },
  booking: {
    background: "linear-gradient(135deg, #0a7cff 0%, #2b91f2 100%)",
    shadow: "0 18px 34px rgba(10, 124, 255, 0.24)",
  },
  platform: {
    background: "linear-gradient(135deg, #4d7bd8 0%, #65a4ff 100%)",
    shadow: "0 18px 34px rgba(77, 123, 216, 0.24)",
  },
  integration: {
    background: "linear-gradient(135deg, #4d7bd8 0%, #6690de 100%)",
    shadow: "0 18px 34px rgba(77, 123, 216, 0.24)",
  },
  analytics: {
    background: "linear-gradient(135deg, #4d7bd8 0%, #6a8fe0 100%)",
    shadow: "0 18px 34px rgba(77, 123, 216, 0.24)",
  },
  module: {
    background: "linear-gradient(135deg, #655ee7 0%, #8a80ff 100%)",
    shadow: "0 18px 34px rgba(101, 94, 231, 0.24)",
  },
  channel: {
    background: "linear-gradient(135deg, #9d43c7 0%, #b762d2 100%)",
    shadow: "0 18px 34px rgba(157, 67, 199, 0.24)",
  },
  reputation: {
    background: "linear-gradient(135deg, #6258d9 0%, #756fe4 100%)",
    shadow: "0 18px 34px rgba(98, 88, 217, 0.24)",
  },
  market: {
    background: "linear-gradient(135deg, #0d9f78 0%, #39bf9a 100%)",
    shadow: "0 18px 34px rgba(13, 159, 120, 0.22)",
  },
  express: {
    background: "linear-gradient(135deg, #11a47c 0%, #22b893 100%)",
    shadow: "0 18px 34px rgba(17, 164, 124, 0.22)",
  },
  optimizer: {
    background: "linear-gradient(135deg, #4c7dd9 0%, #5e8ce5 100%)",
    shadow: "0 18px 34px rgba(76, 125, 217, 0.24)",
  },
  crm: {
    background: "linear-gradient(135deg, #b7df35 0%, #c4e84d 100%)",
    shadow: "0 18px 34px rgba(183, 223, 53, 0.22)",
  },
  loyalty: {
    background: "linear-gradient(135deg, #d750ae 0%, #e070c0 100%)",
    shadow: "0 18px 34px rgba(215, 80, 174, 0.22)",
  },
  reactor: {
    background: "linear-gradient(135deg, #00a3b8 0%, #0ab3c7 100%)",
    shadow: "0 18px 34px rgba(0, 163, 184, 0.22)",
  },
  order: {
    background: "linear-gradient(135deg, #4d7bd8 0%, #638ee5 100%)",
    shadow: "0 18px 34px rgba(77, 123, 216, 0.24)",
  },
  billing: {
    background: "linear-gradient(135deg, #4d7bd8 0%, #638ee5 100%)",
    shadow: "0 18px 34px rgba(77, 123, 216, 0.24)",
  },
  gms: {
    background: "linear-gradient(135deg, #4d7bd8 0%, #638ee5 100%)",
    shadow: "0 18px 34px rgba(77, 123, 216, 0.24)",
  },
  api: {
    background: "linear-gradient(135deg, #0a7cff 0%, #2b86df 100%)",
    shadow: "0 18px 34px rgba(10, 124, 255, 0.24)",
  },
  guest: {
    background: "linear-gradient(135deg, #4d7bd8 0%, #638ee5 100%)",
    shadow: "0 18px 34px rgba(77, 123, 216, 0.24)",
  },
  mobile: {
    background: "linear-gradient(135deg, #39a83b 0%, #4bb64c 100%)",
    shadow: "0 18px 34px rgba(57, 168, 59, 0.22)",
  },
  webpms: {
    background: "linear-gradient(135deg, #f23f32 0%, #ff604f 100%)",
    shadow: "0 18px 34px rgba(242, 63, 50, 0.22)",
  },
};

const getMarkerTone = (markerType: string) =>
  markerTones[markerType.toLowerCase()] ?? markerTones.platform;

const getLogoDisplaySize = (logo: string): LogoDisplaySize => {
  const fileName = logo.split("/").pop()?.toLowerCase() ?? "";

  return logoDisplaySizes[fileName] ?? { width: 136, height: 48 };
};

const formatTimelineTitle = (title: string) =>
  title
    .replace(/(?:\s*,?\s*)\bB\s*2\s*[A-ZА-Я0-9]+\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

const groupTimelineItems = (
  items: PlatformTimelineItem[],
): TimelineYearGroup[] => {
  const groups = new Map<string, PlatformTimelineItem[]>();

  items.forEach((item) => {
    groups.set(item.year, [...(groups.get(item.year) ?? []), item]);
  });

  return Array.from(groups, ([year, groupedItems]) => ({
    year,
    items: groupedItems,
  }));
};

function MarkerSvg({ markerType }: { markerType: string }) {
  const normalizedType = markerType.toLowerCase();

  if (["founding", "launch", "booking"].includes(normalizedType)) {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="M17 5c4 2 6 6 6 11l-5 5-7-7 6-9Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M10 15 6 16l4 3M17 22l-1 4-3-4M11 21l-4 4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <circle cx="18" cy="13" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (["module", "platform", "integration", "analytics", "guest"].includes(normalizedType)) {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="M7 10h8v8H7zM17 7h8v8h-8zM17 17h8v8h-8z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (["market", "optimizer"].includes(normalizedType)) {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="M6 22h20M8 20l5-5 4 4 7-9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M20 10h4v4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "webpms") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <circle
          cx="16"
          cy="16"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M16 4v5M16 23v5M4 16h5M23 16h5M7.5 7.5l3.5 3.5M21 21l3.5 3.5M24.5 7.5 21 11M11 21l-3.5 3.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "mobile") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <rect
          x="9"
          y="5"
          width="14"
          height="22"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M13 10h2M18 10h1M13 15h2M18 15h1M13 20h2M18 20h1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "reputation") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="M9 24c-3-2-5-5-5-9a9 9 0 0 1 18 0c0 6-6 10-12 8l-5 3 2-5Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M12 14c1-3 5-3 6 0 1-2 5-1 5 2 0 4-5 6-7 8-3-2-7-4-7-8 0-3 3-4 5-2Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (normalizedType === "express") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="M17 4 8 17h7l-1 11 10-15h-7l0-9Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "crm") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <circle
          cx="16"
          cy="16"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M4 16h6M22 16h6M8 12l3 2M24 12l-3 2M8 20l3-2M24 20l-3-2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "loyalty" || normalizedType === "order") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="M6 9h15l5 7-5 7H6zM11 14h10M11 18h8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "billing") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <circle
          cx="14"
          cy="14"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="m20 20 6 6M14 10v8M10 14h8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "reactor") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="m16 4 10 5v10l-10 9-10-9V9zM16 10v10M12 14h8"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "gms") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="M6 9h15v10H11l-5 4V9ZM18 14h8v9l-4-3h-4"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (normalizedType === "api") {
    return (
      <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
        <path
          d="M7 20c-3 0-5-2-5-5s2-5 5-5c1-4 5-6 9-5 3 1 5 3 6 6 4 0 7 3 7 7s-3 7-7 7H7Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" style={styles.iconSvg} aria-hidden="true">
      <path
        d="M7 8h18v16H7zM11 12h4M11 17h10M11 22h7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function MarkerIcon({ markerType }: { markerType: string }) {
  const tone = getMarkerTone(markerType);

  return (
    <span
      style={{
        ...styles.icon,
        background: tone.background,
        boxShadow: tone.shadow,
      }}
    >
      <MarkerSvg markerType={markerType} />
    </span>
  );
}

export default function PlatformTimeline({
  platformTimeline,
  clients,
}: PlatformTimelineProps) {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const items: PlatformTimelineItem[] = platformTimeline?.items ?? [];
  const clientItems: ClientLogo[] = clients?.items ?? [];
  const timelineGroups = groupTimelineItems(items);
  const marqueeItems = [...clientItems, ...clientItems];
  const shouldScrollTimeline = timelineGroups.length > 20;

  if (!platformTimeline || items.length === 0) {
    return null;
  }

  return (
    <section style={styles.section}>
      <style>
        {`
          @keyframes platform-clients-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          @keyframes timeline-tooltip-in {
            from {
              opacity: 0;
              transform: translateY(8px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

      <div style={styles.scene}>
        <div style={styles.header}>
          <h2 style={styles.title}>{platformTimeline.title}</h2>
          {platformTimeline.subtitle && (
            <p style={styles.subtitle}>{platformTimeline.subtitle}</p>
          )}
        </div>

        <div
          style={{
            ...styles.timelineViewport,
            ...(shouldScrollTimeline
              ? styles.timelineViewportScrollable
              : styles.timelineViewportStatic),
          }}
        >
          <div
            style={{
              ...styles.timeline,
              ...(shouldScrollTimeline
                ? styles.timelineScrollable
                : styles.timelineStatic),
            }}
          >
            <div style={styles.timelineLine} />

            {timelineGroups.map((group, groupIndex) => {
              const hasActiveItem = group.items.some(
                (item) => item.id === activeItemId,
              );
              const shouldOpenTooltipLeft =
                groupIndex >= Math.max(0, timelineGroups.length - 2);

              return (
              <article
                key={group.year}
                style={{
                  ...styles.yearGroup,
                  ...(shouldScrollTimeline
                    ? styles.yearGroupScrollable
                    : styles.yearGroupStatic),
                  zIndex: hasActiveItem ? 20 : 1,
                }}
              >
                <div style={styles.eventStack}>
                  {group.items.map((item) => {
                    const isActive = activeItemId === item.id;
                    const displayTitle = formatTimelineTitle(item.title);

                    return (
                      <div
                        key={item.id}
                        style={{
                          ...styles.eventSlot,
                          zIndex: isActive ? 30 : 1,
                        }}
                      >
                        <button
                          type="button"
                          style={{
                            ...styles.iconButton,
                            ...(isActive ? styles.iconButtonActive : {}),
                          }}
                          onMouseEnter={() => setActiveItemId(item.id)}
                          onMouseLeave={() => setActiveItemId(null)}
                          onFocus={() => setActiveItemId(item.id)}
                          onBlur={() => setActiveItemId(null)}
                          aria-label={`${item.year}: ${displayTitle}`}
                        >
                          <MarkerIcon markerType={item.markerType} />
                        </button>

                        <span style={styles.connector} />
                        <span style={styles.markerName}>{displayTitle}</span>

                        {isActive && (
                          <div
                            style={{
                              ...styles.tooltip,
                              ...(shouldOpenTooltipLeft
                                ? styles.tooltipLeft
                                : styles.tooltipRight),
                            }}
                            role="tooltip"
                          >
                            <span style={styles.tooltipYear}>{item.year}</span>
                            <h3 style={styles.tooltipTitle}>{displayTitle}</h3>
                            <p style={styles.tooltipText}>{item.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <span style={styles.year}>{group.year}</span>
              </article>
              );
            })}
          </div>
        </div>
      </div>

      {clientItems.length > 0 && (
        <div style={styles.clientsMarquee}>
          <div style={styles.logoTrack}>
            {marqueeItems.map((client, index) => (
              <div key={`${client.id}-${index}`} style={styles.logoItem}>
                <span
                  role="img"
                  aria-label={client.name || "Client logo"}
                  style={{
                    ...styles.logoMask,
                    ...getLogoDisplaySize(client.logo),
                    WebkitMaskImage: `url("${client.logo}")`,
                    maskImage: `url("${client.logo}")`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    width: "100%",
    padding: "76px 0 58px",
    background: page.lightSoft,
    color: page.lightText,
    overflow: "hidden",
  },

  scene: {
    position: "relative",
    width: "100%",
    minHeight: "540px",
  },

  header: {
    ...container,
    position: "absolute",
    top: 0,
    left: "50%",
    zIndex: 2,
    transform: "translateX(-50%)",
    pointerEvents: "none",
  },

  title: {
    margin: 0,
    color: page.lightText,
    fontSize: "clamp(36px, 4vw, 62px)",
    lineHeight: 1.05,
    letterSpacing: 0,
    fontWeight: 700,
  },

  subtitle: {
    ...lightSubtitle,
    margin: "16px 0 0",
    maxWidth: "620px",
  },

  timelineViewport: {
    padding: "0 0 14px",
    overflowY: "visible",
  },

  timelineViewportStatic: {
    width: "100vw",
    overflowX: "visible",
  },

  timelineViewportScrollable: {
    width: "100vw",
    overflowX: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: `${page.blue} transparent`,
  },

  timeline: {
    position: "relative",
    display: "flex",
    padding: "0 0 38px",
    boxSizing: "border-box",
  },

  timelineStatic: {
    width: "100%",
    minWidth: 0,
    justifyContent: "space-between",
    paddingLeft: "clamp(58px, 7vw, 150px)",
    paddingRight: "clamp(58px, 7vw, 150px)",
  },

  timelineScrollable: {
    minWidth: "max(100%, 1160px)",
    width: "max-content",
    gap: "34px",
    paddingRight: "max(28px, calc((100vw - 1180px) / 2))",
  },

  timelineLine: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "30px",
    height: "4px",
    borderRadius: "999px",
    background: "rgba(10, 124, 255, 0.14)",
  },

  yearGroup: {
    position: "relative",
    width: "104px",
    minHeight: "520px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  yearGroupStatic: {
    flex: "0 1 104px",
    minWidth: "84px",
  },

  yearGroupScrollable: {
    flex: "0 0 104px",
  },

  eventStack: {
    position: "relative",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    gap: "14px",
    marginBottom: "18px",
  },

  eventSlot: {
    position: "relative",
    width: "104px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },

  iconButton: {
    display: "grid",
    placeItems: "center",
    width: "54px",
    height: "54px",
    padding: 0,
    border: 0,
    borderRadius: "16px",
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    transition: "transform 0.22s ease",
    transformOrigin: "center",
  },

  iconButtonActive: {
    transform: "scale(1.09)",
  },

  icon: {
    width: "54px",
    height: "54px",
    display: "grid",
    placeItems: "center",
    borderRadius: "16px",
    color: "#ffffff",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  iconSvg: {
    width: "27px",
    height: "27px",
    display: "block",
  },

  connector: {
    width: "3px",
    height: "28px",
    borderRadius: "999px",
    background: "rgba(10, 124, 255, 0.16)",
  },

  markerName: {
    color: page.lightSoftText,
    fontSize: "11px",
    fontWeight: 800,
    lineHeight: 1.15,
    textAlign: "center",
  },

  tooltip: {
    position: "absolute",
    top: "0",
    zIndex: 100,
    width: "min(300px, 78vw)",
    padding: "18px",
    borderRadius: "20px",
    border: `1px solid ${page.lightBorder}`,
    background: page.blue,
    color: "#ffffff",
    boxShadow: "0 26px 60px rgba(10, 124, 255, 0.28)",
    pointerEvents: "none",
    animation: "timeline-tooltip-in 0.2s ease both",
  },

  tooltipRight: {
    left: "calc(50% + 46px)",
  },

  tooltipLeft: {
    right: "calc(50% + 46px)",
  },

  tooltipYear: {
    display: "inline-flex",
    marginBottom: "10px",
    color: "rgba(255, 255, 255, 0.78)",
    fontSize: "13px",
    fontWeight: 800,
  },

  tooltipTitle: {
    margin: "0 0 10px",
    color: "#ffffff",
    fontSize: "20px",
    lineHeight: 1.15,
  },

  tooltipText: {
    margin: 0,
    color: "rgba(255, 255, 255, 0.88)",
    fontSize: "15px",
    lineHeight: 1.45,
  },

  year: {
    position: "relative",
    zIndex: 1,
    paddingTop: "16px",
    color: page.lightSoftText,
    fontSize: "18px",
    fontWeight: 900,
  },

  clientsMarquee: {
    width: "100%",
    overflow: "hidden",
    padding: "0",
  },

  logoTrack: {
    display: "flex",
    width: "max-content",
    gap: "26px",
    alignItems: "center",
    animation: "platform-clients-marquee 32s linear infinite",
  },

  logoItem: {
    width: "160px",
    height: "82px",
    flex: "0 0 auto",
    display: "grid",
    placeItems: "center",
  },

  logoMask: {
    display: "block",
    background: "#86ace6",
    opacity: 0.82,
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  },
};
