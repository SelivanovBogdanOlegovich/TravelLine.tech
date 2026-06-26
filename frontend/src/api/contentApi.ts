export type NavLink = {
  label: string;
  id: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type Direction = {
  title: string;
  description: string;
  tags?: string[];
};

export type Vacancy = {
  title: string;
  location: string;
  type: string;
  stack?: string[];
};

export type Benefit = {
  title: string;
  text?: string;
  description?: string;
};

export type Testimonial = {
  name: string;
  role?: string;
  text: string;
};

export type FooterLink = {
  label: string;
  url: string;
};

export type ContentData = {
  header?: {
    logo?: string;
    links?: NavLink[];
    nav?: string[];
    buttonText?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    stats?: StatItem[];
  };
  directions?: Direction[];
  vacancies?: Vacancy[];
  about?: {
    title?: string;
    text?: string;
    description?: string;
  };
  benefits?:
    | {
        title?: string;
        items?: Benefit[];
      }
    | Benefit[];
  testimonials?:
    | {
        title?: string;
        items?: Testimonial[];
      }
    | Testimonial[];
  cta?: {
    title?: string;
    text?: string;
    buttonText?: string;
  };
  stats?: StatItem[];
  statsBlock?: {
    title?: string;
    items?: StatItem[];
  };
  footer?: {
    text?: string;
    copyright?: string;
    links?: Array<FooterLink | string>;
  };
};

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export const apiRequest = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const getJson = <T>(endpoint: string): Promise<T> => apiRequest<T>(endpoint);

export const getContent = () => getJson<ContentData>("/api/content");

export const getHero = () => getJson<ContentData["hero"]>("/api/hero");

export const getVacancies = () =>
  getJson<ContentData["vacancies"]>("/api/vacancies");
