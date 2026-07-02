import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { PlatformTimelineItem } from "../../api/contentApi";
import { useDraggableList } from "../hooks/useDraggableList";
import type { PlatformTimelineFormData } from "../types/platformTimelineForm";
import { formStyles as sharedStyles } from "./formStyles";
import { animateAdminRemoval, scrollToFormSubmit } from "./scrollHelpers";

type PlatformTimelineFormProps = {
  platformTimeline: PlatformTimelineFormData;
  isSaving: boolean;
  onSubmit: (platformTimeline: PlatformTimelineFormData) => void;
};

type TimelineYearGroup = {
  key: string;
  year: string;
  items: PlatformTimelineItem[];
};

const defaultMarkerTypes = [
  "founding",
  "launch",
  "booking",
  "platform",
  "integration",
  "analytics",
  "channel",
  "module",
  "webpms",
  "reputation",
  "express",
  "mobile",
  "optimizer",
  "crm",
  "guest",
  "order",
  "billing",
  "loyalty",
  "gms",
  "reactor",
  "api",
  "market",
];

const createTimelineItem = (
  items: PlatformTimelineItem[],
  year: string,
  markerType: string,
): PlatformTimelineItem => ({
  id: Math.max(0, ...items.map((item) => item.id)) + 1,
  year,
  title: "",
  description: "",
  markerType,
});

const getMarkerTypes = (items: PlatformTimelineItem[]) =>
  Array.from(
    new Set([
      ...defaultMarkerTypes,
      ...items.map((item) => item.markerType).filter(Boolean),
    ]),
  );

const getEventWord = (count: number) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "\u0441\u043e\u0431\u044b\u0442\u0438\u0439";
  }

  if (lastDigit === 1) {
    return "\u0441\u043e\u0431\u044b\u0442\u0438\u0435";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "\u0441\u043e\u0431\u044b\u0442\u0438\u044f";
  }

  return "\u0441\u043e\u0431\u044b\u0442\u0438\u0439";
};

const groupTimelineItems = (
  items: PlatformTimelineItem[],
): TimelineYearGroup[] => {
  const groups = new Map<string, PlatformTimelineItem[]>();

  items.forEach((item) => {
    groups.set(item.year, [...(groups.get(item.year) ?? []), item]);
  });

  return Array.from(groups, ([year, groupedItems]) => ({
    key: groupedItems
      .map((item) => item.id)
      .sort((firstId, secondId) => firstId - secondId)
      .join("-"),
    year,
    items: groupedItems,
  }));
};

type TimelineEventsListProps = {
  items: PlatformTimelineItem[];
  markerTypes: string[];
  onReorder: (items: PlatformTimelineItem[]) => void;
  onUpdate: (
    itemId: number,
    field: "title" | "description" | "markerType",
    value: string,
  ) => void;
  onRemove: (itemId: number) => void;
};

function TimelineEventsList({
  items,
  markerTypes,
  onReorder,
  onUpdate,
  onRemove,
}: TimelineEventsListProps) {
  const eventDrag = useDraggableList({
    items,
    getId: (item) => item.id,
    onReorder,
  });

  return (
    <div style={styles.eventsList}>
      {items.map((item) => (
        <article
          key={item.id}
          data-admin-event
          {...eventDrag.getItemProps(item)}
          style={{
            ...styles.eventCard,
            ...(eventDrag.isDragging(item) ? styles.draggingItem : undefined),
          }}
        >
          <div style={styles.itemHeader}>
            <span style={styles.itemHeaderTitle}>
              <button
                type="button"
                style={styles.dragHandle}
                aria-label="Перетащить событие"
                {...eventDrag.getHandleProps(item)}
              >
                {"\u2195"}
              </button>
              <h4 style={styles.itemTitle}>
                {item.title ||
                  "\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u0431\u044b\u0442\u0438\u0435"}
              </h4>
            </span>
            <button
              type="button"
              className="admin-remove-button"
              style={styles.removeButton}
              onClick={(event) =>
                animateAdminRemoval(event, () => onRemove(item.id))
              }
            >
              {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u0431\u044b\u0442\u0438\u0435"}
            </button>
          </div>

          <div style={styles.itemGrid}>
            <label style={styles.field}>
              <span style={styles.label}>
                {"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430"}
              </span>
              <input
                style={styles.input}
                value={item.title}
                onChange={(event) =>
                  onUpdate(item.id, "title", event.target.value)
                }
              />
            </label>

            <label style={styles.field}>
              <span style={styles.label}>
                {"\u0422\u0438\u043f \u043c\u0435\u0442\u043a\u0438"}
              </span>
              <select
                style={styles.input}
                value={item.markerType}
                onChange={(event) =>
                  onUpdate(item.id, "markerType", event.target.value)
                }
              >
                {markerTypes.map((markerType) => (
                  <option key={markerType} value={markerType}>
                    {markerType}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label style={styles.field}>
            <span style={styles.label}>
              {"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}
            </span>
            <textarea
              style={{ ...styles.input, ...styles.textarea }}
              value={item.description}
              onChange={(event) =>
                onUpdate(item.id, "description", event.target.value)
              }
            />
          </label>
        </article>
      ))}
    </div>
  );
}

export default function PlatformTimelineForm({
  platformTimeline,
  isSaving,
  onSubmit,
}: PlatformTimelineFormProps) {
  const [formData, setFormData] =
    useState<PlatformTimelineFormData>(platformTimeline);
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    () => new Set(),
  );
  const markerTypes = useMemo(
    () => getMarkerTypes(formData.items),
    [formData.items],
  );
  const yearGroups = groupTimelineItems(formData.items);
  const yearDrag = useDraggableList({
    items: yearGroups,
    getId: (group) => group.key,
    onReorder: (groups) =>
      setFormData((current) => ({
        ...current,
        items: groups.flatMap((group) => group.items),
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

  const updateYear = (currentYear: string, nextYear: string) => {
    setFormData((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.year === currentYear ? { ...item, year: nextYear } : item,
      ),
    }));

    setExpandedYears((current) => {
      const next = new Set(current);

      if (next.has(currentYear)) {
        next.delete(currentYear);
        next.add(nextYear);
      }

      return next;
    });
  };

  const updateItem = (
    itemId: number,
    field: "title" | "description" | "markerType",
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addYear = () => {
    setFormData((current) => {
      const newItem = createTimelineItem(
        current.items,
        "",
        markerTypes[0] ?? "launch",
      );

      setExpandedYears((expanded) => new Set(expanded).add(""));

      return {
        ...current,
        items: [...current.items, newItem],
      };
    });
    scrollToFormSubmit("[data-admin-year]");
  };

  const addItemToYear = (year: string) => {
    setFormData((current) => ({
      ...current,
      items: [
        ...current.items,
        createTimelineItem(current.items, year, markerTypes[0] ?? "launch"),
      ],
    }));

    setExpandedYears((expanded) => new Set(expanded).add(year));
    scrollToFormSubmit("[data-admin-event]");
  };

  const removeItem = (itemId: number) => {
    setFormData((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== itemId),
    }));
  };

  const removeYear = (year: string) => {
    setFormData((current) => ({
      ...current,
      items: current.items.filter((item) => item.year !== year),
    }));
  };

  const reorderItemsInYear = (
    year: string,
    reorderedItems: PlatformTimelineItem[],
  ) => {
    setFormData((current) => {
      const reorderedIds = new Set(reorderedItems.map((item) => item.id));
      let nextIndex = 0;

      return {
        ...current,
        items: current.items.map((item) => {
          if (item.year !== year || !reorderedIds.has(item.id)) {
            return item;
          }

          const nextItem = reorderedItems[nextIndex];
          nextIndex += 1;
          return nextItem;
        }),
      };
    });
  };


  const toggleYear = (year: string) => {
    setExpandedYears((current) => {
      const next = new Set(current);

      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }

      return next;
    });
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>
        {"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d\u0430 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b"}
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

      <section style={styles.itemsSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.subheading}>
            {"\u0413\u043e\u0434\u044b \u0438 \u0441\u043e\u0431\u044b\u0442\u0438\u044f \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d\u0430"}
          </h3>
          <button type="button" style={styles.secondaryButton} onClick={addYear}>
            {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0433\u043e\u0434"}
          </button>
        </div>

        {formData.items.length === 0 && (
          <p style={styles.emptyText}>
            {"\u0413\u043e\u0434\u044b \u0438 \u0441\u043e\u0431\u044b\u0442\u0438\u044f \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b"}
          </p>
        )}

        <div style={styles.itemsList}>
          {yearGroups.map((group) => {
            const isExpanded = expandedYears.has(group.year);

            return (
            <article
              key={group.key}
              data-admin-year
              {...yearDrag.getItemProps(group)}
              style={{
                ...styles.yearCard,
                ...(yearDrag.isDragging(group) ? styles.draggingItem : undefined),
              }}
            >
              <div style={styles.itemHeader}>
                <div style={{ ...styles.yearSummary, ...styles.itemHeaderTitle }}>
                  <button
                    type="button"
                    style={styles.dragHandle}
                    aria-label="Перетащить год"
                    {...yearDrag.getHandleProps(group)}
                  >
                    {"\u2195"}
                  </button>
                  <span style={styles.yearText}>
                  <strong style={styles.yearTitle}>
                    {group.year || "\u041d\u043e\u0432\u044b\u0439 \u0433\u043e\u0434"}
                  </strong>
                  <span style={styles.yearMeta}>
                    {group.items.length} {getEventWord(group.items.length)}
                  </span>
                  </span>
                </div>

                <div style={styles.actions}>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => toggleYear(group.year)}
                  >
                    {isExpanded
                      ? "\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c"
                      : "\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u044c"}
                  </button>
                  <button
                    type="button"
                    style={styles.secondaryButton}
                    onClick={() => addItemToYear(group.year)}
                  >
                    {"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u0431\u044b\u0442\u0438\u0435"}
                  </button>
                  <button
                    type="button"
                    className="admin-remove-button"
                    style={styles.removeButton}
                    onClick={(event) =>
                      animateAdminRemoval(event, () => removeYear(group.year))
                    }
                  >
                    {"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0433\u043e\u0434"}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <>
                  <label style={styles.yearField}>
                    <span style={styles.label}>{"\u0413\u043e\u0434"}</span>
                    <input
                      style={styles.input}
                      value={group.year}
                      onChange={(event) =>
                        updateYear(group.year, event.target.value)
                      }
                      placeholder="2026"
                    />
                  </label>

                  <TimelineEventsList
                    items={group.items}
                    markerTypes={markerTypes}
                    onReorder={(items) => reorderItemsInYear(group.year, items)}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                  />
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
          : "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d"}
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

  yearCard: {
    ...sharedStyles.itemCard,
    gap: "22px",
  },

  yearField: {
    ...sharedStyles.field,
    width: "min(100%, 220px)",
  },

  yearSummary: {
    display: "grid",
    gap: "6px",
  },

  yearText: {
    display: "flex",
    alignItems: "baseline",
    gap: "14px",
    flexWrap: "wrap",
  },

  yearTitle: {
    color: sharedStyles.itemTitle.color,
    fontSize: "22px",
    lineHeight: 1.1,
  },

  yearMeta: {
    color: sharedStyles.label.color,
    fontSize: "14px",
    fontWeight: 700,
  },

  actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "12px",
  },

  eventsList: {
    display: "grid",
    gap: "14px",
  },

  eventCard: {
    display: "grid",
    gap: "16px",
    padding: "18px",
    border: `1px solid ${sharedStyles.input.border}`,
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.72)",
  },

  itemGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(180px, 0.6fr)",
    gap: "16px",
  },
};
