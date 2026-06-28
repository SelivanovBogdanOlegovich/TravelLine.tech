import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type VacanciesData = NonNullable<ContentData["vacancies"]>;

export const getAdminVacancies = () =>
  apiRequest<VacanciesData>("/api/vacancies");

export const updateAdminVacancies = (vacancies: VacanciesData) =>
  apiRequest<VacanciesData>("/api/vacancies", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vacancies),
  });
