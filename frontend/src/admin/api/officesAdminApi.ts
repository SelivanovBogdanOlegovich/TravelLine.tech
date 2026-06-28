import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type OfficesData = NonNullable<ContentData["offices"]>;

export const getAdminOffices = () => apiRequest<OfficesData>("/api/offices");

export const updateAdminOffices = (offices: OfficesData) =>
  apiRequest<OfficesData>("/api/offices", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(offices),
  });
