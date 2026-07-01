import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { Vacancy } from "../../api/contentApi";
import type { VacanciesFormData } from "../types/vacanciesForm";
import { formStyles as styles } from "./formStyles";
import { animateAdminRemoval, scrollToFormSubmit } from "./scrollHelpers";

type VacanciesFormProps = {
  vacancies: VacanciesFormData;
  isSaving: boolean;
  onSubmit: (vacancies: VacanciesFormData) => void;
};

const createVacancy = (vacancies: Vacancy[]): Vacancy => ({
  id: Math.max(0, ...vacancies.map((vacancy) => vacancy.id)) + 1,
  title: "",
  location: "",
  type: "",
  stack: [],
});

export default function VacanciesForm({
  vacancies,
  isSaving,
  onSubmit,
}: VacanciesFormProps) {
  const [formData, setFormData] = useState<VacanciesFormData>(vacancies);
  const [expandedVacancyIds, setExpandedVacancyIds] = useState<Set<number>>(
    () => new Set(),
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const updateVacancy = (
    vacancyIndex: number,
    field: "title" | "location" | "type",
    value: string,
  ) => {
    setFormData((current) =>
      current.map((vacancy, index) =>
        index === vacancyIndex ? { ...vacancy, [field]: value } : vacancy,
      ),
    );
  };

  const addVacancy = () => {
    setFormData((current) => {
      const newVacancy = createVacancy(current);

      setExpandedVacancyIds((expanded) =>
        new Set(expanded).add(newVacancy.id),
      );

      return [...current, newVacancy];
    });
    scrollToFormSubmit();
  };

  const removeVacancy = (vacancyIndex: number) => {
    setFormData((current) =>
      current.filter((_, index) => index !== vacancyIndex),
    );
  };

  const toggleVacancy = (vacancyId: number) => {
    setExpandedVacancyIds((current) => {
      const next = new Set(current);

      if (next.has(vacancyId)) {
        next.delete(vacancyId);
      } else {
        next.add(vacancyId);
      }

      return next;
    });
  };

  const addStackItem = (vacancyIndex: number) => {
    setFormData((current) =>
      current.map((vacancy, index) =>
        index === vacancyIndex
          ? { ...vacancy, stack: [...(vacancy.stack ?? []), ""] }
          : vacancy,
      ),
    );
    scrollToFormSubmit("[data-admin-nested-item]");
  };

  const updateStackItem = (
    vacancyIndex: number,
    stackIndex: number,
    value: string,
  ) => {
    setFormData((current) =>
      current.map((vacancy, index) =>
        index === vacancyIndex
          ? {
              ...vacancy,
              stack: (vacancy.stack ?? []).map((item, currentStackIndex) =>
                currentStackIndex === stackIndex ? value : item,
              ),
            }
          : vacancy,
      ),
    );
  };

  const removeStackItem = (vacancyIndex: number, stackIndex: number) => {
    setFormData((current) =>
      current.map((vacancy, index) =>
        index === vacancyIndex
          ? {
              ...vacancy,
              stack: (vacancy.stack ?? []).filter(
                (_, currentStackIndex) => currentStackIndex !== stackIndex,
              ),
            }
          : vacancy,
      ),
    );
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>{"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0432\u0430\u043a\u0430\u043d\u0441\u0438\u0439"}</h2>

      <section style={styles.itemsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>{"\u0412\u0430\u043a\u0430\u043d\u0441\u0438\u0438"}</h3>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={addVacancy}
          >
            {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u0430\u043a\u0430\u043d\u0441\u0438\u044e"}
          </button>
        </div>

        {formData.length === 0 && (
          <p style={styles.emptyText}>{"\u0412\u0430\u043a\u0430\u043d\u0441\u0438\u0438 \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b"}</p>
        )}

        <div style={styles.itemsList}>
          {formData.map((vacancy, vacancyIndex) => {
            const isExpanded = expandedVacancyIds.has(vacancy.id);

            return (
              <article key={vacancy.id} data-admin-item style={styles.itemCard}>
                <div style={styles.itemHeader}>
                  <h4 style={styles.itemTitle}>
                    {vacancy.title || "\u041d\u043e\u0432\u0430\u044f \u0432\u0430\u043a\u0430\u043d\u0441\u0438\u044f"}
                  </h4>
                  <span style={actionStyles}>
                    <button
                      type="button"
                      style={styles.secondaryButton}
                      onClick={() => toggleVacancy(vacancy.id)}
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
                          removeVacancy(vacancyIndex),
                        )
                      }
                    >
                      {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0430\u043a\u0430\u043d\u0441\u0438\u044e"}
                    </button>
                  </span>
                </div>

                {isExpanded && (
                  <>
                    <div style={styles.threeColumnGrid}>
                      <label style={styles.field}>
                        <span style={styles.label}>{"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0432\u0430\u043a\u0430\u043d\u0441\u0438\u0438"}</span>
                        <input
                          style={styles.input}
                          value={vacancy.title}
                          onChange={(event) =>
                            updateVacancy(
                              vacancyIndex,
                              "title",
                              event.target.value,
                            )
                          }
                        />
                      </label>

                      <label style={styles.field}>
                        <span style={styles.label}>{"\u0424\u043e\u0440\u043c\u0430\u0442 / \u043b\u043e\u043a\u0430\u0446\u0438\u044f"}</span>
                        <input
                          style={styles.input}
                          value={vacancy.location}
                          onChange={(event) =>
                            updateVacancy(
                              vacancyIndex,
                              "location",
                              event.target.value,
                            )
                          }
                        />
                      </label>

                      <label style={styles.field}>
                        <span style={styles.label}>{"\u0422\u0438\u043f \u0437\u0430\u043d\u044f\u0442\u043e\u0441\u0442\u0438"}</span>
                        <input
                          style={styles.input}
                          value={vacancy.type}
                          onChange={(event) =>
                            updateVacancy(
                              vacancyIndex,
                              "type",
                              event.target.value,
                            )
                          }
                        />
                      </label>
                    </div>

                    <div style={styles.nestedBlock}>
                      <div style={styles.sectionHeader}>
                        <h5 style={styles.itemTitle}>{"\u0421\u0442\u0435\u043a"}</h5>
                        <button
                          type="button"
                          style={styles.secondaryButton}
                          onClick={() => addStackItem(vacancyIndex)}
                        >
                          {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u044e"}
                        </button>
                      </div>

                      {(vacancy.stack ?? []).length === 0 && (
                        <p style={styles.emptyText}>{"\u0421\u0442\u0435\u043a \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d"}</p>
                      )}

                      <div style={styles.nestedList}>
                        {(vacancy.stack ?? []).map((stackItem, stackIndex) => (
                          <div
                            key={stackIndex}
                            data-admin-nested-item
                            style={styles.nestedRow}
                          >
                            <label style={styles.field}>
                              <span style={styles.label}>{"\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u044f"}</span>
                              <input
                                style={styles.input}
                                value={stackItem}
                                onChange={(event) =>
                                  updateStackItem(
                                    vacancyIndex,
                                    stackIndex,
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
                                  removeStackItem(vacancyIndex, stackIndex),
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
          : "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0432\u0430\u043a\u0430\u043d\u0441\u0438\u0438"}
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
