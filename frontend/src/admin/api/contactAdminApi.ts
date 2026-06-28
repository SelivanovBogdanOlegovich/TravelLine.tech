import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type ContactData = NonNullable<ContentData["contact"]>;

export const getAdminContact = () => apiRequest<ContactData>("/api/contact");

export const updateAdminContact = (contact: ContactData) =>
  apiRequest<ContactData>("/api/contact", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
