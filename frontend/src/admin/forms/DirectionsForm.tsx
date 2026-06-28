import { useState } from "react";
import type { FormEvent } from "react";
import type { Direction } from "../../api/contentApi";
import type { DirectionsFormData } from "../types/directionsForm";
import { formStyles as styles } from "./formStyles";

type DirectionsFormProps = {
  directions: DirectionsFormData;
  isSaving: boolean;
  onSubmit: (directions: DirectionsFormData) => void;
};

const createDirection = (directions: Direction[]): Direction => ({
  id: Math.max(0, ...directions.map((direction) => direction.id)) + 1,
  title: "",
  description: "",
  tags: [],
});

export default function DirectionsForm({
  directions,
  isSaving,
  onSubmit,
}: DirectionsFormProps) {
  const [formData, setFormData] = useState<DirectionsFormData>(directions);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const updateDirection = (
    directionIndex: number,
    field: "title" | "description",
    value: string,
  ) => {
    setFormData((current) =>
      current.map((direction, index) =>
        index === directionIndex ? { ...direction, [field]: value } : direction,
      ),
    );
  };

  const addDirection = () => {
    setFormData((current) => [...current, createDirection(current)]);
  };

  const removeDirection = (directionIndex: number) => {
    setFormData((current) =>
      current.filter((_, index) => index !== directionIndex),
    );
  };

  const addTag = (directionIndex: number) => {
    setFormData((current) =>
      current.map((direction, index) =>
        index === directionIndex
          ? { ...direction, tags: [...(direction.tags ?? []), ""] }
          : direction,
      ),
    );
  };

  const updateTag = (
    directionIndex: number,
    tagIndex: number,
    value: string,
  ) => {
    setFormData((current) =>
      current.map((direction, index) =>
        index === directionIndex
          ? {
              ...direction,
              tags: (direction.tags ?? []).map((tag, currentTagIndex) =>
                currentTagIndex === tagIndex ? value : tag,
              ),
            }
          : direction,
      ),
    );
  };

  const removeTag = (directionIndex: number, tagIndex: number) => {
    setFormData((current) =>
      current.map((direction, index) =>
        index === directionIndex
          ? {
              ...direction,
              tags: (direction.tags ?? []).filter(
                (_, currentTagIndex) => currentTagIndex !== tagIndex,
              ),
            }
          : direction,
      ),
    );
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>Редактирование направлений</h2>

      <section style={styles.itemsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>Направления</h3>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={addDirection}
          >
            Добавить направление
          </button>
        </div>

        {formData.length === 0 && (
          <p style={styles.emptyText}>Направления пока не добавлены</p>
        )}

        <div style={styles.itemsList}>
          {formData.map((direction, directionIndex) => (
            <article key={direction.id} style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>
                  {direction.title || "Новое направление"}
                </h4>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => removeDirection(directionIndex)}
                >
                  Удалить направление
                </button>
              </div>

              <label style={styles.field}>
                <span style={styles.label}>Название направления</span>
                <input
                  style={styles.input}
                  value={direction.title}
                  onChange={(event) =>
                    updateDirection(
                      directionIndex,
                      "title",
                      event.target.value,
                    )
                  }
                />
              </label>

              <label style={styles.field}>
                <span style={styles.label}>Описание направления</span>
                <textarea
                  style={{ ...styles.input, ...styles.textarea }}
                  value={direction.description}
                  onChange={(event) =>
                    updateDirection(
                      directionIndex,
                      "description",
                      event.target.value,
                    )
                  }
                />
              </label>

              <div style={styles.nestedBlock}>
                <div style={styles.sectionHeader}>
                  <h5 style={styles.itemTitle}>Технологии</h5>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => addTag(directionIndex)}
                  >
                    Добавить технологию
                  </button>
                </div>

                {(direction.tags ?? []).length === 0 && (
                  <p style={styles.emptyText}>
                    Технологии пока не добавлены
                  </p>
                )}

                <div style={styles.nestedList}>
                  {(direction.tags ?? []).map((tag, tagIndex) => (
                    <div key={tagIndex} style={styles.nestedRow}>
                      <label style={styles.field}>
                        <span style={styles.label}>Название технологии</span>
                        <input
                          style={styles.input}
                          value={tag}
                          onChange={(event) =>
                            updateTag(
                              directionIndex,
                              tagIndex,
                              event.target.value,
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        style={styles.removeButton}
                        onClick={() => removeTag(directionIndex, tagIndex)}
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <button type="submit" style={styles.submitButton} disabled={isSaving}>
        {isSaving ? "Сохранение..." : "Сохранить направления"}
      </button>
    </form>
  );
}
