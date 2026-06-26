import type { StatItem } from "../../api/contentApi";

export type HeroFormData = {
  title: string;
  subtitle: string;
  buttonText?: string;
  stats: StatItem[];
};
