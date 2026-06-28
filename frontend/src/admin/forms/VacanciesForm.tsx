import { useState } from "react";
import type { FormEvent } from "react";
import type { Vacancy } from "../../api/contentApi";
import type { VacanciesFormData } from "../types/vacanciesForm";
import { formStyles as styles } from "./formStyles";

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
    setFormData((current) => [...current, createVacancy(current)]);
  };

  const removeVacancy = (vacancyIndex: number) => {
    setFormData((current) =>
      current.filter((_, index) => index !== vacancyIndex),
    );
  };

  const addStackItem = (vacancyIndex: number) => {
    setFormData((current) =>
      current.map((vacancy, index) =>
        index === vacancyIndex
          ? { ...vacancy, stack: [...(vacancy.stack ?? []), ""] }
          : vacancy,
      ),
    );
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
      <h2 style={styles.heading}>Редактирование вакансий</h2>

      <section style={styles.itemsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>Вакансии</h3>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={addVacancy}
          >
            Добавить вакансию
          </button>
        </div>

        {formData.length === 0 && (
          <p style={styles.emptyText}>Вакансии пока не добавлены</p>
        )}

        <div style={styles.itemsList}>
          {formData.map((vacancy, vacancyIndex) => (
            <article key={vacancy.id} style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>
                  {vacancy.title || "Новая вакансия"}
                </h4>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => removeVacancy(vacancyIndex)}
                >
                  Удалить вакансию
                </button>
              </div>

              <div style={styles.threeColumnGrid}>
                <label style={styles.field}>
                  <span style={styles.label}>Название вакансии</span>
                  <input
                    style={styles.input}
                    value={vacancy.title}
                    onChange={(event) =>
                      updateVacancy(vacancyIndex, "title", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Формат / локация</span>
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
                  <span style={styles.label}>Тип занятости</span>
                  <input
                    style={styles.input}
                    value={vacancy.type}
                    onChange={(event) =>
                      updateVacancy(vacancyIndex, "type", event.target.value)
                    }
                  />
                </label>
              </div>

              <div style={styles.nestedBlock}>
                <div style={styles.sectionHeader}>
                  <h5 style={styles.itemTitle}>Стек</h5>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => addStackItem(vacancyIndex)}
                  >
                    Добавить технологию
                  </button>
                </div>

                {(vacancy.stack ?? []).length === 0 && (
                  <p style={styles.emptyText}>Стек пока не добавлен</p>
                )}

                <div style={styles.nestedList}>
                  {(vacancy.stack ?? []).map((stackItem, stackIndex) => (
                    <div key={stackIndex} style={styles.nestedRow}>
                      <label style={styles.field}>
                        <span style={styles.label}>Технология</span>
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
                        style={styles.removeButton}
                        onClick={() =>
                          removeStackItem(vacancyIndex, stackIndex)
                        }
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
        {isSaving ? "Сохранение..." : "Сохранить вакансии"}
      </button>
    </form>
  );
}
