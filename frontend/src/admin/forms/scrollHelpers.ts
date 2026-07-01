import type { MouseEvent } from "react";

const highlightAddedItem = (selector: string) => {
  const items = document.querySelectorAll<HTMLElement>(selector);
  const addedItem = items.item(items.length - 1);

  if (!addedItem) {
    return;
  }

  addedItem.classList.remove("admin-added-item-flash");

  window.requestAnimationFrame(() => {
    addedItem.classList.add("admin-added-item-flash");
  });
};

export const scrollToFormSubmit = (highlightSelector = "[data-admin-item]") => {
  window.setTimeout(() => {
    highlightAddedItem(highlightSelector);

    const submitButton = document.querySelector<HTMLButtonElement>(
      "form button[type='submit']",
    );

    submitButton?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 0);
};

export const animateAdminRemoval = (
  event: MouseEvent<HTMLElement>,
  remove: () => void,
) => {
  const removedItem = event.currentTarget.closest<HTMLElement>(
    "[data-admin-nested-item], [data-admin-event], [data-admin-year], [data-admin-item]",
  );

  if (!removedItem) {
    remove();
    return;
  }

  removedItem.classList.add("admin-removing-item");
  window.setTimeout(remove, 240);
};
