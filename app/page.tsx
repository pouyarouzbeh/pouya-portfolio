import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"));
const Stats = dynamic(() => import("@/components/Stats"));
const Skills = dynamic(() => import("@/components/Skills"));
const Experience = dynamic(() => import("@/components/Experience"));
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function HomePage() {
  return (
    <div className="site-shell">
      <div className="rainy-starfield" aria-hidden="true" />
      <Loader />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
