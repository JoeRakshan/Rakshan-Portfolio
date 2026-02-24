import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Toaster } from "sonner";

const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Skills = lazy(() => import("@/components/Skills"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </Suspense>
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default Index;
