import { useState } from "react";
import type { FormEvent } from "react";
import type { ContactFormData } from "../types/contactForm";
import { formStyles as styles } from "./formStyles";

type ContactFormProps = {
  contact: ContactFormData;
  isSaving: boolean;
  onSubmit: (contact: ContactFormData) => void;
};

export default function ContactForm({
  contact,
  isSaving,
  onSubmit,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(contact);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const updateField = (
    field: "title" | "subtitle" | "buttonText",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>Редактирование контактов</h2>

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

      <label style={styles.field}>
        <span style={styles.label}>Текст кнопки</span>
        <input
          style={styles.input}
          value={formData.buttonText}
          onChange={(event) => updateField("buttonText", event.target.value)}
        />
      </label>

      <button type="submit" style={styles.submitButton} disabled={isSaving}>
        {isSaving ? "Сохранение..." : "Сохранить контакты"}
      </button>
    </form>
  );
}
