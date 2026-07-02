import type { CSSProperties } from "react";
import type { ContentData } from "../api/contentApi";
import { container, page } from "./publicStyles";

type FooterProps = {
  footer: ContentData["footer"];
};

export default function Footer({ footer }: FooterProps) {
  return (
    <footer style={styles.footer}>
      <style>
        {`
          .footer-link:hover,
          .footer-social:hover {
            color: #ffffff;
            transform: translateY(-1px);
          }

          .footer-social:hover svg {
            fill: #ffffff;
          }
        `}
      </style>

      <div style={styles.inner}>
        <p style={styles.copy}>{footer?.text ?? footer?.copyright}</p>

        <div style={styles.links}>
          <a className="footer-link" href="#vacancies" style={styles.link}>
            Вакансии
          </a>
          <a
            className="footer-link"
            href="https://www.travelline.ru/"
            style={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            Сайт компании TravelLine
          </a>
          <a
            className="footer-social"
            href="https://vk.com/yourtravelline"
            style={styles.socialLink}
            target="_blank"
            rel="noreferrer"
            aria-label="TravelLine во ВКонтакте"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              style={styles.icon}
            >
              <path d="M26.4 33.8C12 33.8 3.8 23.9 3.5 7.5h7.2c.2 12 5.5 17.1 9.7 18.1V7.5h6.8v10.3c4.1-.4 8.4-5.1 9.8-10.3h6.8c-1.1 6.4-5.9 11.1-9.3 13 3.4 1.5 8.8 5.6 10.8 13.3h-7.5c-1.5-5-5.4-8.8-10.6-9.3v9.3h-.8Z" />
            </svg>
          </a>
          <a
            className="footer-social"
            href="https://t.me/travelline_news"
            style={styles.socialLink}
            target="_blank"
            rel="noreferrer"
            aria-label="TravelLine в Telegram"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              style={styles.icon}
            >
              <path d="M42.8 8.4 36.5 38c-.5 2.1-1.7 2.6-3.5 1.6l-9.6-7.1-4.6 4.5c-.5.5-.9.9-1.9.9l.7-9.8L35.5 12c.8-.7-.2-1.1-1.2-.4L12.1 25.5 2.5 22.5c-2.1-.7-2.1-2.1.4-3.1L40.3 5c1.8-.6 3.3.4 2.5 3.4Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, CSSProperties> = {
  footer: {
    width: "100%",
    padding: "34px 0",
    background: "#0b1f3a",
    color: "#f4f7fb",
    borderTop: `1px solid ${page.darkBorder}`,
  },

  inner: {
    ...container,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  copy: {
    color: "#f4f7fb",
    fontWeight: 700,
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },

  link: {
    color: "#c9d0dc",
    textDecoration: "none",
    fontWeight: 600,
    transition: "color 0.2s ease, transform 0.2s ease",
  },

  socialLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    color: "#a8c5ef",
    textDecoration: "none",
    transition: "color 0.2s ease, transform 0.2s ease",
  },

  icon: {
    width: "24px",
    height: "24px",
    fill: "currentColor",
    transition: "fill 0.2s ease",
  },
};
