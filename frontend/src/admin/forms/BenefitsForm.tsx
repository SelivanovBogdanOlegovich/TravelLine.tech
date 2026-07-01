import { useState } from "react";
import type { FormEvent } from "react";
import type { Benefit } from "../../api/contentApi";
import type { BenefitsFormData } from "../types/benefitsForm";
import { formStyles as styles } from "./formStyles";
import { animateAdminRemoval, scrollToFormSubmit } from "./scrollHelpers";

type BenefitsFormProps = {
  benefits: BenefitsFormData;
  isSaving: boolean;
  onSubmit: (benefits: BenefitsFormData) => void;
};

const createBenefit = (items: Benefit[]): Benefit => ({
  id: Math.max(0, ...items.map((item) => item.id)) + 1,
  title: "",
  description: "",
});

const getBenefitDescription = (benefit: Benefit) =>
  benefit.description ?? benefit.text ?? "";

export default function BenefitsForm({
  benefits,
  isSaving,
  onSubmit,
}: BenefitsFormProps) {
  const [formData, setFormData] = useState<BenefitsFormData>(benefits);

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

  const updateBenefit = (
    benefitIndex: number,
    field: "title" | "description",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      items: current.items.map((benefit, index) =>
        index === benefitIndex
          ? field === "description" &&
            benefit.text !== undefined &&
            benefit.description === undefined
            ? { ...benefit, text: value }
            : { ...benefit, [field]: value }
          : benefit,
      ),
    }));
  };

  const addBenefit = () => {
    setFormData((current) => ({
      ...current,
      items: [...current.items, createBenefit(current.items)],
    }));
    scrollToFormSubmit();
  };

  const removeBenefit = (benefitIndex: number) => {
    setFormData((current) => ({
      ...current,
      items: current.items.filter((_, index) => index !== benefitIndex),
    }));
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>Редактирование бонусов</h2>

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
          <h3 style={styles.subheading}>Бонусы</h3>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={addBenefit}
          >
            Добавить бонус
          </button>
        </div>

        {formData.items.length === 0 && (
          <p style={styles.emptyText}>Бонусы пока не добавлены</p>
        )}

        <div style={styles.itemsList}>
          {formData.items.map((benefit, benefitIndex) => (
            <article key={benefit.id} data-admin-item style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>
                  {benefit.title || "Новый бонус"}
                </h4>
                <button
                  type="button"
                  className="admin-remove-button"
                  style={styles.removeButton}
                  onClick={(event) =>
                    animateAdminRemoval(event, () =>
                      removeBenefit(benefitIndex),
                    )
                  }
                >
                  Удалить бонус
                </button>
              </div>

              <label style={styles.field}>
                <span style={styles.label}>Заголовок бонуса</span>
                <input
                  style={styles.input}
                  value={benefit.title}
                  onChange={(event) =>
                    updateBenefit(benefitIndex, "title", event.target.value)
                  }
                />
              </label>

              <label style={styles.field}>
                <span style={styles.label}>Описание бонуса</span>
                <textarea
                  style={{ ...styles.input, ...styles.textarea }}
                  value={getBenefitDescription(benefit)}
                  onChange={(event) =>
                    updateBenefit(
                      benefitIndex,
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
        {isSaving ? "Сохранение..." : "Сохранить бонусы"}
      </button>
    </form>
  );
}
