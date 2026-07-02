import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { ClientLogo } from "../../api/contentApi";
import { useDraggableList } from "../hooks/useDraggableList";
import type { ClientLogosFormData } from "../types/clientLogosForm";
import { formStyles as sharedStyles } from "./formStyles";
import { animateAdminRemoval, scrollToFormSubmit } from "./scrollHelpers";

type ClientLogosFormProps = {
  clients: ClientLogosFormData;
  isSaving: boolean;
  onSubmit: (clients: ClientLogosFormData) => void;
};

const createClientLogo = (items: ClientLogo[]): ClientLogo => ({
  id: Math.max(0, ...items.map((item) => item.id)) + 1,
  name: "",
  logo: "",
});

export default function ClientLogosForm({
  clients,
  isSaving,
  onSubmit,
}: ClientLogosFormProps) {
  const [formData, setFormData] = useState<ClientLogosFormData>(clients);
  const clientDrag = useDraggableList({
    items: formData.items,
    getId: (client) => client.id,
    onReorder: (items) =>
      setFormData((current) => ({
        ...current,
        items,
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

  const updateClient = (
    clientIndex: number,
    field: "name" | "logo",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      items: current.items.map((client, index) =>
        index === clientIndex ? { ...client, [field]: value } : client,
      ),
    }));
  };

  const addClient = () => {
    setFormData((current) => ({
      ...current,
      items: [...current.items, createClientLogo(current.items)],
    }));
    scrollToFormSubmit();
  };

  const removeClient = (clientIndex: number) => {
    setFormData((current) => ({
      ...current,
      items: current.items.filter((_, index) => index !== clientIndex),
    }));
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>
        {"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u043e\u0432 \u043a\u043b\u0438\u0435\u043d\u0442\u043e\u0432"}
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
          value={formData.subtitle ?? ""}
          onChange={(event) => updateField("subtitle", event.target.value)}
        />
      </label>

      <section style={styles.clientsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>
            {"\u041a\u043b\u0438\u0435\u043d\u0442\u044b"}
          </h3>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={addClient}
          >
            {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043b\u0438\u0435\u043d\u0442\u0430"}
          </button>
        </div>

        {formData.items.length === 0 && (
          <p style={styles.emptyText}>
            {"\u041a\u043b\u0438\u0435\u043d\u0442\u044b \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b"}
          </p>
        )}

        <div style={styles.clientsList}>
          {formData.items.map((client, clientIndex) => (
            <article
              key={client.id}
              data-admin-item
              {...clientDrag.getItemProps(client)}
              style={{
                ...styles.clientCard,
                ...(clientDrag.isDragging(client)
                  ? styles.draggingItem
                  : undefined),
              }}
            >
              <div style={styles.clientHeader}>
                <span style={styles.itemHeaderTitle}>
                  <button
                    type="button"
                    style={styles.dragHandle}
                    aria-label="Перетащить клиента"
                    {...clientDrag.getHandleProps(client)}
                  >
                    ↕
                  </button>
                <h4 style={styles.clientTitle}>
                  {client.name ||
                    "\u041d\u043e\u0432\u044b\u0439 \u043a\u043b\u0438\u0435\u043d\u0442"}
                </h4>
                </span>
                <button
                  type="button"
                  className="admin-remove-button"
                  style={styles.removeButton}
                  onClick={(event) =>
                    animateAdminRemoval(event, () => removeClient(clientIndex))
                  }
                >
                  {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"}
                </button>
              </div>

              <div style={styles.clientGrid}>
                <label style={styles.field}>
                  <span style={styles.label}>
                    {"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043b\u0438\u0435\u043d\u0442\u0430"}
                  </span>
                  <input
                    style={styles.input}
                    value={client.name}
                    onChange={(event) =>
                      updateClient(clientIndex, "name", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>
                    {"\u041f\u0443\u0442\u044c \u043a \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u0443"}
                  </span>
                  <input
                    style={styles.input}
                    value={client.logo}
                    onChange={(event) =>
                      updateClient(clientIndex, "logo", event.target.value)
                    }
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
      </section>

      <button type="submit" style={styles.submitButton} disabled={isSaving}>
        {isSaving
          ? "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435..."
          : "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u044b"}
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

  clientsSection: sharedStyles.itemsSection,
  sectionHeader: sharedStyles.sectionHeader,
  clientsList: sharedStyles.itemsList,
  clientCard: sharedStyles.itemCard,
  clientHeader: sharedStyles.itemHeader,
  clientTitle: sharedStyles.itemTitle,

  clientGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
    gap: "16px",
  },
};
