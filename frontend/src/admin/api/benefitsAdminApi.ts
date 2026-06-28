import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type BenefitsData = NonNullable<ContentData["benefits"]>;

export const getAdminBenefits = () =>
  apiRequest<BenefitsData>("/api/benefits");

export const updateAdminBenefits = (benefits: BenefitsData) =>
  apiRequest<BenefitsData>("/api/benefits", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(benefits),
  });
