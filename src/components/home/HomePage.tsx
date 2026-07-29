"use client";

import BackgroundStars from "@/components/ui/BackgroundStars";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";
import StatusBar from "./sections/StatusBar";
import Timeline from "./sections/Timeline";
import About from "./sections/About";
import Footer from "./sections/Footer";
import type { GithubStats } from "@/lib/github";

const HomePage = ({ githubStats }: { githubStats: GithubStats | null }) => {
  return (
    <main id="conteudo-principal" tabIndex={-1} className="relative min-h-screen overflow-hidden px-4 py-6 md:px-12 lg:px-20 focus:outline-none">
      <div aria-hidden="true" className="fixed inset-0 z-0">
        <BackgroundStars />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#09030f]/50 to-[#09030f]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Navbar />
        <Hero />
        <StatusBar githubStats={githubStats} />
        <About />
        <Projects />
        <Timeline />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
