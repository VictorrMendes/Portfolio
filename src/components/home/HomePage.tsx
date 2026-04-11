"use client";

import Image from "next/image";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";
import StatusBar from "./sections/StatusBar";
import Timeline from "./sections/Timeline";
import About from "./sections/About";
import Footer from "./sections/Footer";

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 md:px-12 lg:px-20">
      <div className="pixelated absolute inset-0 z-0 opacity-15">
        <Image src="/bg-pixel.png" alt="Background" fill quality={100} priority className="object-cover object-top" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#09030f]/50 to-[#09030f]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Navbar />
        <Hero />
        <StatusBar />
        <About />
        <Projects />
        <Timeline />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
