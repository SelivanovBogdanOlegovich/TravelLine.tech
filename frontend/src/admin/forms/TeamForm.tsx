import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { TeamMember, TeamSocial } from "../../api/contentApi";
import { useDraggableList } from "../hooks/useDraggableList";
import type { TeamFormData } from "../types/teamForm";
import { formStyles as sharedStyles } from "./formStyles";
import { animateAdminRemoval, scrollToFormSubmit } from "./scrollHelpers";

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

const scrollToSocialRow = (memberIndex: number, socialIndex: number) => {
  window.setTimeout(() => {
    const row = document.querySelector<HTMLElement>(
      `[data-admin-social="${memberIndex}-${socialIndex}"]`,
    );

    if (!row) {
      return;
    }

    row.classList.remove("admin-added-item-flash");
    row.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.requestAnimationFrame(() => {
      row.classList.add("admin-added-item-flash");
      row.querySelector<HTMLInputElement>("[data-admin-social-url]")?.focus({
        preventScroll: true,
      });
    });
  }, 0);
};

export default function TeamForm({
  team,
  isSaving,
  onSubmit,
}: TeamFormProps) {
  const [formData, setFormData] = useState<TeamFormData>(team);
  const [expandedMemberIds, setExpandedMemberIds] = useState<Set<number>>(
    () => new Set(),
  );
  const memberDrag = useDraggableList({
    items: formData.members,
    getId: (member) => member.id,
    onReorder: (members) =>
      setFormData((current) => ({
        ...current,
        members,
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
    setFormData((current) => {
      const newMember = createTeamMember(current.members);

      setExpandedMemberIds((expandedIds) =>
        new Set(expandedIds).add(newMember.id),
      );

      return {
        ...current,
        members: [...current.members, newMember],
      };
    });
    scrollToFormSubmit();
  };

  const removeMember = (memberIndex: number) => {
    setFormData((current) => ({
      ...current,
      members: current.members.filter((_, index) => index !== memberIndex),
    }));
  };

  const toggleMember = (memberId: number) => {
    setExpandedMemberIds((current) => {
      const next = new Set(current);

      if (next.has(memberId)) {
        next.delete(memberId);
      } else {
        next.add(memberId);
      }

      return next;
    });
  };

  const addSocial = (memberIndex: number) => {
    const newSocialIndex = formData.members[memberIndex]?.socials.length ?? 0;

    setFormData((current) => ({
      ...current,
      members: current.members.map((member, index) =>
        index === memberIndex
          ? {
              ...member,
              socials: [...member.socials, createSocial()],
            }
          : member,
      ),
    }));
    scrollToSocialRow(memberIndex, newSocialIndex);
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
            <article
              key={member.id}
              data-admin-item
              {...memberDrag.getItemProps(member)}
              style={{
                ...styles.memberCard,
                ...(memberDrag.isDragging(member)
                  ? styles.draggingItem
                  : undefined),
              }}
            >
              <div style={styles.memberHeader}>
                <span style={styles.itemHeaderTitle}>
                  <button
                    type="button"
                    style={styles.dragHandle}
                    aria-label="Перетащить сотрудника"
                    {...memberDrag.getHandleProps(member)}
                  >
                    ↕
                  </button>
                <h4 style={styles.memberTitle}>
                  {member.name ||
                    "\u041d\u043e\u0432\u044b\u0439 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a"}
                </h4>
                </span>
                <div style={styles.memberActions}>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => toggleMember(member.id)}
                  >
                    {expandedMemberIds.has(member.id)
                      ? "\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c"
                      : "\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c"}
                  </button>
                  <button
                    type="button"
                    className="admin-remove-button"
                    style={styles.removeButton}
                    onClick={(event) =>
                      animateAdminRemoval(event, () => removeMember(memberIndex))
                    }
                  >
                    {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"}
                  </button>
                </div>
              </div>

              {expandedMemberIds.has(member.id) && (
                <>
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
                          updateMember(
                            memberIndex,
                            "position",
                            event.target.value,
                          )
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
                        <div
                          key={socialIndex}
                          data-admin-nested-item
                          data-admin-social={`${memberIndex}-${socialIndex}`}
                          style={styles.socialRow}
                        >
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
                          data-admin-social-url
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
                        className="admin-remove-button"
                        style={styles.removeButton}
                        onClick={(event) =>
                          animateAdminRemoval(event, () =>
                            removeSocial(memberIndex, socialIndex),
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
  ...sharedStyles,

  socialTitle: {
    margin: 0,
    color: sharedStyles.itemTitle.color,
    fontSize: "16px",
    fontWeight: 800,
  },

  textarea: {
    ...sharedStyles.textarea,
    minHeight: "88px",
  },

  membersSection: sharedStyles.itemsSection,
  sectionHeader: sharedStyles.sectionHeader,
  membersList: sharedStyles.itemsList,
  memberCard: sharedStyles.itemCard,
  memberHeader: sharedStyles.itemHeader,
  memberTitle: sharedStyles.itemTitle,

  memberActions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "10px",
  },

  memberGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: "16px",
  },

  socialsBlock: sharedStyles.nestedBlock,

  socialsList: sharedStyles.nestedList,

  socialRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr)) auto",
    gap: "12px",
    alignItems: "end",
  },
};
