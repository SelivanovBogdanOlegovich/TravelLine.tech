import { useState } from "react";
import type { FormEvent } from "react";
import type { GalleryItem } from "../../api/contentApi";
import type { GalleryFormData } from "../types/galleryForm";
import { formStyles as styles } from "./formStyles";
import { animateAdminRemoval, scrollToFormSubmit } from "./scrollHelpers";

type GalleryFormProps = {
  gallery: GalleryFormData;
  isSaving: boolean;
  onSubmit: (gallery: GalleryFormData) => void;
};

const createGalleryItem = (items: GalleryItem[]): GalleryItem => ({
  id: Math.max(0, ...items.map((item) => item.id)) + 1,
  caption: "",
  media: "",
  type: "image",
});

export default function GalleryForm({
  gallery,
  isSaving,
  onSubmit,
}: GalleryFormProps) {
  const [formData, setFormData] = useState<GalleryFormData>(gallery);

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
    field: "caption" | "media" | "type",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      items: current.items.map((item, index) =>
        index === itemIndex
          ? {
              ...item,
              [field]: field === "type" && value === "video" ? "video" : value,
            }
          : item,
      ),
    }));
  };

  const addItem = () => {
    setFormData((current) => ({
      ...current,
      items: [...current.items, createGalleryItem(current.items)],
    }));
    scrollToFormSubmit();
  };

  const removeItem = (itemIndex: number) => {
    setFormData((current) => ({
      ...current,
      items: current.items.filter((_, index) => index !== itemIndex),
    }));
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>Редактирование фотогалереи</h2>

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
          <h3 style={styles.subheading}>Медиа</h3>
          <button type="button" style={styles.secondaryButton} onClick={addItem}>
            Добавить элемент
          </button>
        </div>

        {formData.items.length === 0 && (
          <p style={styles.emptyText}>Элементы пока не добавлены</p>
        )}

        <div style={styles.itemsList}>
          {formData.items.map((item, itemIndex) => (
            <article key={item.id} data-admin-item style={styles.itemCard}>
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>
                  {item.caption || "Новый элемент"}
                </h4>
                <button
                  type="button"
                  className="admin-remove-button"
                  style={styles.removeButton}
                  onClick={(event) =>
                    animateAdminRemoval(event, () => removeItem(itemIndex))
                  }
                >
                  Удалить элемент
                </button>
              </div>

              <div style={styles.threeColumnGrid}>
                <label style={styles.field}>
                  <span style={styles.label}>Подпись</span>
                  <input
                    style={styles.input}
                    value={item.caption}
                    onChange={(event) =>
                      updateItem(itemIndex, "caption", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Путь к медиа</span>
                  <input
                    style={styles.input}
                    value={item.media}
                    onChange={(event) =>
                      updateItem(itemIndex, "media", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>Тип</span>
                  <select
                    style={styles.input}
                    value={item.type}
                    onChange={(event) =>
                      updateItem(itemIndex, "type", event.target.value)
                    }
                  >
                    <option value="image">image</option>
                    <option value="video">video</option>
                  </select>
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>

      <button type="submit" style={styles.submitButton} disabled={isSaving}>
        {isSaving ? "Сохранение..." : "Сохранить галерею"}
      </button>
    </form>
  );
}
