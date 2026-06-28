import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Layout from "../components/Layout";
import { getContent } from "../api/contentApi";
import type { ContentData } from "../api/contentApi";

import Header from "../sections/Header";
import Hero from "../sections/Hero";
import Directions from "../sections/Directions";
import Vacancies from "../sections/Vacancies";
import About from "../sections/About";
import Team from "../sections/Team";
import PlatformTimeline from "../sections/PlatformTimeline";
import Benefits from "../sections/Benefits";
import Testimonials from "../sections/Testimonials";
import CTA from "../sections/CTA";
import Stats from "../sections/Stats";
import Footer from "../sections/Footer";

type LoadStatus = "loading" | "error" | "success";

export default function HomePage() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getContent()
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setContent(data);
        setStatus("success");
      })
      .catch((requestError: Error) => {
        if (!isMounted) {
          return;
        }

        setError(requestError.message);
        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <Layout>
        <main style={styles.state}>Loading content...</main>
      </Layout>
    );
  }

  if (status === "error" || !content) {
    return (
      <Layout>
        <main style={styles.state}>
          <h1>Could not load content</h1>
          <p>{error}</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header header={content.header} />
      <Hero hero={content.hero} />
      <Directions directions={content.directions ?? []} />
      <Vacancies vacancies={content.vacancies ?? []} />
      <About about={content.about} />
      <Team team={content.team} />
      <PlatformTimeline platformTimeline={content.platformTimeline} />
      <Benefits benefits={content.benefits} />
      <Testimonials testimonials={content.testimonials} />
      <CTA cta={content.cta} />
      <Stats stats={content.stats} statsBlock={content.statsBlock} />
      <Footer footer={content.footer} />
    </Layout>
  );
}

const styles: Record<string, CSSProperties> = {
  state: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f0f14",
    color: "white",
    textAlign: "center",
    padding: "40px",
  },
};
