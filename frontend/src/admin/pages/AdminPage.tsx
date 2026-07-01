import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import {
  container,
  lightCard,
  page,
  secondaryButton,
} from "../../sections/publicStyles";

type AdminBlockId =
  | "hero"
  | "team"
  | "platform-timeline"
  | "clients"
  | "directions"
  | "vacancies"
  | "gallery"
  | "offices"
  | "benefits"
  | "contact";

type AdminBlock = {
  id: AdminBlockId;
  title: string;
  description: string;
  kind: "Простой блок" | "Список" | "Группированный список";
};

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
  children: (data: FormData, resource: AdminResource<FormData>) => ReactNode;
};

type AdminResourceEditorProps<ApiData, FormData> = Omit<
  AdminSectionProps<FormData>,
  "resource"
> & {
    loadResource: () => Promise<ApiData>;
    updateResource: (data: FormData) => Promise<ApiData>;
    normalize: (data: ApiData) => FormData;
  };

const adminBlocks: AdminBlock[] = [
  {
    id: "hero",
    title: "Hero",
    description: "Заголовок, подзаголовок, кнопка и статистика первого экрана.",
    kind: "Простой блок",
  },
  {
    id: "team",
    title: "Команда",
    description: "Сотрудники, должности, фотографии и социальные ссылки.",
    kind: "Список",
  },
  {
    id: "platform-timeline",
    title: "Развиваем платформу",
    description: "Годы, события таймлайна, описания и типы меток.",
    kind: "Группированный список",
  },
  {
    id: "clients",
    title: "Логотипы клиентов",
    description: "Название клиента и путь к логотипу для бегущей строки.",
    kind: "Список",
  },
  {
    id: "directions",
    title: "Направления",
    description: "Карточки направлений и технологические теги.",
    kind: "Список",
  },
  {
    id: "vacancies",
    title: "Вакансии",
    description: "Открытые позиции, формат работы и стек.",
    kind: "Список",
  },
  {
    id: "gallery",
    title: "Фотогалерея",
    description: "Медиа, подписи и типы материалов.",
    kind: "Список",
  },
  {
    id: "offices",
    title: "Офисы",
    description: "Города, описания и изображения офисов.",
    kind: "Список",
  },
  {
    id: "benefits",
    title: "Плюшки",
    description: "Заголовок и карточки преимуществ.",
    kind: "Список",
  },
  {
    id: "contact",
    title: "Контакты",
    description: "Текст финального HR-блока и подпись кнопки.",
    kind: "Простой блок",
  },
];

const adminBlockMap = new Map(adminBlocks.map((block) => [block.id, block]));

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

const getBlockIdFromPath = (): AdminBlockId | null => {
  const [, maybeAdmin, blockId] = window.location.pathname.split("/");

  if (maybeAdmin !== "admin" || !blockId) {
    return null;
  }

  return adminBlockMap.has(blockId as AdminBlockId)
    ? (blockId as AdminBlockId)
    : null;
};

function useAdminPath() {
  const [activeBlockId, setActiveBlockId] = useState<AdminBlockId | null>(
    getBlockIdFromPath,
  );

  useEffect(() => {
    const handlePopState = () => {
      setActiveBlockId(getBlockIdFromPath());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateToBlock = (blockId: AdminBlockId) => {
    window.history.pushState(null, "", `/admin/${blockId}`);
    setActiveBlockId(blockId);
    window.scrollTo({ top: 0 });
  };

  const navigateToDashboard = () => {
    window.history.pushState(null, "", "/admin");
    setActiveBlockId(null);
    window.scrollTo({ top: 0 });
  };

  return {
    activeBlockId,
    navigateToBlock,
    navigateToDashboard,
  };
}

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
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (resource.isSaved || resource.saveError) {
      statusRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [resource.isSaved, resource.saveError]);

  return (
    <section style={styles.adminSection}>
      <div ref={statusRef} style={styles.statusAnchor} />

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
            <p
              className="admin-status-flash"
              style={{ ...styles.message, ...styles.success }}
            >
              {successText}
            </p>
          )}

          {resource.saveError && (
            <p style={{ ...styles.message, ...styles.error }}>
              {saveErrorPrefix}
              {resource.saveError}
            </p>
          )}

          {children(resource.data, resource)}
        </>
      )}
    </section>
  );
}

function AdminResourceEditor<ApiData, FormData>({
  loadResource,
  updateResource,
  normalize,
  ...sectionProps
}: AdminResourceEditorProps<ApiData, FormData>) {
  const resource = useAdminResource(loadResource, updateResource, normalize);

  return <AdminSection {...sectionProps} resource={resource} />;
}

function AdminDashboard({
  onSelectBlock,
}: {
  onSelectBlock: (blockId: AdminBlockId) => void;
}) {
  return (
    <>
      <section style={styles.heroPanel}>
        <div style={styles.brandLine}>
          <p style={styles.eyebrow}>TravelLine Admin</p>
        </div>
        <h1 style={styles.title}>Выберите блок для редактирования</h1>
        <p style={{ ...styles.description, display: "none" }}>
          Каждый раздел открывается на отдельной странице, чтобы не листать всю
          админку сверху вниз.
        </p>
      </section>

      <section style={styles.blocksGrid}>
        {adminBlocks.map((block, index) => (
          <button
            key={block.id}
            type="button"
            style={styles.blockCard}
            onClick={() => onSelectBlock(block.id)}
          >
            <span style={styles.blockNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span style={styles.blockContent}>
              <span style={styles.blockTitle}>{block.title}</span>
              <span
                className="admin-block-description"
                style={styles.blockDescription}
              >
                {block.description}
              </span>
            </span>
          </button>
        ))}
      </section>
    </>
  );
}

function AdminBlockPage({
  blockId,
  onBack,
}: {
  blockId: AdminBlockId;
  onBack: () => void;
}) {
  const block = adminBlockMap.get(blockId);

  if (!block) {
    return (
      <section style={styles.heroPanel}>
        <h1 style={styles.title}>Блок не найден</h1>
        <button type="button" style={styles.secondaryButton} onClick={onBack}>
          Назад
        </button>
      </section>
    );
  }

  return (
    <>
      <section style={styles.editorHeader}>
        <button type="button" style={styles.backButton} onClick={onBack}>
          Назад
        </button>
        <div>
          <p style={styles.eyebrow}>Редактирование блока</p>
          <h1 style={styles.title}>{block.title}</h1>
          <p style={styles.description}>{block.description}</p>
        </div>
      </section>

      <AdminBlockSwitch blockId={blockId} />
    </>
  );
}

function AdminBlockSwitch({ blockId }: { blockId: AdminBlockId }) {
  switch (blockId) {
    case "hero":
      return (
        <AdminResourceEditor
          loadResource={getAdminHero}
          updateResource={updateAdminHero}
          normalize={normalizeHero}
          loadingText="Загрузка Hero..."
          loadErrorPrefix="Ошибка загрузки Hero: "
          saveErrorPrefix="Ошибка сохранения Hero: "
          successText="Hero сохранён"
        >
          {(hero, resource) => (
            <HeroForm
              key={JSON.stringify(hero)}
              hero={hero}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "team":
      return (
        <AdminResourceEditor
          loadResource={getAdminTeam}
          updateResource={updateAdminTeam}
          normalize={normalizeTeam}
          loadingText="Загрузка команды..."
          loadErrorPrefix="Ошибка загрузки команды: "
          saveErrorPrefix="Ошибка сохранения команды: "
          successText="Команда сохранена"
        >
          {(team, resource) => (
            <TeamForm
              key={JSON.stringify(team)}
              team={team}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "platform-timeline":
      return (
        <AdminResourceEditor
          loadResource={getAdminPlatformTimeline}
          updateResource={updateAdminPlatformTimeline}
          normalize={normalizePlatformTimeline}
          loadingText="Загрузка таймлайна..."
          loadErrorPrefix="Ошибка загрузки таймлайна: "
          saveErrorPrefix="Ошибка сохранения таймлайна: "
          successText="Таймлайн сохранён"
        >
          {(platformTimeline, resource) => (
            <PlatformTimelineForm
              key={JSON.stringify(platformTimeline)}
              platformTimeline={platformTimeline}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "clients":
      return (
        <AdminResourceEditor
          loadResource={getAdminClientLogos}
          updateResource={updateAdminClientLogos}
          normalize={normalizeClientLogos}
          loadingText="Загрузка логотипов..."
          loadErrorPrefix="Ошибка загрузки логотипов: "
          saveErrorPrefix="Ошибка сохранения логотипов: "
          successText="Логотипы сохранены"
        >
          {(clientLogos, resource) => (
            <ClientLogosForm
              key={JSON.stringify(clientLogos)}
              clients={clientLogos}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "directions":
      return (
        <AdminResourceEditor
          loadResource={getAdminDirections}
          updateResource={updateAdminDirections}
          normalize={normalizeDirections}
          loadingText="Загрузка направлений..."
          loadErrorPrefix="Ошибка загрузки направлений: "
          saveErrorPrefix="Ошибка сохранения направлений: "
          successText="Направления сохранены"
        >
          {(directions, resource) => (
            <DirectionsForm
              key={JSON.stringify(directions)}
              directions={directions}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "vacancies":
      return (
        <AdminResourceEditor
          loadResource={getAdminVacancies}
          updateResource={updateAdminVacancies}
          normalize={normalizeVacancies}
          loadingText="Загрузка вакансий..."
          loadErrorPrefix="Ошибка загрузки вакансий: "
          saveErrorPrefix="Ошибка сохранения вакансий: "
          successText="Вакансии сохранены"
        >
          {(vacancies, resource) => (
            <VacanciesForm
              key={JSON.stringify(vacancies)}
              vacancies={vacancies}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "gallery":
      return (
        <AdminResourceEditor
          loadResource={getAdminGallery}
          updateResource={updateAdminGallery}
          normalize={normalizeGallery}
          loadingText="Загрузка галереи..."
          loadErrorPrefix="Ошибка загрузки галереи: "
          saveErrorPrefix="Ошибка сохранения галереи: "
          successText="Галерея сохранена"
        >
          {(gallery, resource) => (
            <GalleryForm
              key={JSON.stringify(gallery)}
              gallery={gallery}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "offices":
      return (
        <AdminResourceEditor
          loadResource={getAdminOffices}
          updateResource={updateAdminOffices}
          normalize={normalizeOffices}
          loadingText="Загрузка офисов..."
          loadErrorPrefix="Ошибка загрузки офисов: "
          saveErrorPrefix="Ошибка сохранения офисов: "
          successText="Офисы сохранены"
        >
          {(offices, resource) => (
            <OfficesForm
              key={JSON.stringify(offices)}
              offices={offices}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "benefits":
      return (
        <AdminResourceEditor
          loadResource={getAdminBenefits}
          updateResource={updateAdminBenefits}
          normalize={normalizeBenefits}
          loadingText="Загрузка плюшек..."
          loadErrorPrefix="Ошибка загрузки плюшек: "
          saveErrorPrefix="Ошибка сохранения плюшек: "
          successText="Плюшки сохранены"
        >
          {(benefits, resource) => (
            <BenefitsForm
              key={JSON.stringify(benefits)}
              benefits={benefits}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );

    case "contact":
      return (
        <AdminResourceEditor
          loadResource={getAdminContact}
          updateResource={updateAdminContact}
          normalize={normalizeContact}
          loadingText="Загрузка контактов..."
          loadErrorPrefix="Ошибка загрузки контактов: "
          saveErrorPrefix="Ошибка сохранения контактов: "
          successText="Контакты сохранены"
        >
          {(contact, resource) => (
            <ContactForm
              key={JSON.stringify(contact)}
              contact={contact}
              isSaving={resource.isSaving}
              onSubmit={resource.save}
            />
          )}
        </AdminResourceEditor>
      );
  }
}

export default function AdminPage() {
  const { activeBlockId, navigateToBlock, navigateToDashboard } =
    useAdminPath();
  const currentBlock = useMemo(
    () => (activeBlockId ? adminBlockMap.get(activeBlockId) : null),
    [activeBlockId],
  );

  useEffect(() => {
    document.title = currentBlock
      ? `${currentBlock.title} - TravelLine Admin`
      : "TravelLine Admin";
  }, [currentBlock]);

  return (
    <main className="admin-page" style={styles.page}>
      <div style={styles.panel}>
        {activeBlockId ? (
          <AdminBlockPage
            blockId={activeBlockId}
            onBack={navigateToDashboard}
          />
        ) : (
          <AdminDashboard onSelectBlock={navigateToBlock} />
        )}
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #ffffff 0%, #eaf4ff 100%)",
    color: page.lightText,
    padding: "56px 0 72px",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  panel: {
    ...container,
    display: "grid",
    gap: "28px",
  },

  heroPanel: {
    ...lightCard,
    padding: "36px",
  },

  brandLine: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },

  brandLogo: {
    width: "26px",
    height: "26px",
    objectFit: "contain",
  },

  editorHeader: {
    ...lightCard,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "22px",
    alignItems: "start",
    padding: "28px",
  },

  eyebrow: {
    margin: "0 0 12px",
    color: page.accent,
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0,
  },

  title: {
    margin: "0 0 12px",
    color: page.lightText,
    fontSize: "clamp(32px, 5vw, 52px)",
    lineHeight: 1.08,
    fontWeight: 900,
  },

  description: {
    margin: "0",
    color: page.lightSoftText,
    fontSize: "18px",
    lineHeight: 1.7,
  },

  blocksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: "18px",
  },

  blockCard: {
    ...lightCard,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "18px",
    minHeight: "180px",
    padding: "24px",
    border: `1px solid ${page.lightBorder}`,
    color: page.lightText,
    textAlign: "left",
    cursor: "pointer",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  },

  blockNumber: {
    width: "44px",
    height: "44px",
    display: "grid",
    placeItems: "center",
    borderRadius: "16px",
    background: page.softBlue,
    color: page.accent,
    fontSize: "14px",
    fontWeight: 900,
  },

  blockContent: {
    display: "grid",
    gap: "10px",
  },

  blockTitle: {
    fontSize: "22px",
    fontWeight: 900,
    lineHeight: 1.15,
  },

  blockDescription: {
    color: page.lightSoftText,
    fontSize: "15px",
    lineHeight: 1.55,
  },

  blockMeta: {
    gridColumn: "2",
    alignSelf: "end",
    justifySelf: "start",
    padding: "7px 10px",
    borderRadius: "999px",
    background: page.light,
    color: page.accent,
    fontSize: "12px",
    fontWeight: 800,
  },

  backButton: {
    ...secondaryButton,
    minHeight: "42px",
    padding: "10px 16px",
  },

  secondaryButton: {
    ...secondaryButton,
  },

  message: {
    margin: "0 0 16px",
    padding: "14px 16px",
    border: `1px solid ${page.lightBorder}`,
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.74)",
    color: page.lightSoftText,
  },

  adminSection: {
    display: "grid",
    gap: "16px",
  },

  statusAnchor: {
    height: 0,
    scrollMarginTop: "170px",
  },

  success: {
    borderColor: page.strongBorder,
    color: page.accent,
  },

  error: {
    borderColor: "rgba(220, 38, 38, 0.22)",
    color: "#b42318",
  },
};
