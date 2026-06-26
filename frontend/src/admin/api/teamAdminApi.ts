import { apiRequest } from "../../api/contentApi";
import type { ContentData } from "../../api/contentApi";

export type TeamData = NonNullable<ContentData["team"]>;

export const getAdminTeam = () => apiRequest<TeamData>("/api/team");

export const updateAdminTeam = (team: TeamData) =>
  apiRequest<TeamData>("/api/team", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
