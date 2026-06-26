import type { TeamMember } from "../../api/contentApi";

export type TeamFormData = {
  title: string;
  subtitle?: string;
  members: TeamMember[];
};
