import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { useDraggableList } from "../hooks/useDraggableList";
import type { HeroFormData } from "../types/heroForm";
import { formStyles as sharedStyles } from "./formStyles";
import { animateAdminRemoval, scrollToFormSubmit } from "./scrollHelpers";

type HeroFormProps = {
  hero: HeroFormData;
  isSaving: boolean;
  onSubmit: (hero: HeroFormData) => void;
};

export default function HeroForm({
  hero,
  isSaving,
  onSubmit,
}: HeroFormProps) {
  const [formData, setFormData] = useState<HeroFormData>(hero);
  const statsDrag = useDraggableList({
    items: formData.stats,
    getId: (_, index) => index,
    onReorder: (stats) =>
      setFormData((current) => ({
        ...current,
        stats,
      })),
  });

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

  const updateStat = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      stats: current.stats.map((stat, statIndex) =>
        statIndex === index ? { ...stat, [field]: value } : stat,
      ),
    }));
  };

  const addStat = () => {
    setFormData((current) => ({
      ...current,
      stats: [...current.stats, { label: "", value: "" }],
    }));
    scrollToFormSubmit();
  };

  const removeStat = (index: number) => {
    setFormData((current) => ({
      ...current,
      stats: current.stats.filter((_, statIndex) => statIndex !== index),
    }));
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>
        {"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 Hero"}
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
          value={formData.subtitle}
          onChange={(event) => updateField("subtitle", event.target.value)}
        />
      </label>

      <section style={styles.statsSection}>
        <div style={styles.statsHeader}>
          <h3 style={styles.subheading}>
            {"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430"}
          </h3>
          <button type="button" style={styles.secondaryButton} onClick={addStat}>
            {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"}
          </button>
        </div>

        {formData.stats.length === 0 && (
          <p style={styles.emptyText}>
            {"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0430"}
          </p>
        )}

        <div style={styles.statsList}>
          {formData.stats.map((stat, index) => (
            <div
              key={index}
              data-admin-item
              {...statsDrag.getItemProps(stat)}
              style={{
                ...styles.statCard,
                ...(statsDrag.isDragging(stat)
                  ? styles.draggingItem
                  : undefined),
              }}
            >
              <button
                type="button"
                style={styles.dragHandle}
                aria-label="Перетащить статистику"
                {...statsDrag.getHandleProps(stat)}
              >
                ↕
              </button>
              <label style={styles.field}>
                <span style={styles.label}>
                  {"\u0422\u0435\u043a\u0441\u0442"}
                </span>
                <input
                  style={styles.input}
                  value={stat.label}
                  onChange={(event) =>
                    updateStat(index, "label", event.target.value)
                  }
                />
              </label>

              <label style={styles.field}>
                <span style={styles.label}>
                  {"\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435"}
                </span>
                <input
                  style={styles.input}
                  value={stat.value}
                  onChange={(event) =>
                    updateStat(index, "value", event.target.value)
                  }
                />
              </label>

              <button
                type="button"
                className="admin-remove-button"
                style={styles.removeButton}
                onClick={(event) =>
                  animateAdminRemoval(event, () => removeStat(index))
                }
              >
                {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <button type="submit" style={styles.submitButton} disabled={isSaving}>
        {isSaving
          ? "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435..."
          : "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"}
      </button>
    </form>
  );
}

const styles: Record<string, CSSProperties> = {
  ...sharedStyles,

  textarea: {
    ...sharedStyles.textarea,
    minHeight: "96px",
  },

  statsSection: sharedStyles.itemsSection,
  statsHeader: sharedStyles.sectionHeader,
  statsList: sharedStyles.itemsList,

  statCard: {
    ...sharedStyles.itemCard,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr)) auto",
    gap: "16px",
    alignItems: "end",
  },
};
