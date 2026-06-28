import { useCallback, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import BenefitsForm from "../forms/BenefitsForm";
import ClientLogosForm from "../forms/ClientLogosForm";
import ContactForm from "../forms/ContactForm";
import DirectionsForm from "../forms/DirectionsForm";
import GalleryForm from "../forms/GalleryForm";
import HeroForm from "../forms/HeroForm";
import OfficesForm from "../forms/OfficesForm";
import PlatformTimelineForm from "../forms/PlatformTimelineForm";
import TeamForm from "../forms/TeamForm";
import VacanciesForm from "../forms/VacanciesForm";
import {
  getAdminBenefits,
  updateAdminBenefits,
} from "../api/benefitsAdminApi";
import type { BenefitsData } from "../api/benefitsAdminApi";
import {
  getAdminClientLogos,
  updateAdminClientLogos,
} from "../api/clientLogosAdminApi";
import type { ClientLogosData } from "../api/clientLogosAdminApi";
import { getAdminContact, updateAdminContact } from "../api/contactAdminApi";
import type { ContactData } from "../api/contactAdminApi";
import {
  getAdminDirections,
  updateAdminDirections,
} from "../api/directionsAdminApi";
import type { DirectionsData } from "../api/directionsAdminApi";
import { getAdminGallery, updateAdminGallery } from "../api/galleryAdminApi";
import type { GalleryData } from "../api/galleryAdminApi";
import { getAdminHero, updateAdminHero } from "../api/heroAdminApi";
import type { HeroData } from "../api/heroAdminApi";
import { getAdminOffices, updateAdminOffices } from "../api/officesAdminApi";
import type { OfficesData } from "../api/officesAdminApi";
import {
  getAdminPlatformTimeline,
  updateAdminPlatformTimeline,
} from "../api/platformTimelineAdminApi";
import type { PlatformTimelineData } from "../api/platformTimelineAdminApi";
import { getAdminTeam, updateAdminTeam } from "../api/teamAdminApi";
import type { TeamData } from "../api/teamAdminApi";
import {
  getAdminVacancies,
  updateAdminVacancies,
} from "../api/vacanciesAdminApi";
import type { VacanciesData } from "../api/vacanciesAdminApi";
import type { BenefitsFormData } from "../types/benefitsForm";
import type { ClientLogosFormData } from "../types/clientLogosForm";
import type { ContactFormData } from "../types/contactForm";
import type { DirectionsFormData } from "../types/directionsForm";
import type { GalleryFormData } from "../types/galleryForm";
import type { HeroFormData } from "../types/heroForm";
import type { OfficesFormData } from "../types/officesForm";
import type { PlatformTimelineFormData } from "../types/platformTimelineForm";
import type { TeamFormData } from "../types/teamForm";
import type { VacanciesFormData } from "../types/vacanciesForm";

type AdminResource<FormData> = {
  data: FormData | null;
  isLoading: boolean;
  loadError: string | null;
  isSaving: boolean;
  saveError: string | null;
  isSaved: boolean;
  save: (data: FormData) => Promise<void>;
};

type AdminSectionProps<FormData> = {
  resource: AdminResource<FormData>;
  loadingText: string;
  loadErrorPrefix: string;
  saveErrorPrefix: string;
  successText: string;
  children: (data: FormData) => ReactNode;
};

const normalizeHero = (hero: HeroData): HeroFormData => ({
  title: hero.title ?? "",
  subtitle: hero.subtitle ?? "",
  buttonText: hero.buttonText,
  stats: hero.stats ?? [],
});

const normalizeTeam = (team: TeamData): TeamFormData => ({
  title: team.title,
  subtitle: team.subtitle,
  members: team.members,
});

const normalizePlatformTimeline = (
  platformTimeline: PlatformTimelineData,
): PlatformTimelineFormData => ({
  title: platformTimeline.title,
  subtitle: platformTimeline.subtitle,
  items: platformTimeline.items,
});

const normalizeClientLogos = (
  clients: ClientLogosData,
): ClientLogosFormData => ({
  title: clients.title,
  subtitle: clients.subtitle,
  items: clients.items,
});

const normalizeDirections = (
  directions: DirectionsData,
): DirectionsFormData => directions;

const normalizeVacancies = (
  vacancies: VacanciesData,
): VacanciesFormData => vacancies;

const normalizeGallery = (gallery: GalleryData): GalleryFormData => ({
  title: gallery.title,
  subtitle: gallery.subtitle,
  items: gallery.items,
});

const normalizeOffices = (offices: OfficesData): OfficesFormData => ({
  title: offices.title,
  subtitle: offices.subtitle,
  items: offices.items,
});

const normalizeBenefits = (benefits: BenefitsData): BenefitsFormData => ({
  title: benefits.title,
  subtitle: benefits.subtitle,
  items: benefits.items,
});

const normalizeContact = (contact: ContactData): ContactFormData => ({
  title: contact.title,
  subtitle: contact.subtitle,
  buttonText: contact.buttonText,
});

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

function useAdminResource<ApiData, FormData>(
  loadResource: () => Promise<ApiData>,
  updateResource: (data: FormData) => Promise<ApiData>,
  normalize: (data: ApiData) => FormData,
): AdminResource<FormData> {
  const [data, setData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const load = useCallback(async () => {
    try {
      const resourceData = await loadResource();

      setData(normalize(resourceData));
      setLoadError(null);
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [loadResource, normalize]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void load();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [load]);

  const save = async (formData: FormData) => {
    setIsSaving(true);
    setSaveError(null);
    setIsSaved(false);

    try {
      await updateResource(formData);
      await load();
      setIsSaved(true);
    } catch (error) {
      setSaveError(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return {
    data,
    isLoading,
    loadError,
    isSaving,
    saveError,
    isSaved,
    save,
  };
}

function AdminSection<FormData>({
  resource,
  loadingText,
  loadErrorPrefix,
  saveErrorPrefix,
  successText,
  children,
}: AdminSectionProps<FormData>) {
  return (
    <section style={styles.adminSection}>
      {resource.isLoading && <p style={styles.message}>{loadingText}</p>}

      {resource.loadError && (
        <p style={{ ...styles.message, ...styles.error }}>
          {loadErrorPrefix}
          {resource.loadError}
        </p>
      )}

      {resource.data && !resource.isLoading && !resource.loadError && (
        <>
          {resource.isSaved && (
            <p style={{ ...styles.message, ...styles.success }}>
              {successText}
            </p>
          )}

          {resource.saveError && (
            <p style={{ ...styles.message, ...styles.error }}>
              {saveErrorPrefix}
              {resource.saveError}
            </p>
          )}

          {children(resource.data)}
        </>
      )}
    </section>
  );
}

export default function AdminPage() {
  const heroResource = useAdminResource(
    getAdminHero,
    updateAdminHero,
    normalizeHero,
  );
  const teamResource = useAdminResource(
    getAdminTeam,
    updateAdminTeam,
    normalizeTeam,
  );
  const platformTimelineResource = useAdminResource(
    getAdminPlatformTimeline,
    updateAdminPlatformTimeline,
    normalizePlatformTimeline,
  );
  const clientLogosResource = useAdminResource(
    getAdminClientLogos,
    updateAdminClientLogos,
    normalizeClientLogos,
  );
  const directionsResource = useAdminResource(
    getAdminDirections,
    updateAdminDirections,
    normalizeDirections,
  );
  const vacanciesResource = useAdminResource(
    getAdminVacancies,
    updateAdminVacancies,
    normalizeVacancies,
  );
  const galleryResource = useAdminResource(
    getAdminGallery,
    updateAdminGallery,
    normalizeGallery,
  );
  const officesResource = useAdminResource(
    getAdminOffices,
    updateAdminOffices,
    normalizeOffices,
  );
  const benefitsResource = useAdminResource(
    getAdminBenefits,
    updateAdminBenefits,
    normalizeBenefits,
  );
  const contactResource = useAdminResource(
    getAdminContact,
    updateAdminContact,
    normalizeContact,
  );

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <p style={styles.eyebrow}>TravelLine</p>
        <h1 style={styles.title}>Admin Panel</h1>
        <p style={styles.description}>Управление содержимым сайта</p>

        <AdminSection
          resource={heroResource}
          loadingText="Загрузка..."
          loadErrorPrefix="Ошибка загрузки: "
          saveErrorPrefix="Ошибка сохранения: "
          successText="Сохранено"
        >
          {(hero) => (
            <HeroForm
              key={JSON.stringify(hero)}
              hero={hero}
              isSaving={heroResource.isSaving}
              onSubmit={heroResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={teamResource}
          loadingText="Загрузка команды..."
          loadErrorPrefix="Ошибка загрузки команды: "
          saveErrorPrefix="Ошибка сохранения команды: "
          successText="Команда сохранена"
        >
          {(team) => (
            <TeamForm
              key={JSON.stringify(team)}
              team={team}
              isSaving={teamResource.isSaving}
              onSubmit={teamResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={platformTimelineResource}
          loadingText="Загрузка таймлайна..."
          loadErrorPrefix="Ошибка загрузки таймлайна: "
          saveErrorPrefix="Ошибка сохранения таймлайна: "
          successText="Таймлайн сохранён"
        >
          {(platformTimeline) => (
            <PlatformTimelineForm
              key={JSON.stringify(platformTimeline)}
              platformTimeline={platformTimeline}
              isSaving={platformTimelineResource.isSaving}
              onSubmit={platformTimelineResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={clientLogosResource}
          loadingText="Загрузка логотипов..."
          loadErrorPrefix="Ошибка загрузки логотипов: "
          saveErrorPrefix="Ошибка сохранения логотипов: "
          successText="Логотипы сохранены"
        >
          {(clientLogos) => (
            <ClientLogosForm
              key={JSON.stringify(clientLogos)}
              clients={clientLogos}
              isSaving={clientLogosResource.isSaving}
              onSubmit={clientLogosResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={directionsResource}
          loadingText="Загрузка направлений..."
          loadErrorPrefix="Ошибка загрузки направлений: "
          saveErrorPrefix="Ошибка сохранения направлений: "
          successText="Направления сохранены"
        >
          {(directions) => (
            <DirectionsForm
              key={JSON.stringify(directions)}
              directions={directions}
              isSaving={directionsResource.isSaving}
              onSubmit={directionsResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={vacanciesResource}
          loadingText="Загрузка вакансий..."
          loadErrorPrefix="Ошибка загрузки вакансий: "
          saveErrorPrefix="Ошибка сохранения вакансий: "
          successText="Вакансии сохранены"
        >
          {(vacancies) => (
            <VacanciesForm
              key={JSON.stringify(vacancies)}
              vacancies={vacancies}
              isSaving={vacanciesResource.isSaving}
              onSubmit={vacanciesResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={galleryResource}
          loadingText="Загрузка галереи..."
          loadErrorPrefix="Ошибка загрузки галереи: "
          saveErrorPrefix="Ошибка сохранения галереи: "
          successText="Галерея сохранена"
        >
          {(gallery) => (
            <GalleryForm
              key={JSON.stringify(gallery)}
              gallery={gallery}
              isSaving={galleryResource.isSaving}
              onSubmit={galleryResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={officesResource}
          loadingText="Загрузка офисов..."
          loadErrorPrefix="Ошибка загрузки офисов: "
          saveErrorPrefix="Ошибка сохранения офисов: "
          successText="Офисы сохранены"
        >
          {(offices) => (
            <OfficesForm
              key={JSON.stringify(offices)}
              offices={offices}
              isSaving={officesResource.isSaving}
              onSubmit={officesResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={benefitsResource}
          loadingText="Загрузка бонусов..."
          loadErrorPrefix="Ошибка загрузки бонусов: "
          saveErrorPrefix="Ошибка сохранения бонусов: "
          successText="Бонусы сохранены"
        >
          {(benefits) => (
            <BenefitsForm
              key={JSON.stringify(benefits)}
              benefits={benefits}
              isSaving={benefitsResource.isSaving}
              onSubmit={benefitsResource.save}
            />
          )}
        </AdminSection>

        <AdminSection
          resource={contactResource}
          loadingText="Загрузка контактов..."
          loadErrorPrefix="Ошибка загрузки контактов: "
          saveErrorPrefix="Ошибка сохранения контактов: "
          successText="Контакты сохранены"
        >
          {(contact) => (
            <ContactForm
              key={JSON.stringify(contact)}
              contact={contact}
              isSaving={contactResource.isSaving}
              onSubmit={contactResource.save}
            />
          )}
        </AdminSection>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0f1115",
    color: "white",
    padding: "48px",
    fontFamily: "Arial, sans-serif",
  },

  panel: {
    maxWidth: "920px",
    margin: "0 auto",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: "#c9cdd6",
    fontSize: "14px",
    letterSpacing: 0,
  },

  title: {
    margin: "0 0 12px",
    fontSize: "40px",
    fontWeight: 700,
  },

  description: {
    margin: "0 0 32px",
    color: "#c9cdd6",
    fontSize: "18px",
  },

  message: {
    margin: "0 0 16px",
    color: "#c9cdd6",
  },

  adminSection: {
    marginTop: "40px",
  },

  success: {
    color: "#8fd694",
  },

  error: {
    color: "#ff9b9b",
  },
};
