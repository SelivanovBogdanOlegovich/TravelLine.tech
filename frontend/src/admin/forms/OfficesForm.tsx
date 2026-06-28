import { useState } from "react";
import type { FormEvent } from "react";
import type { OfficeItem } from "../../api/contentApi";
import type { OfficesFormData } from "../types/officesForm";
import { formStyles as styles } from "./formStyles";

type OfficesFormProps = {
  offices: OfficesFormData;
  isSaving: boolean;
  onSubmit: (offices: OfficesFormData) => void;
};

const createOffice = (items: OfficeItem[]): OfficeItem => ({
  id: Math.max(0, ...items.map((item) => item.id)) + 1,
  city: "",
  description: "",
  photo: "",
});

export default function OfficesForm({
  offices,
  isSaving,
  onSubmit,
}: OfficesFormProps) {
  const [formData, setFormData] = useState<OfficesFormData>(offices);

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

  const updateOffice = (
    officeIndex: number,
    field: "city" | "description" | "photo",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      items: current.items.map((office, index) =>
        index === officeIndex ? { ...office, [field]: value } : office,
      ),
    }));
  };

  const addOffice = () => {
    setFormData((current) => ({
      ...current,
      items: [...current.items, createOffice(current.items)],
    }));
  };

  const removeOffice = (officeIndex: number) => {
    setFormData((current) => ({
      ...current,
      items: current.items.filter((_, index) => index !== officeIndex),
    }));
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>Редактирование офисов</h2>

      <label style={styles.field}>
        <span style={styles.label}>Заголовок</span>
        <input
          style={styles.input}
          value={formData.title}
          onChange={(event) => updateField("title", event.target.value)}
        />
      </label>

      <label style={styles.field}>
        <span style={styles.label}>Подзаголовок</span>
        <textarea
          style={{ ...styles.input, ...styles.textarea }}
          value={formData.subtitle ?? ""}
          onChange={(event) => updateField("subtitle", event.target.value)}
        />
      </label>

      <section style={styles.itemsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>Офисы</h3>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={addOffice}
          >
            Добавить офис
          </button>
        </div>

        {formData.items.length === 0 && (
          <p style={styles.emptyText}>Офисы пока не добавлены</p>
        )}

        <div style={styles.itemsList}>
          {formData.items.map((office, officeIndex) => (
            <article key={office.id} style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>{office.city || "Новый офис"}</h4>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => removeOffice(officeIndex)}
                >
                  Удалить офис
                </button>
              </div>

              <div style={styles.twoColumnGrid}>
                <label style={styles.field}>
                  <span style={styles.label}>Город</span>
                  <input
                    style={styles.input}
                    value={office.city}
                    onChange={(event) =>
                      updateOffice(officeIndex, "city", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Путь к фото</span>
                  <input
                    style={styles.input}
                    value={office.photo}
                    onChange={(event) =>
                      updateOffice(officeIndex, "photo", event.target.value)
                    }
                  />
                </label>
              </div>

              <label style={styles.field}>
                <span style={styles.label}>Описание офиса</span>
                <textarea
                  style={{ ...styles.input, ...styles.textarea }}
                  value={office.description}
                  onChange={(event) =>
                    updateOffice(
                      officeIndex,
                      "description",
                      event.target.value,
                    )
                  }
                />
              </label>
            </article>
          ))}
        </div>
      </section>

      <button type="submit" style={styles.submitButton} disabled={isSaving}>
        {isSaving ? "Сохранение..." : "Сохранить офисы"}
      </button>
    </form>
  );
}
