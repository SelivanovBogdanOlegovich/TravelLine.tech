import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import HeroForm from "../forms/HeroForm";
import { getAdminHero, updateAdminHero } from "../api/heroAdminApi";
import type { HeroData } from "../api/heroAdminApi";
import type { HeroFormData } from "../types/heroForm";

const normalizeHero = (hero: HeroData): HeroFormData => ({
  title: hero.title ?? "",
  subtitle: hero.subtitle ?? "",
  buttonText: hero.buttonText,
  stats: hero.stats ?? [],
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

  useEffect(() => {
    void loadHero();
  }, [loadHero]);

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
              hero={hero}
              isSaving={isSaving}
              onSubmit={handleHeroSubmit}
            />
          </>
        )}
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

  success: {
    color: "#8fd694",
  },

  error: {
    color: "#ff9b9b",
  },
};
