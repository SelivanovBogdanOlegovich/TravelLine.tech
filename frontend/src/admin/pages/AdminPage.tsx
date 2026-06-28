import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import ClientLogosForm from "../forms/ClientLogosForm";
import HeroForm from "../forms/HeroForm";
import PlatformTimelineForm from "../forms/PlatformTimelineForm";
import TeamForm from "../forms/TeamForm";
import {
  getAdminClientLogos,
  updateAdminClientLogos,
} from "../api/clientLogosAdminApi";
import type { ClientLogosData } from "../api/clientLogosAdminApi";
import { getAdminHero, updateAdminHero } from "../api/heroAdminApi";
import type { HeroData } from "../api/heroAdminApi";
import {
  getAdminPlatformTimeline,
  updateAdminPlatformTimeline,
} from "../api/platformTimelineAdminApi";
import type { PlatformTimelineData } from "../api/platformTimelineAdminApi";
import { getAdminTeam, updateAdminTeam } from "../api/teamAdminApi";
import type { TeamData } from "../api/teamAdminApi";
import type { ClientLogosFormData } from "../types/clientLogosForm";
import type { HeroFormData } from "../types/heroForm";
import type { PlatformTimelineFormData } from "../types/platformTimelineForm";
import type { TeamFormData } from "../types/teamForm";

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

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

export default function AdminPage() {
  const [hero, setHero] = useState<HeroFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [team, setTeam] = useState<TeamFormData | null>(null);
  const [isTeamLoading, setIsTeamLoading] = useState(true);
  const [teamLoadError, setTeamLoadError] = useState<string | null>(null);
  const [isTeamSaving, setIsTeamSaving] = useState(false);
  const [teamSaveError, setTeamSaveError] = useState<string | null>(null);
  const [isTeamSaved, setIsTeamSaved] = useState(false);
  const [platformTimeline, setPlatformTimeline] =
    useState<PlatformTimelineFormData | null>(null);
  const [isPlatformTimelineLoading, setIsPlatformTimelineLoading] =
    useState(true);
  const [platformTimelineLoadError, setPlatformTimelineLoadError] = useState<
    string | null
  >(null);
  const [isPlatformTimelineSaving, setIsPlatformTimelineSaving] =
    useState(false);
  const [platformTimelineSaveError, setPlatformTimelineSaveError] = useState<
    string | null
  >(null);
  const [isPlatformTimelineSaved, setIsPlatformTimelineSaved] = useState(false);
  const [clientLogos, setClientLogos] =
    useState<ClientLogosFormData | null>(null);
  const [isClientLogosLoading, setIsClientLogosLoading] = useState(true);
  const [clientLogosLoadError, setClientLogosLoadError] = useState<
    string | null
  >(null);
  const [isClientLogosSaving, setIsClientLogosSaving] = useState(false);
  const [clientLogosSaveError, setClientLogosSaveError] = useState<
    string | null
  >(null);
  const [isClientLogosSaved, setIsClientLogosSaved] = useState(false);

  const loadHero = useCallback(async () => {
    try {
      const heroData = await getAdminHero();

      setHero(normalizeHero(heroData));
      setLoadError(null);
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadTeam = useCallback(async () => {
    try {
      const teamData = await getAdminTeam();

      setTeam(normalizeTeam(teamData));
      setTeamLoadError(null);
    } catch (error) {
      setTeamLoadError(getErrorMessage(error));
    } finally {
      setIsTeamLoading(false);
    }
  }, []);

  const loadPlatformTimeline = useCallback(async () => {
    try {
      const platformTimelineData = await getAdminPlatformTimeline();

      setPlatformTimeline(normalizePlatformTimeline(platformTimelineData));
      setPlatformTimelineLoadError(null);
    } catch (error) {
      setPlatformTimelineLoadError(getErrorMessage(error));
    } finally {
      setIsPlatformTimelineLoading(false);
    }
  }, []);

  const loadClientLogos = useCallback(async () => {
    try {
      const clientLogosData = await getAdminClientLogos();

      setClientLogos(normalizeClientLogos(clientLogosData));
      setClientLogosLoadError(null);
    } catch (error) {
      setClientLogosLoadError(getErrorMessage(error));
    } finally {
      setIsClientLogosLoading(false);
    }
  }, []);

  useEffect(() => {
    const heroTimeoutId = window.setTimeout(() => {
      void loadHero();
    }, 0);
    const teamTimeoutId = window.setTimeout(() => {
      void loadTeam();
    }, 0);
    const platformTimelineTimeoutId = window.setTimeout(() => {
      void loadPlatformTimeline();
    }, 0);
    const clientLogosTimeoutId = window.setTimeout(() => {
      void loadClientLogos();
    }, 0);

    return () => {
      window.clearTimeout(heroTimeoutId);
      window.clearTimeout(teamTimeoutId);
      window.clearTimeout(platformTimelineTimeoutId);
      window.clearTimeout(clientLogosTimeoutId);
    };
  }, [loadHero, loadTeam, loadPlatformTimeline, loadClientLogos]);

  const handleHeroSubmit = async (heroData: HeroFormData) => {
    setIsSaving(true);
    setSaveError(null);
    setIsSaved(false);

    try {
      await updateAdminHero(heroData);
      await loadHero();
      setIsSaved(true);
    } catch (error) {
      setSaveError(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleTeamSubmit = async (teamData: TeamFormData) => {
    setIsTeamSaving(true);
    setTeamSaveError(null);
    setIsTeamSaved(false);

    try {
      await updateAdminTeam(teamData);
      await loadTeam();
      setIsTeamSaved(true);
    } catch (error) {
      setTeamSaveError(getErrorMessage(error));
    } finally {
      setIsTeamSaving(false);
    }
  };

  const handlePlatformTimelineSubmit = async (
    platformTimelineData: PlatformTimelineFormData,
  ) => {
    setIsPlatformTimelineSaving(true);
    setPlatformTimelineSaveError(null);
    setIsPlatformTimelineSaved(false);

    try {
      await updateAdminPlatformTimeline(platformTimelineData);
      await loadPlatformTimeline();
      setIsPlatformTimelineSaved(true);
    } catch (error) {
      setPlatformTimelineSaveError(getErrorMessage(error));
    } finally {
      setIsPlatformTimelineSaving(false);
    }
  };

  const handleClientLogosSubmit = async (
    clientLogosData: ClientLogosFormData,
  ) => {
    setIsClientLogosSaving(true);
    setClientLogosSaveError(null);
    setIsClientLogosSaved(false);

    try {
      await updateAdminClientLogos(clientLogosData);
      await loadClientLogos();
      setIsClientLogosSaved(true);
    } catch (error) {
      setClientLogosSaveError(getErrorMessage(error));
    } finally {
      setIsClientLogosSaving(false);
    }
  };

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <p style={styles.eyebrow}>TravelLine</p>
        <h1 style={styles.title}>Admin Panel</h1>
        <p style={styles.description}>
          {"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u044b\u043c \u0441\u0430\u0439\u0442\u0430"}
        </p>

        {isLoading && (
          <p style={styles.message}>
            {"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."}
          </p>
        )}

        {loadError && (
          <p style={{ ...styles.message, ...styles.error }}>
            {"\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438: "}
            {loadError}
          </p>
        )}

        {hero && !isLoading && !loadError && (
          <>
            {isSaved && (
              <p style={{ ...styles.message, ...styles.success }}>
                {"\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e"}
              </p>
            )}

            {saveError && (
              <p style={{ ...styles.message, ...styles.error }}>
                {"\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f: "}
                {saveError}
              </p>
            )}

            <HeroForm
              key={JSON.stringify(hero)}
              hero={hero}
              isSaving={isSaving}
              onSubmit={handleHeroSubmit}
            />
          </>
        )}

        <section style={styles.adminSection}>
          {isTeamLoading && (
            <p style={styles.message}>
              {"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043a\u043e\u043c\u0430\u043d\u0434\u044b..."}
            </p>
          )}

          {teamLoadError && (
            <p style={{ ...styles.message, ...styles.error }}>
              {"\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u043a\u043e\u043c\u0430\u043d\u0434\u044b: "}
              {teamLoadError}
            </p>
          )}

          {team && !isTeamLoading && !teamLoadError && (
            <>
              {isTeamSaved && (
                <p style={{ ...styles.message, ...styles.success }}>
                  {"\u041a\u043e\u043c\u0430\u043d\u0434\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430"}
                </p>
              )}

              {teamSaveError && (
                <p style={{ ...styles.message, ...styles.error }}>
                  {"\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f \u043a\u043e\u043c\u0430\u043d\u0434\u044b: "}
                  {teamSaveError}
                </p>
              )}

              <TeamForm
                key={JSON.stringify(team)}
                team={team}
                isSaving={isTeamSaving}
                onSubmit={handleTeamSubmit}
              />
            </>
          )}
        </section>

        <section style={styles.adminSection}>
          {isPlatformTimelineLoading && (
            <p style={styles.message}>
              {"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d\u0430..."}
            </p>
          )}

          {platformTimelineLoadError && (
            <p style={{ ...styles.message, ...styles.error }}>
              {"\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d\u0430: "}
              {platformTimelineLoadError}
            </p>
          )}

          {platformTimeline &&
            !isPlatformTimelineLoading &&
            !platformTimelineLoadError && (
              <>
                {isPlatformTimelineSaved && (
                  <p style={{ ...styles.message, ...styles.success }}>
                    {"\u0422\u0430\u0439\u043c\u043b\u0430\u0439\u043d \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d"}
                  </p>
                )}

                {platformTimelineSaveError && (
                  <p style={{ ...styles.message, ...styles.error }}>
                    {"\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f \u0442\u0430\u0439\u043c\u043b\u0430\u0439\u043d\u0430: "}
                    {platformTimelineSaveError}
                  </p>
                )}

                <PlatformTimelineForm
                  key={JSON.stringify(platformTimeline)}
                  platformTimeline={platformTimeline}
                  isSaving={isPlatformTimelineSaving}
                  onSubmit={handlePlatformTimelineSubmit}
                />
              </>
            )}
        </section>

        <section style={styles.adminSection}>
          {isClientLogosLoading && (
            <p style={styles.message}>
              {"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u043e\u0432..."}
            </p>
          )}

          {clientLogosLoadError && (
            <p style={{ ...styles.message, ...styles.error }}>
              {"\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u043e\u0432: "}
              {clientLogosLoadError}
            </p>
          )}

          {clientLogos && !isClientLogosLoading && !clientLogosLoadError && (
            <>
              {isClientLogosSaved && (
                <p style={{ ...styles.message, ...styles.success }}>
                  {"\u041b\u043e\u0433\u043e\u0442\u0438\u043f\u044b \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u044b"}
                </p>
              )}

              {clientLogosSaveError && (
                <p style={{ ...styles.message, ...styles.error }}>
                  {"\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u043e\u0432: "}
                  {clientLogosSaveError}
                </p>
              )}

              <ClientLogosForm
                key={JSON.stringify(clientLogos)}
                clients={clientLogos}
                isSaving={isClientLogosSaving}
                onSubmit={handleClientLogosSubmit}
              />
            </>
          )}
        </section>
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
