import type { CSSProperties } from "react";

export const formStyles: Record<string, CSSProperties> = {
  form: {
    display: "grid",
    gap: "24px",
    padding: "24px",
    border: "1px solid #333",
    borderRadius: "8px",
    background: "#0b0d12",
  },

  heading: {
    margin: 0,
    fontSize: "26px",
  },

  subheading: {
    margin: 0,
    fontSize: "20px",
  },

  field: {
    display: "grid",
    gap: "8px",
  },

  label: {
    color: "#c9cdd6",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #333",
    borderRadius: "6px",
    background: "#11141b",
    color: "white",
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
    padding: "18px",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    background: "#0f1118",
  },

  itemHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
  },

  itemTitle: {
    margin: 0,
    fontSize: "18px",
  },

  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  threeColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
  },

  nestedBlock: {
    display: "grid",
    gap: "12px",
    paddingTop: "16px",
    borderTop: "1px solid #2a2a2a",
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
    color: "#c9cdd6",
  },

  secondaryButton: {
    padding: "10px 14px",
    border: "1px solid #555",
    borderRadius: "6px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },

  removeButton: {
    padding: "12px",
    border: "1px solid #555",
    borderRadius: "6px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },

  submitButton: {
    justifySelf: "start",
    padding: "12px 22px",
    border: "1px solid white",
    borderRadius: "6px",
    background: "white",
    color: "#0b0d12",
    cursor: "pointer",
    fontWeight: 700,
  },
};
