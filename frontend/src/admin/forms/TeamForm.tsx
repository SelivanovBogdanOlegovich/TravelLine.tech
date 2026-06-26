import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { TeamMember, TeamSocial } from "../../api/contentApi";
import type { TeamFormData } from "../types/teamForm";

type TeamFormProps = {
  team: TeamFormData;
  isSaving: boolean;
  onSubmit: (team: TeamFormData) => void;
};

const createTeamMember = (members: TeamMember[]): TeamMember => ({
  id: Math.max(0, ...members.map((member) => member.id)) + 1,
  name: "",
  position: "",
  photo: "",
  socials: [],
});

const createSocial = (): TeamSocial => ({
  label: "",
  url: "",
});

export default function TeamForm({
  team,
  isSaving,
  onSubmit,
}: TeamFormProps) {
  const [formData, setFormData] = useState<TeamFormData>(team);

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

  const updateMember = (
    memberIndex: number,
    field: "name" | "position" | "photo",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      members: current.members.map((member, index) =>
        index === memberIndex ? { ...member, [field]: value } : member,
      ),
    }));
  };

  const addMember = () => {
    setFormData((current) => ({
      ...current,
      members: [...current.members, createTeamMember(current.members)],
    }));
  };

  const removeMember = (memberIndex: number) => {
    setFormData((current) => ({
      ...current,
      members: current.members.filter((_, index) => index !== memberIndex),
    }));
  };

  const addSocial = (memberIndex: number) => {
    setFormData((current) => ({
      ...current,
      members: current.members.map((member, index) =>
        index === memberIndex
          ? { ...member, socials: [...member.socials, createSocial()] }
          : member,
      ),
    }));
  };

  const updateSocial = (
    memberIndex: number,
    socialIndex: number,
    field: "label" | "url",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      members: current.members.map((member, index) =>
        index === memberIndex
          ? {
              ...member,
              socials: member.socials.map((social, currentSocialIndex) =>
                currentSocialIndex === socialIndex
                  ? { ...social, [field]: value }
                  : social,
              ),
            }
          : member,
      ),
    }));
  };

  const removeSocial = (memberIndex: number, socialIndex: number) => {
    setFormData((current) => ({
      ...current,
      members: current.members.map((member, index) =>
        index === memberIndex
          ? {
              ...member,
              socials: member.socials.filter(
                (_, currentSocialIndex) => currentSocialIndex !== socialIndex,
              ),
            }
          : member,
      ),
    }));
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>
        {"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043c\u0430\u043d\u0434\u044b"}
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

      <section style={styles.membersSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>
            {"\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438"}
          </h3>
          <button type="button" style={styles.secondaryButton} onClick={addMember}>
            {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430"}
          </button>
        </div>

        {formData.members.length === 0 && (
          <p style={styles.emptyText}>
            {"\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b"}
          </p>
        )}

        <div style={styles.membersList}>
          {formData.members.map((member, memberIndex) => (
            <article key={member.id} style={styles.memberCard}>
              <div style={styles.memberHeader}>
                <h4 style={styles.memberTitle}>
                  {member.name ||
                    "\u041d\u043e\u0432\u044b\u0439 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a"}
                </h4>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => removeMember(memberIndex)}
                >
                  {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430"}
                </button>
              </div>

              <div style={styles.memberGrid}>
                <label style={styles.field}>
                  <span style={styles.label}>
                    {"\u0418\u043c\u044f"}
                  </span>
                  <input
                    style={styles.input}
                    value={member.name}
                    onChange={(event) =>
                      updateMember(memberIndex, "name", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>
                    {"\u0414\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u044c"}
                  </span>
                  <input
                    style={styles.input}
                    value={member.position}
                    onChange={(event) =>
                      updateMember(memberIndex, "position", event.target.value)
                    }
                  />
                </label>

                <label style={styles.field}>
                  <span style={styles.label}>
                    {"\u041f\u0443\u0442\u044c \u043a \u0444\u043e\u0442\u043e"}
                  </span>
                  <input
                    style={styles.input}
                    value={member.photo}
                    onChange={(event) =>
                      updateMember(memberIndex, "photo", event.target.value)
                    }
                  />
                </label>
              </div>

              <div style={styles.socialsBlock}>
                <div style={styles.sectionHeader}>
                  <h5 style={styles.socialTitle}>
                    {"\u0421\u043e\u0446\u0441\u0435\u0442\u0438"}
                  </h5>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => addSocial(memberIndex)}
                  >
                    {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443"}
                  </button>
                </div>

                {member.socials.length === 0 && (
                  <p style={styles.emptyText}>
                    {"\u0421\u0441\u044b\u043b\u043a\u0438 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b"}
                  </p>
                )}

                <div style={styles.socialsList}>
                  {member.socials.map((social, socialIndex) => (
                    <div key={socialIndex} style={styles.socialRow}>
                      <label style={styles.field}>
                        <span style={styles.label}>
                          {"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"}
                        </span>
                        <input
                          style={styles.input}
                          value={social.label}
                          onChange={(event) =>
                            updateSocial(
                              memberIndex,
                              socialIndex,
                              "label",
                              event.target.value,
                            )
                          }
                        />
                      </label>

                      <label style={styles.field}>
                        <span style={styles.label}>URL</span>
                        <input
                          style={styles.input}
                          value={social.url}
                          onChange={(event) =>
                            updateSocial(
                              memberIndex,
                              socialIndex,
                              "url",
                              event.target.value,
                            )
                          }
                        />
                      </label>

                      <button
                        type="button"
                        style={styles.removeButton}
                        onClick={() => removeSocial(memberIndex, socialIndex)}
                      >
                        {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"}
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
        {isSaving
          ? "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435..."
          : "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u0443"}
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

  socialTitle: {
    margin: 0,
    fontSize: "16px",
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
    minHeight: "88px",
    resize: "vertical",
  },

  membersSection: {
    display: "grid",
    gap: "16px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
  },

  membersList: {
    display: "grid",
    gap: "18px",
  },

  memberCard: {
    display: "grid",
    gap: "18px",
    padding: "18px",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    background: "#0f1118",
  },

  memberHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
  },

  memberTitle: {
    margin: 0,
    fontSize: "18px",
  },

  memberGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
  },

  socialsBlock: {
    display: "grid",
    gap: "12px",
    paddingTop: "16px",
    borderTop: "1px solid #2a2a2a",
  },

  socialsList: {
    display: "grid",
    gap: "12px",
  },

  socialRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr auto",
    gap: "12px",
    alignItems: "end",
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
