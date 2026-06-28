import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type DirectionsData = NonNullable<ContentData["directions"]>;

export const getAdminDirections = () =>
  apiRequest<DirectionsData>("/api/directions");

export const updateAdminDirections = (directions: DirectionsData) =>
  apiRequest<DirectionsData>("/api/directions", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(directions),
  });
