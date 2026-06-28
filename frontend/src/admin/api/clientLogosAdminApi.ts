import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type ClientLogosData = NonNullable<ContentData["clients"]>;

export const getAdminClientLogos = () =>
  apiRequest<ClientLogosData>("/api/clients");

export const updateAdminClientLogos = (clients: ClientLogosData) =>
  apiRequest<ClientLogosData>("/api/clients", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clients),
  });
