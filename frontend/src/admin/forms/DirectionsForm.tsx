import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { Direction } from "../../api/contentApi";
import type { DirectionsFormData } from "../types/directionsForm";
import { formStyles as styles } from "./formStyles";
import { animateAdminRemoval, scrollToFormSubmit } from "./scrollHelpers";

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
  const [expandedDirectionIds, setExpandedDirectionIds] = useState<
    Set<number>
  >(() => new Set());

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
    setFormData((current) => {
      const newDirection = createDirection(current);

      setExpandedDirectionIds((expanded) =>
        new Set(expanded).add(newDirection.id),
      );

      return [...current, newDirection];
    });
    scrollToFormSubmit();
  };

  const removeDirection = (directionIndex: number) => {
    setFormData((current) =>
      current.filter((_, index) => index !== directionIndex),
    );
  };

  const toggleDirection = (directionId: number) => {
    setExpandedDirectionIds((current) => {
      const next = new Set(current);

      if (next.has(directionId)) {
        next.delete(directionId);
      } else {
        next.add(directionId);
      }

      return next;
    });
  };

  const addTag = (directionIndex: number) => {
    setFormData((current) =>
      current.map((direction, index) =>
        index === directionIndex
          ? { ...direction, tags: [...(direction.tags ?? []), ""] }
          : direction,
      ),
    );
    scrollToFormSubmit("[data-admin-nested-item]");
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
      <h2 style={styles.heading}>{"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0439"}</h2>

      <section style={styles.itemsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>{"\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f"}</h3>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={addDirection}
          >
            {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435"}
          </button>
        </div>

        {formData.length === 0 && (
          <p style={styles.emptyText}>{"\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b"}</p>
        )}

        <div style={styles.itemsList}>
          {formData.map((direction, directionIndex) => {
            const isExpanded = expandedDirectionIds.has(direction.id);

            return (
              <article key={direction.id} data-admin-item style={styles.itemCard}>
                <div style={styles.itemHeader}>
                  <h4 style={styles.itemTitle}>
                    {direction.title || "\u041d\u043e\u0432\u043e\u0435 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435"}
                  </h4>
                  <span style={actionStyles}>
                    <button
                      type="button"
                      style={styles.secondaryButton}
                      onClick={() => toggleDirection(direction.id)}
                    >
                      {isExpanded
                        ? "\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c"
                        : "\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c"}
                    </button>
                    <button
                      type="button"
                      className="admin-remove-button"
                      style={styles.removeButton}
                      onClick={(event) =>
                        animateAdminRemoval(event, () =>
                          removeDirection(directionIndex),
                        )
                      }
                    >
                      {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435"}
                    </button>
                  </span>
                </div>

                {isExpanded && (
                  <>
                    <label style={styles.field}>
                      <span style={styles.label}>{"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f"}</span>
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
                      <span style={styles.label}>{"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f"}</span>
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
                        <h5 style={styles.itemTitle}>{"\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438"}</h5>
                        <button
                          type="button"
                          style={styles.secondaryButton}
                          onClick={() => addTag(directionIndex)}
                        >
                          {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u044e"}
                        </button>
                      </div>

                      {(direction.tags ?? []).length === 0 && (
                        <p style={styles.emptyText}>
                          {"\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438 \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b"}
                        </p>
                      )}

                      <div style={styles.nestedList}>
                        {(direction.tags ?? []).map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            data-admin-nested-item
                            style={styles.nestedRow}
                          >
                            <label style={styles.field}>
                              <span style={styles.label}>{"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438"}</span>
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
                              className="admin-remove-button"
                              style={styles.removeButton}
                              onClick={(event) =>
                                animateAdminRemoval(event, () =>
                                  removeTag(directionIndex, tagIndex),
                                )
                              }
                            >
                              {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <button type="submit" style={styles.submitButton} disabled={isSaving}>
        {isSaving
          ? "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435..."
          : "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f"}
      </button>
    </form>
  );
}

const actionStyles: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: "10px",
};
