import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { ClientLogo } from "../../api/contentApi";
import type { ClientLogosFormData } from "../types/clientLogosForm";

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
            <article key={client.id} style={styles.clientCard}>
              <div style={styles.clientHeader}>
                <h4 style={styles.clientTitle}>
                  {client.name ||
                    "\u041d\u043e\u0432\u044b\u0439 \u043a\u043b\u0438\u0435\u043d\u0442"}
                </h4>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => removeClient(clientIndex)}
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

  clientsSection: {
    display: "grid",
    gap: "16px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
  },

  clientsList: {
    display: "grid",
    gap: "18px",
  },

  clientCard: {
    display: "grid",
    gap: "18px",
    padding: "18px",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    background: "#0f1118",
  },

  clientHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
  },

  clientTitle: {
    margin: 0,
    fontSize: "18px",
  },

  clientGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
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
