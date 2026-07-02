export type NavLink = {
  label: string;
  id: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type Direction = {
  id: number;
  title: string;
  description: string;
  tags?: string[];
};

export type Vacancy = {
  id: number;
  title: string;
  location: string;
  url: string;
  stack?: string[];
};

export type Benefit = {
  id: number;
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

export type TeamSocial = {
  label: string;
  url: string;
};

export type TeamMember = {
  id: number;
  name: string;
  position: string;
  photo: string;
  socials: TeamSocial[];
};

export type PlatformTimelineItem = {
  id: number;
  year: string;
  title: string;
  description: string;
  markerType: string;
};

export type PlatformTimelineData = {
  title: string;
  subtitle?: string;
  items: PlatformTimelineItem[];
};

export type ClientLogo = {
  id: number;
  name: string;
  logo: string;
};

export type ClientsData = {
  title: string;
  subtitle?: string;
  items: ClientLogo[];
};

export type GalleryItem = {
  id: number;
  caption: string;
  media: string;
  type: "image" | "video";
};

export type GalleryData = {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
};

export type OfficeItem = {
  id: number;
  city: string;
  description: string;
  photo: string;
};

export type OfficesData = {
  title: string;
  subtitle?: string;
  items: OfficeItem[];
};

export type ContactData = {
  title: string;
  subtitle?: string;
  buttonText: string;
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
  team?: {
    title: string;
    subtitle?: string;
    members: TeamMember[];
  };
  platformTimeline?: PlatformTimelineData;
  clients?: ClientsData;
  gallery?: GalleryData;
  offices?: OfficesData;
  benefits?: {
    title: string;
    subtitle?: string;
    items: Benefit[];
  };
  contact?: ContactData;
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

export const getTeam = () => getJson<ContentData["team"]>("/api/team");

export const getPlatformTimeline = () =>
  getJson<ContentData["platformTimeline"]>("/api/platform-timeline");

export const getClients = () => getJson<ContentData["clients"]>("/api/clients");

export const getGallery = () =>
  getJson<ContentData["gallery"]>("/api/gallery");

export const getOffices = () =>
  getJson<ContentData["offices"]>("/api/offices");

export const getContact = () =>
  getJson<ContentData["contact"]>("/api/contact");
