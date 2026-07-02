import type { CSSProperties } from "react";
import {
  lightCard,
  page,
  primaryButton,
  secondaryButton,
} from "../../sections/publicStyles";

export const formStyles: Record<string, CSSProperties> = {
  form: {
    ...lightCard,
    display: "grid",
    gap: "26px",
    padding: "32px",
  },

  heading: {
    margin: 0,
    color: page.lightText,
    fontSize: "28px",
    lineHeight: 1.18,
    fontWeight: 800,
  },

  subheading: {
    margin: 0,
    color: page.lightText,
    fontSize: "21px",
    lineHeight: 1.25,
    fontWeight: 800,
  },

  field: {
    display: "grid",
    gap: "9px",
  },

  label: {
    color: page.lightSoftText,
    fontSize: "14px",
    fontWeight: 700,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "48px",
    padding: "13px 16px",
    border: `1px solid ${page.lightBorder}`,
    borderRadius: "16px",
    outlineColor: page.accent,
    background: page.light,
    color: page.lightText,
    font: "inherit",
  },

  textarea: {
    minHeight: "92px",
    resize: "vertical",
  },

  itemsSection: {
    display: "grid",
    gap: "16px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
  },

  itemsList: {
    display: "grid",
    gap: "18px",
  },

  itemCard: {
    display: "grid",
    gap: "18px",
    padding: "22px",
    border: `1px solid ${page.lightBorder}`,
    borderRadius: "24px",
    background: page.softBlue,
  },

  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
  },

  itemHeaderTitle: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    minWidth: 0,
  },

  itemTitle: {
    margin: 0,
    color: page.lightText,
    fontSize: "18px",
    fontWeight: 800,
  },

  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
    gap: "16px",
  },

  threeColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: "16px",
  },

  nestedBlock: {
    display: "grid",
    gap: "12px",
    paddingTop: "16px",
    borderTop: `1px solid ${page.lightBorder}`,
  },

  nestedList: {
    display: "grid",
    gap: "12px",
  },

  nestedRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "12px",
    alignItems: "end",
  },

  emptyText: {
    margin: 0,
    color: page.lightMutedText,
  },

  secondaryButton: {
    ...secondaryButton,
    minHeight: "40px",
    padding: "9px 14px",
    fontSize: "14px",
  },

  removeButton: {
    ...secondaryButton,
    minHeight: "40px",
    padding: "9px 14px",
    color: page.lightSoftText,
    cursor: "pointer",
    boxShadow: "none",
  },

  dragHandle: {
    ...secondaryButton,
    minHeight: "34px",
    padding: "7px 11px",
    fontSize: "13px",
    lineHeight: 1,
    color: page.lightSoftText,
    cursor: "grab",
    boxShadow: "none",
    whiteSpace: "nowrap",
  },

  draggingItem: {
    opacity: 0.62,
    transform: "scale(0.995)",
    borderColor: "rgba(10, 124, 255, 0.55)",
    boxShadow: "0 18px 44px rgba(10, 124, 255, 0.16)",
  },

  submitButton: {
    ...primaryButton,
    justifySelf: "start",
  },
};
