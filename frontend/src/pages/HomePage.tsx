import Layout from "../components/Layout";

import Header from "../sections/Header";
import Hero from "../sections/Hero";
import Directions from "../sections/Directions";
import Vacancies from "../sections/Vacancies";
import About from "../sections/About";
import Benefits from "../sections/Benefits";
import Testimonials from "../sections/Testimonials";
import CTA from "../sections/CTA";
import Stats from "../sections/Stats";
import Footer from "../sections/Footer";

export default function HomePage() {
  return (
    <Layout>
      <Header />
      <Hero />
      <Directions />
      <Vacancies />
      <About />
      <Benefits />
      <Testimonials />
      <CTA />
      <Stats />
      <Footer />
    </Layout>
  );
}