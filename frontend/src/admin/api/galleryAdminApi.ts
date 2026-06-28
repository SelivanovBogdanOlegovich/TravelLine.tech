import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type GalleryData = NonNullable<ContentData["gallery"]>;

export const getAdminGallery = () => apiRequest<GalleryData>("/api/gallery");

export const updateAdminGallery = (gallery: GalleryData) =>
  apiRequest<GalleryData>("/api/gallery", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gallery),
  });
