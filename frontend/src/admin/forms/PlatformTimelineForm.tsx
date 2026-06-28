import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { PlatformTimelineItem } from "../../api/contentApi";
import type { PlatformTimelineFormData } from "../types/platformTimelineForm";

type PlatformTimelineFormProps = {
  platformTimeline: PlatformTimelineFormData;
  isSaving: boolean;
  onSubmit: (platformTimeline: PlatformTimelineFormData) => void;
};

const createTimelineItem = (
  items: PlatformTimelineItem[],
  markerType: string,
): PlatformTimelineItem => ({
  id: Math.max(0, ...items.map((item) => item.id)) + 1,
  year: "",
  title: "",
  description: "",
  markerType,
});

const getMarkerTypes = (items: PlatformTimelineItem[]) =>
  Array.from(new Set(items.map((item) => item.markerType).filter(Boolean)));

export default function PlatformTimelineForm({
  platformTimeline,
  isSaving,
  onSubmit,
}: PlatformTimelineFormProps) {
  const [formData, setFormData] =
    useState<PlatformTimelineFormData>(platformTimeline);
  const markerTypes = useMemo(
    () => getMarkerTypes(formData.items),
    [formData.items],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: "title" | "subtitle", value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateItem = (
    itemIndex: number,
    field: "year" | "title" | "description" | "markerType",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      items: current.items.map((item, index) =>
        index === itemIndex ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addItem = () => {
    setFormData((current) => ({
      ...current,
      items: [
        ...current.items,
        createTimelineItem(current.items, markerTypes[0] ?? ""),
      ],
    }));
  };

  const removeItem = (itemIndex: number) => {
    setFormData((current) => ({
      ...current,
      items: current.items.filter((_, index) => index !== itemIndex),
    }));
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>
        {"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d\u0430 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b"}
      </h2>

      <label style={styles.field}>
        <span style={styles.label}>
          {"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"}
        </span>
        <input
          style={styles.input}
          value={formData.title}
          onChange={(event) => updateField("title", event.target.value)}
        />
      </label>

      <label style={styles.field}>
        <span style={styles.label}>
          {"\u041f\u043e\u0434\u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"}
        </span>
        <textarea
          style={{ ...styles.input, ...styles.textarea }}
          value={formData.subtitle ?? ""}
          onChange={(event) => updateField("subtitle", event.target.value)}
        />
      </label>

      <section style={styles.itemsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>
            {"\u0417\u0430\u043f\u0438\u0441\u0438 \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d\u0430"}
          </h3>
          <button type="button" style={styles.secondaryButton} onClick={addItem}>
            {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u043f\u0438\u0441\u044c"}
          </button>
        </div>

        {formData.items.length === 0 && (
          <p style={styles.emptyText}>
            {"\u0417\u0430\u043f\u0438\u0441\u0438 \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b"}
          </p>
        )}

        <div style={styles.itemsList}>
          {formData.items.map((item, itemIndex) => (
            <article key={item.id} style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>
                  {item.title ||
                    "\u041d\u043e\u0432\u0430\u044f \u0437\u0430\u043f\u0438\u0441\u044c"}
                </h4>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => removeItem(itemIndex)}
                >
                  {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0437\u0430\u043f\u0438\u0441\u044c"}
                </button>
              </div>

              <div style={styles.itemGrid}>
                <label style={styles.field}>
                  <span style={styles.label}>
                    {"\u0413\u043e\u0434"}
                  </span>
                  <input
                    style={styles.input}
                    value={item.year}
                    onChange={(event) =>
                      updateItem(itemIndex, "year", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>
                    {"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430"}
                  </span>
                  <input
                    style={styles.input}
                    value={item.title}
                    onChange={(event) =>
                      updateItem(itemIndex, "title", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>
                    {"\u0422\u0438\u043f \u043c\u0435\u0442\u043a\u0438"}
                  </span>
                  {markerTypes.length > 0 ? (
                    <select
                      style={styles.input}
                      value={item.markerType}
                      onChange={(event) =>
                        updateItem(
                          itemIndex,
                          "markerType",
                          event.target.value,
                        )
                      }
                    >
                      {markerTypes.map((markerType) => (
                        <option key={markerType} value={markerType}>
                          {markerType}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      style={styles.input}
                      value={item.markerType}
                      onChange={(event) =>
                        updateItem(
                          itemIndex,
                          "markerType",
                          event.target.value,
                        )
                      }
                    />
                  )}
                </label>
              </div>

              <label style={styles.field}>
                <span style={styles.label}>
                  {"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}
                </span>
                <textarea
                  style={{ ...styles.input, ...styles.textarea }}
                  value={item.description}
                  onChange={(event) =>
                    updateItem(itemIndex, "description", event.target.value)
                  }
                />
              </label>
            </article>
          ))}
        </div>
      </section>

      <button type="submit" style={styles.submitButton} disabled={isSaving}>
        {isSaving
          ? "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435..."
          : "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d"}
      </button>
    </form>
  );
}

const styles: Record<string, CSSProperties> = {
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
    minHeight: "96px",
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

  itemGrid: {
    display: "grid",
    gridTemplateColumns: "160px 1fr 180px",
    gap: "16px",
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
