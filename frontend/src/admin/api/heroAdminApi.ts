import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type HeroData = NonNullable<ContentData["hero"]>;

export const getAdminHero = () => apiRequest<HeroData>("/api/hero");

export const updateAdminHero = (hero: HeroData) =>
  apiRequest<HeroData>("/api/hero", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hero),
  });
