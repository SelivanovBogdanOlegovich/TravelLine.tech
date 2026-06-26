import { useEffect, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { HeroFormData } from "../types/heroForm";

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

  useEffect(() => {
    setFormData(hero);
  }, [hero]);

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
            <div key={index} style={styles.statCard}>
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
                style={styles.removeButton}
                onClick={() => removeStat(index)}
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

  statsSection: {
    display: "grid",
    gap: "16px",
  },

  statsHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
  },

  statsList: {
    display: "grid",
    gap: "16px",
  },

  statCard: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr auto",
    gap: "16px",
    alignItems: "end",
    padding: "16px",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
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
